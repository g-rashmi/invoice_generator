import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { register } from '../redux/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (email: string, password: string, name: string) => {
    dispatch(register({ email, password, name }))
      .then(() => {
        toast.success('Successfully Register!', {
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
          navigate('/login');
          setIsLoading(false); // Set loading state to false after navigation
        }, 2000);
      })
      .catch((error) => {
        toast.error('Regestration failed!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.error('Registration failed:', error);
      });
  };

  return (
    
    <div className="flex justify-center back items-center h-screen">
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
      <AuthForm type="register" onSubmit={handleRegister}/> 
   
    </div>
  );
};

export default RegisterPage;
