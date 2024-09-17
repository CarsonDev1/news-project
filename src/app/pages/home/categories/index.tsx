import React from 'react';
import { FaRegNewspaper, FaUsers, FaGlobe, FaChartLine, FaPaintBrush, FaBookOpen, FaFutbol, FaFilm, FaGavel, FaLaptop, FaHeartbeat, FaHome } from 'react-icons/fa';

const categories = [
    { name: 'Chính trị', icon: <FaRegNewspaper /> },
    { name: 'Xã hội', icon: <FaUsers /> },
    { name: 'Thế giới', icon: <FaGlobe /> },
    { name: 'Kinh tế', icon: <FaChartLine /> },
    { name: 'Văn hóa', icon: <FaPaintBrush /> },
    { name: 'Giáo dục', icon: <FaBookOpen /> },
    { name: 'Thể thao', icon: <FaFutbol /> },
    { name: 'Giải trí', icon: <FaFilm /> },
    { name: 'Pháp luật', icon: <FaGavel /> },
    { name: 'Công nghệ', icon: <FaLaptop /> },
    { name: 'Sức khỏe', icon: <FaHeartbeat /> },
    { name: 'Đời sống', icon: <FaHome /> },
];

const Categories = () => (
    <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b-2 border-red-600 pb-2">Chuyên mục</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
                <a key={index} href="#" className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1 hover:bg-red-50 group">
                    <span className="text-lg font-semibold text-gray-800 group-hover:text-red-600 transition duration-300 flex items-center justify-center">
                        <span className="mr-2">{category.icon}</span>
                        {category.name}
                    </span>
                </a>
            ))}
        </div>
    </section>
);

export default Categories;