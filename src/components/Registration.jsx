import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Registration() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(
      'http://localhost:5000/api/auth/register',
      form
    );

    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));

    toast.success('Registered successfully');
    navigate('/login');   
  } catch (err) {
    toast.error(err.response?.data?.message || 'Registration failed');
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-100 via-pink-100 to-red-100">
      <form onSubmit={handleSubmit} className="card">
        <h2 className="text-3xl font-bold text-center mb-6 text-purple-700">Register</h2>
        <input className="input" type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input className="input" type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input className="input" type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button className="btn-primary w-full mt-4">Register</button>
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account? <a href="/login" className="text-purple-600 font-medium">Login</a>
        </p>
      </form>
    </div>
  );
}

export default Registration;
