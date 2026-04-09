import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, User, ShoppingBag, ArrowUpRight, X } from 'lucide-react';
import './App.css';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

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

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="menu-overlay"
            initial={{ opacity: 0, clipPath: 'circle(0% at 50% 0%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 50% 0%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 50% 0%)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
             <div className="menu-overlay-header">
                <h2 className="brand-title">Basilico Blu</h2>
                <button className="close-menu-btn" onClick={() => setIsMenuOpen(false)}>
                  <X size={32} />
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
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
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
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="nav-left">
          <div className="menu-icon" onClick={() => setIsMenuOpen(true)}>
            <Menu size={24} /> <span style={{marginLeft: '8px'}}>MENU</span>
          </div>
          <span className="nav-item" onClick={() => showPopup('Specials coming soon!')}>SPECIALS</span>
        </div>
        
        <div className="brand">
          <h1 className="brand-title">Basilico Blu</h1>
        </div>
        
        <div className="nav-right">
          <span className="nav-item" onClick={() => showPopup('Opening User Account...')}>
            <User size={18} /> MY ACCOUNT
          </span>
          <span className="nav-item" onClick={() => showPopup('Basket is empty')}>
            <ShoppingBag size={18} /> BASKET
          </span>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="hero">
        <motion.div 
          className="hero-text"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="hero-title" variants={fadeUpVariant}>
            Italian <span>cuisine restaurant</span>
          </motion.h1>
          <motion.p className="hero-desc" variants={fadeUpVariant}>
            An iconic Italian restaurant for the whole family, continuing the tradition of Italian gastronomy with a modern twist.
          </motion.p>
        </motion.div>

        <motion.div 
          className="hero-image-container"
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, type: "spring" }}
        >
          <motion.img 
            src="/pizza.png" 
            alt="Delicious Pizza" 
            className="hero-image revolving-pizza"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          />
        </motion.div>

        <motion.div 
          className="circular-btn"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ rotate: 15, scale: 1.1 }}
          onClick={() => setIsMenuOpen(true)}
        >
          View Menu <ArrowUpRight size={16} style={{ marginLeft: '5px' }} />
        </motion.div>
      </section>

      {/* Intro Section */}
      <section className="intro">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 className="intro-title" variants={fadeUpVariant}>
            Food, which cannot be forgotten,<br />
            <i>the place</i>, you want to return to.
          </motion.h2>
          <motion.p className="intro-desc" variants={fadeUpVariant}>
            This is a restaurant where food is always the center of attention. Our dishes amaze the guest, discover new tastes for him and bring real pleasure. Authentic Italian methods combined with local fresh ingredients.
          </motion.p>
        </motion.div>
      </section>

      {/* Booking Section */}
      <section className="booking">
        <motion.div 
          className="booking-image"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img src="/interior.png" alt="Restaurant Interior" />
        </motion.div>
        
        <motion.div 
          className="booking-form-container"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2>Book a Table</h2>
          <p>Reserve your spot at Basilico Blu. We recommend booking at least two days in advance for weekend dinners.</p>
          
          <form onSubmit={(e) => { e.preventDefault(); showPopup('Table reserved successfully!'); }}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Your full name" required />
            </div>
            
            <div className="form-group">
              <label>Phone</label>
              <input type="tel" placeholder="Your phone number" required />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Date</label>
                <input type="date" required />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Time</label>
                <input type="time" required />
              </div>
            </div>

            <div className="form-group">
              <label>Guests</label>
              <select>
                <option>1 Person</option>
                <option>2 People</option>
                <option>3 People</option>
                <option>4 People</option>
                <option>5+ People</option>
              </select>
            </div>
            
            <motion.button 
              type="submit"
              className="submit-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Reserve Table
            </motion.button>
          </form>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <h2 className="brand-title" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Basilico Blu</h2>
        <div className="footer-links">
          <a href="#" onClick={(e) => { e.preventDefault(); showPopup('Opening Instagram...'); }}>Instagram</a>
          <a href="#" onClick={(e) => { e.preventDefault(); showPopup('Opening Facebook...'); }}>Facebook</a>
          <a href="#" onClick={(e) => { e.preventDefault(); showPopup('Opening TripAdvisor...'); }}>TripAdvisor</a>
        </div>
        <p>&copy; 2026 Basilico Blu Restaurant. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
