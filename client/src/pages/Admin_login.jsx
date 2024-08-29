import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthstore } from '../store/authUser';
import img from '../assets/Default_A_modern_social_media_dashboard_site_illustration_rend_3.jpg';
import { useShelterUserStore } from '../store/shelterUser';

const Admin_Loginpage = () => {
    const { login } = useShelterUserStore();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        login({username, password });
    };

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
    };

    return (
        <div className="flex-1 overflow-auto relative z-10">
            <div className='flex items-center justify-center min-h-screen bg-gray-100'>
                <div className="flex w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="flex flex-col w-full md:w-1/2 p-8 space-y-6 justify-center">
                    <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500" onClick={handleClick}>user</button>
                        <h1 className="text-2xl font-bold mb-2 text-center text-gray-950">Hello, Welcome</h1>
                        <form className='space-y-4' onSubmit={handleLogin}>
                            <div>
                                <input type="username"
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md bg-transparent text-black focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    placeholder='username'
                                    id='username'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required />


                            </div>
                            <div>
                                <label htmlFor="password" className="text-sm font-medium text-black mb-2 block">
                                    Password
                                </label>
                                <input type="password"
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md bg-transparent text-black focus:outline-none focus:ring-2 focus:ring-blue-500'
                                    placeholder='********'
                                    id='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Login</button>
                        </form>
                        <div className='text-center text-gray-600'>
                            Don't have an account?{' '}
                            <Link to='/admin_signup' className='text-blue-600 hover:underline'>Sign Up</Link>
                        </div>
                    </div>
                    <div className='hidden md:block w-1/2'>
                        <img src={img} alt="login" className='object-cover w-full h-full' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin_Loginpage;