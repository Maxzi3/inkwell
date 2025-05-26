import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom'
import Search from '../components/Search';
import AccountHeader from '../components/AppHeader';
import SideBar from '../components/SideBar';

const AppLayout = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
 
if (isMobile) {
    return (
      <div>
        <div className="md:hidden block bg-white dark:bg-gray-900 dark:text-white text-gray-700">
          <Search/>
          <main className="bg-white dark:bg-gray-900 dark:text-white text-gray-700  md:overflow-scroll min-h-screen ">
            <Outlet />
          </main>
          {/* <AccountFooter /> */}
        </div>

        
      </div>
    );
  }

  // Desktop layout
  return (
    <div>
      <div className="hidden md:grid h-screen grid-cols-[14rem_1fr] grid-rows-[auto_1fr]">
        <AccountHeader />
        <SideBar />
        <main className=" text-gray-700  overflow-hidden">
          <div className="max-w-[120rem] mx-auto flex flex-col gap-8">
            <Outlet />
          </div>
        </main>
      </div>

   
    </div>
  );
}
export default AppLayout