import { Route } from "react-router-dom";
import { TrainerLayout } from "./TrainerLayout";
import { TrainerDashboard } from "./TrainerDashboard";
import { CreateCourse } from "./CreateCourse";
import { CreateVideo } from "./CreateVideo";
import { CreatedCourse } from "./CreatedCourses";
import { TrainerProfile } from "./TrainerProfile";

const TrainerRoutes = (
  <Route path="trainer/" element={<TrainerLayout />}>
    <Route path="" element={<TrainerDashboard />} />
    <Route path="create-course/" element={<CreateCourse/>}/>
    <Route path="create-video/" element={<CreateVideo/>} />
    <Route path="my-courses/" element={<CreatedCourse/>} />
    <Route path="profile/" element={<TrainerProfile/>} />
  </Route>
);

export default TrainerRoutes;
