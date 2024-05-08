import "./auth.css"
import { Link, useNavigate } from 'react-router-dom';
import  { useContext, useState } from 'react';
import { authContext } from '../App';
function Login() {
  const navigate=useNavigate()
 
  const { setIsLoggedIn } = useContext(authContext);
 
  let loginurl=process.env.REACT_APP_login;
  
  const [formData, setFormData] = useState({ email: '', password: ''});
  const handleToken = (token) => {
    
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    navigate("/")
    
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async () => {
    
   
    if (!formData.email.trim() || !formData.password.trim()) {
      alert('Please fill in all fields');
      return;
    }
    try {
      const response = await fetch(loginurl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      if (response.ok) {
        console.log('successful!'); 
        let data=await response.json();
       
        handleToken(data.token)
          navigate("/")
        
        setFormData({ email: '', password: '', confirmPassword: '' });
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
      <div className="auth-con">
            <div className="auth-ele-con">
                <p className="Tittle">Member Login</p>
                <input placeholder="Email "  name="email"
          value={formData.email} onChange={handleChange} type="text"/>
                <input name="password" onChange={handleChange} value={formData.password} placeholder="Password" type="password"/>
                <button onClick={handleSubmit}>
                    Login
                </button>
                

            </div>
      </div>

    );
  }
  
  export default Login;