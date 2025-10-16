import React, { useState } from 'react';
import Section from '../components/Section';
import { MailIcon, LinkedinIcon } from '../components/Icons';

const Contact: React.FC = () => {
    const [isEmailVisible, setIsEmailVisible] = useState(false);
    const [copyText, setCopyText] = useState('Copy');
    const email = "ayush.2008.personal@outlook.com";

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(email).then(() => {
            setCopyText('Copied!');
            setTimeout(() => {
                setCopyText('Copy');
            }, 2000);
        });
    };

    return (
        <>
            <div className="max-w-4xl mx-auto">
                <Section title="Get In Touch">
                    <div className="text-center">
                        <p className="text-lg mb-8">
                            Interested in collaborating or learning more about my projects? Feel free to reach out!
                        </p>
                        <div className="flex justify-center space-x-8">
                            <a 
                                href="https://www.linkedin.com/in/ayush-1bb00731/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-red-300 hover:text-white transition-colors flex flex-col items-center gap-2"
                            >
                                <LinkedinIcon />
                                <span>LinkedIn</span>
                            </a>
                            <button
                                onClick={() => setIsEmailVisible(true)}
                                className="text-red-300 hover:text-white transition-colors flex flex-col items-center gap-2"
                            >
                                <MailIcon />
                                <span>Email</span>
                            </button>
                        </div>
                    </div>
                </Section>
                 <footer className="text-center p-8 mt-16 border-t border-dashed border-red-800/30">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} Ayush. All rights reserved. | nysora.online
                        <br />
                        Crafted with code under the light of a crimson moon.
                    </p>
                </footer>
            </div>

            {/* Email Modal */}
            {isEmailVisible && (
                <div 
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
                    onClick={() => setIsEmailVisible(false)}
                >
                    <div 
                        className="bg-black/80 border border-red-800/60 p-8 rounded-sm shadow-2xl shadow-red-900/40 relative animate-scale-in max-w-md w-full mx-4"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                    >
                        <button 
                            onClick={() => setIsEmailVisible(false)}
                            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-white transition-colors rounded-full"
                        >
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h3 className="text-3xl font-zcool text-red-400 text-center mb-4">My Email</h3>
                        <p className="text-center text-gray-300 mb-6">You can copy my email address below.</p>
                        <div className="flex items-center bg-black/50 border border-red-900/50 p-3 rounded-sm">
                            <input
                                readOnly
                                value={email}
                                className="flex-grow bg-transparent text-white truncate outline-none"
                            />
                            <button 
                                onClick={handleCopyEmail}
                                className="ml-4 px-4 py-1 bg-red-800 text-white font-bold text-sm hover:bg-red-700 transition-colors rounded-sm w-20"
                            >
                                {copyText}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Contact;