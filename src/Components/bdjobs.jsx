import React from 'react';
import Navbar from './navbar';
import Footer from './footer';

function BdJobs() {
  const jobSites = [
    {
      id: 1,
      name: 'BDJOBS',
      url: 'https://bdjobs.com/',
      logo: '../public/bdjobs/bdjobs.png'
    },
    {
      id: 2,
      name: 'Skill Jobs',
      url: 'https://skill.jobs/',
      logo: 'https://skill.jobs/images/logo-01-01-01-01.png'
    },
    {
      id: 3,
      name: 'MyJobs',
      url: 'https://www.myjobs.com.bd/',
      logo: 'https://www.myjobs.com.bd/media/front-end/img/main-logo.png'
    },
    {
      id: 4,
      name: 'eJobs',
      url: 'https://www.ejobs.com.bd/',
      logo: 'https://www.ejobs.com.bd/images/logo.png'
    },
    {
      id: 5,
      name: 'Teletalk All Jobs',
      url: 'https://alljobs.teletalk.com.bd/',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRFUgbjYu-gsviQMoecCi60uUXXXF9anBrAA&s'
    },
    {
      id: 6,
      name: 'Jobs.com.bd',
      url: 'http://www.job.com.bd/',
      logo: 'http://job.com.bd/images/logo.gif'
    },
    {
      id: 7,
      name: 'Careerjet',
      url: 'https://www.careerjet.com.bd/',
      logo: '../public/bdjobs/career jet.png'
    },
    {
      id: 8,
      name: 'Shomvob',
      url: 'https://shomvob.com/',
      logo: '../public/bdjobs/shomvob.png'
    },
    {
      id: 9,
      name: 'Bikroy Jobs',
      url: 'https://bikroy.com/en/ads/bangladesh/jobs',
      logo: '../public/bdjobs/bikroy.png'
    },
    {
      id: 10,
      name: 'BDJobsToday',
      url: 'https://www.bdjobstoday.com/',
      logo: '../public/bdjobs/4.png'
    },
    {
      id: 11,
      name: 'Chakri.com.bd',
      url: 'https://chkri.com/',
      logo: '../public/bdjobs/5.png'
    },
    {
      id: 12,
      name: 'BDjobsLive',
      url: 'https://www.bdjobslive.com/',
      logo: '../public/bdjobs/6.png'
    },
    {
      id: 13,
      name: 'NRBJobs',
      url: 'https://www.nrbjobs.com/',
      logo: '../public/bdjobs/7.png'
    }
  ];

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-4 shadow-md mt-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              Bangladeshi Job Portals
            </h1>
            <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto">
              Discover the best job opportunities from top Bangladeshi career websites
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-6">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              Explore All Job Sites
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {jobSites.map((site) => (
                <div key={site.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6 flex flex-col items-center h-full">
                    <div className="h-24 flex items-center justify-center mb-4">
                      <img 
                        src={site.logo} 
                        alt={site.name} 
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">{site.name}</h3>
                    <div className="mt-auto w-full">
                      <a 
                        href={site.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-center transition-colors duration-300"
                      >
                        Visit Site
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BdJobs;