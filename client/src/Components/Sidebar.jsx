import React, { useState, createContext, useContext, useEffect } from "react";
import { BarChart2, DollarSign, Menu, Settings, ShoppingBag, ShoppingCart, TrendingUp, Users } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from '../assets/a-logo-for-jeevsaathi-a-pet-adoption-platform-feat-uXS8IZJfQmqMxBne9hngsQ-VNUE8niBR0ac-oAjII5aUA__1_-removebg-preview.png'
import text from '../assets/a-logo-for-jeevsaathi-a-pet-adoption-platform-feat-uXS8IZJfQmqMxBne9hngsQ-VNUE8niBR0ac-oAjII5aUA-removebg-preview.png'

const SidebarContext = createContext();

const SIDEBAR_ITEMS = [
    { name: "Overview", icon: BarChart2, color: "#FF0000", href: "/" },
    { name: "Products", icon: ShoppingBag, color: "#FF0000", href: "/products" },
    { name: "Pets", icon: Users, color: "#FF0000", href: "/pets" },
    { name: "Sales", icon: DollarSign, color: "#FF0000", href: "/sales" },
    { name: "Orders", icon: ShoppingCart, color: "#FF0000", href: "/orders" },
    { name: "Analytics", icon: TrendingUp, color: "#FF0000", href: "/analytics" },
    { name: "Settings", icon: Settings, color: "#FF0000", href: "/settings" },
];

const Sidebar = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const [activeItem, setActiveItem] = useState(location.pathname);

    useEffect(() => {
        setActiveItem(location.pathname);
    }, [location]);

    const handleItemActive = (to) => {
        setActiveItem(to);
    };

    return (
        <SidebarContext.Provider value={{ isSidebarOpen }}>
            <div
                className={`shadow-lg relative z-10 transition-all duration-300 ease-in-out flex-shrink-0
                ${isSidebarOpen ? "w-64" : "w-16"}`}
            >
                <div className={`h-full bg-slate-50 backdrop-blur-md p-4 flex flex-col 
                     ${isSidebarOpen ? "" : "justify-center w-full items-center"}
                    `}>
                    <button
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                        className={`p-2 rounded-full text-gray-900 hover:bg-blue-100 transition-colors max-w-fit`}>
                        <Menu size={24} />
                    </button>
                    <nav className="mt-8 flex-grow text-gray-900">
                        {SIDEBAR_ITEMS.map(item => (
                            <SidebarItem
                                key={item.href}
                                icon={<item.icon size={20} />}
                                text={item.name}
                                active={activeItem === item.href}
                                to={item.href}
                                onActive={() => handleItemActive(item.href)}
                                isSidebarOpen={isSidebarOpen}
                            />
                        ))}
                    </nav>
                </div>
            </div>
        </SidebarContext.Provider>
    )
}

const SidebarItem = ({ icon, text, to, isSidebarOpen, active, onActive }) => {
    const navigate = useNavigate();

    return (
        <div
            className={`relative flex items-center p-2 my-2 transition-colors duration-200 rounded-lg cursor-pointer hover:bg-blue-100  
                ${active
                    ? 'bg-gradient-to-tr from-cyan-50 to-blue-100 text-blue-500'
                    : 'hover:bg-cyan-50 text-gray-600'
                }
            ${isSidebarOpen ? '' : 'justify-center'}
            `}
            onClick={() => {
                navigate(to);
                onActive();
            }}
        >
            <div className="flex-shrink-0">
                {icon}
            </div>
            {isSidebarOpen && (
                <span className="ml-4 text-black">
                    {text}
                </span>
            )}
        </div>
    );
};

export default Sidebar;