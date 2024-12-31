import React from 'react';
import { FaEnvelope, FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaXTwitter } from 'react-icons/fa6';

const navLinks = [
    { href: "#home", text: "Accueil" },
    { href: "#about", text: "À Propos" },
    { href: "#skills", text: "Compétences" },
    { href: "#projects", text: "Projets" },
    { href: "#contacts", text: "Contacts" },
];

const socialLinks = [
    { href: "https://www.facebook.com/haritiana.hernandez", icon: <FaFacebook /> },
    { href: "https://www.instagram.com/haritiana_h7/", icon: <FaInstagram /> },
    { href: "https://www.linkedin.com/in/rajoharitiana-raharison-27r7h17a37/", icon: <FaLinkedin /> },
    { href: "https://x.com/Rajharit_r77", icon: <FaXTwitter /> },
    { href: "https://github.com/RaJharit77", icon: <FaGithub /> },
    { href: "mailto:rajoharitiana.raharison@gmail.com", icon: <FaEnvelope /> },
];

const Footer = () => {
    return (
        <footer className="bg-gray-950 text-white py-7 mt-0">
            <div className="container mx-auto flex flex-col items-center space-y-6 md:space-y-7">
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col md:flex-row justify-between items-center w-full">
                    <nav className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 mb-4 md:mb-0 text-center bg-gray-800">
                        {navLinks.map(link => (
                            <a href={link.href} key={link.href} className="hover:text-yellow-400 transition duration-300">{link.text}</a>
                        ))}
                    </nav>
                    <div className="flex space-x-4 text-2xl">
                        {socialLinks.map(link => (
                            <a href={link.href} key={link.href} className="hover:text-yellow-400 transition duration-300">{link.icon}</a>
                        ))}
                    </div>
                </div>
                
                <div className="w-full flex justify-center px-4 text-center mt-10 md:px-10">
                    <p className="text-gray-400">&copy; {new Date().getFullYear()} - Présent RaJharit77. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
