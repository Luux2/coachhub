import {Helmet} from "react-helmet-async";
import ExcelUploader, {ClientRow} from "../misc/ExcelUploader.tsx";
import ClientService from "../../services/ClientService.tsx";
import useClients from "../../hooks/useClients.ts";
import ContactsUploader from "../misc/ContactsUploader.tsx";
import {ContactInterface} from "../../utils/interfaces.ts";
import ContactService from "../../services/ContactService.tsx";

export const ImportTab = () => {

    const {clients} = useClients();

    const handleClientsAdded = async (newClients: ClientRow[]) => {
        const clientsToAdd = newClients.filter((newClient) =>
            !clients.some((client) => client.companyName === newClient.col1)
        );

        if (clientsToAdd.length === 0) {
            alert("Ingen nye spillere blev tilføjet.");
            return;
        }

        try {
            // Tilføj spillere én efter én for at sikre korrekt rækkefølge
            for (const client of clientsToAdd) {
                await ClientService.createClient({ companyName: client.col1, status: client.col2, address: client.col3, responsible: client.col4, activityStatus: "", cvr: 0, zipCode: 0, city: "", phone: 0 });
            }
            alert("Spillere tilføjet");
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert("Der skete en fejl ved tilføjelse af spillere");
        }
    };

    const handleContactsAdded = async (newContacts: ContactInterface[]) => {
        try {
            for (const contact of newContacts) {
                await ContactService.createContact(contact);
            }
            alert("Kontaktpersoner tilføjet");
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert("Der skete en fejl ved tilføjelse af kontaktpersoner");
        }
    };

    return (
        <>
            <Helmet>
                <title>CoachHub - Import</title>
            </Helmet>



        <div className="w-full rounded-xl mx-16 h-96 flex flex-col items-center justify-center">
            <ExcelUploader onClientsAdded={handleClientsAdded}/>
            <ContactsUploader onContactsAdded={handleContactsAdded}/>
        </div>
        </>
    );
};

export default ImportTab;