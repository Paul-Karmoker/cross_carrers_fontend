/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllResumesQuery } from "../../../redux/features/resumeApi";
import { useGetProfileQuery } from "../../../redux/features/authApi";
import {
  FiPlus,
  FiMoreVertical,
  FiFileText,
  FiClock,
  FiExternalLink,
} from "react-icons/fi";
import Navbar from "../home/navbar";
import Footer from "../home/footer.jsx";

/* ───────────────── Skeleton ───────────────── */
const ResumeCardSkeleton = () => (
  <div className="bg-white border border-gray-200 p-4 animate-pulse">
    <div className="aspect-[1/1.4] bg-gray-100 mb-4 w-full" />
    <div className="h-3 bg-gray-200 w-3/4 mb-2" />
    <div className="h-2 bg-gray-100 w-1/2" />
  </div>
);

/* ───────────────── Utils ───────────────── */
const formatDate = (dateString) => {
  if (!dateString) return "Recently edited";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
};

/* ───────────────── Dashboard ───────────────── */
const Dashboard = () => {
  const navigate = useNavigate();

  /* 1️⃣ Get profile */
  const { data: userData, isLoading: profileLoading } =
    useGetProfileQuery();

  const userId = userData?.user?._id;
  console.log("Ok", userId);
  /* 2️⃣ Get resumes (WAIT until userId exists) */
  const {
    data: response,
    isLoading: resumeLoading,
    isError,
  } = useGetAllResumesQuery(userId);
  console.log("all data ibrahim", response);

  /* 3️⃣ Unified loading */
  const isLoading = profileLoading || resumeLoading;

  /* 4️⃣ Safe data extraction */
  const resumes = Array.isArray(response?.data)
    ? response.data
    : response?.data
    ? [response.data]
    : [];
console.log("All resume Data here", resumes)
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900">
      <Navbar />

      <main className="flex-grow pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b gap-4">
            <div>
              <h1 className="text-2xl font-semibold">Resumes</h1>
              <p className="text-slate-500 text-sm mt-1">
                Select a document to edit or create a new one.
              </p>
            </div>

            <button
              onClick={() => navigate("/resumehome")}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 text-sm font-medium"
            >
              <FiPlus size={18} />
              New Resume
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
            {/* Create New */}
            <div
              onClick={() => navigate("/editor")}
              className="cursor-pointer group"
            >
              <div className="aspect-[1/1.4] border border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center mb-3 group-hover:border-slate-900">
                <div className="w-10 h-10 rounded-full border flex items-center justify-center mb-2 group-hover:bg-slate-900 group-hover:text-white">
                  <FiPlus />
                </div>
                <span className="text-xs uppercase tracking-wider text-slate-500">
                  Blank Canvas
                </span>
              </div>
            </div>

            {/* Loading */}
            {isLoading &&
              Array.from({ length: 4 }).map((_, i) => (
                <ResumeCardSkeleton key={i} />
              ))}

            {/* Resumes */}
            {!isLoading &&
              resumes.map((resume) => {
                const id = resume._id || resume.id;
                const name = `${resume.personalInfo?.firstName || "Untitled"} ${
                  resume.personalInfo?.lastName || ""
                }`;

                return (
                  <div
                    key={id}
                    className="group cursor-pointer"
                    onClick={() => navigate(`/resumehome/${id}`)}
                  >
                    <div className="relative aspect-[1/1.4] bg-slate-50 border mb-3 overflow-hidden group-hover:border-slate-900">
                      <div className="absolute inset-0 p-4 opacity-40">
                        <div className="h-1 w-1/2 bg-slate-300 mb-2" />
                        <div className="h-1 w-full bg-slate-200 mb-1" />
                        <div className="h-1 w-3/4 bg-slate-200 mb-6" />
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/5">
                        <div className="opacity-0 group-hover:opacity-100 bg-white border px-3 py-1 text-[11px] uppercase font-bold flex gap-2">
                          Open <FiExternalLink />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-start">
                      <div className="min-w-0">
                        <h3 className="text-[13px] font-semibold truncate uppercase">
                          {name.trim()}
                        </h3>
                        <div className="flex items-center text-[11px] text-slate-400 mt-0.5">
                          <FiClock className="mr-1" size={10} />
                          {formatDate(resume.updatedAt)}
                        </div>
                      </div>

                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="p-1 text-slate-400 hover:text-slate-900"
                      >
                        <FiMoreVertical />
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Empty State */}
          {!isLoading && resumes.length === 0 && (
            <div className="text-center py-20 border border-dashed mt-10">
              <FiFileText className="mx-auto text-slate-300 mb-4" size={40} />
              <p className="text-slate-500 text-sm">
                No resumes found. Let’s build your first CV.
              </p>
            </div>
          )}

          {/* Error */}
          {isError && (
            <p className="text-red-600 text-center mt-10">
              Failed to load resumes.
            </p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
