import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { login } from '../redux/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS file
import { AppDispatch } from '../redux/Store';



const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Add a state to handle loading state

  const handleLogin = (email: string, password: string) => {
    setIsLoading(true); // Set loading state to true when login starts
    dispatch(login({ email, password }))
      .then(() => {
        toast.success('Successfully Login!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => { // Use setTimeout instead of setInterval for navigation
          navigate('/add-product');
          setIsLoading(false); // Set loading state to false after navigation
        }, 2000);
      })
      .catch((error:Error) => {
        toast.error('Login failed!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setIsLoading(false); // Set loading state to false if login fails
        console.error('Login failed:', error);
      });
  };

  return (
    <>
      <ToastContainer // Render ToastContainer at the top level of your component
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="flex justify-center items-center h-screen">
        <AuthForm type="login" onSubmit={handleLogin} isLoading={isLoading} /> {/* Pass isLoading state to AuthForm */}
      </div>
    </>
  );
};

export default LoginPage;
