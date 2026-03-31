/* eslint-disable react/display-name */
import { memo, Suspense, lazy, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import PageLoader from "./app/components/utility/PageLoader";

/* ───────── LAZY LOADS ───────── */

// Core (above-the-fold)
const Home = lazy(() => import("./app/components/home/index"));
const Banner = lazy(() => import("./app/components/home/banner"));
const Slider = lazy(() => import("./app/components/home/slider"));

// Public Pages
const About = lazy(() => import("./app/Others/about"));
const Contact = lazy(() => import("./app/Others/contact"));
const Earn = lazy(() => import("./app/Others/earn"));
const Ngo = lazy(() => import("./app/Others/ngo"));
const Ingo = lazy(() => import("./app/Others/ingo"));
const Bdjobs = lazy(() => import("./app/Others/bdjobs"));
const Intjobs = lazy(() => import("./app/Others/intJobs"));
const Terms = lazy(() => import("./app/Others/terms"));
const Privacy = lazy(() => import("./app/Others/privacy"));
const Legalpolicy = lazy(() => import("./app/Others/legalpolicy"));
const Career = lazy(() => import("./app/Others/career"));
const RemoteJobs = lazy(() => import("./app/Others/Remote"));
const Freelancer = lazy(() => import("./app/Others/FreeLance"));
const Un = lazy(() => import("./app/Others/Un"));
const Emb = lazy(() => import("./app/Others/emb"));
const Donor = lazy(() => import("./app/Others/doner"));
const Training = lazy(() => import("./app/components/Trainings"));

// Auth
const Signin = lazy(() => import("./app/auth/siginin"));
const SignUp = lazy(() => import("./app/auth/siginup"));
const ForgotPassword = lazy(() => import("./app/auth/forgetpassword"));
const ResetPassword = lazy(() => import("./app/auth/resetpassword"));
const OtpVarify = lazy(() => import("./app/auth/VerifyOtp"));
const Logout = lazy(() => import("./app/auth/logout"));

// Blogs
const BlogList = lazy(() => import("./app/Others/blogs/bloglist"));
const BlogPost = lazy(() => import("./app/Others/blogs/blogpost"));
const Expart = lazy(() => import("./app/Others/experts"));

// Tools
const ResumeMakerHome = lazy(() => import("./app/components/ResumeMaker/Dashboard"));
const ResumeMain = lazy(() => import("./app/components/ResumeMaker/resumeForm"));
const WrittenTestHome = lazy(() => import("./app/components/WrittenTest/WrittenTest"));
const Matchhome = lazy(() => import("./app/components/Resumebuild/matchhome"));
const Qahome = lazy(() => import("./app/components/QA/index"));
const Insm = lazy(() => import("./app/components/insm/InterviewSimulator"));
const Cover = lazy(() => import("./app/components/cover/index"));
const PPTHOME = lazy(() => import("./app/components/ppt"));
const DOCHOME = lazy(() => import("./app/components/Docx"));

// Utility
const Dbhome = lazy(() => import("./app/dashboard"));
const UpgradePlan = lazy(() => import("./app/components/utility/UpgradePlan"));
const SeePricing = lazy(() => import("./app/components/utility/SeePricing"));
const Help = lazy(() => import("./app/components/utility/Help"));
const Setting = lazy(() => import("./app/components/utility/Setting"));
const Release = lazy(() => import("./app/components/utility/Release"));
const BkashSuccess = lazy(() => import("./app/components/utility/BkashSuccess"));

/* ───────── APP ───────── */

const App = memo(() => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);

    // Google Analytics (safe check)
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", "G-EKLRRCRQ9T", {
        page_path: location.pathname,
      });
    }

    // 🔥 LCP BOOST: preload hero background
    const preload = document.createElement("link");
    preload.rel = "preload";
    preload.as = "image";
    preload.href = "/back.avif";
    preload.type = "image/avif";
    document.head.appendChild(preload);

    return () => {
      document.head.removeChild(preload);
    };
  }, [location.pathname]);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>

        {/* ───── HOME (Critical) ───── */}
        <Route
          path="/"
          element={
            <Home>
              <Banner />
              <Slider />
            </Home>
          }
        />

        {/* ───── PUBLIC ───── */}
        <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/referral-program" element={<Earn />} />
        <Route path="/ngo-jobs-bangladesh" element={<Ngo />} />
        <Route path="/international-ngo-jobs" element={<Ingo />} />
        <Route path="/bangladesh-jobs-sites" element={<Bdjobs />} />
        <Route path="/international-jobs-sites" element={<Intjobs />} />
        <Route path="/terms-and-conditions" element={<Terms />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/legal-poliicy" element={<Legalpolicy />} />
        <Route path="/career" element={<Career />} />
        <Route path="/remote-jobs-worldwide" element={<RemoteJobs />} />
        <Route path="/freelance-jobs-online" element={<Freelancer />} />
        <Route path="/united-nation-jobs-bangladesh" element={<Un />} />
        <Route path="/embassy-jobs-bangladesh" element={<Emb />} />
        <Route path="/donor-jobs-bangladesh" element={<Donor />} />
        <Route path="/training-sites-worldwide" element={<Training />} />

        {/* ───── AUTH ───── */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgetPassword" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/verify-otp" element={<OtpVarify />} />
        <Route path="/logout" element={<ProtectedRoute><Logout /></ProtectedRoute>} />

        {/* ───── BLOG ───── */}
        <Route path="/career-guide" element={<BlogList />} />
        <Route path="/career-guide/:slug" element={<BlogPost />} />
        <Route path="/meet-the-exparts" element={<Expart />} />

        {/* ───── UTILITY ───── */}
        <Route path="/bkash-success" element={<BkashSuccess />} />
        <Route path="/seepricing" element={<SeePricing />} />
        <Route path="/help" element={<Help />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/release" element={<Release />} />

        {/* ───── DASHBOARD ───── */}
        <Route
          path="/dbhome"
          element={
            <ProtectedRoute>
              <Dbhome />
            </ProtectedRoute>
          }
        />

        {/* ───── PREMIUM FEATURES ───── */}
        <Route path="/editor" element={<ResumeMain />} />

        <Route path="/resume" element={
          <ProtectedRoute requireFullAccess>
            <ResumeMakerHome />
          </ProtectedRoute>
        } />

        <Route path="/cover" element={
          <ProtectedRoute requireFullAccess>
            <Cover />
          </ProtectedRoute>
        } />

        <Route path="/ppt" element={
          <ProtectedRoute requireFullAccess>
            <PPTHOME />
          </ProtectedRoute>
        } />

        <Route path="/doc" element={
          <ProtectedRoute requireFullAccess>
            <DOCHOME />
          </ProtectedRoute>
        } />

        <Route path="/writtenTest" element={
          <ProtectedRoute requireFullAccess>
            <WrittenTestHome />
          </ProtectedRoute>
        } />

        <Route path="/matchhome" element={
          <ProtectedRoute requireFullAccess>
            <Matchhome />
          </ProtectedRoute>
        } />

        <Route path="/qahome" element={
          <ProtectedRoute requireFullAccess>
            <Qahome />
          </ProtectedRoute>
        } />

        <Route path="/InterviewSimulator" element={
          <ProtectedRoute requireFullAccess>
            <Insm />
          </ProtectedRoute>
        } />

        <Route path="/pricing" element={
          <ProtectedRoute requireFullAccess>
            <UpgradePlan />
          </ProtectedRoute>
        } />

        {/* ───── FALLBACK ───── */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Suspense>
  );
});

export default App;