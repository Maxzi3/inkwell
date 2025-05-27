import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AppLayout from './layouts/AppLayout';
import DraftsPage from './pages/DraftsPage';
import BookmarksPage from './pages/BookmarksPage';
import LikesPage from './pages/LikesPage';
import NotificationPage from './pages/NotificationPage';
import ProfilePage from './pages/ProfilePage';
import CreatePost from './pages/CreatePost';
import BlogDetails from './features/Blog/BlogDetails';
import LoginForm from './features/Authentication/LoginForm';
import SignupForm from './features/Authentication/SignupForm';
import ForgotPasswordForm from './features/Authentication/ForgotPasswordForm';
import EmailVerification from './features/Authentication/EmailVerification';
import ResetPasswordPage from './features/Authentication/ResetPassword';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route >
        {/* Public Routes */}
        < Route path="/login" element={< LoginForm />} />
        < Route path="/signup" element={< SignupForm />} />
        < Route path="/forgotpassword" element={< ForgotPasswordForm />} />
        < Route
          path="/verify-email/:token"
          element={< EmailVerification />}
        />
        < Route path="/reset-password/:token" element={< ResetPasswordPage />} />


        <Route path="/" element={< AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/drafts" element={<DraftsPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/likes" element={<LikesPage />} />
          <Route path="/notification" element={<NotificationPage />} />
          <Route path="/createpost" element={<CreatePost />} />
        </Route >

      </Route >
    )
  );
  return (
    <RouterProvider router={router} />

  )
}

export default App


