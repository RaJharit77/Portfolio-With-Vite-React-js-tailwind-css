import React from 'react';
import { motion } from 'framer-motion';

const projects = [
    { title: 'Weather Dashboard', img: '/img/Weather-Project.png', href: 'https://5a2b83b8.us2a.app.preset.io/superset/dashboard/9/?native_filters_key=fAf4P3NHJBNPhnjlARWRqgWVDzOqpmS3Y_aK9A_beVEkI-ng8A9vlBeqd1uBpo7I' },
    { title: 'Pokémon Search', img: '/img/PokémonSearch.png', href: 'https://pokemon-search-app-next.vercel.app/' },
    { title: 'Diamond Store', img: '/img/diamond_store.png', href: 'https://diamond-store-app-madagascar.vercel.app/' },
    { title: 'Infinitix Task Manager', img: '/img/infinitix-task.png', href: 'https://infinitix-task-manager.onrender.com/' },
    { title: 'Delta Hotel', img: '/img/delta-hotel.png', href: 'https://delta-hotel-madagascar.vercel.app/' },
    { title: 'Delta Restaurant', img: '/img/delta-restaurant.png', href: 'https://delta-restaurant-madagascar.vercel.app/' },
    { title: 'Portfolio version 2.0', img: '/img/MyPortfolio.png', href: 'https://rajoharitiana-raharison-rajharit77.vercel.app' },
    { title: 'Portfolio version 1.0', img: '/img/portfolio.png', href: 'https://rajhari7-raharison-portfolio.vercel.app' },
    { title: 'Le Lotus Bungalow', img: '/img/leLotus.png', href: 'https://lotus-7yyd.vercel.app/' },
];

const Projects = () => {
    return (
        <section id="projects" className="py-20 text-white">
            <motion.h2
                className="text-4xl font-bold text-center mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                Projets
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 cursor-pointer" data-aos="fade-up">
        {projects.map((project, index) => (
            <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                    duration: 0.5,
                    delay: index * 0.1
                }}
                whileHover={{ y: -10 }}
            >
                {project.href ? (
                    <a href={project.href} target="_blank" rel="noopener noreferrer">
                        <img src={project.img} alt={project.title} className="w-full h-auto mb-4 rounded" />
                        <h3 className="text-2xl font-bold text-white hover:text-yellow-500">{project.title}</h3>
                    </a>
                ) : (
                    <div>
                        <img src={project.img} alt={project.title} className="w-full h-auto mb-4 rounded" />
                        <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                    </div>
                )}
            </motion.div>
        ))}
        </div>
        </section >
    );
};

export default Projects;
