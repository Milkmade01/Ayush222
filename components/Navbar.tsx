import React from 'react';
import { Page } from '../App';

interface NavbarProps {
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
}

const NavItem: React.FC<{ page: Page; currentPage: Page; setCurrentPage: (page: Page) => void; children: React.ReactNode }> = ({ page, currentPage, setCurrentPage, children }) => {
    const isActive = currentPage === page;
    return (
        <button
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 text-lg transition-colors duration-300 relative font-zcool tracking-wider ${isActive ? 'text-red-400' : 'text-gray-300 hover:text-white'}`}
        >
            {children}
            {isActive && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-red-400"></span>}
        </button>
    );
};

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage }) => {
    return (
        <nav className="fixed top-0 left-0 right-0 bg-black/50 backdrop-blur-md z-50 border-b border-red-900/50">
            <div className="container mx-auto px-4 md:px-8 flex justify-between items-center h-20">
                <div className="text-3xl font-zcool text-white">
                    <button onClick={() => setCurrentPage('home')}>Ayush</button>
                </div>
                <div className="hidden md:flex items-baseline space-x-4">
                    <NavItem page="home" currentPage={currentPage} setCurrentPage={setCurrentPage}>Home</NavItem>
                    <NavItem page="games" currentPage={currentPage} setCurrentPage={setCurrentPage}>Games</NavItem>
                    <NavItem page="gallery" currentPage={currentPage} setCurrentPage={setCurrentPage}>Gallery</NavItem>
                    <NavItem page="contact" currentPage={currentPage} setCurrentPage={setCurrentPage}>Contact</NavItem>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;