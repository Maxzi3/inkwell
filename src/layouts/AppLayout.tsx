import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom'
import Search from '../components/Search';
import AccountHeader from '../components/AppHeader';
import SideBar from '../components/SideBar';
import Footer from '../components/Footer';

const AppLayout = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
 
if (isMobile) {
    return (
      <div className='md:hidden block text-text-primary bg-primary'>
        <div className="py-4">
          <Search/>
          </div>
          <main className="md:overflow-scroll min-h-screen ">
            <Outlet />
          </main>
          <Footer />   
      </div>
    );
  }

  // Desktop layout
  return (
    <div>
      <div className="hidden md:grid h-screen grid-cols-[11rem_1fr] grid-rows-[auto_1fr] text-text-primary bg-primary ">
        <AccountHeader />
        <SideBar />
        <main className="overflow-hidden">
          <div className="max-w-[120rem] mx-auto flex flex-col gap-8 bg-backround text-text">
            <Outlet />
          </div>
        </main>
      </div>

   
    </div>
  );
}
export default AppLayout