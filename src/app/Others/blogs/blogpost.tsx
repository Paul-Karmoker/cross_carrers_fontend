import { useParams, Link } from "react-router-dom";
import { useEffect, useRef } from "react"; // ✅ Added for Ad injection
import { Helmet } from "react-helmet-async";
import Navbar from "../../components/home/navbar";
import Footer from "../../components/home/footer";
import { blogPosts } from "../blogs/blogdata";
import { stripCitationMarkers } from '../blogs/stripcitations';

// ✅ 1. Adsterra Component with Anti-Adblock Support
const AdsterraNativeBanner = () => {
  const adRef = useRef<HTMLDivElement>(null);
  const adKey = "e3eaf6b20d9b572cce862ed69d16e43f";

  useEffect(() => {
    if (adRef.current && !adRef.current.firstChild) {
      const script = document.createElement('script');
      script.src = `https://undergocutlery.com/${adKey}/invoke.js`;
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      adRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="my-10 flex flex-col items-center border-y border-gray-100 py-8 bg-gray-50/50">
      <span className="text-[10px] text-gray-400 uppercase tracking-widest mb-4 font-bold">
        Career Partner Content
      </span>
      <div 
        id={`container-${adKey}`} 
        ref={adRef} 
        className="w-full min-h-[250px] flex justify-center overflow-hidden" 
      />
    </div>
  );
};

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

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white pt-20 text-center">
          <h1 className="text-2xl text-gray-800">Post not found</h1>
          <Link to="/career-guide" className="text-emerald-700 hover:underline">← Back to blog</Link>
        </main>
        <Footer />
      </>
    );
  }

  const cleanedContent = stripCitationMarkers(post.content);
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.slug !== slug)
    .slice(0, 6);

  // ✅ 2. Smart Content Splitting Logic
  const splitContent = (content: string) => {
    const midPoint = Math.floor(content.length / 2);
    // Finds the end of the paragraph nearest to the midpoint
    const splitIndex = content.indexOf("</p>", midPoint);

    if (splitIndex !== -1) {
      return {
        firstHalf: content.substring(0, splitIndex + 4),
        secondHalf: content.substring(splitIndex + 4)
      };
    }
    return { firstHalf: content, secondHalf: "" };
  };

  const { firstHalf, secondHalf } = splitContent(cleanedContent);
  const pageTitle = `${post.title} | ${post.category} Careers Bangladesh ${new Date().getFullYear()} | CrossCareers`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={`career guide ${new Date().getFullYear()}, ${post.category.toLowerCase()}, Bangladesh jobs, career advice, resume tips, interview preparation, CrossCareers`} />
        <meta name="author" content={post.author.name} />
        <meta name="publisher" content="CrossCareers" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://crosscareers.com/career-guide/${post.slug}`} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="CrossCareers Career Blog Bangladesh" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={`https://crosscareers.com/career-guide/${post.slug}`} />
        <meta property="og:image" content={post.image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "image": post.image,
            "datePublished": post.date,
            "dateModified": post.date,
            "author": {
              "@type": "Person",
              "name": post.author.name,
              "description": post.author.experience,
              "image": post.author.image
            },
            "publisher": {
              "@type": "Organization",
              "name": "CrossCareers",
              "logo": {
                "@type": "ImageObject",
                "url": "https://i.ibb.co/ksnkSFZz/banner.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://crosscareers.com/career-guide/${post.slug}`
            },
            "keywords": `${post.category}, Bangladesh Career, Job Search, NGO Jobs, UN Careers`,
            "articleSection": post.category,
            "wordCount": post.content.replace(/<[^>]*>/g, '').split(/\s+/).length,
            "timeRequired": `PT${calculateReadingTime(post.content)}M`
          })}
        </script>
      </Helmet>

      <Navbar />
      <main className="min-h-screen bg-white pt-20">
        <div className="mx-auto max-w-4xl px-4">
          <Link to="/career-guide" className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 border border-gray-300 hover:bg-gray-50 transition-colors">
            ← Back to all articles
          </Link>
          
          <article className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-8">
               <span>{post.author.name}</span>
               <span>•</span>
               <time>{formatDateForSEO(post.date).display}</time>
               <span>•</span>
               <span>{calculateReadingTime(post.content)} min read</span>
            </div>

            <img src={post.image} alt={post.title} className="w-full h-96 object-cover rounded-xl mb-8 shadow-sm" />
            
            {/* ✅ 3. First Half of Content */}
            <div className="prose max-w-none text-gray-700 leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: firstHalf }} />

            {/* ✅ 4. Mid-Article Adsterra Banner */}
            <AdsterraNativeBanner />

            {/* ✅ 5. Second Half of Content */}
            {secondHalf && (
              <div className="prose max-w-none text-gray-700 leading-relaxed mt-8" dangerouslySetInnerHTML={{ __html: secondHalf }} />
            )}
            
          </article>

          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Articles</h2>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {relatedPosts.map(related => (
                  <Link key={related.id} to={`/career-guide/${related.slug}`} className="group block">
                    <img src={related.image} alt={related.title} className="w-full h-40 object-cover rounded-lg group-hover:opacity-90 transition-opacity shadow-sm" />
                    <h3 className="mt-2 font-semibold text-gray-800 group-hover:text-emerald-700 line-clamp-2">{related.title}</h3>
                    <p className="text-sm text-gray-500">{formatDateForSEO(related.date).display}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}