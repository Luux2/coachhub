import logo from "../../assets/coachers-logo.png";
import {useNavigate} from "react-router-dom";

export const Header = () => {
    const navigate = useNavigate();


    return (
        <div className="pt-2 flex justify-between items-center mb-5 border-b-4 pb-4 border-black rounded">
            <img onClick={() => navigate('/kunder')} src={logo} alt="CoachHub logo" className="w-48 cursor-pointer" title="Hjem" />
            <header>
                <h1 className="text-7xl font-bold text-gray-900">Kundedatabase</h1>
            </header>
            <span className="w-40"></span>
        </div>
    );
};

export default Header;