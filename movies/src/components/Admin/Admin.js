import React from 'react'
import AuthForm from '../Auth/AuthForm'
import { sendAdminAuthRequest } from '../../api-helpers/api-helpers';
import { useDispatch } from 'react-redux';
import { adminActions } from '../../store';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const onResRecieved=(data)=>{
    console.log(data);
    dispatch(adminActions.login());
    localStorage.setItem("token",data.token);
    localStorage.setItem("adminId",data.id);
    navigate("/");
  }
  const getData=(data)=>{
    console.log(data);
    sendAdminAuthRequest(data.inputs)
    .then(onResRecieved)
    .catch((err)=>console.log(err)); 
  }
  return (
    <div><AuthForm onSub={getData} isAdmin={true}/></div>
  )
}

export default Admin