import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/MainLayout";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Instructors from "../pages/Instructors/Instructors";
import Classes from "../pages/Classes/Classes";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import MyClass from "../pages/Dashboard/MyClass/MyClass";
import AddClass from "../pages/Dashboard/AddClass/AddClass";
import ManageClass from "../pages/Dashboard/Manage/ManageClass";
import MySelectedClass from "../pages/Dashboard/MySelectedClass/MySelectedClass";
import Payment from "../pages/Dashboard/Payment/Payment";
import EnrolledStudent from "../pages/Dashboard/EnrolledStudent/EnrolledStudent";
import PaymentHistory from "../components/PaymentHistory/PaymentHistory";
import AdminRoute from "./AdminRoute";



export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<PageNotFound></PageNotFound>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'/register',
            element:<Register></Register>
        },
        {
          path:'instructors',
          element:<Instructors></Instructors>
        },
        {
          path:'classes',
          element:<Classes></Classes>
        }
      ]
    },
    {
      path: '/dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children:[
        {
          path:'allusers',
          element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
        },
        {
          path:'myclasses',
          element:<MyClass></MyClass>
        },
        {
          path:'addaclass',
          element:<AddClass></AddClass>
        },
        {
          path:'manageclass',
          element:<AdminRoute><ManageClass></ManageClass></AdminRoute>
        },
        {
          path:'myselectedclass',
          element:<MySelectedClass></MySelectedClass>
        },
        {
          path:'payment/:id',
          element:<Payment></Payment>
        },
        {
          path:'enrollstudent',
          element:<EnrolledStudent></EnrolledStudent>
        },
        {
          path:'paymenthistory',
          element:<PaymentHistory></PaymentHistory>
        }
      ]
    }
  ]);