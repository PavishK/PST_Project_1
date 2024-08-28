import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast,Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCpassword] = useState('');
  const navigate = useNavigate();

  const MakeToastNegative=(msg)=>{
    toast.error(msg, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
      });
  }

  const MakeToastPosotive=(msg)=>{
    toast.success(msg, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
      });
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password!=cPassword){
      MakeToastNegative("Password not Matching!");
    }
      else if(password.length<8 || password.length>15){
        MakeToastNegative("Password length must between 8 and 15");
      }
      else{
    try {
      await axios.post('http://localhost:5000/api/auth/register', { email, password });
      MakeToastPosotive("Registered successfully!");
      navigate('/home/dashboard');
    } catch (error) {
      MakeToastNegative("Invalid Email or password");
      console.error(error);
    }
  }
  };


  return (
    <>
      <div className='form-body'> 
        <center className='Heading-first'>BookSea</center>
    <div className='login-cintainer'>
    <form onSubmit={handleSubmit}>
    <h1>Register.</h1>
      <input className='login-item' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required/><br/>
      <input className='login-item' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/><br/>
      <input className='login-item' type="password" value={cPassword} onChange={(e) => setCpassword(e.target.value)} placeholder="Confirm Password" required/><br/>
      <center><button className='login-btn' type="submit">Register</button>
      <p className='goto-signup'>Already have an account ? <span className='hyper' onClick={()=>navigate("/")} >Login</span></p></center>
    </form>
    </div>
    </div>
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      limit={2}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition: Slide
      />
    </>
  );
};

export default Register;
