import React from 'react'
import { FaFacebookF, FaTwitter, FaYoutube, FaTiktok } from 'react-icons/fa';


const Footer = () => {
    return (
        <div>
            {/* Footer */}
            <footer className="bg-gradient-to-r from-red-600 to-red-800 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-between">
                        <div className="w-full md:w-1/3 mb-8 md:mb-0">
                            <h3 className="text-2xl font-bold mb-4">VOV</h3>
                            <p className="mb-4 text-gray-200">Đài Tiếng nói Việt Nam - Cơ quan ngôn luận của Đảng, Nhà nước và Nhân dân.</p>
                            <div className="flex space-x-4">
                                <FaFacebookF className="text-2xl hover:text-gray-200 cursor-pointer transition duration-300" />
                                <FaTwitter className="text-2xl hover:text-gray-200 cursor-pointer transition duration-300" />
                                <FaYoutube className="text-2xl hover:text-gray-200 cursor-pointer transition duration-300" />
                                <FaTiktok className="text-2xl hover:text-gray-200 cursor-pointer transition duration-300" />
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 mb-8 md:mb-0">
                            <h3 className="text-2xl font-bold mb-4">Liên kết nhanh</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-gray-200 transition duration-300 flex items-center"><span className="mr-2">➤</span>Giới thiệu</a></li>
                                <li><a href="#" className="hover:text-gray-200 transition duration-300 flex items-center"><span className="mr-2">➤</span>Liên hệ</a></li>
                                <li><a href="#" className="hover:text-gray-200 transition duration-300 flex items-center"><span className="mr-2">➤</span>Quảng cáo</a></li>
                                <li><a href="#" className="hover:text-gray-200 transition duration-300 flex items-center"><span className="mr-2">➤</span>Tuyển dụng</a></li>
                            </ul>
                        </div>
                        <div className="w-full md:w-1/3">
                            <h3 className="text-2xl font-bold mb-4">Đăng ký nhận tin</h3>
                            <form className="flex flex-col sm:flex-row">
                                <input type="email" placeholder="Nhập email của bạn" className="flex-grow py-2 px-4 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-400 text-gray-900 mb-2 sm:mb-0" />
                                <button type="submit" className="bg-red-700 text-white py-2 px-4 rounded-r-lg hover:bg-red-800 transition duration-300 sm:w-auto w-full">Đăng ký</button>
                            </form>
                        </div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-red-500 text-center">
                        <p>&copy; 2023 VOV. Tất cả các quyền được bảo lưu.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer