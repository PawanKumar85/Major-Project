import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/core/Auth/OpenRoute";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Error from "./pages/Error";
import Settings from "./components/core/Dashboard/Settings";
import { useDispatch, useSelector } from "react-redux";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import AddCourse from "./components/core/Dashboard/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.profile);

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Catalog />} />
        {/* catalog/:catalogName */}
        <Route path="/" element={<CourseDetails />} />
        {/* courses/:courseId */}
        <Route
          path="/"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        {/* signup */}

        <Route
          path="/"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        {/* login */}

        <Route
          path="/"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        {/* forgot-password */}

        <Route
          path="/"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        {/* verify-email */}

        <Route
          path="/"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        {/* update-password/:id */}

        <Route path="/" element={<About />} /> 
        {/* about */}
        <Route path="/" element={<Contact />} />
        {/* contact */}

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<MyProfile />} />
          {/* dashboard/my-profile */}

          <Route path="/" element={<Settings />} />
          {/* dashboard/Settings */}

          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="" element={<Cart />} />
              {/* dashboard/cart */}
              <Route
                path="/"
                element={<EnrolledCourses />}
              />
            </>
          )}
          {/* dashboard/enrolled-courses */}

          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="" element={<Instructor />} />  
              {/* dashboard/instructor */}
              <Route path="" element={<AddCourse />} />
              {/* dashboard/add-course */}
              <Route path="" element={<MyCourses />} />
              {/* dashboard/my-courses */}
              <Route
                path=""
                element={<EditCourse />}
              />
              {/* dashboard/edit-course/:courseId */}
            </>
          )}
        </Route>

        <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path=""
                element={<VideoDetails />}
              />
              {/* view-course/:courseId/section/:sectionId/sub-section/:subSectionId */}
            </>
          )}
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
