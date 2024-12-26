import { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';
import { validation } from '../LoginValidation';
import axios from 'axios';
import './index.css';

function LoginPage() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validation(values);
    setErrors(validationErrors);

    if (!validationErrors.email && !validationErrors.password) {
      try {
        const response = await axios.post('http://localhost:9180/api/users/login', values);
        const statusCode = response.status; // HTTP status code
        const message = response.data; // Response body
        const jwt_token = response.data.token;
        // Cookies.set('jwt_token', response.data.token);

        console.log({statusCode})

        if (statusCode === 200) {
          Cookies.set('jwt_token', jwt_token, {
            expires: 30,
          });
          navigate('/'); // Redirect to homepage
        } else {
          alert(message); // Display server error message
        }
      } catch (err) {
        console.log(err);
        alert('An error occurred while logging in.');
      }
    }
  };

  return (
    <div className="login-form-container">
      <img
        src="/images/login.png"
        className="login-website-logo-mobile-image"
        alt="website logo"
      />
      <img
        src="/images/login.png"
        className="login-image"
        alt="website login"
      />
      <form className="form-container pt-0" onSubmit={handleSubmit}>
        <div className="d-flex align-items-center justify-content-start w-100">
          <img src="/images/login-logo.png" alt="BBPath" className="login-logo me-2" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="mb-1"><strong>Email:</strong></label><br />
          <input
            id="email"
            type="email"
            placeholder="Enter Email"
            className="form-control rounded-0"
            onChange={handleInput}
            name="email"
          />
          {errors.email && <span className="text-danger">{errors.email}</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="mb-1"><strong>Password:</strong></label><br />
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter Password"
            className="form-control rounded-0"
            onChange={handleInput}
            name="password"
          />
          <button
            type="button"
            className="btn btn-light"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
          {errors.password && <span className="text-danger">{errors.password}</span>}
        </div>
        <button className="btn btn-outline-info w-100 mb-3 rounded-0" type="submit">
          <strong>Log in</strong>
        </button>
        <p>You agree to our terms and policies</p>
        <Link to="/signup">
          <button className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
            Create Account
          </button>
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;
