import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Admin from "./components/Admin/Admin";
import Movies from "./components/Movies/Movies";
import Auth from "./components/Auth/Auth";
import { useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import { adminActions, userActions } from "./store";
import Booking from "./components/Bookings/Booking";
import BookingFinal from "./components/Bookings/BookingFinal";
import UserProfile from "./profile/UserProfile";
import AddMovie from "./components/Movies/AddMovie";
import AdminProfile from "./profile/AdminProfile";

function App() {
  const dispatch=useDispatch();
  const isAdminLoggedIn=useSelector((state)=>state.admin.isLoggedIn);
  const isUserLoggedIn=useSelector((state)=>state.user.isLoggedIn);
  console.log("isAdminLoggedIn",isAdminLoggedIn);//??why is this line executing when isLoggedIn value is changed
  console.log("isUserLoggedIn",isUserLoggedIn);
  useEffect(() => {
    if(localStorage.getItem("userId"))
    {
      dispatch(userActions.login());
    }
    else if(localStorage.getItem("adminId")){
      dispatch(adminActions.login());
    }
  }, [dispatch]);
  
  return (
    <div>
    <Header/>
    <section>
    <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/movies" element={<Movies/>}/>

    {!isUserLoggedIn && !isAdminLoggedIn &&
    <>
    {" "}
    <Route path="/auth" element={<Auth/>}/>
     <Route path="/admin" element={<Admin/>}/>
    </>}
    
    { isUserLoggedIn && !isAdminLoggedIn && 
    <>
    {" "}
    <Route path="/booking/:id" element={<Booking/>}/>
    <Route path="/bookingfinal/:id" element={<BookingFinal/>}/>
    <Route path="/user" element={<UserProfile/>}/>
    </>
    }

    {isAdminLoggedIn && !isUserLoggedIn && 
    <>
    {" "}
    <Route path="/user-admin" element={<AdminProfile/>}/>
    <Route path="/add" element={<AddMovie/>}/>{" "}
    </>
    }
    </Routes>
    </section>
    {/* homepage */}

    </div>
  );
}

export default App;
