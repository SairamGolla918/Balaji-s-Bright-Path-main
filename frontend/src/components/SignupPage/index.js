import React,{useState} from "react"
import { Link, useNavigate } from 'react-router-dom'
import { validation   } from "../SignupValidation"
import axios from "axios"
import "./index.css"

function SignupPage(){
    const [values,setValues]=useState({
        name:"",
        email:"",
        password:""
      })
      const [errors,setErrors]=useState({}  )
      
      const navigate=useNavigate();
      
      const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };
      
      const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validation(values);
        setErrors(validationErrors);
        console.log(values);
        // If all fields pass validation
        if (!validationErrors.name && !validationErrors.email && !validationErrors.password) {
            axios.post('http://localhost:9180/api/users/signup', values)
            
            .then(res => {
                const statusCode = res.status; // HTTP status code
                const message = res.data; // Response body
            
                console.log({ statusCode });
            
                if (statusCode === 200) {
                    // Signup successful
                    alert("Signup successful! Redirecting to login page.");
                    navigate('/login');
                } else {
                    // Handle other cases
                    alert(`Error: ${message}`);
                }
            })
            .catch(err => {
                if (err.response) {
                    // Known error from backend
                    const { status, data } = err.response;
                    console.error(`Error ${status}: ${data}`);
                    alert(`Error ${status}: ${data}`);
                } else {
                    // Unknown error
                    console.error(err);
                    alert("An unexpected error occurred.");
                }
            });
            
        }
    };
    


    return(
        <div className="d-flex justify-content-center align-items-center vh-100 signup-bg">
            <div className="bg-white opacity p-3 rounded w-25">
                <h2>Sign up</h2>
            <form action="POST" onSubmit={handleSubmit}>
            <div className='mb-3 '> 
              <label htmlFor="name" className="mb-1"><strong>Name:</strong></label><br />
              <input id="name" type="name" placeholder='Enter Name' className='form-control rounded-0'name="name" onChange={handleInput}/>
              {errors.name && <span className='text-danger'>{errors.name }</span>} 
          </div> 
            <div className='mb-3 '>
              <label htmlFor="email" className="mb-1"><strong>Email:</strong></label><br />
              <input id="email" type="email" placeholder='Enter Email' className='form-control rounded-0' name="email" onChange={handleInput}/>
              {errors.email && <span className='text-danger'>{errors.email }</span>} 
          </div> 
          <div className='mb-3 '>
              <label htmlFor="password"className="mb-1"><strong>Password:</strong></label><br />
              <input id="password" type="password" placeholder='Enter Password ' className='form-control rounded-0' name="password" onChange={handleInput}/>
              {errors.password && <span className='text-danger'>{errors.password }</span>} 
          </div>
          <button className='btn btn-primary w-100 mb-3 rounded-0' type="submit"><strong>Sign up </strong></button>
          <p>You are agree to our terms and policies</p>
         <Link to="/login"> <button className='btn btn-default  border w-100 bg-light rounded-0 text-decoration-none'>Login</button></Link> 
            </form>
            </div>
        </div>
    )
}

export default SignupPage