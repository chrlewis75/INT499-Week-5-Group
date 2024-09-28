import React from 'react'; // Remove useContext import
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext'; // Use the custom hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
    const { login } = useAuth(); // Use context to get login function
    const navigate = useNavigate(); // Create a navigate instance

    const handleLoginSuccess = (credentialResponse) => {
        // Handle successful login here
        console.log("Login successful:", credentialResponse);
        
        // Set user data in AuthContext
        const user = {
            token: credentialResponse.credential, // Get token from response
            // Optionally, add user details here (e.g., email, name)
        };
        login(user); // Update the context with the logged-in user's info

        // Redirect to the home page or main application interface
        navigate('/'); // Change to the desired route after login
    };

    const handleLoginFailure = (error) => {
        // Handle login failure here
        console.error("Login failed:", error);
    };

    return (
        <div>
            <h1>User Login Page</h1>
            <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginFailure}
            />
        </div>
    );
};

export default Login;
