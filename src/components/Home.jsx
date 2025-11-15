import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <section id="home" className="min-h-screen flex flex-col md:flex-row items-center justify-center text-center md:text-left text-white pt-0 p-8 space-y-8 md:space-y-0 md:space-x-12 mt-24">
            <div className="flex-[0.6]" data-aos="fade-up">
                <h1 className="text-4xl sm:text-5xl font-bold mb-6 animated-text">Bienvenue sur mon Portfolio</h1>
                {/**<h2 className="text-3xl sm:text-4xl font-bold mb-4">Je suis un Développeur</h2>*/}
                <p className="text-lg sm:text-xl leading-relaxed max-w-3xl text-animation mb-6">
                    Je suis actuellement un étudiant en troisième année à l'Haute École d'Informatique ou HEI.<br />
                    Je suis passioné du développement Web du côté Front-end, je suis motivé pour créer des sites créatifs
                    et de la création d'applications Web pour ma passion en
                    Informatique et la nouvelle technologie.<br />
                    Durant mon parcours au lycée, j'ai développé un intérêt particulier pour l'Informatique, ce
                    qui m'a conduit à choisir le développement Web pour mes études supérieures.
                </p>
                <div className="flex space-x-4 text-animation">
                    <button
                        className="btn-blue-marine"
                        onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                    >
                        Mes Projets
                    </button>
                    <button
                        className="btn-blue-marine"
                        onClick={() => document.getElementById('contacts').scrollIntoView({ behavior: 'smooth' })}
                    >
                        Contactez Moi
                    </button>
                </div>
            </div>

            <div className="flex-[0.5] flex justify-center" data-aos="fade-up">
                <img
                    src="/img/RaJharit.jpg"
                    alt="RaJharit"
                    className="w-full sm:w-3/4 md:w-4/5 lg:w-2/3 rounded-xl"
                />
            </div>
        </section>
    );
};

export default Home;
