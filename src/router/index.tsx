import { createBrowserRouter } from "react-router-dom";
import { paths } from "./paths";
import { Layout } from "../components/layout/Layout";
import { AuthPage } from "../pages/auth/AuthPage";
import { PostsPage } from "../pages/posts/PostsPage";
import { CurrentPostPage } from "../pages/current/CurrentPage";
import { UserProfilePage } from "../pages/user-profile/UserProfilePage";
import { FollowersPage } from "../pages/followers/FollowersPage";
import { FollowingPage } from "../pages/following/FollowingPage";

export const routerPath = createBrowserRouter(
[
  {
    path: paths.auth,
    element: <AuthPage/>
  },
  {
    path: paths.home,
    element: <Layout/>,
    children: [
      {
        path: '',
        element: <PostsPage/>
      },
      {
        path: 'post/:id',
        element: <CurrentPostPage/>
      },
      {
        path: 'users/:id',
        element: <UserProfilePage/>
      },
      {
        path: 'followers',
        element: <FollowersPage/>
      },
      {
        path: 'following',
        element: <FollowingPage/>
      },
    ]
  },
])