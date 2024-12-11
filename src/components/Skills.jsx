import React from 'react';
import { BiLogoSpringBoot } from "react-icons/bi";
import { FaBootstrap, FaCss3Alt, FaFigma, FaGitAlt, FaGithub, FaHtml5, FaJava, FaJs, FaReact } from 'react-icons/fa6';
import { SiNextdotjs, SiOpenapiinitiative, SiPostgresql, SiPrisma, SiReactbootstrap, SiSqlite, SiTailwindcss, SiTypescript, SiVite } from "react-icons/si";

const skills = [
    { name: 'JavaScript', icon: <FaJs /> },
    { name: 'Git', icon: <FaGitAlt />},
    { name: 'Github', icon: <FaGithub /> },
    { name: 'HTML', icon: <FaHtml5 /> },
    { name: 'CSS', icon: <FaCss3Alt /> },
    { name: 'Bootstrap', icon: <FaBootstrap /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
    { name: 'Figma', icon: <FaFigma /> },
    { name: 'PostgreSQL', icon: <SiPostgresql /> },
    { name: 'Vite.JS', icon: <SiVite /> },
    { name: 'React Bootstrap', icon: <SiReactbootstrap /> },
    { name: 'React.JS', icon: <FaReact /> },
    { name: 'Java', icon: <FaJava /> },
    { name: 'TypeScript', icon: <SiTypescript /> },
    { name: 'Spring Boot', icon: <BiLogoSpringBoot /> },
    { name: 'OpenAPI', icon: <SiOpenapiinitiative /> },
    { name: 'Next.JS', icon: <SiNextdotjs /> },
    { name: 'Prisma', icon: <SiPrisma /> },
    { name: 'SQLite', icon: <SiSqlite /> },
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
