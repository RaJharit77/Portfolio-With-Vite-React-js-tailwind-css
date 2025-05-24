import React from 'react';

const projects = [
    { title: 'Pokémon Search', img: '/img/PokémonSearch.png', href: 'https://pokemon-search-app-next.vercel.app/' },
    { title: 'Diamond Store', img: '/img/diamond_store.png', href: 'https://diamond-store-app-madagascar.vercel.app/' },
    { title: 'Site Responsive', img: '/img/SiteResPic.jpg', href: '#' },
    { title: 'Infinitix Task Manager', img: '/img/infinitix-task.png', href: 'https://infinitix-task-manager.onrender.com/' },
    { title: 'Delta Hotel', img: '/img/delta-hotel.png', href: 'https://delta-hotel.vercel.app/' },
    { title: 'Delta Restaurant', img: '/img/delta-restaurant.png', href: 'https://delta-restaurant.vercel.app/' },
    { title: 'Portfolio version 2.0', img: '/img/MyPortfolio.png', href: 'https://rajoharitiana-raharison-rajharit77.vercel.app' },
    { title: 'Portfolio version 1.0', img: '/img/portfolio.png', href: 'https://rajhari7-raharison-portfolio.vercel.app' },
    { title: 'Le Lotus Bungalow', img: '/img/leLotus.png', href: 'https://lotus-7yyd.vercel.app/' },
];

const Projects = () => {
    return (
        <section id="projects" className="py-20 bg-black text-white">
            <h2 className="text-4xl font-bold text-center mb-10" data-aos="fade-up">Projets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 cursor-pointer">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="text-center"
                        data-aos="zoom-in"
                        data-aos-delay={index * 100}
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
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
