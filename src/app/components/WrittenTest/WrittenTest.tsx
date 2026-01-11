import React, { useState, useEffect } from 'react';
import Navbar from '../home/navbar';
import Footer from '../home/footer';
import { 
  Clock, CheckCircle, ChevronRight, FileText, 
  Download, Timer, ArrowRight, Award, CheckCircle2 
} from 'lucide-react';

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

type Step = 'FORM' | 'READY' | 'EXAM' | 'RESULT';

const WrittenTest: React.FC = () => {
  const [step, setStep] = useState<Step>('FORM');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [answer, setAnswer] = useState('');
  
  // --- Timer State ---
  const [localTime, setLocalTime] = useState<number>(0);

  const [form, setForm] = useState({
    jobTitle: '',
    experienceYears: '',
    skills: '',
    jobDescription: '', // User can now input JD
    durationMinutes: '20', // User can now set time
  });

  /* ------------------ API HOOKS ------------------ */
  const [initSession, { isLoading: initLoading }] = useInitSessionMutation();
  const [startSession, { isLoading: startLoading }] = useStartSessionMutation();
  const [submitAnswer, { isLoading: submitting }] = useSubmitAnswerMutation();

  const { data: currentQuestion, refetch: refetchQuestion } = useGetCurrentQuery(sessionId!, {
    skip: step !== 'EXAM' || !sessionId,
  });

  // Sync with server every 10 seconds for accuracy
  const { data: serverTimeData } = useGetTimeLeftQuery(sessionId!, {
    skip: step !== 'EXAM' || !sessionId,
    pollingInterval: 10000, 
  });

  const { data: result } = useGetResultQuery(
    sessionId!,
    { skip: step !== 'RESULT' || !sessionId }
  );

  const [triggerDownload, { isLoading: pdfLoading }] = useLazyGetPdfDownloadQuery();

  /* ------------------ TIMER LOGIC ------------------ */
  
  // 1. Initialize local timer when exam starts
  useEffect(() => {
    if (step === 'EXAM' && localTime === 0) {
      setLocalTime(Number(form.durationMinutes) * 60);
    }
  }, [step]);

  // 2. Sync local clock if server time drifts
  useEffect(() => {
    if (serverTimeData?.remainingSeconds !== undefined) {
      setLocalTime(serverTimeData.remainingSeconds);
    }
  }, [serverTimeData]);

  // 3. The 1-second interval ticker
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>; // Fixed the NodeJS error
    
    if (step === 'EXAM' && localTime > 0) {
      interval = setInterval(() => {
        setLocalTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (step === 'EXAM' && localTime === 0) {
      // Logic for when time runs out (optional: auto-submit)
      console.log("Time is up!");
    }

    return () => clearInterval(interval);
  }, [step, localTime]);

  /* ------------------ HANDLERS ------------------ */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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

  const handleStartExam = async () => {
    if (!sessionId) return;
    await startSession(sessionId).unwrap();
    setStep('EXAM');
  };

  const handleSubmitAnswer = async () => {
    if (!sessionId || !answer.trim()) return;
    try {
      const res = await submitAnswer({ sessionId, answer }).unwrap();
      setAnswer('');
      if (res.status === 'completed') {
        setStep('RESULT');
      } else {
        refetchQuestion(); 
      }
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  const handleDownloadPdf = async () => {
    if (!sessionId) return;
    try {
      const pdfBlob = await triggerDownload(sessionId).unwrap();
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Report_${form.jobTitle || 'Assessment'}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Could not generate PDF.');
    }
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-900">
      <Navbar />

      {/* STICKY TIMER HEADER */}
      {step === 'EXAM' && (
        <div className="sticky top-[64px] z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200">
          <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-6">
               <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Progress</span>
                  <span className="text-sm font-bold">{(currentQuestion?.index ?? 0) + 1} / {currentQuestion?.total ?? 5}</span>
               </div>
               <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden border">
                  <div 
                    className="h-full bg-indigo-600 transition-all duration-500" 
                    style={{ width: `${(((currentQuestion?.index ?? 0) + 1) / (currentQuestion?.total ?? 5)) * 100}%` }}
                  />
               </div>
            </div>

            <div className={`flex items-center gap-3 px-6 py-2 rounded-2xl border-2 transition-colors ${
              localTime < 60 ? 'bg-red-50 border-red-200 text-red-600 animate-pulse' : 'bg-slate-900 border-slate-800 text-white'
            }`}>
              <Timer size={18} />
              <span className="font-mono text-xl font-bold">{formatTime(localTime)}</span>
            </div>
          </div>
        </div>
      )}

      <main className="flex-grow py-12 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* STEP 1: CONFIGURATION FORM */}
          {step === 'FORM' && (
            <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
              <div className="p-10 bg-slate-900 text-white">
                <h1 className="text-3xl font-black">Configure Test</h1>
                <p className="text-slate-400 mt-2">Set your parameters for the AI evaluation.</p>
              </div>
              <div className="p-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Target Job Title</label>
                    <input name="jobTitle" value={form.jobTitle} onChange={handleChange} className="w-full px-5 py-3 rounded-xl bg-slate-50 border outline-none focus:border-indigo-500" placeholder="Software Architect" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Duration (Minutes)</label>
                    <input name="durationMinutes" type="number" value={form.durationMinutes} onChange={handleChange} className="w-full px-5 py-3 rounded-xl bg-slate-50 border outline-none focus:border-indigo-500" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Job Description (JD)</label>
                  <textarea name="jobDescription" value={form.jobDescription} onChange={handleChange} rows={4} className="w-full px-5 py-3 rounded-xl bg-slate-50 border outline-none focus:border-indigo-500" placeholder="Paste the full job requirements here..." />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Key Skills (Comma separated)</label>
                  <input name="skills" value={form.skills} onChange={handleChange} className="w-full px-5 py-3 rounded-xl bg-slate-50 border outline-none focus:border-indigo-500" placeholder="Node.js, AWS, React" />
                </div>

                <button onClick={handleInit} disabled={initLoading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all">
                  {initLoading ? 'Generating Questions...' : 'Initialize Assessment'}
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: READY SCREEN */}
          {step === 'READY' && (
            <div className="bg-white p-12 rounded-[2.5rem] shadow-xl text-center border">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-3xl font-black text-slate-900">Environment Ready</h2>
              <p className="text-slate-500 mt-3 mb-8">You have {form.durationMinutes} minutes for this assessment.</p>
              <button onClick={handleStartExam} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 hover:bg-black transition-all">
                {startLoading ? 'Loading...' : 'Start Assessment'} <ArrowRight size={20} />
              </button>
            </div>
          )}

          {/* STEP 3: EXAM INTERFACE */}
          {step === 'EXAM' && currentQuestion && (
            <div className="space-y-6">
              <div className="bg-white rounded-[2rem] shadow-xl p-10 border">
                <h2 className="text-2xl font-bold text-slate-800 mb-8">{currentQuestion?.question}</h2>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full p-8 bg-slate-50 rounded-2xl border-2 border-slate-100 focus:border-indigo-500 outline-none text-lg min-h-[350px] transition-all"
                  placeholder="Type your technical response here..."
                />
                <div className="mt-8 flex justify-end">
                  <button onClick={handleSubmitAnswer} disabled={submitting || !answer.trim()} className="bg-indigo-600 text-white px-10 py-4 rounded-xl font-bold flex items-center gap-3 disabled:opacity-50 transition-all">
                    {submitting ? 'Submitting...' : 'Next Question'} <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: RESULTS */}
          {step === 'RESULT' && (
            <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border">
              <div className="bg-indigo-600 p-10 text-white text-center">
                <Award className="mx-auto mb-4" size={48} />
                <h2 className="text-4xl font-black">Assessment Complete</h2>
                <div className="mt-6 inline-block bg-white/20 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/30">
                  <span className="text-5xl font-black">{result?.totalScore ?? 0}%</span>
                  <p className="text-xs uppercase font-bold mt-1">Final Score</p>
                </div>
              </div>
              
              <div className="p-10 flex justify-between items-center border-b">
                 <h3 className="text-xl font-bold">Performance Breakdown</h3>
                 <button onClick={handleDownloadPdf} className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg font-bold text-sm">
                   <Download size={16} /> {pdfLoading ? 'Generating...' : 'Download PDF'}
                 </button>
              </div>

              <div className="p-10 space-y-8">
                {result?.questions.map((q, i) => (
                  <div key={i} className="bg-slate-50 p-6 rounded-2xl border">
                    <p className="font-bold text-lg text-slate-800 mb-4">{i + 1}. {q.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="bg-white p-4 rounded-xl border text-sm italic">"{q.userAnswer}"</div>
                       <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 text-emerald-800 text-sm">{q.feedback}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WrittenTest;