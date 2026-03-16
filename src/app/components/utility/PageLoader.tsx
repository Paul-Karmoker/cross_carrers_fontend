import React from 'react';

const PageLoader: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 p-10 max-w-3xl mx-auto w-full animate-pulse mt-10">
      
      {/* Fake Hero/Header image */}
      <div className="h-48 w-full bg-slate-200 rounded-lg"></div>
      
      {/* Fake Title */}
      <div className="h-10 w-3/5 bg-slate-200 rounded mt-4"></div>
      
      {/* Fake Paragraph lines */}
      <div className="h-5 w-full bg-slate-200 rounded mt-2"></div>
      <div className="h-5 w-full bg-slate-200 rounded"></div>
      <div className="h-5 w-5/6 bg-slate-200 rounded"></div>
    </div>
  );
};

export default PageLoader;