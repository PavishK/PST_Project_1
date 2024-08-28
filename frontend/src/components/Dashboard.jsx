import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { ToastContainer, toast,Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
import Arrow from '../assets/rightarrow.png';

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const navigate=useNavigate(null);
  const myRef=useRef();
  const OnScroll=()=>{
    myRef.current.scrollIntoView({behavior:'smooth'});
  }

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get('http://localhost:5000/api/books');
      setBooks(response.data);
    };
    fetchBooks();
  }, []);

  return (<>


  <div className="home-container">
    <h1>BookSea</h1>
    <p>Here you can view and recommend books.</p>
    <div className="btn-container">
      <button onClick={OnScroll}>View books</button>
      <button onClick={()=>navigate('/add-book')}>Add book 
      <img src={Arrow} alt='none' style={{height:'20px',padding:'1px',margin:"0 0 0 10px"}}/>
      </button>
      
    </div>
  </div>




  <h1 className='addbook-title' ref={myRef}>Recommended by users.</h1>

<center className='addbook-holder'>
  <div className='addbook-container'>
    {books.map((book,key)=>(
      <div key={key} className='addbook-item'>
        <center>{book.title}</center>
        <p><b>Author :</b> {book.author}</p>
        <p>{book.description} lor</p>
        <a  href={`http://localhost:5000/uploads/${book.samplePdf}`} download="sample.pdf" >View Sample PDF</a>
      </div>
    ))}
  </div>
  </center>
  
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

export default Dashboard;
