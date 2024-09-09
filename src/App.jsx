import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect } from 'react';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './pages/Footer';
import Home from './pages/Home';
import Navbar from './pages/Navbar';
import Projects from './pages/Projects';
import Skills from './pages/Skills';

const App = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []);

    return (
        <div className="bg-black text-white">
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
