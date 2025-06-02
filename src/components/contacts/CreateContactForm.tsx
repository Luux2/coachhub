import {FormEvent, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import ContactService from "../../services/ContactService.tsx";

export const CreateContactForm = () => {

    const {clientId} = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [title, setTitle] = useState("");

    const handleCreateContact = async (e: FormEvent) => {
        e.preventDefault();
        const contact = {
            clientId: clientId!,
            name: name,
            mail: email,
            phone: phone,
            title: title
        }

        if (!name) {
            return (
                alert("Angiv venligst navn på kontaktperson.")
            );
        }

        try {
            await ContactService.createContact(contact);
        } catch (error) {
            console.error(error);
        } finally {
            navigate('/kontaktpersoner')
        }
    }


    return (
        <div className="flex justify-center items-center rounded-lg bg-white shadow-lg p-12">
            <form className="space-y-4 w-full">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                    <label className="sr-only" htmlFor="name">Name</label>
                    <input
                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Navn"
                        type="text"
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label className="sr-only" htmlFor="telefonnummer">Telefonnummer</label>
                    <input
                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Telefonnummer"
                        type="tel"
                        id="telefonnummer"
                        pattern="[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}"
                        maxLength={8}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="sr-only" htmlFor="email">Email</label>
                    <input
                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Email"
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="sr-only" htmlFor="titel">Titel</label>
                    <input
                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                        placeholder="Titel/Stilling"
                        type="text"
                        id="titel"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="mt-4">
                    <button
                        type="submit"
                        onClick={handleCreateContact}
                        className="inline-block w-full rounded-lg bg-teal-600 hover:bg-teal-700 px-5 py-3 font-medium text-white sm:w-auto"
                    >
                        Opret kontaktperson
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateContactForm;