import {StampCardInterface} from "../../utils/interfaces.ts";

export const RegisterStampsDialog = ({
                                         onClose, stampCard}: {
    onClose: () => void;
    stampCard?: StampCardInterface;
}) => {
    return (
        <div className="overflow-hidden rounded-lg shadow-2xl bg-white p-4 text-white">
            <p className="font-bold text-black text-4xl text-center">Registrer klippekort - {stampCard?.name}</p>
            <p className="text-gray-500 text-xl italic my-4 text-center">Du er ved at slette et klippekort og alle
                tilknyttede
                opgaver.</p>
            <p className="text-gray-500 text-xl italic my-4 text-center">Denne handling kan ikke fortrydes.</p>
            <div className="mt-4 flex gap-2 justify-center">
                <button onClick={onClose}
                        className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded text-xl">Fortryd
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-xl">Ja, jeg er helt
                    sikker
                </button>
            </div>
        </div>
    );
};

export default RegisterStampsDialog;