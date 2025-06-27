import { CiSettings } from "react-icons/ci";
import { useState, useRef, useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import Modal from "./Modal";
import Logo from "./Logo";

const HeaderWithSettings = () => {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    // Close the menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

  

    return (
        <div className="relative">
            <div className="flex items-center justify-between w-full lg:p-0 p-4">
                <h2 className="lg:hidden text-lg font-bold leading-tight tracking-[-0.015em]">
                <Logo/>
                </h2>
                <CiSettings
                    className="text-3xl cursor-pointer"
                    onClick={() => setShowMenu((prev) => !prev)}
                />
            </div>

            {showMenu && (
                <div
                    ref={menuRef}
                    className="absolute right-4 top-16 border rounded-md shadow-lg w-48 z-50 opacity-95 backdrop-blur-md bg-input text-text-primary"
                >
                    <Modal.Open opens="logout">
                        <button
                            className="w-full flex items-center gap-2 text-left px-4 py-2  hover:bg-text-primary hover:text-input"
                        >
                            <FiLogOut className="text-lg" />
                            Logout
                        </button>
                    </Modal.Open>
                    <Modal.Open opens="delete">
                        <button
                            className="flex items-center gap-2 w-full text-left px-4 py-2 text-red-600  hover:bg-text-primary hover:text-input"
                        >
                            <MdDeleteOutline className="text-lg" />
                            Delete Account
                        </button>
                    </Modal.Open>
                </div>
            )}
        </div>
    );
};

export default HeaderWithSettings;
