import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Search from "../components/Search";
import AccountHeader from "../components/AppHeader";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import DarkModeToggle from "../ui/DarkModeToggle";
import Modal from "../components/Modal";
import DeleteAccForm from "../features/Authentication/DeleteAccForm";
import LogoutForm from "../features/Authentication/LogoutForm";
import Logo from "../components/Logo";

const AppLayout = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isHomePage = location.pathname === "/";
  const isProfilePage = location.pathname.startsWith("/profile");

  if (isMobile) {
    return (
      <Modal>
        <div className="lg:hidden block text-text-primary bg-primary">
          {!isProfilePage && (
            <div className="fixed top-0 left-0 right-0 z-50 bg-primary border-b border-text-secondary py-2">
              <div className="flex items-center justify-between w-full p-3">
                <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
                  <Logo />
                </h2>
                <DarkModeToggle />
              </div>
              {isHomePage && <Search />}
            </div>
          )}
          <main className="overflow-hidden min-h-screen">
            <Outlet />
          </main>
          <Footer />
          <Modal.Window name="delete">
            <DeleteAccForm />
          </Modal.Window>
          <Modal.Window name="logout">
            <LogoutForm />
          </Modal.Window>
        </div>
      </Modal>
    );
  }

  // Desktop layout
  return (
    <Modal>
      <div>
        <div className="hidden lg:grid h-screen grid-cols-[10rem_1fr] grid-rows-[auto_1fr] text-text-primary bg-primary ">
          <AccountHeader />
          <SideBar />
          <main className="overflow-scroll">
            <div className="max-w-[120rem] mx-auto flex flex-col gap-8 bg-backround text-text">
              <Outlet />
            </div>
          </main>
        </div>
      </div>

      <Modal.Window name="delete">
        <DeleteAccForm />
      </Modal.Window>
      <Modal.Window name="logout">
        <LogoutForm />
      </Modal.Window>
    </Modal>
  );
};
export default AppLayout;
