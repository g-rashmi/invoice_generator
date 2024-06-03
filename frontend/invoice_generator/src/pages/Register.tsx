import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { register } from '../redux/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface RegisterPayload {
  email: string;
  password: string;
  name: string;
}
const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // State to manage loading indicator

  const handleRegister = (email: string, password: string, name: string) => {
    setIsLoading(true); // Set loading state to true before dispatching action
    const payload :RegisterPayload= { email, password, name };
    dispatch(register(payload))
      .then(() => {
        toast.success('Successfully Registered!', {
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
      .catch((error : any) => {
        toast.error('Registration failed!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setIsLoading(false); // Set loading state to false on error
        console.error('Registration failed:', error);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
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
      <AuthForm type="register" onSubmit={handleRegister} isLoading={isLoading}/> 
    </div>
  );
};

export default RegisterPage;
