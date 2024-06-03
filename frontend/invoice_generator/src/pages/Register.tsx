import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { register } from '../redux/authSlice';

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (email: string, password: string, name: string) => {
    dispatch(register({ email, password, name }))
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error('Registration failed:', error);
      });
  };

  return (
    <div className="flex justify-center back items-center h-screen">
      <AuthForm type="register" onSubmit={handleRegister}/>
    </div>
  );
};

export default RegisterPage;
