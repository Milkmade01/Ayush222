import React from 'react';
import Section from '../components/Section';
import Projects from '../components/Projects';
import { UserIcon, BeakerIcon } from '../components/Icons';

const netflixShows = [
    { name: 'Modern Family', img: 'https://i.postimg.cc/QCfcp0yQ/modern-family-description-image.webp' },
    { name: 'Never Have I Ever', img: 'https://i.postimg.cc/1tHFQvPv/MV5-BNzdh-OGVj-MTQt-OTQ0-Yi00-ZWNj-LTk2-Mj-Mt-MWMz-ODcz-NWNi-Nm-M3-Xk-Ey-Xk-Fqc-Gc-V1-FMjpg-UX1000.jpg' },
    { name: 'Lucifer', img: 'https://i.postimg.cc/1z0nGvgR/lucifer.png' }
];

const huluShows = [
    { name: '911', img: 'https://i.postimg.cc/bNGZCyGT/MV5-BMDk4-NDRk-MWMt-ZTYy-Ny00-NDAw-LWE5-OTIt-Zm-My-MTQ3-ZTQ3-Zj-M4-Xk-Ey-Xk-Fqc-Gc-V1.jpg' },
    { name: 'Doctor Odyssey', img: 'https://i.postimg.cc/d1H06pwH/MV5-BYWE4-OTJh-MDQt-Yz-A0-Yi00-Zm-Zj-LTll-ZTIt-MWNk-YTgw-NTBl-MGJj-Xk-Ey-Xk-Fqc-Gc-V1-FMjpg-UX1000.jpg' }
];

const ShowCard: React.FC<{ name: string; img: string }> = ({ name, img }) => (
    <div className="relative group aspect-[2/3] overflow-hidden rounded-sm border-2 border-transparent hover:border-red-500 transition-all duration-300">
        <img src={img} alt={name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <p className="absolute bottom-2 left-2 text-white font-bold text-sm drop-shadow-md">{name}</p>
    </div>
);

const Home: React.FC = () => {
    const photoUrl = "https://i.postimg.cc/wMnxDzFH/Whats-App-Image-2025-10-14-at-22-40-58-a9024be3.jpg";

    return (
        <div className="space-y-16">
            <header className="text-center flex flex-col items-center">
                 <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-red-800/70 shadow-lg mb-6 transform transition-transform duration-500 hover:scale-105 shadow-red-900/40">
                    <img 
                        src={photoUrl} 
                        alt="Ayush" 
                        className="w-full h-full object-cover filter saturate-110"
                    />
                </div>
                <h1 className="text-6xl md:text-8xl font-zcool text-white drop-shadow-[0_0_15px_rgba(220,38,38,0.7)]">
                    Ayush
                </h1>
                <p className="text-red-300 text-xl mt-2 tracking-widest">
                    Student // Creator // Thinker
                </p>
            </header>
            
            <Section title="About Me" icon={<UserIcon />}>
                <p>
                    My name is <span className="text-red-300 font-bold">Ayush</span>. I'm a Class 12 student at Amity, diving deep into the world of computer science. My passions lie at the intersection of <span className="text-gray-100 font-semibold">robotics, cooking, and fashion design</span>. I thrive on learning, especially when the information is accurate and precise.
                </p>
                <div className="mt-8 pt-6 border-t border-dashed border-red-800/50">
                    <h3 className="text-3xl font-zcool text-red-300 mb-4">Interests & Skills</h3>
                    <p>
                        I'm driven by a passion for building things, experimenting with electronics, and discovering how design and technology can merge. I enjoy the hands-on process of <span className="text-gray-100 font-semibold">Arduino projects</span>, crafting circuits, and creating smart systems with real-world applications. Beyond robotics, I aspire to one day become a fashion designer, where I can blend creativity with technology.
                    </p>
                </div>
            </Section>
            
            <Projects />

            <Section title="Mind & Musings" icon={<BeakerIcon />}>
                <div className="space-y-8">
                    <div>
                        <h3 className="text-3xl font-zcool text-red-300 mb-2">My Philosophy</h3>
                        <blockquote className="border-l-4 border-red-800/70 pl-4 italic text-gray-400">
                            “I don't need to be perfect, I just need to be improving.” Perfection is an illusion, but growth is real. Every small step counts.
                        </blockquote>
                        <p className="mt-2">I prefer understanding over judgment and value loyalty, fairness, and direct communication.</p>
                    </div>
                    
                    <div className="bg-black/40 backdrop-blur-sm border border-red-800/50 p-6 rounded-sm transition-all duration-300 hover:border-red-600 hover:scale-[1.02]">
                        <h3 className="text-3xl font-zcool text-red-300 mb-2">Future Goals</h3>
                        <p>I aim for a career connecting <span className="font-bold text-white">sociology, philosophy, and psychology</span>, focusing on social causes. I'm looking for something meaningful but also high-paying, ideally in the EU or USA, possibly as a fashion designer or a social worker.</p>
                    </div>

                    <div className="bg-black/40 backdrop-blur-sm border border-red-800/50 p-6 rounded-sm transition-all duration-300 hover:border-red-600 hover:scale-[1.02]">
                        <h3 className="text-3xl font-zcool text-red-300 mb-4">What I Watch</h3>
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-xl font-bold text-gray-300 mb-3">Netflix</h4>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {netflixShows.map(show => <ShowCard key={show.name} {...show} />)}
                                </div>
                            </div>
                             <div>
                                <h4 className="text-xl font-bold text-gray-300 mb-3">Hulu</h4>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {huluShows.map(show => <ShowCard key={show.name} {...show} />)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default Home;