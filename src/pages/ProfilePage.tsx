import { useEffect, useState } from 'react';

import ProfilePageDesktop from './ProfilePageDesktop';
import ProfilePageMobile from './ProfilePageMobile';

const ProfilePage = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {isMobile ? (
                <ProfilePageMobile />
            ) : (
                <ProfilePageDesktop />
            )}
        </>
    );
}

export default ProfilePage
