import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import toast from 'react-hot-toast';

const Email = ({ toggleModal }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const toNaviagte = () => {
navigate('/chat')
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        emailjs.send(
            'service_c0gpluf', 
            'template_nrukvp6', // Replace with your actual template ID
            formData,
            'AhYD38p9uGAzThOgX' 
        ).then((result) => {
            toast.success('Message sent successfully!');
            setFormData({ name: '', email: '', message: '' });
            toggleModal(); // Close the modal after form submission
        }).catch((error) => {
           toast.error('Something went wrong. Please try again later.');
            console.error('Error:', error);
        });
    };

    return (
        <div className="email-form-container space-x-4">
            <form
                onSubmit={handleSubmit}
                className="bg-sky-100 p-6 rounded-lg shadow-md max-w-md mx-auto"
            >
                <h2 className="text-2xl font-semibold text-emerald-600 mb-4">Contact Us</h2>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full p-2 mb-4 border border-sky-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="text-black w-full p-2 mb-4 border border-sky-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    required
                />
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    className="text-black w-full h-20 p-2 mb-4 border border-sky-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-emerald-500 text-white p-2 rounded hover:bg-emerald-600 transition duration-200 mb-4"
                >
                    Send
                </button>
                <button className='w-full bg-emerald-500 text-white p-2 rounded hover:bg-emerald-600 transition duration-200' onClick={toNaviagte}>Chat</button>
            </form>
        </div>
    );
};

export default Email;