/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllResumesQuery } from "../../../redux/features/resumeApi";
import { FiPlus, FiMoreVertical, FiFileText, FiClock, FiExternalLink } from "react-icons/fi";
import Navbar from "../home/navbar";
import Footer from "../home/footer.jsx";

const ResumeCardSkeleton = () => (
  <div className="bg-white border border-gray-200 p-4 animate-pulse">
    <div className="aspect-[1/1.4] bg-gray-50 mb-4 w-full border border-gray-100"></div>
    <div className="h-3 bg-gray-200 w-3/4 mb-2"></div>
    <div className="h-2 bg-gray-100 w-1/2"></div>
  </div>
);

const formatDate = (dateString) => {
  if (!dateString) return "Recently edited";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { data: response, isLoading, isError } = useGetAllResumesQuery();
  console.log("all resume show data", response);
  const data = response?.data;
  const resumes = data ? (Array.isArray(data) ? data : [data]) : [];

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-slate-900">
      <Navbar />

      <main className="flex-grow pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          
          {/* Header Section: Sophisticated & Clean */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-gray-100 gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                Resumes
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Select a document to edit or create a new one from a professional template.
              </p>
            </div>
            <button
              onClick={() => navigate("/editor")}
              className="inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-5 py-2 transition-all duration-200 gap-2"
            >
              <FiPlus size={18} />
              <span>New Resume</span>
            </button>
          </div>

          {/* Grid Layout: Using 1/1.4 aspect ratio (standard paper) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-10 gap-x-6">
            
            {/* Create New - Minimalist Ghost Style */}
            <div
              onClick={() => navigate("/editor")}
              className="group cursor-pointer flex flex-col"
            >
              <div className="aspect-[1/1.4] border border-dashed border-slate-300 bg-slate-50/50 flex flex-col items-center justify-center transition-all duration-300 group-hover:border-slate-900 group-hover:bg-white mb-3">
                <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center mb-2 group-hover:bg-slate-900 group-hover:text-white transition-all">
                  <FiPlus size={20} />
                </div>
                <span className="text-xs font-medium uppercase tracking-wider text-slate-500 group-hover:text-slate-900">
                  Blank Canvas
                </span>
              </div>
            </div>

            {/* Loading States */}
            {isLoading && Array(4).fill(0).map((_, i) => <ResumeCardSkeleton key={i} />)}

            {/* Resume List */}
            {!isLoading && resumes.map((resume) => {
              const name = `${resume.personalInfo?.firstName || "Untitled"} ${resume.personalInfo?.lastName || ""}`;
              const id = resume.id || resume._id;

              return (
                <div key={id} className="group flex flex-col cursor-pointer" onClick={() => navigate(`/editor/${id}`)}>
                  {/* Paper Preview */}
                  <div className="relative aspect-[1/1.4] bg-slate-50 border border-slate-200 mb-3 transition-all duration-300 group-hover:border-slate-900 overflow-hidden">
                    <div className="absolute inset-0 p-4 opacity-40">
                      {/* Decorative lines to simulate a real CV */}
                      <div className="h-1 w-1/2 bg-slate-300 mb-2" />
                      <div className="h-1 w-full bg-slate-200 mb-1" />
                      <div className="h-1 w-full bg-slate-200 mb-1" />
                      <div className="h-1 w-3/4 bg-slate-200 mb-6" />
                      <div className="h-1 w-1/4 bg-slate-300 mb-2" />
                      <div className="h-1 w-full bg-slate-200 mb-1" />
                    </div>

                    {/* Hover Action Overlay */}
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 flex items-center justify-center transition-all duration-300">
                      <div className="bg-white px-3 py-1.5 border border-slate-900 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-900">
                        Open Editor <FiExternalLink />
                      </div>
                    </div>
                  </div>

                  {/* Meta Data */}
                  <div className="flex justify-between items-start">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[13px] font-semibold text-slate-900 truncate uppercase tracking-tight group-hover:underline decoration-1 underline-offset-4">
                        {name.trim() || "Untitled Resume"}
                      </h3>
                      <div className="flex items-center text-[11px] text-slate-400 mt-0.5">
                        <FiClock className="mr-1" size={10} />
                        {formatDate(resume.updatedAt)}
                      </div>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); }}
                      className="p-1 text-slate-400 hover:text-slate-900 transition-colors"
                    >
                      <FiMoreVertical size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State Illustration */}
          {!isLoading && resumes.length === 0 && (
            <div className="text-center py-20 border border-dashed border-slate-200 mt-10">
              <FiFileText className="mx-auto text-slate-300 mb-4" size={40} />
              <p className="text-slate-500 text-sm">No resumes found. Let&apos;s build your first professional CV.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;