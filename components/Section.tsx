import React from 'react';

interface SectionProps {
    title: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    headerChildren?: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, icon, children, className, headerChildren }) => {
    return (
        <section className={`bg-black/30 backdrop-blur-sm border border-red-900/40 p-6 md:p-8 shadow-lg shadow-red-900/20 rounded-sm mb-16 transition-all duration-300 hover:border-red-900/60 hover:shadow-red-900/30 ${className}`}>
            <header className="flex items-center justify-between gap-4 mb-6 border-b border-dashed border-red-800/50 pb-4">
                <div className="flex items-center gap-4">
                    {icon}
                    <h2 className="text-4xl md:text-5xl font-zcool text-red-400 tracking-wider">{title}</h2>
                </div>
                <div>{headerChildren}</div>
            </header>
            <div className="text-lg text-gray-300 leading-relaxed space-y-4">
                {children}
            </div>
        </section>
    );
};

export default Section;