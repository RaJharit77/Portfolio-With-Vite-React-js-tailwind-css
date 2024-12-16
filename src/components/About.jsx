import React from 'react';

const About = () => {
    return (
        <section id="about" className="min-h-screen flex flex-col items-center justify-center text-center bg-black text-white p-4">
            <h2 className="text-4xl font-bold mb-6" data-aos="fade-up">À Propos de Moi</h2>
            <h3 className="text-2xl font-semibold mb-6 text-blue-500" data-aos="fade-up">Je vais me présenter...</h3>
            <p className="text-lg max-w-2xl" data-aos="fade-up">
                Bonjour ! Je m'appelle Rajoharitiana, un développeur front-end créatif et passionné basé à Madagascar. Je suis spécialisé dans la conception et le développement d'interfaces utilisateur modernes et intuitives,
                offrant des expériences engageantes et réactives.
                Avec une solide expérience acquise au cours de mes études en licence (L2) et divers projets personnels,
                j'ai développé des compétences dans des technologies front-end telles que React.js, Tailwind CSS, et bien d'autres.
                <br /><br />
                Mon objectif est de transformer des idées en interfaces fonctionnelles et esthétiques tout en assurant une expérience utilisateur optimale.
                Je crois fermement que l'apprentissage continu est essentiel pour évoluer dans ce domaine en constante évolution.
                J'adore explorer de nouvelles technologies, repousser mes limites et collaborer sur des projets innovants.
                <br /><br />
                En dehors du développement, je me passionne pour les échecs, la lecture d'ouvrages sur la technologie et les balades en plein air, 
                qui m'aident à trouver l'inspiration et à rester motivé.
            </p>
        </section>
    );
};

export default About;
