import {ContactInterface} from "../../utils/interfaces.ts";
import {FormEvent, useEffect, useState} from "react";
import ContactService from "../../services/ContactService.tsx";

export const EditContactDialog = ({onClose, contact, contactId}: {
    onClose: () => void;
    contact?: ContactInterface;
    contactId: string;
}) => {

    const [name, setName] = useState(contact?.name || "");
    const [title, setTitle] = useState(contact?.title || "");
    const [mail, setMail] = useState(contact?.mail || "");
    const [phone, setPhone] = useState(contact?.phone || "");
    const [clientId, setClientId] = useState(contact?.clientId || "");
    const [facebook, setFacebook] = useState(contact?.socialMedia?.facebook || "");
    const [instagram, setInstagram] = useState(contact?.socialMedia?.instagram || "");
    const [linkedin, setLinkedin] = useState(contact?.socialMedia?.linkedin || "");

    useEffect(() => {
        if (contact) {
            setName(contact.name);
            setTitle(contact.title);
            setMail(contact.mail);
            setPhone(contact.phone);
            setClientId(contact.clientId);
            setFacebook(contact.socialMedia?.facebook || "");
            setInstagram(contact.socialMedia?.instagram || "");
            setLinkedin(contact.socialMedia?.linkedin || "");
        }
    }, [contact]);

    const handleUpdateContact = async (e: FormEvent) => {
        e.preventDefault();

        if (!contact) {
            return (
                alert("Kontakten kunne ikke findes. Prøv at genindlæse siden.")
            );
        }

        const updatedContact: ContactInterface = {
            name,
            title,
            mail,
            phone,
            socialMedia: {
                facebook,
                instagram,
                linkedin
            },
            clientId
        };
        await ContactService.updateContact(updatedContact, contactId);
        onClose();
    }

    return (
        <div className="overflow-hidden rounded-lg shadow-2xl bg-white p-4 w-5/6">
            <p className="font-bold text-black text-4xl text-center">
                Rediger kontaktperson
            </p>
            <div className="flex justify-center items-center rounded-lg bg-white p-12">
                <form className="space-y-4 w-full" onSubmit={handleUpdateContact}>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                        <label className="text-sm ml-1" htmlFor="name">Navn</label>
                        <input
                            className="w-full rounded-lg border-gray-200 text-sm"
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        </div>

                        <div>
                        <label className="text-sm ml-1" htmlFor="titel">Titel</label>
                        <input
                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                            type="text"
                            id="titel"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                        <label className="text-sm ml-1" htmlFor="telefonnummer">
                            Telefonnummer
                        </label>
                        <input
                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                            type="tel"
                            id="telefonnummer"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                        </div>

                        <div>
                            <label className="text-sm ml-1" htmlFor="mail">
                                Mail
                            </label>
                            <input
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                type="email"
                                id="mail"
                                value={mail}
                                onChange={(e) => setMail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="text-sm ml-1" htmlFor="facebook">
                                Facebook
                            </label>
                            <input
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                type="text"
                                id="facebook"
                                value={facebook}
                                onChange={(e) => setFacebook(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="text-sm ml-1" htmlFor="instagram">
                                Instagram
                            </label>
                            <input
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                type="text"
                                id="instagram"
                                value={instagram}
                                onChange={(e) => setInstagram(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="text-sm ml-1" htmlFor="linkedin">
                                LinkedIn
                            </label>
                            <input
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                type="text"
                                id="linkedin"
                                value={linkedin}
                                onChange={(e) => setLinkedin(e.target.value)}
                            />
                        </div>
                    </div>



                    <div className="mt-4 flex gap-2 justify-center">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded text-xl"
                        >
                            Fortryd
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-xl"
                        >
                            Gem ændringer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditContactDialog;