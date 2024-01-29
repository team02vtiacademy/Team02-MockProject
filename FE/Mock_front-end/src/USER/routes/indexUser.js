import { lazy } from "react";

import {
    Bell as Bellicon,
    Monitor as MonitorIcon,
    Sliders as SlidersIcon,
    Users as UsersIcon,
    Film,
    CheckCircle
  } from "react-feather";

// Auth
import SignIn from "../../pages/auth/SignIn";
import SignUp from "../../pages/auth/SignUp";
import ResetPassword from "../../pages/auth/ResetPassword";
import Page404 from "../../pages/auth/Page404";
import Page500 from "../../pages/auth/Page500";
import NewPassword from "../../pages/auth/NewPassword";
// Film
import FilmInfor from "../pages/FilmInfor"
import Cart from "../pages/Cart";

const TicketView = lazy(() => import("../pages/TicketPage"));
const FilmPage = lazy(() => import("../pages/FilmsPage"));
const Schedule = lazy(() => import("../pages/ScheduleUser"));


const homeRoutes = {
    path: "/",
    name: "Film View",
    component: FilmPage,
    children: null
}

const viewFilmRoutes = {
    path: "/films",
    name: "Film View",
    component: FilmPage,
    children: null
}

const ticketViewRoutes = {
    path: "/tickets",
    name: "Ticket View",
    component: TicketView,
    children: null
};

const filmScheduleViewRoutes = {
    path: "/schedules",
    name: "Schedules View",
    component: Schedule,
    children: null
}

const filmInforViewRoutes = {
    path: "/films/:id",
    name: "FilmInfor View",
    component: FilmInfor,
    children: null
}

const ticketPriceView = {
    path: "/ticket-price",
    name: "Ticket price View",
    component: TicketView,
    children: null
}

const cartRouts = {
    path: "/cart",
    name: "Cart",
    component: Cart,
    children: null
}


export const UserHome = [ticketViewRoutes, ticketPriceView, viewFilmRoutes, filmScheduleViewRoutes, filmInforViewRoutes, cartRouts, homeRoutes];

export default [
    homeRoutes,
    filmInforViewRoutes,
    viewFilmRoutes,
    filmScheduleViewRoutes,
    ticketPriceView,
    filmInforViewRoutes,
    cartRouts
];