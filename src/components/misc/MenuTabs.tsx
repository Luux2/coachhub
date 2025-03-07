import {BuildingOffice2Icon, DocumentPlusIcon, TicketIcon, UsersIcon} from "@heroicons/react/24/outline";
import {useNavigate, useLocation, NavLink} from "react-router-dom";

export const MenuTabs = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (

        <nav className="mt-20 h-fit flex flex-col gap-y-14 items-center w-32">
            <NavLink to="/kunder" className="w-12 cursor-pointer transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
            <BuildingOffice2Icon
                onClick={() => navigate('/kunder')}
                className={`w-12 cursor-pointer transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 
                ${location.pathname === "/kunder" ? "text-white bg-teal-600 border-2 border-teal-600 rounded-full p-1" : "text-teal-600"}`}
            />
            </NavLink>

            <NavLink to={"/klippekort"} className="w-12 cursor-pointer transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
            <TicketIcon
                onClick={() => navigate('/klippekort')}
                className={`w-12 cursor-pointer transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 
                ${location.pathname === "/klippekort" ? "text-white bg-teal-600 border-2 border-teal-600 rounded-full p-1" : "text-teal-600"}`}
            />
            </NavLink>

            <NavLink to={"/kontaktpersoner"} className="w-12 cursor-pointer transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
            <UsersIcon
                onClick={() => navigate('/kontaktpersoner')}
                className={`w-12 cursor-pointer transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 
                ${location.pathname === "/kontaktpersoner" ? "text-white bg-teal-600 border-2 border-teal-600 rounded-full p-1" : "text-teal-600"}`}
            />
            </NavLink>
            <NavLink to={"/import"} className="w-12 cursor-pointer transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
                <DocumentPlusIcon
                    onClick={() => navigate('/import')}
                    className={`w-12 cursor-pointer transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 
                ${location.pathname === "/import" ? "text-white bg-teal-600 border-2 border-teal-600 rounded-full p-1" : "text-teal-600"}`}
                />
            </NavLink>
        </nav>
    );
};

export default MenuTabs;
