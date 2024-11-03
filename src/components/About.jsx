import React from 'react';

const About = () => {
    return (
        <section id="about" className="min-h-screen flex flex-col items-center justify-center text-center bg-black text-white p-4">
            <h2 className="text-4xl font-bold mb-6" data-aos="fade-up">À Propos de Moi</h2>
            <h3 className="text-2xl font-semibold mb-6 text-blue-500" data-aos="fade-up">Je vais me présenter...</h3>
            <p className="text-lg max-w-2xl" data-aos="fade-up">
                Bonjour! Je m'appelle Rajoharitiana, un développeur de logiciels créatif et passionné, basé à Madagascar. 
                J'ai un amour profond pour le codage et j'apprécie le plaisir d'apprendre de nouvelles choses. Avec 
                une expérience acquise durant ma deuxième année de licence (L2), je suis motivé pour créer des applications web et mobiles.
                <br /><br />
                Je crois que la meilleure façon de grandir est de constamment repousser mes limites et d'explorer de nouvelles technologies. 
                Qu'il s'agisse de développer des interfaces utilisateur élégantes ou de construire des systèmes back-end robustes, 
                je suis toujours prêt à relever de nouveaux défis et à contribuer à des projets innovants.
                <br /><br />
                En dehors du codage, j'aime aussi jouer aux échecs, lire des livres sur la technologie et passer du temps en plein air.
            </p>
        </section>
    );
};

export default About;
