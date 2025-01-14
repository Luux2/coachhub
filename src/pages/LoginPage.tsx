import {onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../firebase.ts";
import {FormEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import Animation from "../components/misc/Animation.tsx";

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [, setIsLoading] = useState(false);

    const handleSignIn = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);

        } catch (error: any) {
            setError('Login mislykkedes. Prøv igen.');
        }
    };


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Tilføj en forsinkelse, før du navigerer
                setTimeout(() => {
                    navigate('/hjem');
                }, 100);
            }
        });

        return () => unsubscribe();
    }, [navigate]);


    return (
        <>
            <Helmet>
                <title>CoachHub - Login</title>
            </Helmet>

            <Animation>
            <div className="min-h-screen -mt-28 flex flex-col justify-center items-center">
                    <img className="w-1/4" alt="logo"
                         src="https://coachers.dk/wp-content/uploads/2018/08/2016-logo-sort-p%C3%A5-transparent-121-kb-1.png"></img>

                <div>
                    <h1 className="mt-6 text-5xl font-bold">
                        Velkommen til CoachHub
                    </h1>

                    <p className="mt-4 text-xl leading-relaxed text-gray-500">
                        Dit nye CRM-system.
                    </p>

                    <form action="#" className="mt-8">
                        <div>
                            <label htmlFor="Email"
                                   className="text-sm font-medium text-gray-700"> Email </label>

                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id="Email"
                                name="email"
                                className="mt-1 w-full rounded-md border-gray-500 bg-white text-sm text-gray-700 shadow-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="Password"
                                   className="text-sm font-medium text-gray-700"> Password </label>

                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                id="Password"
                                name="password"
                                className="mt-1 w-full rounded-md border-gray-500 bg-white text-sm text-gray-700 shadow-sm"
                            />
                        </div>

                        {error && <p className="text-red-500 mt-2">{error}</p>}

                        <div className="mt-5">
                            <button
                                onClick={handleSignIn}
                                className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium
                                text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
                </div>
            </Animation>
        </>
    )
}

export default LoginPage;