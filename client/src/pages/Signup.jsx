import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthstore } from '../store/authUser'
import img from '../assets/Default_A_modern_social_media_dashboard_site_illustration_rend_3.jpg';


const Signuppage = () => {
  const { searchParams } = new URL(document.location)
  const emailvalue = searchParams.get('email')
  const [email, setEmail] = useState(emailvalue || '')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const {signup} = useAuthstore();

  const handleSignup = (e) => {
    e.preventDefault()
    signup({email,username,password});
  }

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <div className="flex w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col w-full md:w-1/2 p-8 space-y-6 justify-center">
            <h1 className="text-2xl font-bold mb-2 text-center text-gray-950">Hello, Welcome</h1>
            <form className='space-y-4' onSubmit={handleSignup}>
            <div>
              <label htmlFor="email" className="text-sm font-medium block text-black mb-2">
                Email
              </label>
              <input type="email"
                className='w-full px-3 py-2 border-gray-700 rounded-md bg-transparent text-black focus:outline-none focus:ring'
                placeholder='you@example.com'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="username" className="text-sm font-medium text-black mb-2 block">
                Username
              </label>
              <input type="text"
                className='w-full px-3 py-2 border-gray-700 rounded-md bg-transparent text-black focus:outline-none focus:ring'
                placeholder='johndoe'
                id='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium text-black mb-2 block">
                Password
              </label>
              <input type="password"
                className='w-full px-3 py-2 border-gray-700 rounded-md bg-transparent text-black focus:outline-none focus:ring'
                placeholder='********'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500">Sign Up</button>
          </form>
          <div className='text-center text-gray-400'>
            Already a member?{'  '}
            <Link to='/login' className='text-emerald-500 hover:underline'> Login</Link>
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

export default Signuppage