import { useNavigate } from "react-router-dom";
import "./distodo.css"
import Header from "./Header";
import TodoHis from "./TodoHis";
import { useEffect, useState } from "react";
import { authContext } from '../App';
function DisTodo() {
    let [user,setuser]= useState("");
    let [ftask,setftask]= useState([])
    const navigate = useNavigate();
    let taskurl=process.env.REACT_APP_task;
    let testurl=process.env.REACT_APP_test;
    console.log(testurl)
     const handlefetch = async () => {
    
 
    try {
      const response = await fetch(taskurl);
      if (response.ok) {
        console.log('successful!'); 
        let data=await response.json();
       
       setftask(data.task)
         
        
      } else {
        console.error('failed:', response.statusText);
        alert('failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };
  console.log(ftask.length)
    useEffect(()=>{
      
    const fetchUser = async () => {
      const token = localStorage.getItem('token'); 
      
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(testurl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`},
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        let email=json.email
       console.log( email,"email")
       setuser(email)

      } catch (error) {
        console.error('Error', error);
        }}
        fetchUser();
        handlefetch()
    },[])
    
    
    return (
        
        
        

      <>
      <Header user={user}/>
      <div  className="home-main-con">
        <div>
        <TodoHis/>
        </div>
        <div className="dis-todo-task">
            <div className="Add-newtask-btn-con">
                <button onClick={()=>navigate('/add')}  className="Add-newtask-btn">
                    ADD NEW ACTIVITY
                </button>

            </div>
        <table>
            <tr>
                <th>
                    Activity

                </th>
                <th>
                    Status

                </th>
                <th>
                    Time Taken
                </th>
                <th>
                    Action
                </th>
            </tr>
            {ftask.map((data)=>(
                <tr>
                    <td>
                            {data.activity}

                    </td>
                    <td>
                    {data.status}

                    </td>
                    <td>
                    {data.timeTaken.m} M {data.timeTaken.m}s

                    </td>
                    <td>

                    </td>
                </tr>

))}
            



        </table>
         

        </div>

        
      </div>
     
      </>
    );
  }


  
  export default DisTodo;