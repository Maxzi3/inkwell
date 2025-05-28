import { FaArrowLeftLong } from "react-icons/fa6";
import UpdatePasswordForm from "../features/Authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/User/UpdateuserDataForm";
import { useNavigate } from "react-router-dom";



const UpdatePage = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(-1); // go back
    };
    return (
        <div className="md:py-1 pb-20 space-y-4 ">
            <div className="flex items-center p-4 md:p-5 justify-between w-full">
                <button onClick={handleClick}><FaArrowLeftLong className="flex shrink-0 items-center" /></button>
            </div>
            <h1 className="text-center text-xl font-medium underline underline-offset-4 p-4">
                Update User Data
            </h1>
            <UpdateUserDataForm />
            <h1 className="text-center text-xl font-medium underline underline-offset-4 p-4">
                Update Password
            </h1>
            <UpdatePasswordForm />
        </div>
    );
};

export default UpdatePage;
