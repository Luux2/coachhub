import {PencilIcon, TicketIcon, UsersIcon} from "@heroicons/react/24/outline";
import {NavLink, useLocation, useParams} from "react-router-dom";

export const ClientProfileTabMenu = () => {
    const location = useLocation();
    const clientId = useParams().clientId;

    return (
        <div>
            <div className="block">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex gap-6" aria-label="Tabs">
                        {/* Klippekort Tab */}
                        <NavLink
                            to={`/kunder/${clientId}/klippekort`}
                            className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-1 pb-4 text-sm font-medium
                                ${location.pathname.includes("klippekort")
                                ? "border-teal-500 text-teal-600"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"}
                            `}
                        >
                            <TicketIcon className={`size-5 ${location.pathname.includes("klippekort") ? "text-teal-600" : "text-gray-400"}`} />
                            Klippekort
                        </NavLink>

                        {/* Kontaktpersoner Tab */}
                        <NavLink
                            to={`/kunder/${clientId}/kontaktpersoner`}
                            className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-1 pb-4 text-sm font-medium
                                ${location.pathname.includes("kontaktpersoner")
                                ? "border-teal-500 text-teal-600"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"}
                            `}
                        >
                            <UsersIcon className={`size-5 ${location.pathname.includes("kontaktpersoner") ? "text-teal-600" : "text-gray-400"}`} />
                            Kontaktpersoner
                        </NavLink>
                        <NavLink
                            to={`/kunder/${clientId}/noter`}
                            className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-1 pb-4 text-sm font-medium
                                ${location.pathname.includes("noter")
                                ? "border-teal-500 text-teal-600"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"}
                            `}
                        >
                            <PencilIcon className={`size-5 ${location.pathname.includes("noter") ? "text-teal-600" : "text-gray-400"}`} />
                            Noter
                        </NavLink>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default ClientProfileTabMenu;
