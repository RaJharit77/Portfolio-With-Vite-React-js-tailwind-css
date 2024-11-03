import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center bg-black text-white pt-24 p-8">
            <img src="/img/RaJharit.jpg" alt="Bienvenue" className="w-3/4 sm:w-1/2 md:w-1/4 lg:w-1/6 mb-6 rounded-full" data-aos="fade-up" />
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 animated-text" data-aos="fade-up">Bienvenue sur mon Portfolio</h1>
            <p className="text-lg sm:text-xl leading-relaxed max-w-3xl mb-8 text-animation" data-aos="fade-up">
                Je suis actuellement un étudiant en deuxième année du développement
                Web du côté Front-end à l'Haute École d'Informatique ou HEI.<br />
                Je suis motivé pour créer des logiciels créatifs et de la création d'applications Web pour ma passion en
                Informatique et la nouvelle technologie.<br />
                Durant mon parcours au lycée, j'ai développé un intérêt particulier pour l'Informatique, ce
                qui m'a conduit à choisir le développement Web pour mes études supérieures.
            </p>
            <div className="flex space-x-4 mt-4 text-animation" data-aos="fade-up">
                <button className="btn-blue-marine" onClick={() => window.location.href="#projects"}>Mes Projets</button>
                <button className="btn-blue-marine" onClick={() => window.location.href="#contact"}>Contactez Moi</button>
            </div>
        </section>
    );
};

export default Home;
