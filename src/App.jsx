
import { Navigate, Route, Routes } from 'react-router-dom';

import { useGetWithdrawalsQuery } from './redux/features/authApi';

// Public Components
import Home from '../src/app/components/home';
import Training from '../src/app/components/Trainings';
import About from '../src/app/Others/about';
import Contact from '../src/app/Others/contact';
import Earn from '../src/app/Others/earn';
import Ngo from '../src/app/Others/ngo.tsx';
import Ingo from '../src/app/Others/ingo';
import Bdjobs from '../src/app/Others/bdjobs';
import Intjobs from '../src/app/Others/intJobs';
import Marqueer from '../src/app/components/home/marqueer';
import Marqueel from '../src/app/components/home/marqueel';
import Terms from '../src/app/Others/terms';
import Privacy from '../src/app/Others/privacy';
import ForgotPassword from '../src/app/auth/forgetpassword';
import ResetPassword from '../src/app/auth/resetpasspord';
import ResumeMakerHome from '../src/app/components/ResumeMaker/Dashboard';
// Authentication Components
import Signin from '../src/app/auth/siginin';
import SignUp from '../src/app/auth/siginup';

import Logout from '../src/app/auth/logout';

//import ResumeEditor from './ResumeMaker/ResumeEditor';
import ResumeForm from '../src/app/components/ResumeMaker/resumeForm.jsx';

// Protected Components
import Un from '../src/app/Others/Un';
import Emb from '../src/app/Others/emb';
import Donor from '../src/app/Others/doner';
import Dbhome from '../src/app/dashboard';
import Matchhome from '../src/app/components/Resumebuild/matchhome';
import Qahome from '../src/app/components/QA';
import Coverhome from '../src/app/components/cover';
import Ppthome from '../src/app/components/ppt';
import PPTmaker from '../src/app/components/ppt/pptMacker';
import Dochome from '../src/app/components/Docx';
import Doc from '../src/app/components/Docx/doc';
import Excel from '../src/app/components/Excel/excel';
import Excelhome from '../src/app/components/Excel';
import Consult from './consult/consult';
import Insm from '../src/app/components/insm/InterviewSimulator';
//import Payment from './Membership/paymentmodel';
import Upgradeplan from '../src/app/components/utility/upgradeplan.tsx';
import WrittenTestHome from '../src/app/components/WrittenTest/WrittenTest.tsx';
import OtpVarify from "../src/app/auth/VerifyOtp";

import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  const { isError, error } = useGetWithdrawalsQuery();
  const isAuthenticated = localStorage.getItem('token') && !(isError && error?.status === 'error');

  return isAuthenticated ? children : <Navigate to="/signinhome" replace />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

const App = () => {
  
  return (
    <>
      <Routes>
        {/* পাবলিক রাউট */}
        <Route path="/" element={<Home />} />
        <Route path="/trainings" element={<Training />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/earn" element={<Earn />} />
        <Route path="/ngo" element={<Ngo />} />
        <Route path="/ingo" element={<Ingo />} />
        <Route path="/bdjobs" element={<Bdjobs />} />
        <Route path="/intjobs" element={<Intjobs />} />
        <Route path="/marqueer" element={<Marqueer />} />
        <Route path="/marqueel" element={<Marqueel />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/signin" element={<Signin />} />
        <Route path='/forgetPassword' element={<ForgotPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signinhome" element={<Signin />} />
        <Route path='/verify-otp' element={<OtpVarify/>}/>
        <Route path="/coverhome" element={<Coverhome />} />
        <Route path="/pptmaker" element={<PPTmaker />} />
        <Route path="/doc" element={<Doc />} />
        <Route path='/writtenTest' element={<WrittenTestHome/>}/>
        <Route path="/resume" element={<ResumeMakerHome />} />
        
        <Route path="/editor" element={<ResumeForm />} />
        <Route path="/dochome" element={<Dochome />} />
        <Route path="/excel" element={<Excel />} />
        <Route path="/excelhome" element={<Excelhome />} />
        <Route path="/consult" element={<Consult />} />
        

        {/* প্রোটেক্টেড রাউট */}
        <Route
          path="/un"
          element={
            <ProtectedRoute>
              <Un />
            </ProtectedRoute>
          }
        />
        <Route
          path="/priceing"
          element={
            <ProtectedRoute>
              <Upgradeplan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/emb"
          element={
            <ProtectedRoute>
              <Emb />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donor"
          element={
            <ProtectedRoute>
              <Donor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dbhome"
          element={
            <ProtectedRoute>
              <Dbhome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/matchhome"
          element={
            <ProtectedRoute>
              <Matchhome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/qahome"
          element={
            <ProtectedRoute>
              <Qahome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ppthome"
          element={
            <ProtectedRoute>
              <Ppthome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/InterviewSimulator"
          element={
            <ProtectedRoute>
              <Insm />
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

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;