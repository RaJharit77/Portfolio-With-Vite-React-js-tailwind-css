import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect } from 'react';
import About from './pages/AboutPage';
import Contact from './pages/ContactsPage';
import Footer from './pages/Footer';
import Home from './pages/HomePage';
import Navbar from './pages/Navbar';
import Projects from './pages/ProjectsPage';
import Skills from './pages/SkillsPage';

const App = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []);

    return (
        <div className="bg-black text-gray-100">
            <Navbar />
            <main className="flex flex-col items-center justify-center w-full">
                <Home />
                <About />
                <Skills />
                <Projects />
                <Contact />
            </main>
            <Footer />
        </div>
    );
};

export default App;
