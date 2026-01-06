import { useState, useEffect, useRef } from "react";
import {
  Clock,
  AlertCircle,
  CheckCircle,
  FileText,
  Briefcase,
  Award,
  Download,
  Play,
  Send,
  User,
  Timer,
  AlertTriangle,
  ChevronRight
} from "lucide-react";


import {
  useInitSessionMutation,
  useStartSessionMutation,
  useGetCurrentQuery,
  useSubmitAnswerMutation,
  useGetResultQuery,
  useGetTimeLeftQuery,
  useLazyDownloadPdfQuery
} from "../redux/features/writtenTestApi";

const formatTime = (seconds) => {
  if (seconds === null || seconds === undefined || seconds < 0) return "00:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
};

const WrittenTest = () => {
  // State
  const [sessionId, setSessionId] = useState(null);
  const [answer, setAnswer] = useState("");
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [formError, setFormError] = useState("");
  
  // Local timer state for smooth UI updates
  const [localRemaining, setLocalRemaining] = useState(null);
  const timerIntervalRef = useRef(null);

  const [formData, setFormData] = useState({
    jobTitle: "",
    experienceYears: "",
    skills: "",
    jobDescription: "",
    durationMinutes: "",
  });

  // API Hooks
  const [initSession, { isLoading: isInitLoading }] = useInitSessionMutation();
  const [startSession, { isLoading: isStartLoading }] = useStartSessionMutation();
  const [submitAnswer, { isLoading: isSubmitting }] = useSubmitAnswerMutation();
  const [triggerDownload, { isLoading: isDownloadingPdf, error: downloadError }] = useLazyDownloadPdfQuery();

  const { data: currentQ, isFetching: isQuestionLoading } = useGetCurrentQuery(sessionId, {
    skip: !sessionId || !isTestStarted || showResult,
    pollingInterval: 5000,
  });

  const { data: serverTimeLeft } = useGetTimeLeftQuery(sessionId, {
    skip: !sessionId || !isTestStarted || showResult,
    pollingInterval: 30000,
  });

  const { 
    data: result, 
    isLoading: isResultLoading, 
    isError: isResultError, 
    error: resultError 
  } = useGetResultQuery(sessionId, {
    skip: !sessionId || !showResult,
  });

  // Timer Logic
  useEffect(() => {
    if (serverTimeLeft?.remaining !== undefined) {
      setLocalRemaining(serverTimeLeft.remaining);
    }
  }, [serverTimeLeft]);

  useEffect(() => {
    if (isTestStarted && !showResult && sessionId) {
      timerIntervalRef.current = setInterval(() => {
        setLocalRemaining((prev) => {
          if (prev === null) return null;
          if (prev <= 0) {
            clearInterval(timerIntervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isTestStarted, showResult, sessionId]);

  useEffect(() => {
    if (localRemaining === 0 && isTestStarted && !showResult) {
      handleTimeExpired();
    }
  }, [localRemaining, isTestStarted, showResult]);

  const handleTimeExpired = async () => {
    if (answer.trim()) {
       try {
         await submitAnswer({ sessionId, answer }).unwrap();
       } catch (e) { console.error("Auto-submit failed", e); }
    }
    setShowResult(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError("");
  };

  const handleInit = async () => {
    const { jobTitle, experienceYears, skills, jobDescription, durationMinutes } = formData;
    if (!jobTitle || !experienceYears || !skills || !jobDescription || !durationMinutes) {
      setFormError("All fields are required.");
      return;
    }
    
    try {
      const res = await initSession({
        jobTitle,
        experienceYears: Number(experienceYears),
        skills: skills.split(",").map((skill) => skill.trim()),
        jobDescription,
        durationMinutes: Number(durationMinutes),
      }).unwrap();
      
      const sId = res?.sessionId || res?.data?.sessionId; 
      setSessionId(sId);
    } catch (error) {
      console.error("Failed to initialize session:", error);
      setFormError("Failed to initialize session. Please try again.");
    }
  };

  const handleStart = async () => {
    try {
      await startSession(sessionId).unwrap();
      setIsTestStarted(true);
      setLocalRemaining(Number(formData.durationMinutes) * 60); 
    } catch (error) {
      console.error("Failed to start session:", error);
      setFormError("Failed to start session. Please try again.");
    }
  };

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) return;
    try {
      const res = await submitAnswer({ sessionId, answer }).unwrap();
      setAnswer("");
      if (res.nextIndex >= res.total || res.data?.nextIndex >= res.data?.total) {
        setShowResult(true);
      }
    } catch (error) {
      console.error("Failed to submit answer:", error);
      setFormError("Failed to submit answer. Please try again.");
    }
  };

  const handleDownloadPDF = async () => {
    try {
      setFormError("");
      console.log("Starting PDF download for session:", sessionId);

      // Method 1: Direct fetch approach (most reliable)
      const response = await fetch(`/api/sessions/${sessionId}/download-pdf`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // if needed
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check if response is actually a PDF
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/pdf')) {
        throw new Error('Server did not return a PDF file');
      }

      const blob = await response.blob();
      
      if (blob.size === 0) {
        throw new Error('PDF file is empty');
      }

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Assessment_Report_${sessionId || 'Candidate'}.pdf`;
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);

    } catch (error) {
      console.error("PDF Download Error:", error);
      let errorMessage = "Failed to download PDF. ";
      
      if (error.message.includes('404')) {
        errorMessage += "PDF not found. Please ensure the assessment is complete.";
      } else if (error.message.includes('401') || error.message.includes('403')) {
        errorMessage += "You are not authorized to download this PDF.";
      } else if (error.message.includes('500')) {
        errorMessage += "Server error. Please try again later.";
      } else {
        errorMessage += error.message || "Please ensure the assessment is complete and try again.";
      }
      
      setFormError(errorMessage);
    }
  };

  // Alternative method using your RTK Query hook
  const handleDownloadPDFWithRTK = async () => {
    try {
      setFormError("");
      
      // Using the RTK Query hook
      const result = await triggerDownload(sessionId);
      
      if (result.error) {
        throw result.error;
      }

      // Check if we have data
      if (!result.data) {
        throw new Error("No PDF data received from server");
      }

      // Create blob - handle different response formats
      let blob;
      if (result.data instanceof Blob) {
        blob = result.data;
      } else if (typeof result.data === 'string') {
        // If it's a base64 string
        const binaryString = atob(result.data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        blob = new Blob([bytes], { type: 'application/pdf' });
      } else {
        // If it's an array buffer or other format
        blob = new Blob([result.data], { type: 'application/pdf' });
      }

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Assessment_Report_${sessionId || 'Candidate'}.pdf`;
      
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);

    } catch (error) {
      console.error("PDF Download Error:", error);
      setFormError(
        error?.data?.message || 
        error?.message || 
        "Failed to download PDF. Please ensure the assessment is complete and try again."
      );
    }
  };

  const preventCheating = (e) => e.preventDefault();

  const getTimerColor = (seconds) => {
    if (seconds < 60) return "text-red-600 bg-red-50 border-red-200 animate-pulse";
    if (seconds < 300) return "text-orange-600 bg-orange-50 border-orange-200";
    return "text-indigo-600 bg-indigo-50 border-indigo-200";
  };

  // Render Sections

  const renderResult = () => {
    if (isResultLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-100 border-t-indigo-600 mb-4"></div>
          <p className="text-gray-600 font-medium">Calculating comprehensive analysis...</p>
        </div>
      );
    }

    if (isResultError) {
      return (
        <div className="text-center py-16 bg-red-50 rounded-xl border border-red-100">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-red-800">Something went wrong</h3>
          <p className="text-red-600">{resultError?.message || "Error retrieving results"}</p>
        </div>
      );
    }

    if (result) {
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6 shadow-sm ring-4 ring-green-50">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Assessment Completed</h2>
            <p className="text-gray-500">Here is the summary of your performance</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm mb-8">
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-8 py-6 border-b border-indigo-100 flex flex-col md:flex-row justify-between items-center gap-4">
               <div className="flex items-center gap-3">
                 <div className="p-2 bg-white rounded-lg shadow-sm">
                   <Briefcase className="w-5 h-5 text-indigo-600"/>
                 </div>
                 <div>
                   <p className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">Position</p>
                   <h3 className="font-bold text-indigo-900 text-lg">{result.jobTitle}</h3>
                 </div>
               </div>
               <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-indigo-100 shadow-sm">
                 <Award className="w-6 h-6 text-yellow-500" />
                 <div className="text-right">
                    <p className="text-xs text-gray-400 font-semibold uppercase">Total Score</p>
                    <span className="text-indigo-900 font-bold text-xl">{result.totalScore}</span>
                 </div>
               </div>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <User className="w-6 h-6 text-gray-400 mt-1" />
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold">Experience Level</p>
                    <p className="font-semibold text-gray-800 text-lg">{result.experienceYears} Years</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <Timer className="w-6 h-6 text-gray-400 mt-1" />
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold">Total Duration</p>
                    <p className="font-semibold text-gray-800 text-lg">{result.durationMinutes} Minutes</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                 <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <Award className="w-6 h-6 text-gray-400 mt-1" />
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold">Skills Evaluated</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {result.skills.map((skill, idx) => (
                        <span key={idx} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium border border-indigo-100">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-span-1 md:col-span-2 pt-6 border-t border-gray-100">
                 <div className="flex items-start gap-4">
                  <FileText className="w-6 h-6 text-gray-400 mt-1" />
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold">Job Description</p>
                    <p className="text-gray-600 text-sm mt-2 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-100">
                      {result.jobDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Download Button - Try both methods */}
          <div className="space-y-4">
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloadingPdf}
              className="w-full md:w-auto md:min-w-[300px] mx-auto flex items-center justify-center gap-3 py-4 px-8  font-bold rounded-xl  active:scale-[0.98] transition-all disabled:opacity-60 shadow-xl shadow-indigo-600/10"
            >
              {isDownloadingPdf ? (
                <>
                 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                 Generating Report...
                </>
              ) : (
                <>
                  
                </>
              )}
            </button>

            <button
              onClick={handleDownloadPDFWithRTK}
              disabled={isDownloadingPdf}
              className="w-full md:w-auto md:min-w-[300px] mx-auto flex items-center justify-center gap-3 py-4 px-8 bg-gray-600 text-white font-bold rounded-xl hover:bg-gray-700 active:scale-[0.98] transition-all disabled:opacity-60 shadow-xl shadow-gray-600/10"
            >
              <Download className="w-5 h-5" />  Download Report
            </button>
          </div>

          {downloadError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">Download Error: {downloadError.message}</p>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  // ... (rest of your render methods remain the same - renderTest, renderStartScreen, renderInitForm)

  const renderTest = () => (
    <div className="animate-in slide-in-from-right-8 duration-700">
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md py-4 border-b border-gray-200 mb-8 -mx-6 px-6 md:-mx-10 md:px-10 flex flex-col sm:flex-row justify-between items-center shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
             <FileText className="w-5 h-5" />
          </div>
          Assessment In Progress
        </h2>
        
        {localRemaining !== null && (
          <div className={`mt-3 sm:mt-0 flex items-center gap-3 px-5 py-2.5 rounded-full font-mono font-bold text-xl shadow-sm border transition-all duration-300 ${getTimerColor(localRemaining)}`}>
            <Clock className={`w-5 h-5 ${localRemaining < 60 ? 'animate-bounce' : ''}`} />
            <span className="tabular-nums tracking-wider">
              {formatTime(localRemaining)}
            </span>
          </div>
        )}
      </div>

      {isQuestionLoading ? (
         <div className="flex flex-col items-center justify-center py-24 space-y-6">
            <div className="w-full max-w-2xl space-y-4">
              <div className="h-4 bg-gray-100 rounded-full animate-pulse w-3/4"></div>
              <div className="h-4 bg-gray-100 rounded-full animate-pulse w-full"></div>
              <div className="h-4 bg-gray-100 rounded-full animate-pulse w-5/6"></div>
            </div>
            <p className="text-gray-400 font-medium animate-pulse">Loading next question...</p>
         </div>
      ) : currentQ ? (
        <div className="bg-white rounded-xl" onCopy={preventCheating} onCut={preventCheating}>
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Question</h3>
            <p className="text-xl md:text-2xl text-gray-800 font-medium leading-relaxed select-none">
              {currentQ.question}
            </p>
          </div>

          <div className="relative group">
            <div className="absolute -top-3 left-3 bg-white px-2 text-xs font-semibold text-indigo-600">Your Answer</div>
            <textarea
              className="w-full min-h-[300px] p-6 border-2 border-gray-200 rounded-2xl focus:ring-0 focus:border-indigo-500 transition-all resize-y text-gray-700 bg-white text-lg leading-relaxed placeholder:text-gray-300 shadow-inner"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onPaste={preventCheating}
              placeholder="Type your detailed answer here..."
              spellCheck="false"
            />
            <div className="absolute bottom-4 right-4 text-xs font-medium text-gray-400 pointer-events-none bg-white/80 px-2 py-1 rounded">
              {answer.length} characters
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSubmitAnswer}
              disabled={isSubmitting || !answer.trim()}
              className="w-full md:w-auto px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                  Submitting...
                </>
              ) : (
                <>
                  Submit Answer <Send className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
          
          <div className="mt-6 flex items-center justify-center gap-2 text-amber-600 bg-amber-50 py-2 rounded-lg text-sm">
             <AlertTriangle className="w-4 h-4" />
             <span>Warning: Leaving this tab may terminate your session.</span>
          </div>
        </div>
      ) : null}
    </div>
  );

  const renderStartScreen = () => (
    <div className="text-center py-16 animate-in zoom-in-95 duration-500">
      <div className="relative inline-block mb-8">
         <div className="absolute inset-0 bg-indigo-200 rounded-full animate-ping opacity-25"></div>
         <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center relative z-10">
            <Play className="w-12 h-12 text-indigo-600 ml-1.5" />
         </div>
      </div>
      
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Begin?</h2>
      <p className="text-gray-600 mb-10 max-w-md mx-auto leading-relaxed">
        Your session is initialized. The timer will start immediately after you click the button below. 
        <br/><span className="font-semibold text-indigo-600">Good luck!</span>
      </p>
      
      <button
        onClick={handleStart}
        disabled={isStartLoading}
        className="w-full max-w-sm mx-auto py-4 bg-indigo-600 text-white font-bold text-lg rounded-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/30 active:scale-[0.98] flex items-center justify-center gap-2"
      >
        {isStartLoading ? (
            "Starting Session..."
        ) : (
            <>Start Assessment <ChevronRight className="w-5 h-5" /></>
        )}
      </button>
    </div>
  );

  const renderInitForm = () => (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-900">Candidate Information</h2>
        <p className="text-gray-500 mt-2">Please provide details to configure your assessment</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Job Title</label>
            <div className="relative">
              <Briefcase className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                placeholder="e.g. Program Manager"
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-gray-700"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Experience (Years)</label>
             <div className="relative">
              <User className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="number"
                name="experienceYears"
                value={formData.experienceYears}
                onChange={handleInputChange}
                placeholder="e.g. 5"
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-gray-700"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Skills</label>
          <div className="relative">
            <Award className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              placeholder="e.g. Reporting, Team Management, Budgeting"
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-gray-700"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Job Description</label>
          <div className="relative">
             <FileText className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
            <textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleInputChange}
              placeholder="Paste the job description here..."
              rows="4"
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all resize-none font-medium text-gray-700"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Duration (Minutes)</label>
          <div className="relative">
            <Clock className="absolute left-3.5 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="number"
              name="durationMinutes"
              value={formData.durationMinutes}
              onChange={handleInputChange}
              placeholder="e.g. 45"
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-medium text-gray-700"
            />
          </div>
        </div>

        <div className="pt-4">
            <button
            onClick={handleInit}
            disabled={isInitLoading}
            className="w-full py-4 bg-gray-900 text-white font-bold text-lg rounded-xl hover:bg-black transition-all disabled:opacity-70 shadow-xl shadow-gray-900/10 active:scale-[0.98] flex justify-center items-center gap-2"
            >
            {isInitLoading ? (
              <>
               <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
               Initializing...
              </>
            ) : "Initialize Exam"}
            </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen mt-16 bg-slate-50 flex items-center justify-center p-4 md:p-6 font-sans antialiased text-slate-800">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
        
        {!isTestStarted && !showResult && (
           <div className="bg-gray-900 p-8 text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
             <div className="relative z-10">
                <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">Written Assessment</h1>
                <p className="text-indigo-200 font-medium">Professional Skill Evaluation Platform</p>
             </div>
          </div>
        )}

        <div className="p-6 md:p-10 min-h-[500px] flex flex-col justify-center">
          {formError && (
            <div className="mb-8 bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-xl flex items-center gap-3 animate-in shake">
              <AlertCircle className="w-6 h-6 flex-shrink-0" />
              <p className="font-medium">{formError}</p>
            </div>
          )}

          {showResult 
            ? renderResult() 
            : isTestStarted 
              ? renderTest() 
              : sessionId 
                ? renderStartScreen() 
                : renderInitForm()
          }
        </div>
        
        {!showResult && (
           <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
             <div className="flex items-center justify-center gap-2 text-xs text-gray-400 font-medium">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                Secure Assessment Environment • v2.4
             </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default WrittenTest;