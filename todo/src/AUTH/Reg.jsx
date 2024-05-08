import "./auth.css"
import { Link, useNavigate } from 'react-router-dom';
import  { useState } from 'react';

function Reg() {
  const navigate=useNavigate()
  let registerUrl=process.env.REACT_APP_regUrl;
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  console.log(registerUrl)
  const handleSubmit = async () => {
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    if (!formData.email.trim() || !formData.password.trim()) {
      alert('Please fill in all fields');
      return;
    }
    try {
      const response = await fetch(registerUrl, {
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
       
        alert(`Email:-${data.data.email},Passwoed-${data.data.password}`);
          navigate("/login")
        
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
                <p className="Tittle">Register</p>
                <input placeholder="Email "  name="email"
          value={formData.email} onChange={handleChange} type="text"/>
                <input placeholder="Password" name="password"
          value={formData.password} onChange={handleChange} type="password"/>
                <input placeholder="Confirm Password" name="confirmPassword"
          value={formData.confirmPassword} onChange={handleChange} type="password"/>
                <button onClick={handleSubmit}>
                    Register
                </button>
                

            </div>
      </div>

    );
  }
  
  export default Reg;