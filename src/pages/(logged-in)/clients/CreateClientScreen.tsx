import {useNavigate} from "react-router-dom";
import {ChangeEvent, FormEvent, useState} from "react";
import LoadingBar from "../../../components/misc/LoadingBar.tsx";
import Animation from "../../../components/misc/Animation.tsx";
import ClientService from "../../../services/ClientService.tsx";
import {ClientInterface} from "../../../utils/interfaces.ts";
import {useUserData} from "../../../context/AuthContext.tsx";
import {Helmet} from "react-helmet-async";
import Header from "../../../components/misc/Header.tsx";
import BackArrow from "../../../components/misc/BackArrow.tsx";

export const CreateClientScreen = () => {
    const {user} = useUserData();
    const navigate = useNavigate();

    const [client, setClient] = useState<ClientInterface>({
        companyName: "",
        address: "",
        city: "",
        zipCode: 0,
        cvr: 0,
        status: "Emne",
        activityStatus: "",
        phone: 0,
        responsible: user!.id!,
    });


    const loading = false;


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value, type, checked } = e.target as HTMLInputElement;

        setClient(prevClient => ({
            ...prevClient,
            [id]: type === "checkbox" ? checked : (type === "number" ? Number(value) : value),
        }));
    };


    const handleCreateStampCard = async (e: FormEvent) => {
        e.preventDefault();

        if (!client.companyName.trim()) {
            alert("Virksomhedsnavn skal udfyldes");
            return;
        }

        try {
            await ClientService.createClient(client);
        } catch (error) {
            console.error(error);
        } finally {
            navigate(`/kunder`);
        }

    }

    if (loading) {
        return <LoadingBar />;
    }
    

    return (
        <>
        <Helmet>
            <title>CoachHub - Opret kunde</title>
        </Helmet>

        <Animation>
            <Header/>

            <div className="mx-60 mb-5">
                <BackArrow />
                <h1 className="text-3xl font-extrabold">Opret ny kunde</h1>
            </div>

                <div className="flex justify-center items-center mx-60 rounded-lg bg-white shadow-lg p-12">
                    <form className="space-y-4 w-full">

                        <div className="grid grid-cols-3 gap-4">
                            <label className="sr-only" htmlFor="companyName">Virksomhedsnavn</label>
                            <input
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                placeholder="Virksomhedsnavn"
                                type="text"
                                id="companyName"
                                onChange={handleChange}
                                required
                            />

                            <select className="w-full rounded-lg border-gray-200 p-3 text-sm" id="aktivitetsstatus"
                                    onChange={handleChange}
                            >
                                <option value="Aktiv">Aktiv</option>
                                <option value="Tilbudsfase">Tilbudsfase</option>
                                <option value="Passiv">Passiv</option>
                            </select>

                            <label className="sr-only" htmlFor="status">Status</label>
                            <select className="w-full rounded-lg border-gray-200 p-3 text-sm" id="status"
                                    onChange={handleChange}
                            >
                                <option value="Emne">Emne</option>
                                <option value="Kunde">Kunde</option>
                                <option value="Tidligere kunde">Tidligere kunde</option>
                                <option value="Samarbejdspartner">Samarbejdspartner</option>
                                <option value="Leverandør">Leverandør</option>
                                <option value="Kampagne">Kampagne</option>
                                <option value="Akademiforløb - Kunde">Akademiforløb - Kunde</option>
                                <option value="Akademiforløb - Emne">Akademiforløb - Emne</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <label className="sr-only" htmlFor="Adresse">Adresse</label>
                            <input
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                placeholder="Adresse"
                                type="text"
                                id="adresse"
                                onChange={handleChange}
                            />

                            <label className="sr-only" htmlFor="By">By</label>
                            <input
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                placeholder="By"
                                type="text"
                                id="by"
                                onChange={handleChange}
                            />

                            <label className="sr-only" htmlFor="postnummer">Postnummer</label>
                            <input
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                placeholder="Postnummer"
                                type="number"
                                id="postnummer"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-4">


                            <label className="sr-only" htmlFor="cvr">CVR-nummer</label>
                            <input
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                placeholder="CVR-nummer"
                                type="number"
                                id="cvr"
                                onChange={handleChange}
                            />

                            <label className="sr-only" htmlFor="hjemmeside">Hjemmeside</label>
                            <input
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                placeholder="Hjemmeside"
                                type="url"
                                id="hjemmeside"
                                onChange={handleChange}
                            />

                            <label className="sr-only" htmlFor="telefonnummer">Telefonnummer</label>
                            <input
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                placeholder="Telefonnummer"
                                type="tel"
                                id="telefonnummer"
                                pattern="[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}"
                                maxLength={8}
                                onChange={handleChange}
                            />
                        </div>


                        <div className="mt-4">
                            <button
                                type="submit"
                                onClick={handleCreateStampCard}
                                className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                            >
                                Opret kunde
                            </button>
                        </div>
                    </form>
                </div>
        </Animation>
        </>
    );
};

export default CreateClientScreen;