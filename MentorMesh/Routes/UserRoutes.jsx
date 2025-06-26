import { Route,} from 'react-router-dom'
import { Registration } from '../src/Authentication/Registration'
import { Login } from '../src/Authentication/Login'
import { ForgotPassword } from '../src/Authentication/ForgotPassword'
import { ResetPassword } from '../src/Authentication/ResetPassword'
import { Profile } from '../src/Profile/Profile'
import { UpdateProfile } from '../src/Profile/UpdateProfile'
import { ChangePassword } from '../src/Profile/ChangePassword'
import { JoinAsTrainer } from '../src/CourseService/JoinAsTrainer'

export default (
    <>
    
    <Route path='signup/' element={<Registration/>}/>
    <Route path='login/' element={<Login/>}/>
    <Route path='forgot-password/' element={<ForgotPassword/>}/>
    <Route path='reset-password/' element={<ResetPassword/>}/>
    <Route path='profile/' element={<Profile/>}/>
    <Route path='profile/update/' element={<UpdateProfile/>}/>
    <Route path='changepassword/' element={<ChangePassword/>}/>
    <Route path='join-as-trainer/' element={<JoinAsTrainer/>}/>
    


    
    </>
)