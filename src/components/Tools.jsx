import React from 'react';
import { FaAws } from "react-icons/fa6";
import { SiApachemaven, SiBun, SiGradle, SiIntellijidea, SiJira, SiNpm, SiPnpm, SiPostman, SiRender, SiSpringboot, SiSwagger, SiVercel, SiYarn } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const tools = [
    { name: 'VS Code', icon: <VscVscode /> },
    { name: 'npm', icon: <SiNpm /> },
    { name: 'Render', icon: <SiRender /> },
    { name: 'Intellij Idea', icon: <SiIntellijidea /> },
    { name: 'Maven', icon: <SiApachemaven /> },
    { name: 'Gradle', icon: <SiGradle /> },
    { name: 'Spring Boot', icon: <SiSpringboot /> },
    { name: 'PostMan', icon: <SiPostman /> },
    { name: 'Swagger Editor', icon: <SiSwagger /> },
    { name: 'AWS', icon: <FaAws /> },
    { name: 'Vercel', icon: <SiVercel /> },
    { name: 'pnpm', icon: <SiPnpm /> },
    { name: 'Jira', icon: <SiJira /> },
    { name: 'yarn', icon: <SiYarn /> },
    { name: 'bun', icon: <SiBun /> },
];

const Tools = () => {
    return (
        <section id="skills" className="py-20">
            <h2 className="text-4xl font-bold text-center mb-10" data-aos="fade-up">Outils</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10">
                {tools.map((tool, index) => (
                    <div key={index} className="text-center flex flex-col items-center" data-aos="fade-up" data-aos-delay={index * 100}>
                        <div className="text-4xl mb-2">{tool.icon}</div>
                        <p>{tool.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Tools;
