
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./addnew.css"
function Addnew() {
  const navigate=useNavigate()
  let [task,settask]= useState("");
  let Addurl=process.env.REACT_APP_ADD;
  console.log(Addurl)
  const handleSubmit = async () => {
    
   
    if (task.trim() =="") {
      alert('Please fill in all fields');
      return;
    }
    try {
      const response = await fetch(Addurl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          activity:task
        }),
      });
      if (response.ok) {
        console.log('successful!'); 
        let data=await response.json();
       console.log(data)
          navigate("/")
        
      } else {
        console.error('failed:', response.statusText);
        alert('failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };
  return (
   
   
    <div className="Add-new">
        <div className="add-new-ele">
            <p className="Add-tittle">
            ADD NEW ACTIVITY
            </p>
            <input value={task} onChange={(e)=>settask(e.target.value)} placeholder="ACTIVITY"/>
            <button onClick={handleSubmit}>
                Add
            </button>
        </div>

    </div>
  );
}

export default Addnew;