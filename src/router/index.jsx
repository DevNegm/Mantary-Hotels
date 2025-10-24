import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { lazyRetry } from "../utils/Helpers";
import ProtectedRoute from "./ProtectedRoute";
import UnprotectedRoute from "./UnprotectedRoute";
import Loading from "../pages/main/Loading";
import ErrorFallback from "../pages/main/ErrorFallback";
import MainLayout from "../components/layouts/MainLayout";
import AuthLayout from "../components/layouts/AuthLayout";

const Home = lazy(() => lazyRetry(() => import("../pages/main/Home")));
const Rooms = lazy(() => lazyRetry(() => import("../pages/main/Rooms")));
const Profile = lazy(() => lazyRetry(() => import("../pages/main/Profile")));
const Login = lazy(() => lazyRetry(() => import("../pages/auth/Login")));
const Signup = lazy(() => lazyRetry(() => import("../pages/auth/Signup")));
const RoomDetails = lazy(() => lazyRetry(() => import("../pages/main/RoomDetails")));

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorFallback />,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading/>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "rooms",
        element: (
          <Suspense fallback={<Loading/>}>
              <Rooms />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={<Loading/>}>
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "room/:id",
        element: (
          <Suspense fallback={<Loading/>}>
              <RoomDetails />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<Loading/>}>
            <ErrorFallback />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "auth",
    errorElement: <ErrorFallback />,
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading/>}>
            <UnprotectedRoute>
              <Login />
            </UnprotectedRoute>
          </Suspense>
        ),
      },
      {
        path: "sign-up",
        element: (
          <Suspense fallback={<Loading/>}>
            <UnprotectedRoute>
              <Signup />
            </UnprotectedRoute>
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<Loading/>}>
            <ErrorFallback />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
