import React, { useState } from 'react';
import Navbar from '../home/navbar';
import Footer from '../home/footer';

import {
  useInitSessionMutation,
  useStartSessionMutation,
  useGetCurrentQuery,
  useSubmitAnswerMutation,
  useGetTimeLeftQuery,
  useGetResultQuery,
  useLazyGetPdfDownloadQuery,
} from '../../../redux/features/writtenTestApi';

import { InitSessionPayload } from './types';

/* ------------------ STEP ENUM ------------------ */
type Step = 'FORM' | 'READY' | 'EXAM' | 'RESULT';

const WrittenTest: React.FC = () => {
  const [step, setStep] = useState<Step>('FORM');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [answer, setAnswer] = useState('');

  /* ------------------ FORM STATE ------------------ */
  const [form, setForm] = useState({
    jobTitle: '',
    experienceYears: '',
    skills: '',
    jobDescription: '',
    durationMinutes: '20',
  });

  /* ------------------ API HOOKS ------------------ */
  const [initSession, { isLoading: initLoading }] =
    useInitSessionMutation();

  const [startSession, { isLoading: startLoading }] =
    useStartSessionMutation();

  const [submitAnswer, { isLoading: submitting }] =
    useSubmitAnswerMutation();

  const { data: currentQuestion } = useGetCurrentQuery(sessionId!, {
    skip: step !== 'EXAM' || !sessionId,
  });

  const { data: timeLeft } = useGetTimeLeftQuery(sessionId!, {
    skip: step !== 'EXAM' || !sessionId,
    pollingInterval: 1000,
  });

  const { data: result, isLoading: resultLoading } = useGetResultQuery(
    sessionId!,
    { skip: step !== 'RESULT' || !sessionId }
  );

  const [downloadPdf, { isLoading: pdfLoading }] =
  useLazyGetPdfDownloadQuery();

  /* ------------------ HANDLERS ------------------ */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /** STEP 1 → INIT */
  const handleInit = async () => {
    const payload: InitSessionPayload = {
      jobTitle: form.jobTitle,
      experienceYears: Number(form.experienceYears),
      skills: form.skills.split(',').map(s => s.trim()),
      jobDescription: form.jobDescription,
      durationMinutes: Number(form.durationMinutes),
    };

    const res = await initSession(payload).unwrap();
    setSessionId(res.sessionId);
    setStep('READY');
  };

  /** STEP 2 → START */
  const handleStartExam = async () => {
    if (!sessionId) return;
    await startSession(sessionId).unwrap();
    setStep('EXAM');
  };

  /** STEP 3 → SUBMIT ANSWER */
  const handleSubmitAnswer = async () => {
    if (!sessionId || !answer.trim()) return;

    const res = await submitAnswer({
      sessionId,
      answer,
    }).unwrap();

    setAnswer('');

    if (res.status === 'completed') {
      setStep('RESULT');
    }
  };

  /** STEP 4 → DOWNLOAD PDF */
  const handleDownloadPdf = async () => {
    if (!sessionId) return;

    try {
      const pdfBlob = await downloadPdf(sessionId).unwrap();
      const url = window.URL.createObjectURL(pdfBlob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `written_test_${sessionId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('PDF download failed', err);
      alert('Failed to download PDF');
    }
  };

  /* ------------------ UI ------------------ */

  return (
    <>
      <Navbar />

      <div className="mt-24 max-w-4xl mx-auto px-6 pb-20">

        {/* ================= FORM ================= */}
        {step === 'FORM' && (
          <div className="bg-white shadow-xl rounded-xl p-8 space-y-6">
            <h1 className="text-2xl font-bold">Written Assessment Setup</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input name="jobTitle" className="input" placeholder="Job Title" onChange={handleChange} />
              <input name="experienceYears" type="number" className="input" placeholder="Experience" onChange={handleChange} />
              <input name="skills" className="input md:col-span-2" placeholder="Skills (React, JS)" onChange={handleChange} />
            </div>

            <textarea name="jobDescription" className="input" rows={4} placeholder="Job Description" onChange={handleChange} />

            <input name="durationMinutes" type="number" min={1} max={240} className="input w-48" value={form.durationMinutes} onChange={handleChange} />

            <button onClick={handleInit} className="btn-primary w-full">
              {initLoading ? 'Generating…' : 'Generate Test'}
            </button>
          </div>
        )}

        {/* ================= READY ================= */}
        {step === 'READY' && (
          <div className="card-center">
            <h2>Your test is ready 🚀</h2>
            <button onClick={handleStartExam} className="btn-success">
              {startLoading ? 'Starting…' : 'Begin Exam'}
            </button>
          </div>
        )}

        {/* ================= EXAM ================= */}
        {step === 'EXAM' && currentQuestion && (
          <div className="bg-white shadow-xl rounded-xl p-8 space-y-6">
            <div className="flex justify-between text-sm">
              <span>
                Question {currentQuestion.index + 1} / {currentQuestion.total}
              </span>
              <span className="text-red-600">
                ⏱ {timeLeft?.remainingSeconds}s
              </span>
            </div>

            <h2 className="font-semibold">{currentQuestion.question}</h2>

            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="input"
              rows={6}
            />

            <button onClick={handleSubmitAnswer} className="btn-primary">
              {submitting ? 'Submitting…' : 'Submit & Next'}
            </button>
          </div>
        )}

        {/* ================= RESULT ================= */}
        {step === 'RESULT' && (
          <div className="bg-white shadow-xl rounded-xl p-8 space-y-6">
            {resultLoading ? (
              <p>Loading result…</p>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-green-600">
                  Test Completed 🎉
                </h2>

                <p>
                  Total Score: <b>{result?.totalScore}</b>
                </p>

                <ul className="space-y-3">
                  {result?.questions.map((q, i) => (
                    <li key={i} className="border p-3 rounded">
                      <p className="font-medium">{q.question}</p>
                      <p className="text-sm">Your Answer: {q.userAnswer}</p>
                      <p className="text-sm text-green-600">{q.feedback}</p>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handleDownloadPdf}
                  disabled={pdfLoading}
                  className="btn-success"
                >
                  {pdfLoading ? 'Downloading…' : 'Download PDF Report'}
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default WrittenTest;
