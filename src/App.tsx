import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/HomePage";
import AppLayout from "./layouts/AppLayout";
import DraftsPage from "./pages/DraftsPage";
import BookmarksPage from "./pages/BookmarksPage";
import LikesPage from "./pages/LikesPage";
import NotificationPage from "./pages/NotificationPage";
import ProfilePage from "./pages/ProfilePage";
import PostDetail from "./features/Post/PostDetail";
import LoginForm from "./features/Authentication/LoginForm";
import SignupForm from "./features/Authentication/SignupForm";
import ForgotPasswordForm from "./features/Authentication/ForgotPasswordForm";
import EmailVerification from "./features/Authentication/EmailVerify";
import ResetPasswordPage from "./features/Authentication/ResetPassword";
import UpdatePage from "./pages/UpdatePage";
import UserPostsPage from "./pages/UserPostsPage";
import NewPostPage from "./pages/NewPostPage";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import ErrorFallback from "./ui/ErrorFallback";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
});

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route errorElement={<ErrorFallback />}>
        {/* Public Routes */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/forgotpassword" element={<ForgotPasswordForm />} />
        <Route path="/verify-email/:token" element={<EmailVerification />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/posts/:slug" element={<PostDetail />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/updatedata" element={<UpdatePage />} />
            <Route path="/drafts" element={<DraftsPage />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
            <Route path="/likes" element={<LikesPage />} />
            <Route path="/userposts" element={<UserPostsPage />} />
            <Route path="/notification" element={<NotificationPage />} />
            <Route path="/createpost" element={<NewPostPage />} />

            <Route path="/profile" element={<ProfilePage />}>
              <Route path="/profile/likes" element={<LikesPage />} />
              <Route path="/profile/drafts" element={<DraftsPage />} />
              <Route path="/profile/userposts" element={<UserPostsPage />} />
            </Route>
          </Route>
        </Route>
      </Route>
    )
  );
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster
          position="top-right" // You can customize this
          toastOptions={{
            duration: 4000,
            style: {
              background: "#333",
              color: "#fff",
            },
          }}
        />
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
