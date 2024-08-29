import { LogOut } from "lucide-react";
import { useAuthstore } from "../../store/authUser";

const Header = ({ title }) => {
    const { user, logout } = useAuthstore();
    return (
        <header className='flex flex-row bg-slate-50 backdrop-blur-md shadow-lg border-b border-slate-200 justify-between items-center'>
            <div className='py-4 px-4 sm:px-6 lg:px-8'>
                <h1 className='text-2xl font-semibold text-black'>{title}</h1>
            </div>
            <div className="py-4 px-4 sm:px-6 lg:px-8 flex flex-row text-black space-x-4">
                <h1>{user.username}</h1>
                <LogOut className='size-6 cursor-pointer' onClick={logout} />
            </div>
        </header>
    );
};
export default Header;