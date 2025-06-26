import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Main-Component/Home';
import AuthRoutes from '../Routes/UserRoutes';
import CourseRoutes from '../Routes/CourseRoutes';
import { Navbar } from './Main-Component/Navbar';
import Footer from './Main-Component/Footer';
import TrainerRoutes from './TrainerComponents/TrainerRoutes';
import  AdminRoutes  from './Admin/AdminRoutes';
import BuyCourse from './Payment_Service/BuyCourse';


function App() {
  const location = useLocation();
  const hiddenLayoutRoutes = ['/login', '/signup','forgot-password/', '/trainer','/admin'];
  const shouldHideNavbar = hiddenLayoutRoutes.some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer position="top-right" />

      {!shouldHideNavbar && <Navbar />}

      {/* Main content area grows to fill space */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          {AuthRoutes}
          {CourseRoutes}
          {TrainerRoutes}
          {AdminRoutes}
          <Route path='buybutton/' element={<BuyCourse/>}/>
        </Routes>
        
        
      </main>

      {!shouldHideNavbar && <Footer />}
    </div>
  );
}

export default App;
