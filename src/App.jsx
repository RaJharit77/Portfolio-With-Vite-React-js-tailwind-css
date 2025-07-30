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
import Tools from './pages/ToolsPage';
import ThreeBackground from './components/ThreeBackground';

const App = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            mirror: true,
        });
    }, []);

    return (
        <div className="relative min-h-screen text-gray-100 overflow-hidden">
            <ThreeBackground />

            <div className="relative z-10">
                <Navbar />
                <main className="flex flex-col items-center justify-center w-full">
                    <Home />
                    <About />
                    <Skills />
                    <Tools />
                    <Projects />
                    <Contact />
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default App;