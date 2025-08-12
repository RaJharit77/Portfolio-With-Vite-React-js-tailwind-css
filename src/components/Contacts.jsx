import AOS from 'aos';
import 'aos/dist/aos.css';

const contacts = [
    {
        href: "https://www.instagram.com/rajharit_r77/",
        icon: "fab fa-instagram",
        text: "Suivez-moi sur Instagram pour des mises à jour régulières et des aperçus de mes projets en cours.",
        linkText: "Visitez mon Instagram"
    },
    {
        href: "https://www.linkedin.com/in/rajoharitiana-raharison-27r7h17a37/",
        icon: "fab fa-linkedin",
        text: "Connectez-vous avec moi sur LinkedIn pour des opportunités professionnelles et des mises à jour sur ma carrière.",
        linkText: "Visitez mon LinkedIn"
    },
    {
        href: "https://github.com/RaJharit77",
        icon: "fab fa-github",
        text: "Explorez mes projets open source et contributez sur GitHub.",
        linkText: "Visitez mon GitHub"
    },
    {
        href: "mailto:rajoharitiana.raharison@gmail.com",
        icon: "fas fa-envelope",
        text: "Envoyez-moi un e-mail pour toute question ou collaboration.",
        linkText: "Envoyez-moi un email"
    }
];

AOS.init();

const Contact = () => {
    return (
        <section id="contacts" className="py-20 bg-gray-900/80 text-white flex flex-col items-center justify-center min-h-screen w-full">
            <div className="container mx-auto px-4 lg:w-3/4">
                <h2 className="text-4xl font-bold text-center mb-10" data-aos="fade-up">Contact</h2>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 w-full" data-aos="fade-up">
                    {contacts.map((contact, index) => (
                        <div
                            key={contact.href}
                            className="flex flex-col items-center justify-center bg-gray-800 p-8 rounded shadow-md hover:shadow-yellow-500 cursor-pointer"
                            data-aos="fade-up"
                            data-aos-delay={100 * index}
                        >
                            <a href={contact.href} className="flex items-center justify-center" target="_blank" rel="noopener noreferrer">
                                <i className={`${contact.icon} text-4xl mb-4`}></i>
                            </a>
                            <p className="text-center">{contact.text}</p>
                            <a href={contact.href} className="text-blue-500 hover:underline mt-4" target="_blank" rel="noopener noreferrer">{contact.linkText}</a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Contact;
