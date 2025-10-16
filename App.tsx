import React, { useState } from 'react';
import Home from './pages/Home';
import Games from './pages/Games';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import BackgroundEffects from './components/BackgroundEffects';

export type Page = 'home' | 'games' | 'gallery' | 'contact';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('home');

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <Home />;
            case 'games':
                return <Games />;
            case 'gallery':
                return <Gallery />;
            case 'contact':
                return <Contact />;
            default:
                return <Home />;
        }
    };

    return (
        <div className="relative min-h-screen bg-transparent text-gray-300 font-noto">
             <div 
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    backgroundImage: 'url(https://i.postimg.cc/s2YST6ZH/firewatch-red-sky-3840x2160-11493.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: -2,
                }}
            />
            <BackgroundEffects />
            <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <main className="main-content">
                <div className="container mx-auto px-4 md:px-8 py-24 md:py-32">
                    {renderPage()}
                </div>
            </main>
        </div>
    );
};

export default App;