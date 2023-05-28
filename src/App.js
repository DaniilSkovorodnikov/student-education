import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/authorization/LoginPage";
import AuthGuard from "./components/AuthGuard";
import RoleGuard from "./components/RoleGuard";
import {AuthProvider} from "./context/AuthContext";
import RoleNavigation from "./components/RoleNavigation";
import RegistrationPage from "./pages/authorization/RegistrationPage";
import UserLayout from "./components/UserLayout";
import TutorsPage from "./pages/student/TutorsPage";
import StudentTutorPage from "./pages/student/StudentTutorPage";
import StudentOrders from "./pages/student/StudentOrders";
import StudentCreateOrder from "./pages/student/StudentCreateOrder";
import StudentEditProfilePage from "./pages/student/StudentEditProfilePage";
import StudentOrderPage from "./pages/student/StudentOrderPage";
import ProfilePage from "./pages/ProfilePage";
import ExpertOrders from "./pages/expert/ExpertOrders";
import StudentMain from "./pages/student/StudentMain";
import ExpertMain from "./pages/expert/ExpertMain";

function App() {

    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route element={<AuthGuard/>}>
                        <Route path='/' element={<RoleNavigation/>}/>
                        <Route element={<UserLayout/>}>
                            <Route element={<RoleGuard correctRole='student'/>}>
                                    <Route path='/student' element={<StudentMain/>}/>
                                    <Route path='/student/profile/edit' element={<StudentEditProfilePage/>}/>
                                    <Route path='/tutors' element={<TutorsPage/>}/>
                                    <Route path='/tutor/:id' element={<StudentTutorPage/>}/>
                                    <Route path='/student/orders' element={<StudentOrders/>}/>
                                    <Route path='/student/order/:id' element={<StudentOrderPage/>}/>
                                    <Route path='/student/order/create' element={<StudentCreateOrder/>}/>
                            </Route>
                            <Route element={<RoleGuard correctRole='expert'/> }>
                                <Route path='/expert' element={<ExpertMain/>}/>
                                <Route path='/expert/profile/edit' element={<div>Expert works</div>}/>
                                <Route path='/expert/order/:id' element={<ExpertOrders/>}/>
                            </Route>
                            <Route path={'/profile/:id'} element={<ProfilePage/>}/>
                        </Route>
                    </Route>
                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path='/registration' element={<RegistrationPage/>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
);
}

export default App;
