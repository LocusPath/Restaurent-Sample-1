import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import './App.css';

const menuItems = [
  { id: 1, name: 'Margherita', desc: 'Tomato sauce, mozzarella, fresh basil, extra virgin olive oil.', price: '$14', category: 'Pizza' },
  { id: 2, name: 'Diavola', desc: 'Tomato sauce, mozzarella, spicy salami, chili oil.', price: '$16', category: 'Pizza' },
  { id: 3, name: 'Quattro Formaggi', desc: 'Mozzarella, gorgonzola, parmesan, fontina.', price: '$18', category: 'Pizza' },
  { id: 4, name: 'Spaghetti Carbonara', desc: 'Guanciale, egg yolk, pecorino romano, black pepper.', price: '$19', category: 'Pasta' },
  { id: 5, name: 'Truffle Pappardelle', desc: 'Hand-cut pasta, black truffle sauce, parmesan shavings.', price: '$22', category: 'Pasta' },
  { id: 6, name: 'Lasagna Classica', desc: 'Beef ragu, bechamel, parmesan, baked to perfection.', price: '$20', category: 'Pasta' },
  { id: 7, name: 'Osso Buco', desc: 'Braised veal shanks with vegetables, white wine and broth.', price: '$34', category: 'Hot dishes' },
  { id: 8, name: 'Chicken Parmigiana', desc: 'Breaded chicken breast topped with marinara and mozzarella.', price: '$26', category: 'Hot dishes' },
  { id: 9, name: 'Risotto ai Frutti di Mare', desc: 'Arborio rice, squid, clams, mussels, shrimp.', price: '$28', category: 'Ravioli and risotto' },
  { id: 10, name: 'Ravioli al Tartufo', desc: 'Ricotta and truffle stuffed ravioli in butter sage sauce.', price: '$24', category: 'Ravioli and risotto' },
  { id: 11, name: 'Caprese Salad', desc: 'Fresh mozzarella, tomatoes, basil, balsamic glaze.', price: '$15', category: 'Salads' },
  { id: 12, name: 'Tiramisu', desc: 'Coffee-soaked ladyfingers, mascarpone cream, cocoa.', price: '$10', category: 'Dessert' },
  { id: 13, name: 'Panna Cotta', desc: 'Vanilla bean panna cotta, fresh berry compote.', price: '$9', category: 'Dessert' }
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Pizza');
  const [popupMessage, setPopupMessage] = useState(null);

  const categories = ['Pizza', 'Pasta', 'Hot dishes', 'Ravioli and risotto', 'Salads', 'Dessert'];

  const filteredMenu = menuItems.filter(item => item.category === activeCategory);

  const showPopup = (msg) => {
    setPopupMessage(msg);
    setTimeout(() => setPopupMessage(null), 3000);
  };

  return (
    <div className="app-container">
      {/* Toast Notification */}
      <AnimatePresence>
        {popupMessage && (
          <motion.div 
            className="toast"
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 20, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
          >
            {popupMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Elegance Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="menu-overlay"
            initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
            transition={{ duration: 0.8, ease: [0.85, 0, 0.15, 1] }}
          >
             <div className="menu-overlay-header">
                <div className="brand-left">
                   <h1 className="script-logo">Pizzeria</h1>
                   <h2 className="brand-title-dark">Basilico Blu</h2>
                </div>
                <button className="close-menu-btn" onClick={() => setIsMenuOpen(false)}>
                  <X size={40} color="#2b1013" />
                </button>
             </div>
             
             <div className="menu-overlay-content">
                <div className="menu-categories">
                  {categories.map(cat => (
                    <button 
                      key={cat} 
                      className={`menu-cat-btn ${activeCategory === cat ? 'active' : ''}`}
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <motion.div 
                  className="menu-text-list"
                  key={activeCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {filteredMenu.map((item) => (
                    <div key={item.id} className="menu-text-item">
                      <div className="menu-text-header">
                        <h3>{item.name}</h3>
                        <span className="price">{item.price}</span>
                      </div>
                      <p>{item.desc}</p>
                    </div>
                  ))}
                </motion.div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <motion.nav 
        className="navbar"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="brand-left">
          <h1 className="script-logo">Pizzeria</h1>
          <h2 className="brand-title">Basilico Blu</h2>
        </div>
        
        <div className="nav-links">
          <span className="nav-item-elegant" onClick={() => setIsMenuOpen(true)}>Our Menu</span>
          <span className="nav-item-elegant" onClick={() => showPopup('Opening About us...')}>About us</span>
          <span className="nav-item-elegant" onClick={() => showPopup('Opening Photos...')}>Photos</span>
          <span className="nav-item-elegant" onClick={() => showPopup('Opening Contact...')}>Contact</span>
        </div>

        <div className="nav-right">
          <span className="nav-item-elegant" onClick={() => showPopup('Basket is empty')}>Buy now</span>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="hero">
        <motion.div 
          className="hero-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.h3 className="hero-subtitle">THE BEST ITALIAN PIZZA</motion.h3>
          <motion.h1 className="hero-title">
            Real Italian pizza<br />with real ingredients
          </motion.h1>
          
          <motion.button 
            className="accent-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(true)}
          >
            See the menu
          </motion.button>
        </motion.div>

        {/* The Giant Peeking Pizza */}
        <div className="hero-pizza-wrapper">
          <motion.img 
            src="/pizza.png" 
            alt="Delicious Pizza" 
            className="huge-pizza"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
          />
        </div>
      </section>
    </div>
  );
}

export default App;
