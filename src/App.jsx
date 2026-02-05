/* eslint-disable react/display-name */
import { memo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";

/* ───────── PUBLIC PAGES ───────── */
import Home from "./app/components/home/index";
import Training from "./app/components/Trainings";
import About from "./app/Others/about";
import Contact from "./app/Others/contact";
import Earn from "./app/Others/earn";
import Ngo from "./app/Others/ngo";
import Ingo from "./app/Others/ingo";
import Bdjobs from "./app/Others/bdjobs";
import Intjobs from "./app/Others/intJobs";
import Terms from "./app/Others/terms";
import Privacy from "./app/Others/privacy";
import Blogs from "./app/Others/blogs";
import Legalpoliicy from "./app/Others/legalpoliicy";
import Career from "./app/Others/career";
import Signin from "./app/auth/siginin";
import SignUp from "./app/auth/siginup";
import ForgotPassword from "./app/auth/forgetpassword";
import ResetPassword from "./app/auth/resetpasspord";
import OtpVarify from "./app/auth/VerifyOtp";
import Logout from "./app/auth/logout";

/* ───────── TOOLS ───────── */
import ResumeMakerHome from "./app/components/ResumeMaker/Dashboard";
import ResumeMain from "./app/components/ResumeMaker/resumeForm";
import WrittenTestHome from "./app/components/WrittenTest/WrittenTest";
import Matchhome from "./app/components/Resumebuild/matchhome";
import Qahome from "./app/components/QA";
import Insm from "./app/components/insm/InterviewSimulator";

/* ───────── OTHERS ───────── */
import RemoteJobs from "./app/Others/Remote";
import Freelancer from "./app/Others/FreeLance";
import Un from "./app/Others/Un";
import Emb from "./app/Others/emb";
import Donor from "./app/Others/doner";
import Dbhome from "./app/dashboard";
import UpgradePlan from "./app/components/utility/UpgradePlan";
import SeePricing from "./app/components/utility/SeePricing";
import Help from "./app/components/utility/Help";
import Setting from "./app/components/utility/Setting";
import Release from "./app/components/utility/Release";

const App = memo(() => {
  return (
    <Routes>
      {/* ───── PUBLIC ROUTES ───── */}
      <Route path="/" element={<Home />} />
      <Route path="/trainings" element={<Training />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/earn" element={<Earn />} />
      <Route path="/ngo" element={<Ngo />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/legalpoliicy" element={<Legalpoliicy />} />
      <Route path="/career" element={<Career />} />
      <Route path="/ingo" element={<Ingo />} />
      <Route path="/bdjobs" element={<Bdjobs />} />
      <Route path="/intjobs" element={<Intjobs />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/remote-jobs" element={<RemoteJobs />} />
      <Route path="/freelance" element={<Freelancer />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgetPassword" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/verify-otp" element={<OtpVarify />} />
      <Route path="/seepricing" element={<SeePricing />} />
      <Route path="/help" element={<Help />} />
      <Route path="/seitting" element={<Setting />} />
      <Route path="/release" element={<Release />} />
      <Route path="/editor" element={<ResumeMain />} />

      <Route
        path="/dbhome"
        element={
          <ProtectedRoute>
            <Dbhome />
          </ProtectedRoute>
        }
      />

      <Route
        path="/logout"
        element={
          <ProtectedRoute>
            <Logout />
          </ProtectedRoute>
        }
      />

      {/* ───── FULL ACCESS (TRIAL / PREMIUM) ───── */}
      <Route
        path="/resume"
        element={
          <ProtectedRoute requireFullAccess>
            <ResumeMakerHome />
          </ProtectedRoute>
        }
      />

      <Route
        path="/writtenTest"
        element={
          <ProtectedRoute requireFullAccess>
            <WrittenTestHome />
          </ProtectedRoute>
        }
      />

      <Route
        path="/matchhome"
        element={
          <ProtectedRoute requireFullAccess>
            <Matchhome />
          </ProtectedRoute>
        }
      />

      <Route
        path="/qahome"
        element={
          <ProtectedRoute requireFullAccess>
            <Qahome />
          </ProtectedRoute>
        }
      />

      <Route
        path="/InterviewSimulator"
        element={
          <ProtectedRoute requireFullAccess>
            <Insm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/un"
        element={
          <ProtectedRoute requireFullAccess>
            <Un />
          </ProtectedRoute>
        }
      />

      <Route
        path="/emb"
        element={
          <ProtectedRoute requireFullAccess>
            <Emb />
          </ProtectedRoute>
        }
      />

      <Route
        path="/donor"
        element={
          <ProtectedRoute requireFullAccess>
            <Donor />
          </ProtectedRoute>
        }
      />

      <Route
        path="/priceing"
        element={
          <ProtectedRoute requireFullAccess>
            <UpgradePlan />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
});

export default App;
