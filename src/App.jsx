import { memo, useCallback } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useGetWithdrawalsQuery } from './redux/features/authApi';


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

import Signin from '../src/app/auth/siginin';
import SignUp from '../src/app/auth/siginup';
import ForgotPassword from '../src/app/auth/forgetpassword';
import ResetPassword from '../src/app/auth/resetpasspord';
import Logout from '../src/app/auth/logout';
import OtpVarify from '../src/app/auth/VerifyOtp';


import ResumeMakerHome from '../src/app/components/ResumeMaker/Dashboard';
import ResumeForm from '../src/app/components/ResumeMaker/resumeForm.jsx';
import Coverhome from '../src/app/components/cover';
import Ppthome from '../src/app/components/ppt';
import PPTmaker from '../src/app/components/ppt/pptMacker';
import Dochome from '../src/app/components/Docx';
import Doc from '../src/app/components/Docx/doc';
import Excelhome from '../src/app/components/Excel';
import Excel from '../src/app/components/Excel/excel';
import WrittenTestHome from '../src/app/components/WrittenTest/WrittenTest.tsx';
import Consult from './consult/consult';
import Insm from '../src/app/components/insm/InterviewSimulator';


import Un from '../src/app/Others/Un';
import Emb from '../src/app/Others/emb';
import Donor from '../src/app/Others/doner';
import Dbhome from '../src/app/dashboard';
import Matchhome from '../src/app/components/Resumebuild/matchhome';
import Qahome from '../src/app/components/QA';
import Upgradeplan from '../src/app/components/utility/upgradeplan.tsx';


const ProtectedRoute = memo(({ children }) => {
  const { isError, error } = useGetWithdrawalsQuery();

  const isAuthenticated =
    Boolean(localStorage.getItem('token')) &&
    !(isError && error?.status === 'error');

  return isAuthenticated ? children : <Navigate to="/signinhome" replace />;
});

ProtectedRoute.displayName = 'ProtectedRoute';

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};


const publicRoutes = [
  { path: '/', element: <Home /> },
  { path: '/trainings', element: <Training /> },
  { path: '/about', element: <About /> },
  { path: '/contact', element: <Contact /> },
  { path: '/earn', element: <Earn /> },
  { path: '/ngo', element: <Ngo /> },
  { path: '/ingo', element: <Ingo /> },
  { path: '/bdjobs', element: <Bdjobs /> },
  { path: '/intjobs', element: <Intjobs /> },
  { path: '/marqueer', element: <Marqueer /> },
  { path: '/marqueel', element: <Marqueel /> },
  { path: '/terms', element: <Terms /> },
  { path: '/privacy', element: <Privacy /> },
  { path: '/signin', element: <Signin /> },
  { path: '/signinhome', element: <Signin /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/forgetPassword', element: <ForgotPassword /> },
  { path: '/reset-password/:token', element: <ResetPassword /> },
  { path: '/verify-otp', element: <OtpVarify /> },
  { path: '/resume', element: <ResumeMakerHome /> },
  { path: '/editor', element: <ResumeForm /> },
  { path: '/coverhome', element: <Coverhome /> },
  { path: '/ppthome', element: <Ppthome /> },
  { path: '/pptmaker', element: <PPTmaker /> },
  { path: '/dochome', element: <Dochome /> },
  { path: '/doc', element: <Doc /> },
  { path: '/excelhome', element: <Excelhome /> },
  { path: '/excel', element: <Excel /> },
  { path: '/writtenTest', element: <WrittenTestHome /> },
  { path: '/consult', element: <Consult /> },
];

const protectedRoutes = [
  { path: '/un', element: <Un /> },
  { path: '/priceing', element: <Upgradeplan /> },
  { path: '/emb', element: <Emb /> },
  { path: '/donor', element: <Donor /> },
  { path: '/dbhome', element: <Dbhome /> },
  { path: '/matchhome', element: <Matchhome /> },
  { path: '/qahome', element: <Qahome /> },
  { path: '/InterviewSimulator', element: <Insm /> },
  { path: '/logout', element: <Logout /> },
];


const App = memo(() => {
  const renderPublicRoutes = useCallback(
    () =>
      publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      )),
    []
  );

  const renderProtectedRoutes = useCallback(
    () =>
      protectedRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={<ProtectedRoute>{element}</ProtectedRoute>}
        />
      )),
    []
  );

  return (
    <Routes>
      {renderPublicRoutes()}
      {renderProtectedRoutes()}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
});

App.displayName = 'App';

export default App;
