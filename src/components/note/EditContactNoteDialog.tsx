import {NoteInterface} from "../../utils/interfaces.ts";
import {FormEvent, useEffect, useState} from "react";
import ContactService from "../../services/ContactService.tsx";

export const EditContactNoteDialog = ({onClose, contactId, note, noteId}: {
    onClose: () => void;
    contactId: string;
    note: NoteInterface;
    noteId: string;
}) => {

    const [body, setBody] = useState(note?.body || "");

    useEffect(() => {
        if (note) {
            setBody(note.body);
        }
    }, [note]);

    const handleUpdateNote = async (e: FormEvent) => {
        e.preventDefault();

        if (!note) {
            return (
                alert("Noten kunne ikke findes. Prøv at genindlæse siden.")
            );
        }

        const updatedNote: NoteInterface = {
            body: body,
            dateTime: note.dateTime
        };
        await ContactService.updateNote(updatedNote, contactId, noteId);

        onClose();
    }

    return (
        <div className="overflow-hidden rounded-lg shadow-2xl bg-white p-4">
            <p className="font-bold text-black text-4xl text-center">
                Rediger note
            </p>
            <div className="flex justify-center items-center rounded-lg bg-white p-12">
                <form className="space-y-4 w-full" onSubmit={handleUpdateNote}>

                    <div>
                        <label className="text-sm ml-1" htmlFor="note">
                            Note
                        </label>
                        <textarea
                            className="w-full rounded-lg border-gray-200 text-sm resize-none max-h-32"
                            id="note"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            required
                        />
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

export default EditContactNoteDialog;