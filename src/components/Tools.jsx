import React from 'react';
import { FaAws } from "react-icons/fa6";
import { SiApachemaven, SiBun, SiGradle, SiIntellijidea, SiJira, SiNpm, SiPnpm, SiPostman, SiRender, SiJupyter, SiSwagger, SiVercel, SiYarn } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { motion } from 'framer-motion';

const toolCategories = [
    {
        name: "Outils Front-end",
        tools: [
            { name: 'VS Code', icon: <VscVscode />, proficiency: 100 },
            { name: 'npm', icon: <SiNpm />, proficiency: 100 },
            { name: 'pnpm', icon: <SiPnpm />, proficiency: 10 },
            { name: 'yarn', icon: <SiYarn />, proficiency: 5 },
            { name: 'bun', icon: <SiBun />, proficiency: 3 },
        ]
    },
    {
        name: "Outils Back-end & API",
        tools: [
            { name: 'Intellij Idea', icon: <SiIntellijidea />, proficiency: 50 },
            { name: 'Maven', icon: <SiApachemaven />, proficiency: 50 },
            { name: 'Swagger Editor', icon: <SiSwagger />, proficiency: 50 },
            { name: 'PostMan', icon: <SiPostman />, proficiency: 90 },
            { name: 'Jupyter Notebook', icon: <SiJupyter />, proficiency: 50 },
            { name: 'Gradle', icon: <SiGradle />, proficiency: 17 },
        ]
    },
    {
        name: "Déploiement & Infrastructure",
        tools: [
            { name: 'Render', icon: <SiRender />, proficiency: 90 },
            { name: 'Vercel', icon: <SiVercel />, proficiency: 95 },
            { name: 'AWS', icon: <FaAws />, proficiency: 10 },
        ]
    },
    {
        name: "Collaboration",
        tools: [
            { name: 'Jira', icon: <SiJira />, proficiency: 5 },
        ]
    }
];

const Tools = () => {
    return (
        <section id="tools" className="py-20 bg-black/50 text-white">
            <h2 className="text-4xl font-bold text-center mb-10" data-aos="fade-up">Outils</h2>

            {toolCategories.map((category, catIndex) => (
                <div key={catIndex} className="mb-16">
                    <h3 className="text-2xl font-semibold text-blue-400 mb-6 text-center" data-aos="fade-up">
                        {category.name}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 px-4" data-aos="fade-up">
                        {category.tools.map((tool, index) => (
                            <motion.div
                                key={index}
                                className="text-center flex flex-col items-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1
                                }}
                                whileHover={{ scale: 1.05 }}
                            >
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
                            </motion.div>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
};

export default Tools;