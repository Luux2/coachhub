import Header from "../../../components/misc/Header.tsx";
import Animation from "../../../components/misc/Animation.tsx";
import {useParams} from "react-router-dom";
import LoadingBar from "../../../components/misc/LoadingBar.tsx";
import useSingleStampCard from "../../../hooks/useSingleStampCard.ts";
import {format} from "date-fns";
import {da} from "date-fns/locale";
import {PencilSquareIcon, PlusIcon} from "@heroicons/react/24/outline";
import RegisterStampsDialog from "../../../components/stampCard/RegisterStampsDialog.tsx";
import {useState} from "react";
import {StampCardInterface, StampInterface} from "../../../utils/interfaces.ts";
import EditStampsDialog from "../../../components/stampCard/EditStampsDialog.tsx";

export const ViewStampCardScreen = () => {
    const { stampCardId } = useParams();

    const {stampCard, loading: stampCardLoading, error: stampCardError, fetchStampCards} = useSingleStampCard(stampCardId);

    const [selectedStampCard, setSelectedStampCard] = useState<StampCardInterface | null>(null);
    const [selectedStamp, setSelectedStamp] = useState<StampInterface | null>(null);
    const [registerStampsDialogVisible, setRegisterStampsDialogVisible] = useState(false);
    const [editStampsDialogVisible, setEditStampsDialogVisible] = useState(false);

    const isLoading = stampCardLoading;
    const error = stampCardError;






    if (isLoading) {
        return <LoadingBar />;
    }

    if (error) {
        return <p className="text-red-500 text-center">{error}</p>;
    }


    return (
        <>

            <div
                className={`${!registerStampsDialogVisible ? "hidden" : ""} min-h-screen -mt-20 fixed inset-0 z-50 bg-gray-500 bg-opacity-90 flex items-center justify-center`}>
                <RegisterStampsDialog stampCard={selectedStampCard!}
                                      onClose={() => {
                                          setRegisterStampsDialogVisible(false);
                                      }}
                                      onRegister={() => {
                                            fetchStampCards().then();
                                          setRegisterStampsDialogVisible(false);
                                      }}
                                      stampCardId={stampCardId || ""}
                />
            </div>

            <div
                className={`${!editStampsDialogVisible ? "hidden" : ""} min-h-screen -mt-20 fixed inset-0 z-50 bg-gray-500 bg-opacity-90 flex items-center justify-center`}>
                <EditStampsDialog
                    stampCard={selectedStampCard!}
                    onClose={() => setEditStampsDialogVisible(false)}
                    onEdit={
                    async () => {
                        await fetchStampCards();
                        setEditStampsDialogVisible(false);
                }}
                    stampCardId={stampCardId || ""}
                    stamp={selectedStamp!}
                    stampId={selectedStamp?.id || ""}
                />
            </div>

            <Animation>
                <Header />

                {stampCard && (
                <div className="mx-40 mt-10">
                    <h1 className="text-3xl font-extrabold">{stampCard?.name}</h1>
                        <div className="my-10 border-2 rounded-xl shadow-lg bg-white">
                            <dl className="divide-y divide-gray-100 text-sm p-4">
                                <div>
                                    <button onClick={() => {
                                        setRegisterStampsDialogVisible(true);
                                        setSelectedStampCard(stampCard);
                                    }}
                                            className="bg-teal-600 text-white p-2 rounded-md hover:bg-teal-700 transition-colors duration-300 flex gap-2">
                                        <PlusIcon className="h-7" />
                                        <p className="font-medium text-lg">Registrer klip</p>
                                    </button>
                                </div>
                                <div
                                    className="bg-gray-300 rounded h-7 w-full p-1 mt-5"
                                    style={{
                                        background: `linear-gradient(to right, #10B981 ${stampCard?.currentStampCount / stampCard?.initialStampCount * 100}%, #D1D5DB 0%)`,
                                    }}
                                >
                                    <p className="h-6 text-center font-bold">{stampCard?.currentStampCount}/{stampCard?.initialStampCount} klip benyttet</p>
                                </div>

                                <div className="flex justify-between py-3">
                                    <div className="flex gap-4 text-lg">
                                    <h1 className="font-bold text-gray-900">Klipværdi:</h1>
                                    <p className="font-medium text-gray-900">{stampCard?.stampValue} {stampCard?.stampUnit}</p>
                                    </div>

                                    <div className="flex gap-4 text-lg">
                                        <h1 className="font-bold text-gray-900">Pris:</h1>
                                    <p className="font-medium text-gray-900">{stampCard?.price} kr.</p>
                                    </div>
                                    <div className="flex gap-4 text-lg">
                                        <h1 className="font-bold text-gray-900">Oprettet:</h1>
                                    <p className="font-medium text-gray-900">{format(stampCard?.created, "dd. MMMM, yyyy", {locale: da})}</p>
                                    </div>
                                </div>
                            </dl>
                        </div>


                    <div className="h-fit overflow-x-auto rounded-lg border border-gray-200 shadow-lg overflow-hidden">
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead className="text-left font-bold">
                        <tr>
                            <th className="px-4 py-2 text-gray-900 select-none">Dato</th>
                            <th className="px-4 py-2 text-gray-900 select-none">Klip</th>
                            <th className="px-4 py-2 text-gray-900 select-none w-[40%]">Beskrivelse</th>
                            <th className="px-4 py-2 text-gray-900 select-none">Ansvarlig</th>
                            <th className="px-4 py-2 text-gray-900 select-none">Handlinger</th>
                        </tr>
                        </thead>

                            <tbody className="divide-y divide-gray-200">
                            {Object.entries(stampCard.stamps || {}).map(([stampId, stamp]) => (
                                    <tr key={stampId} className="hover:bg-teal-600 transition-colors duration-500">
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{format(new Date(stamp.stampDate), "dd. MMMM, yyyy", {locale: da})}</td>
                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{stamp.stampsUsed} klip</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                        <div>
                                            {stamp.stampTitle}
                                            <p className="text-gray-500">{stamp.stampDescription}</p>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">{stamp.stampResponsible.toUpperCase()}</td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                        <button onClick={() => {

                                            setEditStampsDialogVisible(true);
                                            setSelectedStampCard(stampCard);
                                            setSelectedStamp({ ...stamp, id: stampId });
                                        }} className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors duration-300 flex gap-2">
                                            <PencilSquareIcon className="h-5" />
                                            <p>Rediger</p>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>

                    </table>
                    </div>


                </div>
                )}

            </Animation>
        </>
    );
};

export default ViewStampCardScreen;