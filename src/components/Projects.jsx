import React from 'react';

const projects = [
    { title: 'Portfolio version 1.0', img: '/img/portfolio.png' },
    { title: 'Delta Restaurant', img: '/img/delta-restaurant.png' },
    { title: 'Le Lotus Bungalow', img: '/img/leLotus.png' },
    { title: 'Infinitix Blog', img: '/img/infinitix-blog.png' },
    { title: 'Portfolio version 2.0', img: '/img/MyPortfolio.png' },
    { title: 'Delta Hotel', img: '/img/delta-hotel.png' },
    { title: 'Site Responsive', img: '/img/SiteResPic.jpg' },
    { title: 'Grid', img: '/img/grid.jpg' },
    { title: 'Site Menu', img: '/img/SiteMenu.png' },
];

const Projects = () => {
    return (
        <section id="projects" className="py-20 bg-black text-white">
            <h2 className="text-4xl font-bold text-center mb-10" data-aos="fade-up">Projets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {projects.map((project, index) => (
                    <div key={index} className="text-center" data-aos="fade-up" data-aos-delay={index * 100}>
                        <img src={project.img} alt={project.title} className="w-full h-auto mb-4 rounded"/>
                        <h3 className="text-2xl font-bold">{project.title}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
