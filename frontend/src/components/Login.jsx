import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { ToastContainer, toast,Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('username', response.data.email.split('@')[0]);
      MakeToastPosotive("Login successfull!");
      navigate('/home/dashboard');
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      MakeToastNegative("Invalid Email or password")
    }
  };

  
  return (
    <>
    <div className='form-body'>    <center className='Heading-first'>BookSea</center>
    <div className='login-cintainer'>
    <form onSubmit={handleSubmit}>
    <h1>Login.</h1>
      <input className='login-item' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" /><br/>
      <input className='login-item' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" /><br/>
      <center><button className='login-btn' type="submit">Login</button>
      <p className='goto-signup'>Don't have an account ? <span className='hyper' onClick={()=>navigate("/register")} >signup</span></p>
      </center>
      
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

export default Login;
