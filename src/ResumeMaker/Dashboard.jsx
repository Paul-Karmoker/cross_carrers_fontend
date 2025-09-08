import { useNavigate } from 'react-router-dom';
import { useGetAllResumesQuery } from '../context/resumeApi'; // Using absolute path
import { FiPlus, FiStar, FiLinkedin, FiFileText, FiMoreHorizontal } from 'react-icons/fi';
import { FaFileInvoice } from 'react-icons/fa';
import Navbar from "../Components/navbar";
import Footer from "../Components/footer.jsx";

// A component for the skeleton loader
const ResumeCardSkeleton = () => (
    <div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
        <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
    </div>
);

const Dashboard = () => {
    const navigate = useNavigate();
    const { data: response, isLoading, isError } = useGetAllResumesQuery();
    
    // START: CORRECTED CODE BLOCK
    // Get the data object/array from the response
    const data = response?.data;
    // Ensure 'resumes' is always an array, even if the API returns a single object
    const resumes = data ? (Array.isArray(data) ? data : [data]) : [];
    // END: CORRECTED CODE BLOCK

    const handleCreateNew = () => {
        navigate('/editor');
    };

    return (
        <>
        <Navbar />
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">My Documents</h1>
                    <button
                        onClick={handleCreateNew}
                        className="bg-red-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-red-600 transition duration-200"
                    >
                        Create New
                    </button>
                </div>

                {/* Tabs Section */}
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        <a
                            href="#"
                            className="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm text-red-600 border-red-500"
                        >
                            Resumes
                        </a>
                        
                    </nav>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
                    {/* Card 1: Create New Options */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col justify-center items-start p-6 space-y-4 text-gray-600">
                         <button onClick={handleCreateNew} className="flex items-center space-x-3 hover:text-red-500 w-full text-left">
                            <FiPlus className="text-red-500" size={20} />
                            <span className="font-medium">New Resume</span>
                        </button>
                    </div>

                    {/* Loading and Error States remain the same */}
                    {isLoading && <><ResumeCardSkeleton /><ResumeCardSkeleton /></>}
                    

                    {/* Data Loaded State */}
                    {!isLoading &&
                        !isError &&
                        resumes.map((resume) => {
                            // This part will now work correctly
                            const fullName = `${resume.personalInfo.firstName || ""} ${resume.personalInfo.lastName || ""}`.trim();
                            const resumeTitle = fullName ? `${fullName} Resume` : "Untitled Resume";

                            return (
                                <div key={resume.id || resume._id} className="bg-white rounded-lg shadow-md group relative">
                                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded-t-lg overflow-hidden flex-shrink-0">
                                        <FaFileInvoice className="text-gray-300" size={80} />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-800 truncate">
                                            {resumeTitle}
                                        </h3>
                                    </div>
                                    <button className="absolute top-2 right-2 p-1.5 bg-gray-200 rounded-full text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <FiMoreHorizontal size={20} />
                                    </button>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
            <Footer/>
            
        </>
       
    );
};

export default Dashboard;