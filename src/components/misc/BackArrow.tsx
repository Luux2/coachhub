import {ArrowLeftCircleIcon} from "@heroicons/react/24/outline";
import {useNavigate} from "react-router-dom";

export const BackArrow = () => {
    const navigate = useNavigate();


    return (
        <>
            <ArrowLeftCircleIcon onClick={() => navigate(-1)} className="size-10 text-black cursor-pointer" />
        </>
    );
};

export default BackArrow;