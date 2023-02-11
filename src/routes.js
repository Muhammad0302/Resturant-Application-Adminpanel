// import { Router } from "@mui/icons-material";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import AdminPanel from "./layout/Adminpnel/AdminPanel";

import Main from "./layout/Adminpnel/Main";

import LoginForm from "./components/Login_Screens/loginform/LoginForm";
import ResetPass from "./components/Login_Screens/resetPasswordComponent/ResetPass";
import ResetByMail from "./components/Login_Screens/resetPasswordComponent/ResetPassword/ResetByMail";
import SendOtp from "./components/Login_Screens/resetPasswordComponent/ResetPassword/SendOtp";
import NewPassword from "./components/Login_Screens/resetPasswordComponent/ResetPassword/NewPassword";
import Available from "./components/Reservations/Available/Available";
import ReservationDetails from "./layout/pages/reservationDetails/ReservationDetails";
import Expired from "./components/Reservations/Exp/Expired/Expired";
import Sold from "./components/Reservations/Sold/Sold";
import AddReservation from "./components/AddingReservations/AddNewReservation";

import City from "./components/Cities/City";
import AddingCities from ".//components/AddingCities/AddingCities";

import Restaurants from "./components/Restaurents/Restaurants";
import AddingRestaurant from "./components/AddinngRestaurant/AddingRestaurant";
import ContactUs from "./components/ContactUs/ContactUs";
import Users from "./components/Users/Users";
import PaymentDetails from "./components/Users/PaymentDetails/PaymentDetails";
import ReservationDetail from "./components/Users/ReservationDetails/ReservationDetail";
import CancelPage from "./..//src//layout//pages//Cancel";
import Thankyou from "./..//src//layout//pages//Thankyou";
import Congratulations from "./layout/pages/Congratulations";
import CongratulationsReservationPurchased from "./layout/pages/CongratulationsReservationPurchased";
import RefreshPage from "./layout/pages/RefreshPage";
import ReturnPage from "./layout/pages/ReturnPage";
// import PaymentRequest from "./components/Payment Request/PaymentRequest";
import  {isLogin}  from "./utils/isLogin";
import TermsAndConditions from "./layout/pages/TermsAndConditions";
function createRoutes() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/Congratulations" element={<Congratulations />} />
        <Route
          path="/CongratulationsReservationPurchased"
          element={<CongratulationsReservationPurchased />}
        />
        <Route path="/RefreshPage" element={<RefreshPage />} />
        <Route path="/ReturnPage" element={<ReturnPage />} />
        <Route path="/TermsAndConditions" element={<TermsAndConditions />} />

        <Route
          path="/addreservation/"
          element={
            <AdminPanel showTitle={false} childComp={<AddReservation />} />
          }
        />

        <Route
          path="/resetPassword"
          element={<ResetPass flag={false} childComp={<ResetByMail />} />}
        />
        <Route
          path="/sendOtp"
          element={<ResetPass flag={true} childComp={<SendOtp />} />}
        />
        <Route
          path="/newpassword"
          element={<ResetPass flag={false} childComp={<NewPassword />} />}
        />

        {/* <Route path="/" element={<ResetPass />}/> */}

        <Route
          path="/available"
          element={
            <AdminPanel
              showTitle={true}
              childComp={
                <Main
                  flag={true}
                  menuSelected="reservation"
                  childComp={<Available />}
                />
              }
            />
          }
        />
        <Route
          path="/user"
          element={
            <AdminPanel
              showTitle={true}
              childComp={
                <Main
                  flag={false}
                  menuSelected="reservation"
                  childComp={<Users />}
                />
              }
            />
          }
        />
        <Route
          path="/paymentdetails"
          element={
            <AdminPanel
              showTitle={true}
              childComp={
                <Main
                  flag={false}
                  menuSelected="reservation"
                  childComp={<PaymentDetails />}
                />
              }
            />
          }
        />
        <Route
          path="/reservationdetails"
          element={
            <AdminPanel
              showTitle={true}
              childComp={
                <Main
                  flag={false}
                  menuSelected="reservation"
                  childComp={<ReservationDetail />}
                />
              }
            />
          }
        />
        <Route
          path="/sold"
          element={
            <AdminPanel
              showTitle={true}
              childComp={
                <Main
                  flag={true}
                  menuSelected="reservation"
                  childComp={<Sold />}
                />
              }
            />
          }
        />
        <Route
          path="/expired"
          element={
            <AdminPanel
              showTitle={true}
              childComp={<Main menuSelected="" childComp={<Expired />} />}
            />
          }
        />
        <Route
          path="/city"
          element={
            <AdminPanel
              showTitle={true}
              childComp={
                <Main menuSelected="city" flag={true} childComp={<City />} />
              }
            />
          }
        />
        <Route
          path="/addcity"
          element={
            <AdminPanel
              showTitle={true}
              childComp={<Main flag={false} childComp={<AddingCities />} />}
            />
          }
        />
        <Route
          path="/restaurants"
          element={
            <AdminPanel
              showTitle={true}
              childComp={
                <Main
                  menuSelected="restaurants"
                  flag={true}
                  childComp={<Restaurants />}
                />
              }
            />
          }
        />
        <Route
          path="/addrestaurants"
          element={
            <AdminPanel
              showTitle={true}
              childComp={
                <Main
                  flag={false}
                  childComp={<AddingRestaurant flag={false} />}
                />
              }
            />
          }
        />

        <Route
          path="/contactus"
          element={
            <AdminPanel
              showTitle={true}
              childComp={
                <Main
                  flag={false}
                  childComp={<ContactUs flag={false} />}
                />
              }
            />
          }
        />



        {/* <Route
          path="/paymentrequest"
          element={
            <AdminPanel
              showTitle={true}
              childComp={<Main childComp={<PaymentRequest />} />}
            />
          }
        /> */}
        <Route path="/checkout/success" element={<Thankyou />} />
        <Route path="/checkout/cancel" element={<CancelPage />} />
        <Route
          path="/checkout/reservationdetails"
          element={<ReservationDetails />}
        />
      </Routes>
    </Router>
  );
}

export default createRoutes;
