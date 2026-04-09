import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Clock, MessageSquare, CheckCircle } from 'lucide-react';
import './App.css';

const menuItems = [
  { id: 1, name: 'Margherita Verace', desc: 'San Marzano tomatoes, buffalo mozzarella, fresh basil, extra virgin olive oil.', price: '$18', category: 'Wood Fired Pizza' },
  { id: 2, name: 'Diavola Napoletana', desc: 'Tomato sauce, fior di latte, spicy Calabrian salami, chili oil, roasted peppers.', price: '$22', category: 'Wood Fired Pizza' },
  { id: 3, name: 'Quattro Formaggi Bianca', desc: 'Mozzarella, gorgonzola dolce, parmigiano reggiano, fontina, truffle honey.', price: '$24', category: 'Wood Fired Pizza' },
  { id: 4, name: 'Prosciutto e Rucola', desc: 'Cherry tomatoes, mozzarella, aged prosciutto di Parma, wild arugula, shaved parmesan.', price: '$26', category: 'Wood Fired Pizza' },
  
  { id: 5, name: 'Spaghetti Carbonara', desc: 'Crispy guanciale, egg yolk, pecorino romano, cracked black pepper. No cream.', price: '$24', category: 'Handmade Pasta' },
  { id: 6, name: 'Pappardelle al Cinghiale', desc: 'Wide ribbon pasta, slow-braised wild boar ragù, juniper berries, pecorino.', price: '$28', category: 'Handmade Pasta' },
  { id: 7, name: 'Linguine alle Vongole', desc: 'Fresh Manila clams, white wine, garlic, parsley, Calabrian chili flakes.', price: '$29', category: 'Handmade Pasta' },
  { id: 8, name: 'Gnocchi al Tartufo', desc: 'Potato dumplings, black truffle cream, wild mushrooms, parmesan crisp.', price: '$27', category: 'Handmade Pasta' },

  { id: 9, name: 'Bistecca alla Fiorentina', desc: '32oz dry-aged Porterhouse, grilled lemon, rosemary roasted potatoes. Designed for two.', price: '$120', category: 'Secondi (Mains)' },
  { id: 10, name: 'Branzino al Forno', desc: 'Whole roasted Mediterranean sea bass, cherry tomatoes, capers, white wine sauce.', price: '$42', category: 'Secondi (Mains)' },
  { id: 11, name: 'Osso Buco Milanese', desc: 'Braised veal shank, saffron risotto, gremolata, bone marrow.', price: '$48', category: 'Secondi (Mains)' },

  { id: 12, name: 'Burrata con Pomodorini', desc: 'Fresh burrata cheese, blistered cherry tomatoes, aged balsamic, basil oil.', price: '$18', category: 'Antipasti e Insalate' },
  { id: 13, name: 'Carpaccio di Manzo', desc: 'Thinly sliced raw beef tenderloin, arugula, capers, lemon olive oil, shaved parmesan.', price: '$21', category: 'Antipasti e Insalate' },
  { id: 14, name: 'Insalata di Carciofi', desc: 'Shaved raw artichokes, fennel, mint, pecorino, lemon vinaigrette.', price: '$16', category: 'Antipasti e Insalate' },

  { id: 15, name: 'Tiramisu Classico', desc: 'Espresso-soaked ladyfingers, mascarpone silk, dark cocoa powder.', price: '$12', category: 'Dolci' },
  { id: 16, name: 'Panna Cotta al Basilico', desc: 'Vanilla bean and sweet basil infused cream, strawberry balsamico compote.', price: '$11', category: 'Dolci' },
  { id: 17, name: 'Cannoli Siciliani', desc: 'Crispy shells filled with sweet ricotta, candied orange, pistachios.', price: '$10', category: 'Dolci' }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="app-container">
      {/* Navbar */}
      <motion.nav 
        className="navbar"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="brand-header" onClick={() => setCurrentPage('home')}>
          <h1 className="brand-title">Basilico Blu</h1>
        </div>
        
        <div className="nav-links">
          <span className={`nav-item-elegant ${currentPage === 'home' ? 'active' : ''}`} onClick={() => setCurrentPage('home')}>Home</span>
          <span className={`nav-item-elegant ${currentPage === 'menu' ? 'active' : ''}`} onClick={() => setCurrentPage('menu')}>Menu</span>
          <span className={`nav-item-elegant ${currentPage === 'booking' ? 'active' : ''}`} onClick={() => setCurrentPage('booking')}>Reservations</span>
        </div>
      </motion.nav>

      {/* Pages */}
      <AnimatePresence mode="wait">
        {currentPage === 'home' && <Home key="home" setPage={setCurrentPage} />}
        {currentPage === 'menu' && <Menu key="menu" />}
        {currentPage === 'booking' && <Booking key="booking" />}
      </AnimatePresence>
    </div>
  );
}

function Home({ setPage }) {
  return (
    <motion.div 
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <section className="hero">
        <div className="hero-text">
          <h3 className="sub-heading">A TASTE OF NAPOLI</h3>
          <h1 className="hero-title">Real Italian pizza<br />with real ingredients</h1>
          
          <button className="accent-btn mt-4" onClick={() => setPage('menu')}>
            Explore The Menu
          </button>
        </div>

        <div className="hero-pizza-wrapper">
          {/* Static, large, elegant pizza rendering */}
          <img 
            src="/pizza.png" 
            alt="Artistic Pizza" 
            className="huge-pizza-static"
          />
        </div>
      </section>

      {/* Story Details */}
      <section className="artistic-details">
        <div className="details-grid">
          <div className="detail-card">
            <h2 className="detail-title">Our Heritage</h2>
            <div className="detail-line"></div>
            <p className="detail-text">
              Born from the winding streets of Napoli, our recipes have been passed down through five generations. We honor the simplicity and passion of traditional Italian gastronomy.
            </p>
          </div>
          <div className="detail-card">
            <h2 className="detail-title">Wood-Fired</h2>
            <div className="detail-line"></div>
            <p className="detail-text">
              Our custom brick oven, imported directly from Italy, burns oak and olive wood to give our dough its signature blistered crust and smoky aroma.
            </p>
          </div>
          <div className="detail-card">
            <h2 className="detail-title">Imported Ingredients</h2>
            <div className="detail-line"></div>
            <p className="detail-text">
              San Marzano tomatoes from the volcanic soils of Mount Vesuvius, D.O.P. buffalo mozzarella from Campania, and extra virgin olive oil pressed in Apulia.
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

function Menu() {
  const categories = [...new Set(menuItems.map(item => item.category))];

  return (
    <motion.div 
      className="page menu-page-wrapper"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="menu-page-header">
        <h1 className="page-title">I Nostri Piatti</h1>
        <p className="page-subtitle">A culinary journey through Italy</p>
      </div>

      <div className="menu-classic-container">
        {categories.map((cat, idx) => (
          <div key={idx} className="menu-category-section">
            <h2 className="category-title">{cat}</h2>
            <div className="menu-list">
              {menuItems.filter(item => item.category === cat).map(item => (
                <div key={item.id} className="menu-item-row">
                  <div className="menu-item-info">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-desc">{item.desc}</p>
                  </div>
                  <div className="menu-item-price">{item.price}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function Booking() {
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('booked');
  };

  if (status === 'booked') {
    return (
      <motion.div className="page center-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="success-card">
          <CheckCircle size={64} className="success-icon" />
          <h1 className="page-title">Table Confirmed</h1>
          <p className="detail-text" style={{ textAlign: 'center', marginTop: '1rem' }}>
            Your reservation has been secured. We look forward to welcoming you to Basilico Blu. A confirmation email has been sent.
          </p>
          <button className="accent-btn mt-4" onClick={() => setStatus('idle')}>Book Another Table</button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="booking-page-header">
        <h1 className="page-title">Reserve a Table</h1>
        <p className="page-subtitle">Experience the magic of authentic Italian dining</p>
      </div>

      <div className="booking-container">
        <form className="booking-form" onSubmit={handleSubmit}>
          <h2 className="form-title">Seat Booking System</h2>
          
          <div className="form-grid">
            <div className="input-group">
              <label><Calendar size={16}/> Date</label>
              <input type="date" required className="artistic-input" />
            </div>
            
            <div className="input-group">
              <label><Clock size={16}/> Time</label>
              <input type="time" required className="artistic-input" defaultValue="19:00" />
            </div>

            <div className="input-group">
              <label><Users size={16}/> Party Size</label>
              <select className="artistic-input" required>
                {[1,2,3,4,5,6,7,8,"9+"].map(n => <option key={n}>{n} Guests</option>)}
              </select>
            </div>

            <div className="input-group">
              <label>Seating Preference</label>
              <select className="artistic-input" required>
                <option>Main Dining Room</option>
                <option>Outdoor Terrazzo</option>
                <option>Chef's Counter</option>
                <option>Private Wine Cellar</option>
              </select>
            </div>
          </div>

          <div className="input-group full-width">
            <label><MessageSquare size={16}/> Special Requests & Occasions</label>
            <textarea 
              className="artistic-textarea" 
              placeholder="Let us know about allergies, romantic setups, Birthdays, etc..."
              rows={3}
            ></textarea>
          </div>

          <div className="input-group full-width">
            <label>Contact Information</label>
            <div className="form-grid">
               <input type="text" placeholder="Full Name" required className="artistic-input" />
               <input type="tel" placeholder="Phone Number" required className="artistic-input" />
               <input type="email" placeholder="Email Address" required className="artistic-input" style={{ gridColumn: '1 / -1'}} />
            </div>
          </div>

          <button type="submit" className="accent-btn submit-booking">
            Confirm Reservation
          </button>
        </form>

        <div className="booking-sidebar">
          <h3 className="sidebar-title">Important Details</h3>
          <ul className="sidebar-list">
            <li><strong>Grace Period:</strong> Tables are held for 15 minutes past the reserved time.</li>
            <li><strong>Dress Code:</strong> Smart casual dining attire is appreciated.</li>
            <li><strong>Cancellations:</strong> Please notify us at least 24 hours in advance.</li>
            <li><strong>Large Parties:</strong> For parties of 9 or more, a specialized chef's tasting menu is provided.</li>
          </ul>
          
          <div className="contact-box mt-4">
             <h4 className="detail-title" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Need assistance?</h4>
             <p>Call us at: +1 (555) 123-4567<br/>Email: ciao@basilicoblu.com</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
