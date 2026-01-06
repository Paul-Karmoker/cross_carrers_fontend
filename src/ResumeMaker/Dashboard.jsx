/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllResumesQuery } from "../redux/features/resumeApi";
import { FiPlus, FiMoreVertical, FiFileText, FiClock } from "react-icons/fi";
import Navbar from "../Components/navbar";
import Footer from "../Components/footer.jsx";

// 1. Helper for Skeleton Loading
const ResumeCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 animate-pulse h-full">
    <div className="aspect-[3/4] bg-gray-200 rounded-md mb-4 w-full"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-3 bg-gray-100 rounded w-1/2"></div>
  </div>
);

// 2. Helper to format dates nicely
const formatDate = (dateString) => {
  if (!dateString) return "Just now";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { data: response, isLoading, isError } = useGetAllResumesQuery();

  // Safe Data Extraction
  const data = response?.data;
  const resumes = data ? (Array.isArray(data) ? data : [data]) : [];

  const handleCreateNew = () => {
    navigate("/editor");
  };

  const handleEditResume = (id) => {
    navigate(`/editor/${id}`); // Assuming your route handles IDs
  };

  return (
    <div className="flex flex-col min-h-screen mt-16 bg-gray-50">
      <Navbar />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                My Documents
              </h1>
              <p className="text-gray-500 mt-1">
                Manage and organize your resume collection.
              </p>
            </div>
            <button
              onClick={handleCreateNew}
              className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-2.5 rounded-lg shadow-sm hover:shadow transition-all duration-200 gap-2"
            >
              <FiPlus size={20} />
              <span>Create New</span>
            </button>
          </div>

          {/* Tabs / Filter Section */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex space-x-8">
              <button className="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm text-red-600 border-red-600">
                All Resumes
              </button>
              <button className="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300 transition-colors">
                Archived
              </button>
            </nav>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8">
            {/* 1. The "Create New" Ghost Card */}
            <div
              onClick={handleCreateNew}
              className="group cursor-pointer flex flex-col items-center justify-center min-h-[300px] border-2 border-dashed border-gray-300 rounded-xl bg-white hover:border-red-400 hover:bg-red-50 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors">
                <FiPlus className="text-red-600" size={32} />
              </div>
              <span className="font-semibold text-gray-700 group-hover:text-red-700">
                Create New Resume
              </span>
              <span className="text-sm text-gray-400 mt-1">
                Start from scratch
              </span>
            </div>

            {/* 2. Loading State */}
            {isLoading && (
              <>
                <ResumeCardSkeleton />
                <ResumeCardSkeleton />
                <ResumeCardSkeleton />
              </>
            )}

            {/* 4. Resume Cards */}
            {!isLoading &&
              !isError &&
              resumes.map((resume) => {
                const firstName = resume.personalInfo?.firstName || "Untitled";
                const lastName = resume.personalInfo?.lastName || "Resume";
                const title = `${firstName} ${lastName}`.trim();
                // Placeholder date if your API doesn't return one yet
                const updatedDate = resume.updatedAt || new Date();

                return (
                  <div
                    key={resume.id || resume._id}
                    onClick={() => handleEditResume(resume.id || resume._id)}
                    className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl border border-gray-200 hover:border-red-100 transition-all duration-300 cursor-pointer flex flex-col overflow-hidden"
                  >
                    {/* Thumbnail Preview Area */}
                    <div className="relative w-full aspect-[3/4] bg-gray-100 border-b border-gray-100 group-hover:bg-gray-50 transition-colors flex items-center justify-center p-6">
                      {/* Paper visual simulation */}
                      <div className="w-full h-full bg-white shadow-sm border border-gray-200 mx-auto flex items-center justify-center rounded-sm transform group-hover:scale-105 transition-transform duration-300">
                        <FiFileText className="text-gray-300" size={48} />
                      </div>

                      {/* Overlay Button (appears on hover) */}
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-white text-gray-800 px-4 py-2 rounded-full font-medium text-sm shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all">
                          Edit Resume
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 flex flex-col justify-between flex-grow">
                      <div className="flex justify-between items-start">
                        <div className="pr-6">
                          <h3 className="font-semibold text-gray-800 truncate text-base mb-1 group-hover:text-red-600 transition-colors">
                            {title}
                          </h3>
                          <div className="flex items-center text-xs text-gray-400">
                            <FiClock className="mr-1" />
                            {formatDate(updatedDate)}
                          </div>
                        </div>

                        {/* Options Menu Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent opening the resume when clicking the menu
                            // Add your dropdown logic here
                            console.log("Open menu for", resume._id);
                          }}
                          className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded-full transition-colors"
                        >
                          <FiMoreVertical size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
