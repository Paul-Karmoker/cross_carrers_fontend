import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../../components/home/navbar";
import Footer from "../../components/home/footer";
import { Link } from "react-router-dom";
import { blogPosts, BlogPost } from "../blogs/blogdata";


const formatDateForSEO = (dateString: string) => {
  const date = new Date(dateString);
  return {
    iso: date.toISOString().split('T')[0],
    display: date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  };
};

const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

const POSTS_PER_PAGE = 10;

const categories = [
  "All", "Career Roadmap", "Career Guide", "ATS (Resume/CV)", "UN Jobs Guide",
  "Freelance & Remote", "Interview Support", "Skill Development", "Supply Chain Management",
  "Finance & Administration", "Women Empowerment", "Leadership & Innovation",
  "Workplace Wellness & Culture","AI (Artificial Intelligence)", "Cybersecurity & Data Science",
];

export default function BlogList() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: blogPosts.length };
    blogPosts.forEach(post => {
      counts[post.category] = (counts[post.category] || 0) + 1;
    });
    return counts;
  }, []);

  const sortedPosts = useMemo(() => {
    return [...blogPosts].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, []);

  const filteredPosts = useMemo(() => {
    return sortedPosts.filter((post) => {
      const matchesCategory = selectedCategory === "All" ? true : post.category === selectedCategory;
      const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory, sortedPosts]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const changePage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getMetaDescription = () => {
    if (search) {
      return `Search results for "${search}" - ${filteredPosts.length} career articles found in Bangladesh. Expert guidance on NGO jobs, UN careers, and professional development.`;
    }
    if (selectedCategory !== "All") {
      return `${filteredPosts.length} ${selectedCategory} career guides and expert advice for Bangladeshi professionals. Tips on interviews, resumes, and skill development.`;
    }
    return `Expert career guidance for Bangladeshi professionals. ${filteredPosts.length}+ articles on NGO jobs, UN careers, corporate jobs, freelancing, skill development, and professional growth strategies in ${new Date().getFullYear()}.`;
  };

  return (
    <>
      <Helmet>
        {/* ✅ Fixed title: single string expression */}
        <title>{`Career Insights & Job Market Guide ${new Date().getFullYear()} | ${filteredPosts.length}+ Articles | CrossCareers`}</title>
        <meta name="description" content={getMetaDescription()} />
        <meta name="keywords" content="career advice Bangladesh, job search tips, NGO jobs, UN careers, professional development, interview preparation, resume writing, freelancing, CrossCareers blog" />
        <meta name="author" content="Paul Romeo Karmoker" />
        <meta name="publisher" content="CrossCareers" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://crosscareers.com/career-guide" />
      </Helmet>

      <Navbar />
      <main className="min-h-screen bg-white pt-20">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="mb-8 text-3xl font-bold text-gray-800">
            Career Insights & Blogs {new Date().getFullYear()}
          </h1>

          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Search blog posts"
            />
          </div>

          {/* Category filters */}
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((cat) => {
              const count = cat === "All" ? filteredPosts.length : categoryCounts[cat] || 0;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === cat
                      ? "bg-emerald-700 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  aria-current={selectedCategory === cat ? "page" : undefined}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          <p className="mb-4 text-sm text-gray-600">
            Showing {paginatedPosts.length} of {filteredPosts.length} articles
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {paginatedPosts.map((post) => (
              <article
                key={post.id}
                className="group rounded-2xl bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out overflow-hidden border border-gray-100"
                itemScope
                itemType="https://schema.org/BlogPosting"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  itemProp="image"
                  loading="lazy"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs">
                      {post.category}
                    </span>
                    <time dateTime={post.date} itemProp="datePublished">
                      {formatDateForSEO(post.date).display}
                    </time>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2" itemProp="headline">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3" itemProp="description">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {post.author.name}
                    </span>
                    <Link
  to={`/career-guide/${post.slug}`}
  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold shadow-sm transition-all duration-300 hover:bg-emerald-700 hover:shadow-md group"
>
  Read More
  <span className="transform transition-transform duration-300 group-hover:translate-x-1">
    →
  </span>
</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {totalPages > 1 && (
            <nav className="mt-12 flex justify-center items-center gap-2" aria-label="Pagination">
              <button
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                aria-label="Previous page"
              >
                ← Previous
              </button>
              
              <div className="flex gap-1">
                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => changePage(page)}
                      className={`w-10 h-10 rounded-lg ${
                        currentPage === page
                          ? "bg-emerald-700 text-white"
                          : "border border-gray-300 hover:bg-gray-50"
                      }`}
                      aria-current={currentPage === page ? "page" : undefined}
                      aria-label={`Page ${page}`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                aria-label="Next page"
              >
                Next →
              </button>
            </nav>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}