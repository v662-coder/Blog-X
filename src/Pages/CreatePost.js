import React, { useState, useEffect } from 'react';
import {addDoc, collection} from 'firebase/firestore';
import { db ,auth} from '../firebase-config';
import { useNavigate } from 'react-router-dom';

const CreatePost = ({isAuth}) => {
  const [title, SetTitle] =useState("");
  const [postText ,SetPostText] =useState("");
  const postCollectionRef=collection(db,"posts");
  let navigate = useNavigate();
  const createPost=async()=>{
    await addDoc(postCollectionRef,{title,postText,author:{name: auth.currentUser.displayName ,id: auth.currentUser.uid } });
    navigate("/")
  };
  useEffect(()=>{
    if(!isAuth){
      navigate("/login")
  }
    },[]);
  return (
    <div className='createPostPage'>
           <div className='cpContainer'>
             <h1>create A post</h1>
              <div className='inputGp'>
              <label>TITLE:</label>
             <input placeholder='title...' onChange={(e)=>{SetTitle(e.target.value)}}/>
              </div>
        
              <div className='inputGp'>
                <label>Post:</label>
                <textarea placeholder='post...'onChange={(e)=>{SetPostText(e.target.value)}}/>
        </div>
        <button onClick={createPost} >submit</button>
      </div>
      
    </div>
  )
}

export default CreatePost