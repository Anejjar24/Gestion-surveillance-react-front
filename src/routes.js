
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Sessions from "layouts/sessions";
import Billing from "layouts/billing";
import VirtualReality from "layouts/virtual-reality";
import RTL from "layouts/rtl";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";

import Departments from "layouts/departments";
import Locals from "layouts/locals";
import Professors from "layouts/professors";
import Surveillances from "layouts/surveillances";
import Exams from "layouts/exams";
import Options from "layouts/options";


import { TbBuildingWarehouse } from "react-icons/tb";
import { BiBuildingHouse } from "react-icons/bi";
import { GiTeacher } from "react-icons/gi";
import { FaClipboardList } from "react-icons/fa";
import { BsFillBuildingsFill } from "react-icons/bs";
import { RiCalendarScheduleFill } from "react-icons/ri";



const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="25px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Departments",
    key: "departments",
    route: "/departments",
    icon:  <BsFillBuildingsFill size="20px"/>,
    component: <Departments />,
    noCollapse: true,
  },{
    type: "route", // Nouveau route par défaut
    name: "Sign Up",
    key: "sign-up-default",
    route: "/", // Route racine
    component: <SignUp />,
  },
  
  {
    type: "collapse",
    name: "Locals",
    key: "locals",
    route: "/locals",
    icon:  <TbBuildingWarehouse size="20px"/>,
    component: <Locals />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "Professors",
  //   key: "professors",
  //   route: "/professors",
  //   icon:  <GiTeacher size="20px"/>,
  //   component: <Professors />,
  //   noCollapse: true,
  // },

  {
    type: "route",
    name: "Professors",
    key: "professors",
    route: "/professors/:departmentId", // Add parameter for department
    
    component: <Professors />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Exams",
    key: "exams",
    route: "/exams",
    icon:  <FaClipboardList size="20px"/>,
    component: <Exams />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Surveillances",
    key: "surveillances",
    route: "/surveillances",
    icon:  <RiCalendarScheduleFill size="20px"/>,
    component: <Surveillances />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Options",
    key: "options",
    route: "/options",
    icon:  <Settings size="20px"/>,
    component: <Options />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    route: "/tables",
    icon: <Office size="20px" />,
    component: <Tables />,
    noCollapse: true,
  },
 

  {
    type: "route", // Changez le type
    name: "Sessions",
    key: "sessions",
    route: "/sessions",
    component: <Sessions />,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    route: "/billing",
    icon: <CreditCard size="20px" />,
    component: <Billing />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Virtual Reality",
    key: "virtual-reality",
    route: "/virtual-reality",
    icon: <Cube size="20px" />,
    component: <VirtualReality />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "RTL",
    key: "rtl",
    route: "/rtl",
    icon: <Settings size="20px" />,
    component: <RTL />,
    noCollapse: true,
  },
  { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="20px" />,
    component: <Profile />,
    noCollapse: true,
  },
  
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <SpaceShip size="20px" />,
    component: <SignUp />,
    noCollapse: true,
  },
];

export default routes;
