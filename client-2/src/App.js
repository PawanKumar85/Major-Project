import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Home,
  Page,
  Login,
  Signup,
  ForgotPassword,
  UpdatePassword,
  VerifyEmail,
  About,
  Contact,
  Dashboard,
  Catalog,
  CourseDetails,
  ViewCourse,
  Error,
} from "./pages/All_pages";

import { Navbar } from "./components/common/All_common";
import OpenRoute from "./components/core/Auth/OpenRoute";
import MyProfile from "./components/core/Dashboard/MyProfile";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Settings from "./components/core/Dashboard/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import AddCourse from "./components/core/Dashboard/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";

import { ACCOUNT_TYPE } from "./utils/constants";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Page title="Home">
              <Home />
            </Page>
          }
        />
        <Route
          path="/catalog/:catalogName"
          element={
            <Page title="Catalog">
              <Catalog />
            </Page>
          }
        />
        <Route
          path="/courses/:courseId"
          element={
            <Page title="Course Details">
              <CourseDetails />
            </Page>
          }
        />

        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Page title="Signup">
                <Signup />
              </Page>
            </OpenRoute>
          }
        />
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Page title="Login">
                <Login />
              </Page>
            </OpenRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              <Page title="Forgot Password">
                <ForgotPassword />
              </Page>
            </OpenRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <Page title="Verify Email">
                <VerifyEmail />
              </Page>
            </OpenRoute>
          }
        />
        <Route
          path="/update-password/:id"
          element={
            <OpenRoute>
              <Page title="Update Password">
                <UpdatePassword />
              </Page>
            </OpenRoute>
          }
        />

        <Route
          path="/about"
          element={
            <Page title="About">
              <About />
            </Page>
          }
        />
        <Route
          path="/contact"
          element={
            <Page title="Contact">
              <Contact />
            </Page>
          }
        />

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route
            path="/dashboard/my-profile"
            element={
              <Page title="My Profile">
                <MyProfile />
              </Page>
            }
          />
          <Route
            path="/dashboard/settings"
            element={
              <Page title="Settings">
                <Settings />
              </Page>
            }
          />

          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="/dashboard/cart"
                element={
                  <Page title="Cart">
                    <Cart />
                  </Page>
                }
              />
              <Route
                path="/dashboard/enrolled-courses"
                element={
                  <Page title="Enrolled Courses">
                    <EnrolledCourses />
                  </Page>
                }
              />
            </>
          )}

          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route
                path="/dashboard/instructor"
                element={
                  <Page title="Instructor Dashboard">
                    <Instructor />
                  </Page>
                }
              />
              <Route
                path="/dashboard/add-course"
                element={
                  <Page title="Add Course">
                    <AddCourse />
                  </Page>
                }
              />
              <Route
                path="/dashboard/my-courses"
                element={
                  <Page title="My Courses">
                    <MyCourses />
                  </Page>
                }
              />
              <Route
                path="/dashboard/edit-course/:courseId"
                element={
                  <Page title="Edit Course">
                    <EditCourse />
                  </Page>
                }
              />
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
            <Route
              path="/view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
              element={
                <Page title="View Course">
                  <VideoDetails />
                </Page>
              }
            />
          )}
        </Route>

        <Route
          path="*"
          element={
            <Page title="404 - Not Found">
              <Error />
            </Page>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
