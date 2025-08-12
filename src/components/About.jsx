import { motion } from 'framer-motion';

const About = () => {
    const handleDownloadCV = () => {
        const link = document.createElement('a');
        link.href = '/pdf/CV-Rajoharitiana.pdf';
        link.download = 'CV-Rajoharitiana.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <section id="about" className="min-h-screen flex flex-col items-center justify-center text-center text-white p-4">
            <motion.h2
                className="text-4xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                À Propos de Moi
            </motion.h2>
            <h3 className="text-2xl font-semibold mb-6 text-blue-500" data-aos="fade-up">Je vais me présenter...</h3>
            <p className="text-lg max-w-2xl mb-8" data-aos="fade-up">
                Bonjour ! Je m&apos;appelle Rajoharitiana, un développeur front-end créatif et passionné basé à Madagascar. Je suis spécialisé dans la conception et le développement d&apos;interfaces utilisateur modernes et intuitives,
                offrant des expériences engageantes et réactives.
                Avec une solide expérience acquise au cours de mes études en licence (L2) et divers projets personnels,
                j&apos;ai développé des compétences dans des technologies front-end telles que React.js, Tailwind CSS, Next.js et bien d&apos;autres.
                <br /><br />
                Mon objectif est de transformer des idées en interfaces fonctionnelles et esthétiques tout en assurant une expérience utilisateur optimale.
                Je crois fermement que l&apos;apprentissage continu est essentiel pour évoluer dans ce domaine en constante évolution.
                J&apos;adore explorer de nouvelles technologies, repousser mes limites et collaborer sur des projets innovants.
                <br /><br />
                En dehors du développement, je me passionne pour les échecs, la lecture d&apos;ouvrages sur la technologie et les balades en plein air,
                qui m&apos;aident à trouver l&apos;inspiration et à rester motivé.
            </p>
            <motion.button
                onClick={handleDownloadCV}
                className="btn-blue-marine text-white hover:text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                Télécharger mon CV
            </motion.button>
        </section>
    );
};

export default About;