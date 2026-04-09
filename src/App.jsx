import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, User, ShoppingBag, ArrowUpRight } from 'lucide-react';
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
  { id: 1, name: 'Portobello', desc: 'Mushroom cream soup (based on chicken broth) with fried oyster mushrooms and olive oil.', category: 'Hot dishes', image: '/hot_dish.png' },
  { id: 2, name: 'Signature Pizza', desc: 'Authentic Italian pizza sliced on a wooden board with classic tomato sauce, mozzarella, and fresh basil.', category: 'Pizza', image: '/pizza.png' },
  { id: 3, name: 'Truffle Pasta', desc: 'Fresh Italian pasta elegantly plated, with creamy truffle sauce and parmesan savings.', category: 'Pasta', image: '/pasta.png' },
  { id: 4, name: 'Risotto al Nero', desc: 'Arborio rice cooked in squid ink broth, topped with seared scallops.', category: 'Ravioli and risotto', image: '/hot_dish.png' },
];

function App() {
  const [activeCategory, setActiveCategory] = useState('Among all categories');
  const categories = ['Among all categories', 'Pizza', 'Pasta', 'Hot dishes', 'Ravioli and risotto', 'Salads', 'Breakfast'];

  const filteredMenu = activeCategory === 'Among all categories' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="app-container">
      {/* Navigation */}
      <motion.nav 
        className="navbar"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="nav-left">
          <div className="menu-icon"><Menu size={24} /></div>
          <span className="nav-item">MENU</span>
          <span className="nav-item">SPECIALS</span>
        </div>
        
        <div className="brand">
          <h1 className="brand-title">Basilico Blu</h1>
          <div className="brand-subtitle">RESTAURANT & DELIVERY</div>
        </div>
        
        <div className="nav-right">
          <span className="nav-item"><User size={18} /> MY ACCOUNT</span>
          <span className="nav-item"><ShoppingBag size={18} /> BASKET</span>
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
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <img src="/pizza.png" alt="Delicious Pizza" className="hero-image" />
        </motion.div>

        <motion.div 
          className="circular-btn"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ rotate: 15 }}
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

      {/* Menu Section */}
      <section className="menu-section">
        <motion.div 
          className="menu-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariant}
        >
          <h2>Popular dishes</h2>
        </motion.div>

        <motion.div 
          className="categories"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariant}
        >
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <motion.div 
          className="menu-grid"
          layout
        >
          {filteredMenu.map((item, index) => (
            <motion.div 
              key={item.id} 
              className="menu-card"
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="menu-card-img">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="menu-card-header">
                <h3>{item.name}</h3>
                <span>Choose <ArrowUpRight size={14} /></span>
              </div>
              <p className="menu-card-desc">{item.desc}</p>
            </motion.div>
          ))}
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
          
          <form onSubmit={(e) => e.preventDefault()}>
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
          <a href="#">Instagram</a>
          <a href="#">Facebook</a>
          <a href="#">TripAdvisor</a>
        </div>
        <p>&copy; 2026 Basilico Blu Restaurant. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
