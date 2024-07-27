import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Register from './components/Register/Register.jsx'
import Login from './components/Login/Login.jsx'
import Home from './components/Home/Home.jsx'
import Protectd from './components/Protected/Protected.jsx'
import Menu from './components/Menu/Menu.jsx'
import Cart from './components/Cart/Cart.jsx'
import axios from 'axios'
import OrderResult from './components/OrderResult/OrderResult.jsx'
import Merchant from './components/Merchant/Merchant.jsx'
import M_Login from './components/Merchant/Login/M_Login.jsx'
import M_register from './components/Merchant/Register/M_Register.jsx'
import MyOrders from './components/MyOrders/MyOrders.jsx'
import PaymentSuccess from './components/OrderResult/PaymentSuccess.jsx'
import PaymentFailure from './components/OrderResult/PaymentFailure.jsx'
import Completed from './components/Merchant/Completed/Completed.jsx'
import Rejected from './components/Merchant/Rejected/Rejected.jsx'
import EmailVerifySuccess from './components/Register/EmailVerifySuccess.jsx'
import EmailVerifyFailure from './components/Register/EmailVerifyFailure.jsx'
const router = createBrowserRouter([
  {
    path:"/",
    element:<App />,
    children:[
      {
        path:"",
        element:<Home />
      },
      {
        path:"register",
        element:<Register />
      },
      {
        path:"login",
        element:<Login />
      },
      {
        path:"menu",
        element:<Menu />,
      },
      {
        path:"cart",
        element:<Cart />
      },
      {
        path:"OrderResult",
        element:<OrderResult />
      },
      {
        path:"PaymentSuccess",
        element:<PaymentSuccess />
      },
      {
        path:"PaymentFailure",
        element:<PaymentFailure />
      },
      {
        path:"merchant",
        element:<Merchant />
      },
      {
        path:"m_login",
        element:<M_Login />
      },
      {
        path:"m_register",
        element:<M_register />
      },
      {
        path:"myorders",
        element:<MyOrders />
      },
      {
        path:"completed",
        element:<Completed />
      },
      {
        path:"rejected",
        element:<Rejected />
      },
      {
        path:"email_verify_success",
        element:<EmailVerifySuccess />
      },
      {
        path:"email_verify_failed",
      element:<EmailVerifyFailure />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>,
)
