import { BrowserRouter,Route, Router, Routes } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Home from './Main-Component/Home'
import AuthRoutes from '../Routes/AuthRoutes';
import CourseRoutes from '../Routes/CourseRoutes';
import { Navbar } from './Main-Component/Navbar';
import Footer from './Main-Component/Footer';

function App() {
  return (
    <>
    <ToastContainer position='top-right'/>
  
    <Navbar/>
    <Routes>
    <Route path="/" element={<Home />} />
    {AuthRoutes}
    {CourseRoutes}
    
  </Routes>

    
    </>
  )
}

export default App
