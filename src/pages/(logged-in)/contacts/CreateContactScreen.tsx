import {Helmet} from "react-helmet-async";
import Animation from "../../../components/misc/Animation";
import Header from "../../../components/misc/Header";
import {useParams} from "react-router-dom";
import useSingleClient from "../../../hooks/useSingleClient.ts";
import LoadingBar from "../../../components/misc/LoadingBar.tsx";
import CreateContactForm from "../../../components/contacts/CreateContactForm.tsx";
import BackArrow from "../../../components/misc/BackArrow.tsx";

export const CreateContactScreen = () => {
    const {clientId} = useParams();
    const {client, loading} = useSingleClient(clientId);

    if (loading) {
        return <LoadingBar />;
    }


    return (
        <>
            <Helmet>
                <title>CoachHub - Opret kontaktperson</title>
            </Helmet>

            <Animation>
                <Header/>

                <div className="mx-60">
                    <BackArrow />
                <h1 className="text-3xl font-extrabold mb-5">Opret ny kontaktperson {client?.companyName ? `for ${client.companyName}` : "(privat)"}</h1>


                <CreateContactForm/>
                </div>
            </Animation>

        </>
    );
};

export default CreateContactScreen;