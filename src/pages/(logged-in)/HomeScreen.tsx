import {useUserData} from "../../context/AuthContext.tsx";
import {UserGroupIcon} from "@heroicons/react/24/solid";
import {useNavigate} from "react-router-dom";
import Animation from "../../components/misc/Animation.tsx";

export const HomeScreen = () => {
    const {user} = useUserData();
    const navigate = useNavigate();

    const handleNavCustomers = () => {
        navigate('/kunder');
    };


    return (
        <Animation>
        <section className="flex flex-col justify-center min-h-screen">

            <header>
                <h1 className="text-7xl font-bold text-gray-900 text-center">Hej {user?.name}!</h1>
            </header>

            <ul className="mt-20 grid grid-cols-4 gap-28 mx-60">

                <li onClick={handleNavCustomers}
                    className="cursor-pointer group h-full flex flex-col items-center overflow-hidden border-2 border-gray-500">

                    <UserGroupIcon className="h-96 w-48 transition duration-500 group-hover:scale-105"/>

                    <div className="bg-gray-300 h-1/2 w-full flex justify-center items-center">
                        <p className="tracking-wider text-center text-3xl font-bold">Kunder</p>
                    </div>
                </li>

                <li onClick={handleNavCustomers}
                    className="cursor-pointer group h-full flex flex-col items-center overflow-hidden border-2 border-gray-500">

                    <UserGroupIcon className="h-96 w-48 transition duration-500 group-hover:scale-105"/>

                    <div className="bg-gray-300 h-1/2 w-full flex justify-center items-center">
                        <p className="tracking-wider text-center text-3xl font-bold">Kunder</p>
                    </div>
                </li>

                <li onClick={handleNavCustomers}
                    className="cursor-pointer group h-full flex flex-col items-center overflow-hidden border-2 border-gray-500">

                    <UserGroupIcon className="h-96 w-48 transition duration-500 group-hover:scale-105"/>

                    <div className="bg-gray-300 h-1/2 w-full flex justify-center items-center">
                        <p className="tracking-wider text-center text-3xl font-bold">Kunder</p>
                    </div>
                </li>

                <li onClick={handleNavCustomers}
                    className="cursor-pointer group h-full flex flex-col items-center overflow-hidden border-2 border-gray-500">

                    <UserGroupIcon className="h-96 w-48 transition duration-500 group-hover:scale-105"/>

                    <div className="bg-gray-300 h-1/2 w-full flex justify-center items-center">
                        <p className="tracking-wider text-center text-3xl font-bold">Kunder</p>
                    </div>
                </li>

            </ul>


            <div className="flex justify-center">
                <img className="w-1/4" alt="logo"
                     src="https://coachers.dk/wp-content/uploads/2018/08/2016-logo-sort-p%C3%A5-transparent-121-kb-1.png"></img>
            </div>

        </section>
        </Animation>
    );
};

export default HomeScreen;