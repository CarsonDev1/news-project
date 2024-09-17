'use client'
import React from 'react';
import Image from 'next/image';
import { FaSearch, FaBars } from 'react-icons/fa';
import { WiDaySunny, WiNightClear } from 'react-icons/wi';

const categories = [
    'Chính trị', 'Xã hội', 'Thế giới', 'Kinh tế', 'Văn hóa', 'Giáo dục', 'Thể thao', 'Giải trí', 'Pháp luật', 'Công nghệ', 'Sức khỏe', 'Đời sống', 'Du lịch'
];

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isDay, setIsDay] = React.useState(true);

    const updateWeather = () => {
        const hours = new Date().getHours();
        setIsDay(hours >= 6 && hours < 18);
    };

    React.useEffect(() => {
        updateWeather();
    }, []);

    const currentDate = new Date().toLocaleDateString('vi-VN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <header className="bg-gradient-to-r from-red-600 to-red-800 text-white py-3 px-4 shadow-lg sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Image src="https://images.unsplash.com/photo-1557683311-eac922347aa1" alt="Logo" className="h-12 w-auto rounded-full border-2 border-white" width={48} height={48} />
                    <h1 className="text-3xl font-bold tracking-wider">VOV</h1>
                </div>
                <div className="text-sm">{currentDate}</div>
                <nav className="hidden lg:block">
                    <ul className="flex space-x-6 text-sm">
                        {categories.slice(0, 8).map((category, index) => (
                            <li key={index}><a href="#" className="hover:text-gray-200 transition duration-300 hover:underline">{category}</a></li>
                        ))}
                        <li>
                            <details className="relative inline-block text-left group">
                                <summary className="list-none cursor-pointer hover:text-gray-200 transition duration-300">Thêm</summary>
                                <ul className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                                    {categories.slice(8).map((category, index) => (
                                        <li key={index} className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 transition duration-300">{category}</li>
                                    ))}
                                </ul>
                            </details>
                        </li>
                    </ul>
                </nav>
                <div className="flex items-center space-x-4">
                    <div className="relative hidden md:block">
                        <input type="text" placeholder="Tìm kiếm..." className="py-1 px-3 rounded-full text-black w-48 focus:outline-none focus:ring-2 focus:ring-red-300 text-sm" />
                        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <div className="flex items-center space-x-2 bg-red-700 py-1 px-3 rounded-full text-sm hover:bg-red-800 transition duration-300">
                        {isDay ? <WiDaySunny className="text-2xl" /> : <WiNightClear className="text-2xl" />}
                    </div>
                    <button className="lg:hidden text-2xl focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <FaBars />
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="lg:hidden bg-red-800 text-white py-4 px-6">
                    <ul className="space-y-2">
                        {categories.map((category, index) => (
                            <li key={index}>
                                <a href="#" className="block py-2 hover:bg-red-700 px-3 rounded transition duration-300">
                                    {category}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4">
                        <input type="text" placeholder="Tìm kiếm..." className="w-full py-2 px-3 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-red-300 text-sm" />
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;