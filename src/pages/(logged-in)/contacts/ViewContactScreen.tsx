import {Helmet} from "react-helmet-async";
import useSingleContact from "../../../hooks/useSingleContact.ts";
import Animation from "../../../components/misc/Animation.tsx";
import Header from "../../../components/misc/Header.tsx";
import {useParams} from "react-router-dom";
import LoadingBar from "../../../components/misc/LoadingBar.tsx";
import {format} from "date-fns";
import {da} from "date-fns/locale";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import EditContactDialog from "../../../components/contacts/EditContactDialog.tsx";
import {useState} from "react";
import {ContactInterface} from "../../../utils/interfaces.ts";
import ContactService from "../../../services/ContactService.tsx";
import {SocialIcon} from "react-social-icons";

export const ViewContactScreen = () => {
    const { contactId } = useParams();

    const {setContact, contact, loading: contactLoading, error: contactError} = useSingleContact(contactId);
    const [editContactDialogVisible, setEditContactDialogVisible] = useState(false);
    const [selectedContact, setSelectedContact] = useState<ContactInterface | null>(null);

    if (contactLoading) {
        return <LoadingBar />;
    }

    if (contactError) {
        return <p className="text-red-500 text-center">{contactError}</p>;
    }

    const fetchContact = async () => {
        const updatedContact = await ContactService.getContactById(contactId!);
        setContact(updatedContact);
    };


    return (
        <>
            <Helmet>
                <title>{contact?.name}</title>
            </Helmet>

            <div className={`${!editContactDialogVisible ? "hidden" : ""} fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-90`}>

                <EditContactDialog contact={selectedContact!}
                                   onClose={() => {
                                       setEditContactDialogVisible(false);
                                       fetchContact().then();
                                   }} contactId={selectedContact?.id || ""}/>
            </div>

            <Animation>
                <Header />

                <div className="mx-40">
                    <div className="flow-root my-20 border-2 rounded-xl shadow-lg bg-white">
                        <div className="flex justify-between px-2 p-2 border-b-2 border-gray-500">
                            <h1 className="font-bold text-3xl">{contact?.name}</h1>
                            <div className="flex items-center">
                                <button onClick={() => {
                                    setSelectedContact(contact);
                                    setEditContactDialogVisible(true);
                                }}
                                        className="bg-teal-600 hover:bg-teal-700 transition-colors duration-300 text-white px-4 rounded-md w-40 py-2">Rediger
                                </button>
                            </div>
                        </div>


                        <dl className="divide-y divide-gray-100 text-md px-2">

                            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                <dt className="font-bold text-gray-900">Titel/Stilling</dt>
                                <dd className="text-gray-700 sm:col-span-2">{contact?.title}</dd>
                            </div>

                            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                <dt className="font-bold text-gray-900">Telefonnummer</dt>
                                <dd className="text-gray-700 sm:col-span-2">{contact?.phone}</dd>
                            </div>

                            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                <dt className="font-bold text-gray-900">Mail</dt>

                                <a href={`mailto:${contact?.mail}`} title={"Tryk for at sende en mail"}>
                                <dd className="text-teal-700 sm:col-span-2">{contact?.mail}</dd>
                                </a>
                            </div>

                            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                <dt className="font-bold text-gray-900">LinkedIn</dt>
                                <a
                                    href={contact?.socialMedia?.linkedin?.startsWith("http")
                                        ? contact.socialMedia.linkedin
                                        : `https://${contact?.socialMedia?.linkedin}`}
                                    title="Tryk for at besøge LinkedIn"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <dd className="text-teal-700 sm:col-span-2">{contact?.socialMedia?.linkedin}</dd>
                                </a>
                            </div>

                            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4 items-center">
                                <dt className="font-bold text-gray-900">Sociale medier</dt>
                                <dd className="sm:col-span-2 flex gap-4 text-teal-700">
                                    {contact?.socialMedia?.facebook && (
                                        <SocialIcon
                                            url={
                                                contact.socialMedia.facebook.startsWith("http")
                                                    ? contact.socialMedia.facebook
                                                    : `https://${contact.socialMedia.facebook}`
                                            }
                                            style={{ height: 40, width: 40 }}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        />
                                    )}
                                    {contact?.socialMedia?.instagram && (
                                        <SocialIcon
                                            url={
                                                contact.socialMedia.instagram.startsWith("http")
                                                    ? contact.socialMedia.instagram
                                                    : `https://${contact.socialMedia.instagram}`
                                            }
                                            style={{ height: 40, width: 40 }}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        />
                                    )}
                                    {contact?.socialMedia?.linkedin && (
                                        <SocialIcon
                                            url={
                                                contact.socialMedia.linkedin.startsWith("http")
                                                    ? contact.socialMedia.linkedin
                                                    : `https://${contact.socialMedia.linkedin}`
                                            }
                                            style={{ height: 40, width: 40 }}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        />
                                    )}
                                </dd>
                            </div>




                        </dl>
                    </div>

                    <div className="overflow-x-auto overflow-y-hidden rounded-lg border border-gray-200 shadow-lg">
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-md">
                            <thead className="text-left">
                            <tr>
                                <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">Note</th>
                                <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900 w-[16%]">Dato</th>
                                <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900 w-[8%]">Handlinger</th>

                            </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                            {Object.entries(contact?.notes ?? {}).map(([key, note]) => (
                                <tr key={key} className="transition duration-300">
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                        {note.body}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                        {format(note.dateTime, "dd. MMMM yyyy", { locale: da })}
                                    </td>

                                    <td className="flex gap-3 whitespace-nowrap px-4 py-2 text-gray-700">
                                        <button className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors duration-300 flex gap-2">
                                            <PencilSquareIcon className="h-5" />
                                            <p>Rediger</p>
                                        </button>
                                        <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-300 flex gap-2">
                                            <PencilSquareIcon className="h-5" />
                                            <p>Slet</p>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Animation>
        </>
    );
}

export default ViewContactScreen;