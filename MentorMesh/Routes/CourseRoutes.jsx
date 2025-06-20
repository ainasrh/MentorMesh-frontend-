import { Route, Routes } from "react-router-dom";
import { Courses } from "../src/CourseService/Courses";
import { CreateCourse } from "../src/CourseService/CreateCourse";
import { CreateVideo } from "../src/CourseService/CreateVideo";
import { ViewCourse } from "../src/CourseService/ViewCourse";
export default (
    <>
    <Route path="courses/" element={<Courses/>}/> 
    <Route path="courses/:courseid" element={<ViewCourse/>}/>
    <Route path="create-course/" element={<CreateCourse/>}/>
    <Route path="create-video/" element={<CreateVideo/>} />

    </>
)