import React from 'react';
import Section from './Section';
import { type Project } from '../types';
import { BrainCircuitIcon } from './Icons';

const projects: Project[] = [
    {
        title: "NYRS (2024-25)",
        description: "Grade 11th robotics competition."
    },
    {
        title: "Line Following Car",
        description: "I built a line-following car utilizing PID control to ensure it follows lines with smooth precision and accuracy."
    },
    {
        title: "All-in-One Sensor Circuit",
        description: "I designed a comprehensive circuit integrating various sensors. Originally, it displayed live readings on a CodePen web interface via Bluetooth, but I later transitioned to a more stable USB connection.",
        items: [
            "FC-22 MQ2 gas sensor",
            "DHT11 temperature/humidity sensor",
            "LM393 photosensitive sensor",
            "Soil moisture sensor",
            "GY-NEO6MV2 GPS module",
            "Arduino Uno R3",
        ]
    },
    {
        title: "Ultrasonic Light Control",
        description: "Using parts I already had, I created a simple yet effective automated lighting system that toggles lights based on proximity detection.",
        items: [
            "2 cork lights (4.5V each)",
            "Ultrasonic sensor",
            "Arduino Uno",
            "9V or 18650 batteries"
        ]
    }
];

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
    <div className="bg-black/40 backdrop-blur-sm border border-red-800/50 p-6 transform transition-all duration-300 hover:border-red-600 hover:bg-black/60 hover:scale-[1.03] rounded-sm">
        <h3 className="text-2xl font-bold text-red-400 font-zcool tracking-wider">{project.title}</h3>
        <p className="mt-2 text-gray-300">{project.description}</p>
        {project.items && (
            <ul className="mt-4 list-disc list-inside text-sm text-red-300/80 space-y-1">
                {project.items.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        )}
    </div>
);

const Projects: React.FC = () => {
    return (
        <Section title="My Projects" icon={<BrainCircuitIcon />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} />
                ))}
            </div>
        </Section>
    );
};

export default Projects;