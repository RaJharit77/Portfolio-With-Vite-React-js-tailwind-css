import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect } from 'react';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Skills from './components/Skills';

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
