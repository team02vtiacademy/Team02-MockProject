import async from "../components/Async";

import {
  Bell as Bellicon,
  Monitor as MonitorIcon,
  Sliders as SlidersIcon,
  Users as UsersIcon,
  Film,
  CheckCircle,
  Home
} from "react-feather";

// Landing
import Landing from "../pages/landing/Landing";

// Auth
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ResetPassword from "../pages/auth/ResetPassword";
import Page404 from "../pages/auth/Page404";
import Page500 from "../pages/auth/Page500";

// Layouts
import Boxed from "../pages/layouts/Boxed";
import SidebarCollapsed from "../pages/layouts/SidebarCollapsed";
import SidebarSticky from "../pages/layouts/SidebarSticky";
import ThemeClassic from "../pages/layouts/ThemeClassic";
import ThemeCorporate from "../pages/layouts/ThemeCorporate";
import ThemeModern from "../pages/layouts/ThemeModern";
// Notifications
import Notifications from "../pages/notifications/Notifications";
// Pages
import Profile from "../pages/pages/Profile";
import Settings from "../pages/pages/Settings";
// Auth
import NewPassword from "../pages/auth/NewPassword";
import withAuth from "../HOC/withAuth";

//films
import AddFilmPage from "../pages/film/AddFilmPage";
import UpdateFilmPage from "../pages/film/UpdateFilmPage";

const FilmManager = async(() => import("../pages/film/Film"));

// Dashboards
const Default = async(() => import("../pages/dashboards/Default"));
// Icons

// groups
const User = async(() => import("../pages/user/User"));
const Schedule = async(() => import("../pages/schedule/Schedule"));


//

// Routes
const landingRoutes = {
  path: "/admin",
  name: "Landing Page",
  component: Landing,
  children: null
};

const dashboardRoutes = {
  path: "/admin",
  name: "Home",
  header: "Pages",
  badgeColor: "primary",
  badgeText: "5",
  icon: Home,
  containsHome: true,
  component: Default,
  // children: [
  //   {
  //     path: "/",
  //     name: "Default",
  //     component: Default
  //   }
   
  // ]
};

const redirectUserPage = {
  path: "/",
  name: "User Page",
  icon: Home
};

// const groupRoutes = {
//   path: "/groups",
//   name: "Group Management",
//   icon: ListIcon,
//   component: withAuth(Group),
//   children: null
// };

const addFilmRoutes = {
  path: "/admin/films/add",
  name: "Add film",
  icon: Film,
  component: withAuth(AddFilmPage),
  children: null
};

const updateFilmRoutes = {
  path: "/admin/films/:id",
  name: "Update film",
  icon: Film,
  component: withAuth(UpdateFilmPage),
  children: null
}

const filmRoutes = {
  path: "/admin/films",
  name: "Film Manager",
  icon: Film,
  component: withAuth(FilmManager),
  children: null
};

const userRoutes = {
  path: "/admin/users",
  name: "User Manager",
  icon: UsersIcon,
  component: withAuth(User),
  children: null
};
const scheduleRoutes = {
  path: "/admin/film-schedules",
  name: "Schedule Manager",
  icon: CheckCircle,
  component: withAuth(Schedule),
  children: null
};


const authRoutes = {
  path: "/auth",
  name: "Auth",
  icon: UsersIcon,
  badgeColor: "secondary",
  badgeText: "Special",
  children: [
    {
      path: "/sign-in",
      name: "Sign In",
      component: SignIn
    },
    {
      path: "/sign-up",
      name: "Sign Up",
      component: SignUp
    },
    {
      path: "/reset-password",
      name: "Reset Password",
      component: ResetPassword
    },
    {
      path: "/new-password/:token",
      name: "New Password",
      component: NewPassword
    },
    {
      path: "/404",
      name: "404 Page",
      component: Page404
    },
    {
      path: "/500",
      name: "500 Page",
      component: Page500
    }
  ]
};

const layoutRoutes = {
  path: "/layouts",
  name: "Layouts",
  icon: MonitorIcon,
  children: [
    {
      path: "/layouts/sidebar-sticky",
      name: "Sticky Sidebar",
      component: SidebarSticky
    },
    {
      path: "/layouts/sidebar-collapsed",
      name: "Sidebar Collapsed",
      component: SidebarCollapsed
    },
    {
      path: "/layouts/boxed",
      name: "Boxed Layout",
      component: Boxed
    },
    {
      path: "/layouts/theme-classic",
      name: "Classic Theme",
      component: ThemeClassic
    },
    {
      path: "/layouts/theme-corporate",
      name: "Corporate Theme",
      component: ThemeCorporate,
      badgeColor: "primary",
      badgeText: "New"
    },
    {
      path: "/layouts/theme-modern",
      name: "Modern Theme",
      component: ThemeModern,
      badgeColor: "primary",
      badgeText: "New"
    }
  ]
};

const notificationsRoutes = {
  path: "/notifications",
  name: "Notifications",
  icon: Bellicon,
  component: Notifications,
  children: null
};


// This route is not visisble in the sidebar
const ProfileRoutes = {
  path: "/profile",
  name: "Profile",
  component: withAuth(Profile),
  children: null
};

// This route is not visisble in the sidebar
const SettingsRoutes = {
  path: "/settings",
  name: "Settings",
  component: withAuth(Settings),
  children: null
};

// Dashboard specific routes
export const dashboard = [
  //addAccountAdminRoutes,
  addFilmRoutes,
  updateFilmRoutes,
  filmRoutes,
  dashboardRoutes,
  //groupRoutes,
  userRoutes,
  scheduleRoutes,
  //pageRoutes,
  layoutRoutes,
  ProfileRoutes,
  SettingsRoutes
];

// Landing specific routes
export const landing = [landingRoutes];

// Auth specific routes
export const page = [authRoutes];

// All routes
export default [
  //addAccountAdminRoutes,
  //addFilmRoutes,
  //updateFilmRoutes,
  // dashboardRoutes,
  redirectUserPage,
  //groupRoutes,
  filmRoutes,
  userRoutes,
  scheduleRoutes,
  // pageRoutes,
  //authRoutes,
  
];
