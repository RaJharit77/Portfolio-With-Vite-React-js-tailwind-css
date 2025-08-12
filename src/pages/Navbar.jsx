import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';
import { LiaTimesSolid } from "react-icons/lia";
import { RiMenu3Line } from "react-icons/ri";
import { Link } from 'react-scroll';

const Navbar = () => {
    const [, setScrollPosition] = useState(0);
    const [lastScrollPosition, setLastScrollPosition] = useState(0);
    const [navVisible, setNavVisible] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        AOS.init({ duration: 1000 });

        const handleScroll = () => {
            const currentScrollPosition = window.pageYOffset;

            if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 100) {
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
            <div className="container mx-auto py-5 px-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <a href="https://www.linkedin.com/in/rajoharitiana-raharison-27r7h17a37/">
                        <img
                            src="/img/RJ.jpg"
                            alt="Logo"
                            className="h-10 w-10 md:h-12 md:w-12 rounded-full cursor-pointer"
                        />
                    </a>
                    <a href="/">
                        <div className="text-xl md:text-2xl lg:text-3xl font-bold text-white cursor-pointer neon-hover">
                            Rajoharitiana Raharison
                        </div>
                    </a>
                </div>
                <div className="md:hidden" onClick={toggleMenu}>
                    {menuOpen ?
                        <LiaTimesSolid className="text-3xl cursor-pointer" /> :
                        <RiMenu3Line className="text-3xl cursor-pointer" />
                    }
                </div>

                <div className={`md:flex md:flex-row md:items-center md:space-x-6 absolute md:static bg-black md:bg-transparent w-full md:w-auto left-0 md:left-auto ${menuOpen ? 'top-full flex flex-col items-center py-4' : 'top-[-400px]'} transition-all duration-300 ease-in-out shadow-lg md:shadow-none`}>
                    <Link to="home" smooth={true} duration={500} onClick={() => setMenuOpen(false)} className="text-blue-500 hover:text-yellow-500 transition-transform transform hover:scale-110 link-hover cursor-pointer py-3 md:py-0 text-lg w-full text-center md:w-auto">Accueil</Link>
                    <Link to="about" smooth={true} duration={500} onClick={() => setMenuOpen(false)} className="text-blue-500 hover:text-yellow-500 transition-transform transform hover:scale-110 link-hover cursor-pointer py-3 md:py-0 text-lg w-full text-center md:w-auto">À Propos</Link>
                    <Link to="skills" smooth={true} duration={500} onClick={() => setMenuOpen(false)} className="text-blue-500 hover:text-yellow-500 transition-transform transform hover:scale-110 link-hover cursor-pointer py-3 md:py-0 text-lg w-full text-center md:w-auto">Compétences</Link>
                    <Link to="projects" smooth={true} duration={500} onClick={() => setMenuOpen(false)} className="text-blue-500 hover:text-yellow-500 transition-transform transform hover:scale-110 link-hover cursor-pointer py-3 md:py-0 text-lg w-full text-center md:w-auto">Projets</Link>
                    <Link to="contacts" smooth={true} duration={500} onClick={() => setMenuOpen(false)} className="text-blue-500 hover:text-yellow-500 transition-transform transform hover:scale-110 link-hover cursor-pointer py-3 md:py-0 text-lg w-full text-center md:w-auto">Contacts</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;