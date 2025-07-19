import React from 'react';
import { FaAws } from "react-icons/fa6";
import { SiApachemaven, SiBun, SiGradle, SiIntellijidea, SiJira, SiNpm, SiPnpm, SiPostman, SiRender, SiJupyter, SiSwagger, SiVercel, SiYarn } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const tools = [
    { name: 'VS Code', icon: <VscVscode />, proficiency: 98 },
    { name: 'npm', icon: <SiNpm />, proficiency: 97 },
    { name: 'Render', icon: <SiRender />, proficiency: 80 },
    { name: 'Intellij Idea', icon: <SiIntellijidea />, proficiency: 75 },
    { name: 'Maven', icon: <SiApachemaven />, proficiency: 75 },
    { name: 'Gradle', icon: <SiGradle />, proficiency: 30 },
    { name: 'PostMan', icon: <SiPostman />, proficiency: 90 },
    { name: 'Swagger Editor', icon: <SiSwagger />, proficiency: 71 },
    { name: 'AWS', icon: <FaAws />, proficiency: 35 },
    { name: 'Vercel', icon: <SiVercel />, proficiency: 95 },
    { name: 'pnpm', icon: <SiPnpm />, proficiency: 50 },
    { name: 'Jira', icon: <SiJira />, proficiency: 67 },
    { name: 'yarn', icon: <SiYarn />, proficiency: 57 },
    { name: 'bun', icon: <SiBun />, proficiency: 47 },
    { name: 'Jupyter Notebook', icon: <SiJupyter />, proficiency: 70 },
];

const Tools = () => {
    return (
        <section id="tools" className="py-20 bg-black/50 text-white">
            <h2 className="text-4xl font-bold text-center mb-10" data-aos="fade-up">Outils</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 px-4">
                {tools.map((tool, index) => (
                    <div key={index} className="text-center flex flex-col items-center" data-aos="fade-up" data-aos-delay={index * 100}>
                        <div className="relative w-28 h-28 mb-4">
                            <svg className="w-full h-full" viewBox="0 0 36 36">
                                <path
                                    d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="#2d3748"
                                    strokeWidth="3"
                                />
                                <path
                                    d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="#1e3a8a"
                                    strokeWidth="3"
                                    strokeDasharray={`${tool.proficiency}, 100`}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                                <div className="text-4xl text-blue-400">
                                    {tool.icon}
                                </div>
                            </div>
                        </div>

                        <div className="mt-2">
                            <p className="font-medium text-lg">{tool.name}</p>
                            <p className="text-blue-400 font-bold">{tool.proficiency}%</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Tools;