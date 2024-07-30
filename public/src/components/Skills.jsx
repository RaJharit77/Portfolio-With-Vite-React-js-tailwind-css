import React from 'react';
import { BiLogoSpringBoot } from "react-icons/bi";
import { DiJqueryLogo } from "react-icons/di";
import { FaBootstrap, FaCss3Alt, FaFigma, FaGithub, FaHtml5, FaJava, FaJs, FaPython, FaReact } from 'react-icons/fa6';
import { SiPostgresql, SiTailwindcss, SiTypescript, SiVite } from "react-icons/si";


const skills = [
    { name: 'JavaScript', icon: <FaJs /> },
    { name: 'Github', icon: <FaGithub /> },
    { name: 'HTML', icon: <FaHtml5 /> },
    { name: 'CSS', icon: <FaCss3Alt /> },
    { name: 'Bootstrap', icon: <FaBootstrap /> },
    { name: 'Postgresql', icon: <SiPostgresql /> },
    { name: 'Figma', icon: <FaFigma /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
    { name: 'Vite JS', icon: <SiVite /> },
    { name: 'React JS', icon: <FaReact /> },
    { name: 'TypeScript', icon: <SiTypescript /> },
    { name: 'Java', icon: <FaJava /> },
    { name: 'Spring Boot', icon: <BiLogoSpringBoot /> },
    { name: 'Python', icon: <FaPython /> },
    { name: 'jQuery', icon: <DiJqueryLogo /> },
];

const Skills = () => {
    return (
        <section id="skills" className="py-20">
            <h2 className="text-4xl font-bold text-center mb-10" data-aos="fade-up">Compétences</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10">
                {skills.map((skill, index) => (
                    <div key={index} className="text-center flex flex-col items-center" data-aos="fade-up" data-aos-delay={index * 100}>
                        <div className="text-4xl mb-2">{skill.icon}</div>
                        <p>{skill.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
