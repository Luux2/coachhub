import {FormEvent, useState} from "react";
import ClientService from "../../services/ClientService.tsx";

export const CreateNoteForClientForm = ({onClose, clientId, onCreate}: {
    onClose: () => void;
    clientId: string;
    onCreate: () => void;
}) => {

    const [body, setBody] = useState("");
    const now = new Date();
    const localISO = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
        .toISOString()
        .replace("Z", "");


    const handleCreateNote = async (e: FormEvent) => {
        e.preventDefault();

        const note = {
            dateTime: localISO,
            body: body,
        }

        if (!body) {
            return (
                alert("Udfyld venligst alle felter.")
            );
        }

        try {
            await ClientService.createNote(clientId!, note);
            onCreate();
            setBody("");
            onClose();
        } catch (error) {
            console.error(error);
            alert("Der opstod en fejl under oprettelsen af noten. Prøv igen.");
        }
    }

    const handleCloseDialog = () => {
        setBody("");
        onClose();
    }

    return (
        <div className="overflow-hidden rounded-lg shadow-2xl bg-white p-4 w-1/2">
            <p className="font-bold text-black text-4xl text-center">
                Opret note
            </p>
            <div className="flex justify-center items-center rounded-lg bg-white p-12">
                <form className="space-y-4 w-full" onSubmit={handleCreateNote}>

                    <div>
                        <label className="font-bold text-xl ml-1" htmlFor="note">
                            Note
                        </label>
                        <textarea
                            className="w-full rounded-lg border-gray-500 text-sm resize-none size-48"
                            id="note"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            required
                        />
                    </div>


                    <div className="mt-4 flex gap-2 justify-center">
                        <button
                            type="button"
                            onClick={handleCloseDialog}
                            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded text-xl"
                        >
                            Fortryd
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-xl"
                        >
                            Opret
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateNoteForClientForm;