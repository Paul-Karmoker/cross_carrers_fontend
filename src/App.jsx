import Home from '../src/home/home';
import { Navigate, Route, Routes } from "react-router-dom";
import Training from './Components/trainings';
import About from './Components/about';
import Contact from './Components/contact';
import Membership from './Membership/membership';
import Earn from './Components/earn';
import Ngo from './Components/ngo';
import Ingo from './Components/ingo';
import Un from './Components/un';
import Bdjobs from './Components/bdjobs';
import Intjobs from './Components/intjobs';
import Emb from './Components/emb';
import Donor from './Components/donor';
import Signin from './login/signin';
import SignUp from './login/signup';
import Dbhome from './dashboard/dbhome';
import Matchhome from './Resumebuild/matchhome';
import Qahome from './QA/qahome';
import Marqueer from './Components/marqueer';
import Marqueel from './Components/marqueel';
import Coverhome from './cl/coverhome';
import Signinhome from './login/signinhome';
import Signuphome from './login/signuphome';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthProvider';
import PPTmaker from './ppt/pptmaker'
import Ppthome from './ppt/ppthome';
import Doc from './docx/doc';
import Dochome from './docx/dochome';
import Excel from './excel/excel';
import Excelhome from './excel/excelhome';
import Terms from './Components/terms';
import Privacy from './Components/privacy';
import Consult from "./consult/consult";
import Insm from "./insm/InterviewSimulator";



function App() {
  const { user, loading } = useAuth(); // Correct usage of useAuth
  
  // Show loading state while auth is being checked
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/trainings' element={<Training/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/membership' element={<Membership/>}/>
        <Route path='/earn' element={<Earn/>}/>
        <Route path='/ngo' element={<Ngo/>}/>
        <Route path='/ingo' element={<Ingo/>}/>
        <Route path='/un' element={user ? <Un/> : <Navigate to='/signinhome'/>}/>
        <Route path='/bdjobs' element={<Bdjobs/>}/>
        <Route path='/intjobs' element={<Intjobs/>}/>
        <Route path='/emb' element={user ? <Emb/> : <Navigate to='/signinhome'/>}/>
        <Route path='/donor' element={user ? <Donor/> : <Navigate to='/signinhome'/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/dbhome' element={user ? <Dbhome/> : <Navigate to='/signinhome'/>}/>
        <Route path='/matchhome' element={user ? <Matchhome/> : <Navigate to='/signinhome'/>}/>
        <Route path='/qahome' element={user ? <Qahome/> : <Navigate to='/signinhome'/>}/>
        <Route path='/marqueer' element={<Marqueer/>}/>
        <Route path='/marqueel' element={<Marqueel/>}/>
        <Route path='/coverhome' element={<Coverhome/>}/>
        <Route path='/signinhome' element={<Signinhome/>}/>
        <Route path='/signuphome' element={<Signuphome/>}/>
        <Route path='/pptmaker' element={<PPTmaker/>}/>
        <Route path='/ppthome' element={user ? <Ppthome/> : <Navigate to='/signinhome'/>}/>
        <Route path='/doc' element={<Doc/>}/>
        <Route path='/dochome' element={<Dochome/>}/>
        <Route path='/excel' element={<Excel/>}/>
        <Route path='/excelhome' element={<Excelhome/>}/>
        <Route path='/terms' element={<Terms/>}/>
        <Route path='/privacy' element={<Privacy/>}/>
        <Route path='/consult' element={<Consult/>}/>
        <Route path='/InterviewSimulator' element={user ? <Insm/> : <Navigate to='/signinhome'/>}/>
      </Routes>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#1a1a1a',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff'
            }
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff'
            }
          }
        }}
      />
    </>
  );
}

export default App;