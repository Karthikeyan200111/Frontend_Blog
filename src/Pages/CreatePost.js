import { enqueueSnackbar } from 'notistack';
import React, { useState } from 'react'

import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';
import Editor from '../Editor';

//https://backend-golb.onrender.com/


const CreatePost = () => {

  const[title,setTitle]=useState('')
  const[content,setContent]=useState('')
  const[summary,setSummary]=useState('');
  const[files,setFiles]=useState('')
  const[redirect,setRedirect]=useState(false)
  

  async function createPost(e) {
    e.preventDefault();
  
    const data = new FormData();
    data.set('title', title);
    data.set('content', content);
    data.set('summary', summary);
  
    if (files && files.length > 0) {
      data.set('files', files[0]);
    }
    for (const [key, value] of data.entries()) {
      console.log(`${key}: ${value}`);
    }
  
    try {
      const response = await fetch(`https://backend-golb.onrender.com/posts`, {
        method: 'POST',
        body: data,
        credentials: 'include'
      });
      console.log(response)
      const responseData = await response.json();
      console.log(responseData)
  
      if (response.ok) {
        enqueueSnackbar("Posted Successfully...", { variant: 'success', autoHideDuration: 2000 });
        setRedirect(true);
      } else if (responseData.error === "No file uploaded") {
        enqueueSnackbar("Please upload a Photo to Post...", { variant: 'error', autoHideDuration: 2000 });
      } else {
        // Handle other error scenarios
        console.error("Error in the response:", responseData.error);
        enqueueSnackbar("An error occurred. Please try again.", { variant: 'error', autoHideDuration: 2000 });
      }
    } catch (error) {
      console.error("Error:", error.message);
      enqueueSnackbar("An unexpected error occurred. Please try again.", { variant: 'error', autoHideDuration: 2000 });
    }
  }
  
  if(redirect){
    return <Navigate to={'/'} />
  }

  return (
    <div className='w-full '>
        <form onSubmit={createPost}>

            <input type="text" 
            placeholder='Title'
             className='md:my-4 w-full md:p-3 border-b-2 p-2'
             value={title}
             required
             onChange={(e)=>setTitle(e.target.value)}
               />

            <input type={'text'} 
             placeholder='Summary' 
             className='my-4 w-full md:p-3 border-b-2 p-2 '
             value={summary}
             required
             onChange={(e)=>setSummary(e.target.value)}
             />

            <input type={'file'} 
            className='my-6 w-full md:p-3 p-0  '
            onChange={(e)=>setFiles(e.target.files)}
             />
            <Editor value={content}
                onChange={setContent}
                required />

            <button className='bg-slate-600 px-4 py-2 my-5 rounded text-white w-full ease-in duration-300' type='submit'>Post</button>
        </form>
    </div>

  )
}

export default CreatePost