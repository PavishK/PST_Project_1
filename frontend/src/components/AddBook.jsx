import React, { useState } from 'react';
import axios from 'axios';
import './style.css';
import { ToastContainer, toast,Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [samplePdf, setSamplePdf] = useState(null);
  const navigate=useNavigate(null);
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
    if(title=="" || author==""|| description==""){
      MakeToastNegative("Fill the fields!");
    }
    else{
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('description', description);
    formData.append('samplePdf', samplePdf);

    try {
      await axios.post('http://localhost:5000/api/books', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      MakeToastPosotive("Book details added!");
      setTitle('');
      setAuthor('');
      setDescription('');
      setSamplePdf(null);
    } catch (error) {
      console.error(error);
      MakeToastNegative("Error in adding Book details.");
    }
  }
  };

  return (
    <>
    <center><h1>Booksea</h1></center>
    <div className="addbookcontainer">
    <form onSubmit={handleSubmit}>
    <h1>Add Book.</h1>
      <input className='addbookitem' type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required /><br/>
      <input className='addbookitem' type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" required /><br/>
      <textarea className='addbookitem' value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required></textarea><br/>
      <center><div className='upload-filecontainer'><input className='upload-pdf' name='file' id='file' type="file" accept='application/pdf' onChange={(e) => setSamplePdf(e.target.files[0])} />
        <label for='file' className='upload-file-org'>Choose pdf</label>
        </div></center><br/>
     <center className='container-pb'><button className='login-btn' type="submit">Add Book</button>
     <p onClick={()=>navigate('/home/dashboard')}>{"<<"}Go to Home{">>"}</p></center> 
    </form>
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

export default AddBook;
