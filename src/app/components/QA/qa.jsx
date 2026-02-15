import { useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import { GlobalWorkerOptions } from "pdfjs-dist";

// Set up the PDF.js worker with latest version
GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.5.136/pdf.worker.min.js";

const baseUrl = "https://api.crosscareers.com";

const InterviewQuestionsGenerator = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("Mid-Level");
  const [techCount, setTechCount] = useState(7);
  const [sitCount, setSitCount] = useState(3);
  const [hasGeneratedQuestions, setHasGeneratedQuestions] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});

  // PDF text extraction
  const extractTextFromPDF = async (file) => {
    try {
      if (!file || file.type !== "application/pdf") {
        throw new Error("Please upload a valid PDF file");
      }
      if (file.size > 10 * 1024 * 1024) {
        throw new Error("PDF file too large (max 10MB)");
      }

      // Use the extract-text API for PDF files
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `${baseUrl}/api/v1/interview/extract-text`,
        formData,
        {
          timeout: 60000,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data?.text) {
        return response.data.text;
      } else {
        throw new Error("No text extracted from PDF");
      }
    } catch (error) {
      console.error("PDF Extraction Error:", error);
      throw new Error(`PDF extraction failed: ${error.message}`);
    }
  };

  // DOCX text extraction
  const extractTextFromDOCX = async (file) => {
    try {
      if (
        !file ||
        file.type !==
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        throw new Error("Please upload a valid DOCX file");
      }

      // Use the extract-text API for DOCX files
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `${baseUrl}/api/v1/interview/extract-text`,
        formData,
        {
          timeout: 60000,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data?.text) {
        return response.data.text;
      } else {
        throw new Error("No text extracted from DOCX");
      }
    } catch (error) {
      console.error("DOCX Extraction Error:", error);
      throw new Error(`DOCX extraction failed: ${error.message}`);
    }
  };

  // Handle file input
  const handleFileInput = async (file) => {
    try {
      let text = "";
      if (file.type === "application/pdf") {
        text = await extractTextFromPDF(file);
      } else if (
        file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        text = await extractTextFromDOCX(file);
      } else if (file.type === "text/plain") {
        text = await file.text();
      } else {
        throw new Error(
          "Unsupported file type. Please upload PDF, DOCX, or TXT",
        );
      }
      setJobDescription(text);
      setError("");
      setSuccess("File uploaded and text extracted successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("File Processing Error:", error);
      setError(error.message);
    }
  };

  const handleJobDescriptionInput = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFileInput(file);
    } else {
      setJobDescription(e.target.value);
      setError("");
    }
  };

  const generateQuestions = async () => {
    if (!jobDescription.trim()) {
      setError("Please provide a job description.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    setHasGeneratedQuestions(false);
    setAnalysisResults(null);
    setUserAnswers({});

    try {
      const promptText = `Generate ${techCount} technical questions and ${sitCount} situational questions for the ${experienceLevel} ${jobTitle || "Software Engineer"} position based on the following job description:\n${jobDescription}`;

      const response = await axios.post(
        `${baseUrl}/api/v1/interview/generate-questions`,
        { text: promptText },
        {
          timeout: 60000,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data?.questions) {
        // Transform the API response to our format
        const formattedQuestions = response.data.questions.map((q) => ({
          id: Math.random().toString(36).substr(2, 9),
          type: q.type,
          question: q.question,
          answer: q.answer,
          feedback: "",
          score: 0,
        }));

        setQuestions(formattedQuestions);
        setHasGeneratedQuestions(true);
        setSuccess("Interview questions generated successfully!");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        throw new Error("No questions received from server");
      }
    } catch (error) {
      console.error("API Error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to generate questions. Please check your input and try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, value) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const analyzeAnswers = async () => {
    const answeredQuestions = questions.filter((q) =>
      userAnswers[q.id]?.trim(),
    );

    if (!answeredQuestions.length) {
      setError("Please provide at least one answer to analyze.");
      return;
    }

    const answersPayload = answeredQuestions.map((q) => ({
      question: q.question,
      answer: userAnswers[q.id],
    }));

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `${baseUrl}/api/v1/interview/analyze-answers`,
        { answers: answersPayload },
        {
          timeout: 60000,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data?.analyses) {
        // Update questions with feedback and scores
        const updatedQuestions = questions.map((q) => {
          const analysis = response.data.analyses.find(
            (a) => a.question === q.question,
          );
          if (analysis) {
            return {
              ...q,
              feedback: analysis.feedback || "No feedback provided",
              score: analysis.score || 0,
            };
          }
          return q;
        });

        setQuestions(updatedQuestions);

        // Calculate overall score
        const scoredQuestions = updatedQuestions.filter((q) => q.score > 0);
        const totalScore = scoredQuestions.reduce((sum, q) => sum + q.score, 0);
        const averageScore =
          scoredQuestions.length > 0 ? totalScore / scoredQuestions.length : 0;

        setAnalysisResults({
          totalAnswered: answeredQuestions.length,
          totalQuestions: questions.length,
          averageScore: Math.round(averageScore * 10) / 10,
          maxScore: 10,
        });

        setSuccess("Answers analyzed successfully!");
        setTimeout(() => setSuccess(""), 3000);
      } else {
        throw new Error("No analysis received from server");
      }
    } catch (error) {
      console.error("Analysis API Error:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to analyze answers.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Download questions as PDF
  const downloadPdf = () => {
    if (!questions.length) {
      setError("No questions to download.");
      return;
    }

    try {
      const doc = new jsPDF();
      doc.setFont("helvetica", "normal");

      // Add title
      doc.setFontSize(18);
      doc.setTextColor(0, 0, 128);
      doc.text(
        `Interview Questions for ${jobTitle || "the Position"}`,
        105,
        20,
        { align: "center" },
      );

      // Add experience level
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`Experience Level: ${experienceLevel}`, 105, 30, {
        align: "center",
      });

      let yPosition = 45;

      // Add technical questions section
      const technicalQuestions = questions.filter(
        (q) => q.type === "technical" || q.type === "tech",
      );
      if (technicalQuestions.length) {
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 128);
        doc.text("Technical Questions", 20, yPosition);
        yPosition += 10;

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        technicalQuestions.forEach((q, i) => {
          if (yPosition > doc.internal.pageSize.getHeight() - 30) {
            doc.addPage();
            yPosition = 20;
          }

          const questionLines = doc.splitTextToSize(
            `${i + 1}. ${q.question}`,
            170,
          );
          doc.text(questionLines, 20, yPosition);
          yPosition += questionLines.length * 7 + 5;

          if (userAnswers[q.id]) {
            const answerLines = doc.splitTextToSize(
              `Answer: ${userAnswers[q.id]}`,
              170,
            );
            doc.text(answerLines, 25, yPosition);
            yPosition += answerLines.length * 7 + 5;
          }

          if (q.feedback) {
            const feedbackLines = doc.splitTextToSize(
              `Feedback: ${q.feedback}`,
              170,
            );
            doc.text(feedbackLines, 25, yPosition);
            yPosition += feedbackLines.length * 7 + 5;
          }

          if (q.score > 0) {
            doc.setTextColor(0, 100, 0);
            doc.text(`Score: ${q.score}/10`, 25, yPosition);
            doc.setTextColor(0, 0, 0);
            yPosition += 10;
          } else {
            yPosition += 5;
          }
        });
      }

      // Add situational questions section
      const situationalQuestions = questions.filter(
        (q) => q.type === "situational" || q.type === "scenario",
      );
      if (situationalQuestions.length) {
        if (yPosition > doc.internal.pageSize.getHeight() - 40) {
          doc.addPage();
          yPosition = 20;
        }

        doc.setFontSize(14);
        doc.setTextColor(0, 0, 128);
        doc.text("Situational Questions", 20, yPosition);
        yPosition += 10;

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        situationalQuestions.forEach((q, i) => {
          if (yPosition > doc.internal.pageSize.getHeight() - 30) {
            doc.addPage();
            yPosition = 20;
          }

          const questionLines = doc.splitTextToSize(
            `${i + 1}. ${q.question}`,
            170,
          );
          doc.text(questionLines, 20, yPosition);
          yPosition += questionLines.length * 7 + 5;

          if (userAnswers[q.id]) {
            const answerLines = doc.splitTextToSize(
              `Answer: ${userAnswers[q.id]}`,
              170,
            );
            doc.text(answerLines, 25, yPosition);
            yPosition += answerLines.length * 7 + 5;
          }

          if (q.feedback) {
            const feedbackLines = doc.splitTextToSize(
              `Feedback: ${q.feedback}`,
              170,
            );
            doc.text(feedbackLines, 25, yPosition);
            yPosition += feedbackLines.length * 7 + 5;
          }

          if (q.score > 0) {
            doc.setTextColor(0, 100, 0);
            doc.text(`Score: ${q.score}/10`, 25, yPosition);
            doc.setTextColor(0, 0, 0);
            yPosition += 10;
          } else {
            yPosition += 5;
          }
        });
      }

      // Add summary if analysis was done
      if (analysisResults) {
        if (yPosition > doc.internal.pageSize.getHeight() - 40) {
          doc.addPage();
          yPosition = 20;
        }

        doc.setFontSize(14);
        doc.setTextColor(0, 0, 128);
        doc.text("Performance Summary", 105, yPosition, { align: "center" });
        yPosition += 15;

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(
          `Answered Questions: ${analysisResults.totalAnswered}/${analysisResults.totalQuestions}`,
          20,
          yPosition,
        );
        yPosition += 10;
        doc.text(
          `Average Score: ${analysisResults.averageScore}/${analysisResults.maxScore}`,
          20,
          yPosition,
        );
      }

      const fileName = `Interview_Questions_${(jobTitle || "Position").replace(/\s+/g, "_")}.pdf`;
      doc.save(fileName);
      setSuccess("PDF downloaded successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("PDF Generation Error:", error);
      setError("Failed to generate PDF file");
    }
  };

  // Group questions by type
  const technicalQuestions = questions.filter(
    (q) => q.type === "technical" || q.type === "tech",
  );
  const situationalQuestions = questions.filter(
    (q) => q.type === "situational" || q.type === "scenario",
  );

  return (
    <div className="p-8 mt-20 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Professional Interview Questions Generator
        </h1>

        <div className="card bg-white mb-10 transition-all duration-300">
          <div className="border-[1px] p-6">
            <h2 className="card-title text-xl font-semibold text-gray-700 mb-6">
              Job Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Job Title (Optional)
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                  placeholder="e.g. Senior Software Engineer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Experience Level
                </label>
                <select
                  className="select select-bordered w-full bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                >
                  <option value="Entry-Level">Entry-Level</option>
                  <option value="Mid-Level">Mid-Level</option>
                  <option value="Senior-Level">Senior-Level</option>
                  <option value="Executive">Executive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Technical Questions Count
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                  value={techCount}
                  onChange={(e) =>
                    setTechCount(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Situational Questions Count
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                  value={sitCount}
                  onChange={(e) =>
                    setSitCount(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  min="1"
                />
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Job Description
            </h3>
            <textarea
              className=" w-full h-48 p-4 border-[1px] bg-white border-gray-200 rounded-lg   transition-all"
              placeholder="Paste job description here or upload a file..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Upload File (PDF, DOCX, TXT)
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-600"
                onChange={handleJobDescriptionInput}
                accept=".pdf,.docx,.txt"
              />
            </div>
          </div>
        </div>

        {/* Success and Error Messages */}
        {success && (
          <div className="alert alert-success shadow-lg mb-6 animate-fade-in">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="ml-2">{success}</span>
            </div>
          </div>
        )}
        {error && (
          <div className="alert alert-error shadow-lg mb-6 animate-fade-in">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="ml-2">{error}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mb-10">
          <button
            className={`btn btn-primary text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 ${
              loading || !jobDescription.trim()
                ? "opacity-50 cursor-not-allowed"
                : "hover:scale-105 hover:bg-blue-700"
            }`}
            onClick={generateQuestions}
            disabled={loading || !jobDescription.trim()}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm mr-2"></span>
                Generating...
              </>
            ) : (
              "Generate Questions"
            )}
          </button>
          {hasGeneratedQuestions && (
            <button
              className={`btn btn-secondary text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-105 hover:bg-purple-700"
              }`}
              onClick={analyzeAnswers}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm mr-2"></span>
                  Analyzing...
                </>
              ) : (
                "Analyze Answers"
              )}
            </button>
          )}
        </div>

        {/* Performance Summary */}
        {analysisResults && (
          <div className="card bg-white shadow-xl rounded-lg mb-8 animate-fade-in">
            <div className="card-body p-6">
              <h2 className="card-title text-xl font-semibold text-gray-700 mb-4">
                Performance Summary
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-blue-700">
                    {analysisResults.totalAnswered}
                  </p>
                  <p className="text-gray-600">Answered Questions</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-green-700">
                    {analysisResults.averageScore}/{analysisResults.maxScore}
                  </p>
                  <p className="text-gray-600">Average Score</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold text-purple-700">
                    {Math.round(
                      (analysisResults.averageScore /
                        analysisResults.maxScore) *
                        100,
                    )}
                    %
                  </p>
                  <p className="text-gray-600">Overall Performance</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Generated Questions */}
        {hasGeneratedQuestions && questions.length > 0 && (
          <div className="card border-[1px]  mt-8 animate-fade-in">
            <div className="card-body p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="card-title text-xl font-semibold text-gray-700">
                  Generated Interview Questions
                </h2>
                <button
                  className="btn btn-accent text-white hover:bg-green-700"
                  onClick={downloadPdf}
                >
                  Download PDF
                </button>
              </div>

              {technicalQuestions.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-blue-800 mb-4">
                    Technical Questions ({technicalQuestions.length})
                  </h3>
                  <div className="space-y-6">
                    {technicalQuestions.map((q, i) => (
                      <div
                        key={q.id}
                        className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                      >
                        <p className="font-medium text-gray-800 mb-2">
                          {i + 1}. {q.question}
                        </p>
                        {/* <p className="font-medium text-gray-800 mb-2">
                        {i+1}.{q.answer}
                        </p> */}
                        <textarea
                          className="w-full h-24 p-3 border-[1px] bg-white"
                          placeholder="Type your answer here..."
                          value={q.answer || userAnswers[q.id] || ""}
                          onChange={(e) =>
                            handleAnswerChange(q.id, e.target.value)
                          }
                        />

                        {q.feedback && (
                          <div className="mt-3 p-3 bg-green-50 rounded-lg">
                            <p className="font-semibold text-green-800">
                              Feedback:
                            </p>
                            <p className="text-green-700">{q.feedback}</p>
                            {q.score > 0 && (
                              <p className="font-semibold text-green-800 mt-2">
                                Score: {q.score}/10
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {situationalQuestions.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-4">
                    Situational Questions ({situationalQuestions.length})
                  </h3>
                  <div className="space-y-6">
                    {situationalQuestions.map((q, i) => (
                      <div
                        key={q.id}
                        className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                      >
                        <p className="font-medium text-gray-800 mb-2">
                          {i + 1}. {q.question}
                        </p>
                        <textarea
                          className="bg-white w-full h-24 p-3 border-[1px] transition-all"
                          placeholder="Type your answer here..."
                          value={userAnswers[q.id] ?? q.answer ?? ""}
                          onChange={(e) =>
                            handleAnswerChange(q.id, e.target.value)
                          }
                        />

                        {q.feedback && (
                          <div className="mt-3 p-3 bg-green-50 rounded-lg">
                            <p className="font-semibold text-green-800">
                              Feedback:
                            </p>
                            <p className="text-green-700">{q.feedback}</p>
                            {q.score > 0 && (
                              <p className="font-semibold text-green-800 mt-2">
                                Score: {q.score}/10
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewQuestionsGenerator;
