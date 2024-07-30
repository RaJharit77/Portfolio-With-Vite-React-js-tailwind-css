import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';

const Navbar = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [lastScrollPosition, setLastScrollPosition] = useState(0);
    const [navVisible, setNavVisible] = useState(true);

    useEffect(() => {
        AOS.init({ duration: 1000 });

        const handleScroll = () => {
            const currentScrollPosition = window.pageYOffset;

            if (currentScrollPosition > lastScrollPosition) {
                // Scrolling down
                setNavVisible(false);
            } else {
                // Scrolling up
                setNavVisible(true);
            }
            setLastScrollPosition(currentScrollPosition);
            setScrollPosition(currentScrollPosition);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollPosition]);

    return (
        <nav className={`fixed w-full bg-black text-white shadow-yellow-500 z-50 transition-transform duration-300 ${navVisible ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className="container mx-auto p-4 flex justify-between items-center flex-col md:flex-row">
                <div className="flex items-center space-x-4">
                    <a href="https://www.linkedin.com/in/rajoharitiana-raharison-27r7h17a37/">
                        <img src="/img/RJ.jpg" alt="Logo" className="h-10 w-10 rounded-full cursor-pointer" />
                    </a>
                    <div className="text-2xl font-bold">Rajoharitiana Raharison</div>
                </div>
                <div className="space-x-4 mt-4 md:mt-0 flex flex-wrap justify-center">
                    <Link to="home" smooth={true} duration={500} className="hover:text-yellow-500 transition-transform transform hover:scale-110 link-hover cursor-pointer">Accueil</Link>
                    <Link to="about" smooth={true} duration={500} className="hover:text-yellow-500 transition-transform transform hover:scale-110 link-hover cursor-pointer">À Propos</Link>
                    <Link to="skills" smooth={true} duration={500} className="hover:text-yellow-500 transition-transform transform hover:scale-110 link-hover cursor-pointer">Compétences</Link>
                    <Link to="projects" smooth={true} duration={500} className="hover:text-yellow-500 transition-transform transform hover:scale-110 link-hover cursor-pointer">Projets</Link>
                    <Link to="contact" smooth={true} duration={500} className="hover:text-yellow-500 transition-transform transform hover:scale-110 link-hover cursor-pointer">Contacts</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
