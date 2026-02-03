import React, { FC, useMemo } from 'react';
import Navbar from '../components/home/navbar';
import Footer from '../components/home/footer';

/**
 * Interfaces
 */
interface Circular {
  id: number;
  title: string;
  organization: string;
  location: string;
  deadline: string;
  type: string;
}

/**
 * Section Header
 */
interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

const SectionHeader: FC<SectionHeaderProps> = ({ title, subtitle }) => (
  <div className="mb-10">
    <h2 className="text-3xl font-extrabold text-slate-900 mb-2">{title}</h2>
    <p className="text-slate-500">{subtitle}</p>
  </div>
);

/**
 * Empty State
 */
const EmptyState: FC<{ message: string }> = ({ message }) => (
  <div className="bg-white border border-dashed border-slate-300 rounded-3xl p-12 text-center shadow-sm">
    <div className="text-5xl mb-4">📄</div>
    <p className="text-slate-600 font-medium">{message}</p>
  </div>
);

/**
 * Circular Card
 */
const CircularCard: FC<{ data: Circular }> = ({ data }) => (
  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
    <h3 className="text-lg font-bold text-slate-900 mb-2">{data.title}</h3>
    <p className="text-slate-600 font-medium mb-1">{data.organization}</p>
    <p className="text-sm text-slate-500 mb-4">📍 {data.location}</p>

    <div className="flex flex-wrap gap-2 mb-4">
      <span className="bg-indigo-50 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full">
        {data.type}
      </span>
      <span className="bg-rose-50 text-rose-600 text-xs font-bold px-3 py-1 rounded-full">
        Deadline: {data.deadline}
      </span>
    </div>

    <button
      className="w-full bg-slate-900 text-white py-2.5 rounded-xl font-bold hover:bg-indigo-600 transition-colors"
      disabled
    >
      View Details
    </button>
  </div>
);

/**
 * Main Page
 */
const Circulars: FC = () => {
  const currentDate = useMemo(
    () =>
      new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
    []
  );

  /**
   * DATA SOURCES (replace with API later)
   */
  const jobCirculars: Circular[] = [
    // Example
    // {
    //   id: 1,
    //   title: 'Deputy Manager – Administration & Logistics',
    //   organization: 'BRAC',
    //   location: 'Dhaka, Bangladesh',
    //   deadline: '30 March 2026',
    //   type: 'Full-Time'
    // }
  ];

  const procurementCirculars: Circular[] = [
    // Keep empty to test empty state
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-6xl mx-auto px-6 py-16 mt-16">
        {/* Page Header */}
        <header className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 mb-4 text-sm font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 rounded-full">
            Circular Board
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Job & Procurement Circulars
          </h1>
          <p className="text-slate-500">
            Updated on <span className="text-slate-900">{currentDate}</span>
          </p>
        </header>

        {/* JOB CIRCULAR SECTION */}
        <section className="mb-24">
          <SectionHeader
            title="Job Circulars"
            subtitle="Latest career opportunities from organizations and institutions"
          />

          {jobCirculars.length === 0 ? (
            <EmptyState message="No job circulars are available at the moment. Please check back later." />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {jobCirculars.map((job) => (
                <CircularCard key={job.id} data={job} />
              ))}
            </div>
          )}
        </section>

        {/* PROCUREMENT CIRCULAR SECTION */}
        <section>
          <SectionHeader
            title="Procurement Circulars"
            subtitle="Active tenders, RFQs, RFPs, and procurement notices"
          />

          {procurementCirculars.length === 0 ? (
            <EmptyState message="No procurement circulars are available right now." />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {procurementCirculars.map((proc) => (
                <CircularCard key={proc.id} data={proc} />
              ))}
            </div>
          )}
        </section>

        {/* Disclaimer */}
        <section className="text-center mt-24 pt-10 border-t border-slate-200">
          <p className="text-slate-400 text-sm italic max-w-2xl mx-auto">
            All circulars are published for informational purposes only. CrossCareers does
            not guarantee recruitment, procurement awards, or outcomes.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Circulars;
