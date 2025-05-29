import { motion } from 'framer-motion';
import { Bell, Search } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import { getToken, getUsernameFromToken } from '../utils/token';
import { useNavigate } from 'react-router-dom';

const mockProducts = [
  { id: 1, title: 'iPhone 13', description: 'Latest Apple smartphone', price: 999, brand: 'Apple', category: 'Electronics' },
  { id: 2, title: 'Galaxy S21', description: 'Samsung flagship phone', price: 799, brand: 'Samsung', category: 'Electronics' },
  { id: 3, title: 'Nike Air Max', description: 'Comfortable running shoes', price: 120, brand: 'Nike', category: 'Footwear' },
  { id: 4, title: 'Levi\'s Jeans', description: 'Classic denim jeans', price: 60, brand: 'Levi\'s', category: 'Clothing' },
  { id: 5, title: 'Sony WH-1000XM4', description: 'Noise cancelling headphones', price: 350, brand: 'Sony', category: 'Electronics' },
  { id: 6, title: 'Adidas Ultraboost', description: 'High-performance running shoes', price: 180, brand: 'Adidas', category: 'Footwear' },
];

const categories = ['All', 'Electronics', 'Footwear', 'Clothing'];

const Dashboard = () => {

  const navigate = useNavigate();

  const [greeting, setGreeting] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [username, setUsername] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortPrice, setSortPrice] = useState<'asc' | 'desc' | null>(null);

  useEffect(() => {
    const hours = new Date().getHours();
    let greetingText = '';

    if (hours < 12) {
      greetingText = 'Good morning';
    } else if (hours < 18) {
      greetingText = 'Good afternoon';
    } else {
      greetingText = 'Good evening';
    }

    const token = getToken();

    if(!token) {
        navigate("/signin")
    }

    const usernameFromToken = getUsernameFromToken();
    console.log("data", usernameFromToken);

    setUsername(usernameFromToken);
    setGreeting(greetingText);
  }, []);

  // Filter + sort products based on search, category and price sort
  const filteredProducts = useMemo(() => {
    let products = [...mockProducts];

    // Filter by category
    if (selectedCategory !== 'All') {
      products = products.filter(p => p.category === selectedCategory);
    }

    // Filter by search title
    if (searchTerm.trim() !== '') {
      products = products.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by price
    if (sortPrice) {
      products.sort((a, b) => sortPrice === 'asc' ? a.price - b.price : b.price - a.price);
    }

    return products;
  }, [searchTerm, selectedCategory, sortPrice]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-gray-900">{greeting}, {username}</h1>
        </motion.div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-4 md:mt-0 flex items-center space-x-3"
        >
          <div className="relative">
            <Bell size={20} className="text-gray-500 cursor-pointer hover:text-gray-700 transition-colors" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </div>

          <div className="relative flex-1 md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by title..."
              className="border border-gray-300 rounded-md px-3 py-1.5 pl-9 pr-3 h-9 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={sortPrice ?? ''}
            onChange={(e) => {
              const val = e.target.value;
              setSortPrice(val === 'asc' || val === 'desc' ? val : null);
            }}
          >
            <option value="">Sort by price</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </motion.div>
      </div>

      {/* Product Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6"
      >
        <h2 className="text-xl font-bold mb-4">Product List</h2>
        <div className="overflow-x-auto border rounded-lg shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price ($)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    No products found.
                  </td>
                </tr>
              ) : (
                filteredProducts.map(product => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${product.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.brand}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.category}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;