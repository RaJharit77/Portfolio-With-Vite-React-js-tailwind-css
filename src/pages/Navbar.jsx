import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect, useState } from 'react';
import { LiaTimesSolid } from "react-icons/lia";
import { RiMenu3Line } from "react-icons/ri";
import { Link } from 'react-scroll';

const Navbar = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [lastScrollPosition, setLastScrollPosition] = useState(0);
    const [navVisible, setNavVisible] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        AOS.init({ duration: 1000 });

        const handleScroll = () => {
            const currentScrollPosition = window.pageYOffset;

            if (currentScrollPosition > lastScrollPosition) {
                setNavVisible(false);
            } else {
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

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className={`fixed w-full bg-black text-white shadow-yellow-500 z-50 transition-transform duration-300 ${navVisible ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className="container mx-auto py-5 px-4 flex justify-between items-center"> {/* Augmentation du padding vertical */}
                <div className="flex items-center space-x-4">
                    <a href="https://www.linkedin.com/in/rajoharitiana-raharison-27r7h17a37/">
                        <img src="/img/RJ.jpg" alt="Logo" className="h-12 w-12 rounded-full cursor-pointer" /> {/* Taille du logo augmentée */}
                    </a>
                    <a href="/">
                        <div className="text-2xl md:text-3xl font-bold text-white cursor-pointer neon-hover"> {/* Taille du texte augmentée */}
                            Rajoharitiana Raharison
                        </div>
                    </a>
                </div>
                <div className="md:hidden" onClick={toggleMenu}>
                    {menuOpen ? <LiaTimesSolid className="text-3xl cursor-pointer" /> : <RiMenu3Line className="text-3xl cursor-pointer" />} {/* Taille des icônes augmentée */}
                </div>
                <div className={`md:flex md:flex-row md:items-center md:space-x-6 absolute md:static bg-black md:bg-transparent w-full md:w-auto left-0 md:left-auto ${menuOpen ? 'top-20 flex flex-col items-center' : 'top-[-400px]'} transition-all duration-300 ease-in-out`}>
                    <Link to="home" smooth={true} duration={500} className="text-blue-500 hover:text-yellow-500 transition-transform transform hover:scale-110 link-hover cursor-pointer py-3 md:py-0 text-lg">Accueil</Link> {/* Augmentation de l'espacement et taille du texte */}
                    <Link to="about" smooth={true} duration={500} className="text-blue-500 hover:text-yellow-500 transition-transform transform hover:scale-110 link-hover cursor-pointer py-3 md:py-0 text-lg">À Propos</Link>
                    <Link to="skills" smooth={true} duration={500} className="text-blue-500 hover:text-yellow-500 transition-transform transform hover:scale-110 link-hover cursor-pointer py-3 md:py-0 text-lg">Compétences</Link>
                    <Link to="projects" smooth={true} duration={500} className="text-blue-500 hover:text-yellow-500 transition-transform transform hover:scale-110 link-hover cursor-pointer py-3 md:py-0 text-lg">Projets</Link>
                    <Link to="contacts" smooth={true} duration={500} className="text-blue-500 hover:text-yellow-500 transition-transform transform hover:scale-110 link-hover cursor-pointer py-3 md:py-0 text-lg">Contacts</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;