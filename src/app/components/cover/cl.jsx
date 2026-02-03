// eslint-disable-next-line no-unused-vars
import { useState, useRef } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import pdfWorker from "pdfjs-dist/legacy/build/pdf.worker.min?url";
import * as mammoth from "mammoth";
import {
  FileText,
  UploadCloud,
  Download,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  UserCircle,
} from "lucide-react";

/* ---------- FORCE LOCAL PDF WORKER ---------- */
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const Cover = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [coverLetterStyle, setCoverLetterStyle] = useState("USA");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* ---------- EXTRACTION LOGIC ---------- */
  const extractTextFromPDF = async (file) => {
    const buffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((i) => i.str).join(" ") + "\n\n";
    }
    if (!text.trim()) throw new Error("Scanned PDF (no selectable text)");
    return text;
  };

  const extractTextFromDOCX = async (file) => {
    const buffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer: buffer });
    return result.value;
  };

  const handleFile = async (file, setter) => {
    try {
      setError("");
      let text = "";
      if (file.type === "application/pdf")
        text = await extractTextFromPDF(file);
      else if (file.type.includes("wordprocessingml"))
        text = await extractTextFromDOCX(file);
      else if (file.type === "text/plain") text = await file.text();
      else throw new Error("Invalid format. Use PDF, DOCX, or TXT.");

      setter(text);
      setSuccess("File uploaded and parsed!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const generateCoverLetter = async () => {
    if (!jobDescription || !resumeText) {
      setError("Both Job Description and Resume are required.");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const res = await axios.post(
        "http://localhost:4001/api/v1/cover/generate-cover-letter",
        { jobDescription, resumeText, style: coverLetterStyle },
      );
      setCoverLetter(res.data.coverLetter);
      setSuccess("Cover letter generated successfully!");
    } catch {
      setError("Generation failed. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const downloadDocx = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4001/api/v1/cover/generate-docx",
        { content: coverLetter },
        { responseType: "blob" },
      );
      saveAs(res.data, "Professional-Cover-Letter.docx");
    } catch {
      setError("Download failed.");
    }
  };

  return (
    <div className="min-h-screen mt-16 bg-slate-50 text-slate-900 font-sans pb-20">
      {/* Header Section */}
      <header className=" border-b py-10 px-6 mb-10">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            AI Cover Letter <span className="text-blue-600">Architect</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Tailor your application to any job description in seconds.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Feedback Notifications */}
        <div className="fixed top-5 right-5 z-50 flex flex-col gap-2">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-lg animate-in fade-in slide-in-from-top-4">
              <AlertCircle size={20} /> {error}
            </div>
          )}
          {success && (
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg shadow-lg animate-in fade-in slide-in-from-top-4">
              <CheckCircle2 size={20} /> {success}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Inputs */}
          <div className="space-y-6">
            {/* Job Description Card */}
            <section className="bg-white  border-[1px] p-6">
              <div className="flex items-center gap-2 mb-4 text-blue-600 font-semibold uppercase text-xs tracking-wider">
                <Briefcase size={16} /> Job Details
              </div>
              <textarea
                className="w-full h-44 p-4 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
              <label className="mt-3 flex items-center justify-center gap-2 w-full py-2 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                <UploadCloud size={18} className="text-slate-400" />
                <span className="text-sm text-slate-500 font-medium">
                  Upload Job PDF/Docx
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.docx,.txt"
                  onChange={(e) =>
                    handleFile(e.target.files[0], setJobDescription)
                  }
                />
              </label>
            </section>

            {/* Resume Card */}
            <section className="bg-white border-[1px] p-6">
              <div className="flex items-center gap-2 mb-4 text-blue-600 font-semibold uppercase text-xs tracking-wider">
                <UserCircle size={16} /> Your Background
              </div>
              <textarea
                className="w-full h-44 p-4 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
                placeholder="Paste your resume text here..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
              />
              <label className="mt-3 flex items-center justify-center gap-2 w-full py-2 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                <UploadCloud size={18} className="text-slate-400" />
                <span className="text-sm text-slate-500 font-medium">
                  Upload Resume
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.docx,.txt"
                  onChange={(e) => handleFile(e.target.files[0], setResumeText)}
                />
              </label>
            </section>

            <button
              onClick={generateCoverLetter}
              disabled={loading}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" /> Crafting your letter...
                </>
              ) : (
                "Generate Professional Cover Letter"
              )}
            </button>
          </div>

          {/* Right Column: Output */}
          <div className="lg:sticky lg:top-10 h-fit">
            {coverLetter ? (
              <div className="bg-white border-[1px] overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="p-8 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-500 uppercase">
                    Preview
                  </span>
                  <button
                    onClick={downloadDocx}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <Download size={16} /> Download .docx
                  </button>
                </div>
                <div className="p-8 max-h-[700px] overflow-y-auto">
                  <pre className="whitespace-pre-wrap font-serif text-slate-800 leading-relaxed text-sm">
                    {coverLetter}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl bg-white p-10 text-center">
                <div className="bg-slate-50 p-4 rounded-full mb-4">
                  <FileText size={48} className="text-slate-300" />
                </div>
                <h3 className="text-lg font-medium text-slate-900">
                  No Letter Generated
                </h3>
                <p className="text-slate-500 mt-2 max-w-xs">
                  Fill in your details and click generate to see your
                  professional cover letter here.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cover;
