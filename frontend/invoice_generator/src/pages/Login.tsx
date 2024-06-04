import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { login } from '../redux/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppDispatch } from '../redux/Store';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (email: string, password: string) => {
    setIsLoading(true);
    dispatch(login({ email, password }))
      .then((result: any) => {
        if (result.meta.requestStatus === 'fulfilled') {
          toast.success('Successfully logged in!', {
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
            navigate('/add-product');
            setIsLoading(false);
          }, 2000);
        } else {
          throw new Error(result.error.message);
        }
      })
      .catch((error: Error) => {
        toast.error('Login failed!', {
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
        console.error('Login failed:', error);
      });
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
        <AuthForm type="login" onSubmit={handleLogin} isLoading={isLoading} />
      </div>
    </>
  );
};

export default LoginPage;
