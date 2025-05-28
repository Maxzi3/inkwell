import ProfileNav from "./ProfileNav"
import { Outlet, useNavigate } from "react-router-dom"
import HeaderWithSettings from "../components/HeaderWithSettings";


const ProfilePageMobile = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/updatedata");
    };
    return (
        <div>
            <HeaderWithSettings />
            <h1 className="text-center text-xl font-medium">Profile</h1>
            <div className="flex flex-col text-center">
                <div className="flex justify-center pt-6 pb-3 z-10">
                    <img
                        src=''
                        alt='test'
                        className="relative z-0 w-24 h-24 rounded-full  border-2 border-blue-500"
                    />
                </div>
                <h1 className="text-xl font-medium">Ethan Carter</h1>
                <p>@ethan_carter</p>
                <p>I love writing</p>
                <div className="flex justify-center gap-3 p-2">
                    <button onClick={handleClick} className="flex items-center bg-input text-text-primary px-7 rounded-lg font-medium hover:bg-text-primary hover:text-input transition py-2">Edit Profile</button>
                    <button className="flex items-center bg-btnbg text-btntxt px-7 rounded-lg font-medium hover:bg-input hover:text-btnbg transition py-2">Create Post</button>
                </div>
                <ProfileNav />
                <Outlet />
            </div>
        </div>
    )
}

export default ProfilePageMobile