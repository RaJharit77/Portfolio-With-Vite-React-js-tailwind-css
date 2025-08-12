import { BiLogoSpringBoot } from "react-icons/bi";
import { FaCss3Alt, FaGitAlt, FaGithub, FaHtml5, FaJava, FaJs, FaReact } from 'react-icons/fa6';
import { SiNextdotjs, SiOpenapiinitiative, SiPostgresql, SiPrisma, SiSqlite, SiTailwindcss, SiTypescript, SiVite, SiPython } from "react-icons/si";
import { motion } from 'framer-motion';

const skillCategories = [
    {
        name: "Front-end",
        skills: [
            { name: 'HTML', icon: <FaHtml5 />, proficiency: 95 },
            { name: 'CSS', icon: <FaCss3Alt />, proficiency: 91 },
            { name: 'JavaScript', icon: <FaJs />, proficiency: 90 },
            { name: 'Tailwind css', icon: <SiTailwindcss />, proficiency: 97 },
            { name: 'Vite.JS', icon: <SiVite />, proficiency: 93 },
            { name: 'React.JS', icon: <FaReact />, proficiency: 93 },
            { name: 'TypeScript', icon: <SiTypescript />, proficiency: 90 },
            { name: 'Next.JS', icon: <SiNextdotjs />, proficiency: 90 },
        ]
    },
    {
        name: "Back-end",
        skills: [
            { name: 'Java', icon: <FaJava />, proficiency: 50 },
            { name: 'Spring Boot', icon: <BiLogoSpringBoot />, proficiency: 50 },
            { name: 'Python', icon: <SiPython />, proficiency: 50 },
        ]
    },
    {
        name: "Base de données",
        skills: [
            { name: 'PostgreSQL', icon: <SiPostgresql />, proficiency: 75 },
            { name: 'SQLite', icon: <SiSqlite />, proficiency: 73 },
            { name: 'Prisma + PostgreSQL', icon: <SiPrisma />, proficiency: 80 },
        ]
    },
    {
        name: "ORM",
        skills: [
            { name: 'Prisma', icon: <SiPrisma />, proficiency: 80 },
        ]
    },
    {
        name: "Outils de collaboration",
        skills: [
            { name: 'Git', icon: <FaGitAlt />, proficiency: 90 },
            { name: 'Github', icon: <FaGithub />, proficiency: 90 },
        ]
    },
    {
        name: "Autres",
        skills: [
            { name: 'OpenAPI', icon: <SiOpenapiinitiative />, proficiency: 50 },
        ]
    }
];

const Skills = () => {
    return (
        <section id="skills" className="py-20 text-white">
            <h2 className="text-4xl font-bold text-center mb-10" data-aos="fade-up">Compétences</h2>

            {skillCategories.map((category, catIndex) => (
                <div key={catIndex} className="mb-16">
                    <h3 className="text-2xl font-semibold text-blue-400 mb-6 text-center" data-aos="fade-up">
                        {category.name}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 px-4" data-aos="fade-up">
                        {category.skills.map((skill, index) => (
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
                                            strokeDasharray={`${skill.proficiency}, 100`}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                                        <div className="text-4xl text-blue-500">
                                            {skill.icon}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-2">
                                    <p className="font-medium text-lg">{skill.name}</p>
                                    <p className="text-blue-500 font-bold">{skill.proficiency}%</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
};

export default Skills;