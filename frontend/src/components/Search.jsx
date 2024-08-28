import React, { useState } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";
import './style.css';
import SearchImg from '../assets/search.svg';


function Search() {
  const [prompt,setPrompt]=useState("");
  const [response,setResponse]=useState("");
  const [loading,setLoding]=useState(false);
  const genAI = new GoogleGenerativeAI('AIzaSyAgbU0vD_q2t6AsRX0U-D_wXKafT3rXlpQ');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const HandleSubmit=async()=>{
    try{
      setLoding(true);
    console.log("User -> ",prompt);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("Gemini AI -> ",text);
    setResponse(text);
    setLoding(false);
    }
    catch(err){
      console.log("AI Error");
    }
    setLoding(false);
  }
  return (
    <>
  <div className='searchpage-style'>
  <div className="search-container">
  <textarea value={prompt} className='search-item' name='prompt' onChange={(e)=>setPrompt(e.target.value)} placeholder={`Search like ${"' "}Wings of fire${" '"}`}/>
    {/* <input className='search-item' type='text' name='name' value={prompt} placeholder='Search' onChange={(e)=>setPrompt(e.target.value)}/> */}
    <img src={SearchImg} style={{width:'18%',height:'40%'}} alt='Search' onClick={HandleSubmit}/>
  </div>
  <div className='response-container'>
  <center><div className={ loading? 'lodingcomponent':'dontshow'}></div></center>
    <p>{response}</p>
    </div>

  </div>

    </>
  )
}

export default Search