/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import { saveAs } from "file-saver";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf";
import pdfWorker from "pdfjs-dist/legacy/build/pdf.worker.min?url";
import * as mammoth from "mammoth";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

/* ================= PDF WORKER (LOCAL, NO CDN) ================= */
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const Match = () => {
  const [jobText, setJobText] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= PDF EXTRACTION ================= */
  const extractTextFromPDF = async (file) => {
    try {
      const buffer = await file.arrayBuffer();

      const pdf = await pdfjs.getDocument({
        data: buffer,
        disableWorker: false,
      }).promise;

      let text = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map((i) => i.str).join(" ") + "\n\n";
      }

      if (!text.trim()) {
        throw new Error("Scanned or password-protected PDF");
      }

      return text;
    } catch (err) {
      throw new Error("Failed to parse PDF. Ensure it is not protected.");
    }
  };

  /* ================= DOCX EXTRACTION ================= */
  const extractTextFromDOCX = async (file) => {
    const buffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer: buffer });
    if (!result.value.trim()) throw new Error("Empty DOCX file");
    return result.value;
  };

  /* ================= FILE HANDLER ================= */
  const handleFile = async (file, setter) => {
    try {
      setError("");
      let text = "";

      if (file.type === "application/pdf") {
        text = await extractTextFromPDF(file);
      } else if (file.type.includes("wordprocessingml")) {
        text = await extractTextFromDOCX(file);
      } else {
        text = await file.text();
      }

      setter(text);
    } catch (err) {
      setError(err.message);
    }
  };

  /* ================= AI REQUEST ================= */
  const handleSubmit = async () => {
    if (!jobText || !resumeText) {
      setError("Job description and resume are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "https://api.crosscareers.com/api/v1/ai/get-review",
        {
          prompt: `Job Description:\n${jobText}\n\nResume:\n${resumeText}`,
        },
        { timeout: 30000 }
      );

      setAnalysisResult(res.data.message);
    } catch {
      setError("Analysis service unavailable.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DOWNLOAD ================= */
  const downloadPdf = () => {
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(analysisResult, 180);
    doc.text(lines, 10, 10);
    doc.save("analysis_report.pdf");
  };

  const downloadDocx = () => {
    const blob = new Blob([analysisResult], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    saveAs(blob, "analysis_report.docx");
  };

  return (
    <div className="min-h-screen  p-8 mt-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">
          Match & Insights (Job vs Resume)
        </h1>

        {error && (
          <div className="mb-6 text-red-600 bg-red-100 p-3 rounded">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Job */}
          <div className="bg-white border-[1px] p-6">
            <h2 className="font-semibold mb-3">Job Description</h2>
            <textarea
              className="w-full h-40 border-[1px] p-3"
              value={jobText}
              onChange={(e) => setJobText(e.target.value)}
            />
            <input
              type="file"
              className="mt-3"
              accept=".pdf,.docx,.txt"
              onChange={(e) =>
                e.target.files && handleFile(e.target.files[0], setJobText)
              }
            />
          </div>

          {/* Resume */}
          <div className="bg-white border-[1px] p-6">
            <h2 className="font-semibold mb-3">Resume</h2>
            <textarea
              className="w-full h-40 border-[1px] p-3"
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            />
            <input
              type="file"
              className="mt-3"
              accept=".pdf,.docx,.txt"
              onChange={(e) =>
                e.target.files && handleFile(e.target.files[0], setResumeText)
              }
            />
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>

        {analysisResult && (
          <div className="bg-white shadow rounded p-6 mt-10">
            <h2 className="font-semibold mb-4">Analysis Result</h2>
            <div className="prose max-w-none bg-gray-50 p-4 rounded">
              <Markdown rehypePlugins={[rehypeHighlight]}>
                {analysisResult}
              </Markdown>
            </div>

            <div className="flex gap-4 justify-center mt-6">
              <button onClick={downloadPdf} className="btn btn-secondary">
                Download PDF
              </button>
              <button onClick={downloadDocx} className="btn btn-primary">
                Download DOCX
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Match;
