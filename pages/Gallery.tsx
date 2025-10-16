import React from 'react';
import Section from '../components/Section';
import { CameraIcon, ClipboardListIcon } from '../components/Icons';

const photos = [
    { src: 'https://i.postimg.cc/qB8z3b36/Whats-App-Image-2025-10-16-at-00-25-50-a9108a3b.jpg', alt: 'Photo of Ayush', caption: 'Ayush' },
    { src: 'https://i.postimg.cc/TY6TvTh1/IMG-20250110-WA0006.jpg', alt: 'Photo of Adiya Dubey', caption: 'Adiya Dubey' },
    { src: 'https://i.postimg.cc/FKL9Qzb3/Whats-App-Image-2025-10-16-at-00-26-18-830dff73.jpg', alt: 'Photo of Ayush and Aditya', caption: 'Ayush & Aditya' },
    { src: 'https://i.postimg.cc/jSnc6YQg/licensed-image.jpg', alt: 'Photo of Kevin Hart', caption: 'Kevin Hart' },
    { src: 'https://i.postimg.cc/VvNBdxkk/900111-v9-bb.jpg', alt: 'Photo of Awkwafina', caption: 'Awkwafina' },
];

const keyInfo = [
    { label: 'Best Friend', value: 'Adiya Dubey' },
    { label: 'Favorite Actors', value: 'Awkwafina & Kevin Hart' },
    { label: 'Contact', value: '9555548849' },
    { label: 'School', value: 'Amity' },
    { label: 'Class', value: '12th Grade' },
];


const PhotoCard: React.FC<{ src: string; alt: string; caption: string; }> = ({ src, alt, caption }) => {
    return (
        <div 
            className="relative group aspect-square overflow-hidden rounded-sm border-2 border-red-900/50 hover:border-red-600 transition-all"
        >
            <img src={src} alt={alt} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
            <p className="absolute bottom-1 left-2 text-white font-semibold text-xs drop-shadow-md pointer-events-none">{caption}</p>
        </div>
    );
};


const Gallery: React.FC = () => {
    return (
        <div className="space-y-16">
            <Section title="Key Info" icon={<ClipboardListIcon />}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {keyInfo.map((info) => (
                        <div key={info.label} className="bg-black/20 p-4 border-l-4 border-red-800/70 rounded-r-sm">
                            <p className="font-semibold text-red-300 text-lg">{info.label}:</p>
                            <p className="text-gray-200 text-xl tracking-wide">{info.value}</p>
                        </div>
                    ))}
                </div>
            </Section>

            <Section title="Photo Gallery" icon={<CameraIcon />}>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {photos.map(photo => <PhotoCard key={photo.src} {...photo} />)}
                </div>
            </Section>
        </div>
    );
};

export default Gallery;