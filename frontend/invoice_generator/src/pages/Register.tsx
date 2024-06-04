import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { register } from '../redux/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppDispatch } from '../redux/Store';

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (email: string, password: string, name?: string): Promise<void> => {
    setIsLoading(true);
    try {
      
      const result = await dispatch(register({ email, password,  name: name || '' }) )
      if (result.meta.requestStatus === 'fulfilled') {
        toast.success('Successfully Registered!', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        setTimeout(() => {
          navigate('/login');
          setIsLoading(false);
        }, 2000);
      } else {
        const errorMessage = 'Registration failed!';
        toast.error(errorMessage, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
        setIsLoading(false);
      }
    } catch (error: any) {
      toast.error('Registration failed! An unexpected error occurred.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      setIsLoading(false);
      console.error('Registration failed:', error);
    }
  };

  return (
    <>
      <ToastContainer
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
        <AuthForm type="register" onSubmit={handleRegister} isLoading={isLoading} />
      </div>
    </>
  );
};

export default RegisterPage;
