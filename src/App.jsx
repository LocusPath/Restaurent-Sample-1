import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Clock, MessageSquare, CheckCircle, MapPin, Phone, Mail, Pizza, Utensils, Flame, Leaf, Coffee } from 'lucide-react';
import './App.css';

/* ── calm animation variants ── */
const calmFade = {
  initial: { opacity: 0, y: 25 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -15 }
};
const calmTransition = { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] };

const sectionReveal = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0 }
};
const sectionTransition = { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] };

const menuItems = [
// pizzas
  { id: 1, name: 'Makhani Margherita (Verace)', desc: 'San Marzano tomatoes, buffalo mozzarella, fresh basil, extra virgin olive oil.', price: '₹595', category: 'Wood Fired Pizza' },
  { id: 2, name: 'Teekha Chicken Diavola', desc: 'Tomato sauce, fior di latte, spicy chicken pepperoni, chili oil, roasted peppers.', price: '₹895', category: 'Wood Fired Pizza' },
  { id: 3, name: 'Char Magaz Formaggi', desc: 'Mozzarella, gorgonzola dolce, parmigiano reggiano, fontina, truffle honey.', price: '₹950', category: 'Wood Fired Pizza' },
  { id: 4, name: 'Smoked Chicken & Rucola', desc: 'Cherry tomatoes, mozzarella, wood-smoked chicken breast, wild arugula, shaved parmesan.', price: '₹895', category: 'Wood Fired Pizza' },
  { id: 20, name: 'Tandoori Paneer Tikka Pizza', desc: 'San Marzano sauce, fresh mozzarella, charred paneer tikka, red onions, mint crema.', price: '₹650', category: 'Wood Fired Pizza' },
  { id: 21, name: 'Palak & Roasted Garlic Bianca', desc: 'Creamy spinach base, fior di latte, roasted garlic cloves, chili flakes, feta crumbles.', price: '₹595', category: 'Wood Fired Pizza' },
  { id: 22, name: 'Quattro Formaggi Malai', desc: 'Mozzarella, gorgonzola, smoked scamorza, malai paneer, truffle honey drizzle.', price: '₹750', category: 'Wood Fired Pizza' },

// pastas
  { id: 5, name: 'Reshmi Chicken Carbonara', desc: 'Crispy smoked chicken, egg yolk, pecorino romano, cracked black pepper. No cream.', price: '₹850', category: 'Handmade Pasta' },
  { id: 6, name: 'Murg Ragu Pappardelle', desc: 'Wide ribbon pasta, slow-braised minced chicken ragù, juniper berries, pecorino.', price: '₹795', category: 'Handmade Pasta' },
  { id: 7, name: 'Samundari Linguine', desc: 'Fresh shrimp & calamari, white wine, garlic, parsley, Calabrian chili flakes.', price: '₹1095', category: 'Handmade Pasta' },
  { id: 8, name: 'Kala Truffle Gnocchi', desc: 'Potato dumplings, black truffle cream, wild mushrooms, parmesan crisp.', price: '₹995', category: 'Handmade Pasta' },
  { id: 23, name: 'Palak Paneer Lasagna', desc: 'Layered fresh pasta, spinach and paneer ricotta mix, rich makhani sauce, baked with mozzarella.', price: '₹695', category: 'Handmade Pasta' },
  { id: 24, name: 'Tandoori Mushroom Risotto', desc: 'Arborio rice, tandoori roasted wild mushrooms, parmesan, saffron infusion.', price: '₹750', category: 'Handmade Pasta' },
  { id: 25, name: 'Shahi Paneer Gnocchi', desc: 'Soft potato gnocchi tossed in a velvety sweet tomato cashew cream sauce.', price: '₹650', category: 'Handmade Pasta' },
  { id: 26, name: 'Malai Kofta Ravioli', desc: 'Handmade ravioli stuffed with malai kofta, served in a light brown butter sage sauce.', price: '₹695', category: 'Handmade Pasta' },

// mains
  { id: 9, name: 'Tandoori Roast Chicken (Pollo)', desc: 'Half roasted organic chicken, grilled lemon, rosemary roasted potatoes. Designed for two.', price: '₹1495', category: 'Secondi (Mains)' },
  { id: 10, name: 'Tandoori Branzino', desc: 'Whole roasted Mediterranean sea bass, cherry tomatoes, capers, white wine sauce.', price: '₹1895', category: 'Secondi (Mains)' },
  { id: 27, name: 'Truffle Malai Broccoli', desc: 'Wood-fired broccoli florets marinated in malai cheese and black truffle.', price: '₹595', category: 'Secondi (Mains)' },
  { id: 28, name: 'Melanzane Bharwa Parmigiana', desc: 'Stuffed eggplant layered with rich tomato masala sauce and parmesan cheese.', price: '₹650', category: 'Secondi (Mains)' },

// starters
  { id: 18, name: 'Lahsuni Garlic Bread Classico', desc: 'Fresh baked ciabatta, roasted garlic butter, parsley, sea salt.', price: '₹295', category: 'Antipasti e Pane' },
  { id: 19, name: 'Cheese Chilly Garlic Bread', desc: 'Melted mozzarella, green chilies, roasted garlic butter, parmesan crust.', price: '₹450', category: 'Antipasti e Pane' },
  { id: 12, name: 'Malai Burrata', desc: 'Fresh burrata cheese, blistered cherry tomatoes, aged balsamic, basil oil.', price: '₹750', category: 'Antipasti e Pane' },
  { id: 13, name: 'Hara Bhara Carciofi', desc: 'Shaved raw artichokes, fennel, mint, pecorino, lemon vinaigrette.', price: '₹650', category: 'Antipasti e Pane' },
  { id: 29, name: 'Kurkuri Zucchini Fritti', desc: 'Crispy fried zucchini strings tossed in chaat masala, served with garlic aioli.', price: '₹395', category: 'Antipasti e Pane' },

// desserts
  { id: 15, name: 'Shahi Tiramisu', desc: 'Espresso-soaked ladyfingers, mascarpone silk, dark cocoa powder.', price: '₹550', category: 'Dolci' },
  { id: 16, name: 'Panna Cotta ki Kheer', desc: 'Vanilla bean and sweet basil infused cream, strawberry balsamico compote.', price: '₹495', category: 'Dolci' },
  { id: 17, name: 'Meetha Cannoli', desc: 'Crispy shells filled with sweet ricotta, candied orange, pistachios.', price: '₹550', category: 'Dolci' }
];

/* ── App ── */
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  /* scroll to top on every page change */
  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="loader-container">
        <motion.div 
          animate={{ rotateY: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <span style={{ fontSize: '5rem', fontFamily: 'var(--font-script)', color: 'var(--bg-accent)'}}>BB</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 2.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          style={{ marginTop: '2.5rem', fontFamily: 'var(--font-sans)', letterSpacing: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}
        >
          PREPARING YOUR EXPERIENCE
        </motion.h2>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Navbar */}
      <motion.nav 
        className="navbar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <div className="brand-header" onClick={() => navigateTo('home')}>
          <img src="/logo.svg" alt="Basilico Blu" style={{ height: '48px', filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.4))' }} />
        </div>
        
        <div className="nav-links">
          <span className={`nav-item-elegant ${currentPage === 'home' ? 'active' : ''}`} onClick={() => navigateTo('home')}>Home</span>
          <span className={`nav-item-elegant ${currentPage === 'menu' ? 'active' : ''}`} onClick={() => navigateTo('menu')}>Menu</span>
          <span className={`nav-item-elegant ${currentPage === 'booking' ? 'active' : ''}`} onClick={() => navigateTo('booking')}>Reservations</span>
        </div>
      </motion.nav>

      {/* Pages */}
      <AnimatePresence mode="wait">
        {currentPage === 'home' && <Home key="home" setPage={navigateTo} />}
        {currentPage === 'menu' && <Menu key="menu" />}
        {currentPage === 'booking' && <Booking key="booking" />}
      </AnimatePresence>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-col">
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '1rem' }}>Basilico Blu</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem' }}>
              Where two ancient culinary traditions come together in perfect harmony. Since 2018.
            </p>
          </div>
          <div className="footer-col">
            <h4 style={{ color: 'var(--bg-accent)', fontFamily: 'var(--font-sans)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem', fontSize: '0.85rem' }}>Visit Us</h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 2, fontSize: '0.9rem' }}>
              <MapPin size={14} style={{ marginRight: '8px', verticalAlign: 'middle' }} />777 Starlight Avenue, Culinary District<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Metroburg 10001<br/>
              <Phone size={14} style={{ marginRight: '8px', verticalAlign: 'middle' }} />+91 9318368267, +91 8287768083<br/>
              <Mail size={14} style={{ marginRight: '8px', verticalAlign: 'middle' }} />ciao@basilicoblu.in
            </p>
          </div>
          <div className="footer-col">
            <h4 style={{ color: 'var(--bg-accent)', fontFamily: 'var(--font-sans)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem', fontSize: '0.85rem' }}>Hours</h4>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 2, fontSize: '0.9rem' }}>
              Lunch: 12:00 PM – 3:00 PM<br/>
              Dinner: 7:00 PM – 11:30 PM<br/>
              Bar: 5:00 PM – 12:30 AM
            </p>
          </div>
        </div>
        <div style={{ textAlign: 'center', paddingTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-dark-secondary)', fontSize: '0.8rem', letterSpacing: '1px' }}>
          © 2025 Basilico Blu. All rights reserved.
        </div>
      </footer>

      {/* Floating Widget */}
      <motion.div 
        className="floating-widget" 
        onClick={() => navigateTo('booking')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
      >
        <Calendar size={20} />
        <span>Reserve</span>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════
   HOME PAGE
   ══════════════════════════════════════ */
function Home({ setPage }) {
  return (
    <motion.div 
      className="page"
      {...calmFade}
      transition={calmTransition}
    >
      {/* Hero */}
      <section className="hero">
        <div className="hero-grid">
          <motion.div 
            className="hero-text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
          >
            <h3 className="sub-heading" style={{ textAlign: 'left', margin: '0 0 1.5rem 0' }}>A TASTE OF MILAN & DELHI</h3>
            <h1 className="hero-title" style={{ textAlign: 'left' }}>Real Italian pasta<br />with an Indian heart</h1>
            <p className="hero-description" style={{ textAlign: 'left', color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '500px', marginBottom: '2.5rem' }}>
              Experience a world-class culinary journey where traditional Italian heritage meets the vibrant, bold spices of India in an unforgettable fine-dining atmosphere.
            </p>
            <div style={{ textAlign: 'left', width: '100%' }}>
              <button className="accent-btn" onClick={() => setPage('menu')}>
                Explore The Menu
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            className="hero-image-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 }}
          >
             <img 
                src="/hero_dish.png" 
                alt="Signature Dish" 
                className="hero-dish"
             />
          </motion.div>
        </div>
      </section>

      {/* Story Details */}
      <section className="artistic-details">
        <div className="details-grid">
          {[
            { title: 'Our Heritage', text: 'Born from the winding streets of Napoli, our recipes have been passed down through five generations. We honor the simplicity and passion of traditional Italian gastronomy.', accent: 'var(--bg-accent-teal)' },
            { title: 'Wood-Fired', text: 'Our custom brick oven, imported directly from Italy, burns oak and olive wood to give our dough its signature blistered crust and smoky aroma.', accent: 'var(--bg-accent)' },
            { title: 'Imported Ingredients', text: 'San Marzano tomatoes from the volcanic soils of Mount Vesuvius, D.O.P. buffalo mozzarella from Campania, and extra virgin olive oil pressed in Apulia.', accent: 'var(--bg-accent-warm)' }
          ].map((card, i) => (
            <motion.div 
              key={i} 
              className="detail-card"
              variants={sectionReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ ...sectionTransition, delay: i * 0.15 }}
            >
              <h2 className="detail-title">{card.title}</h2>
              <div className="detail-line" style={{ backgroundColor: card.accent }}></div>
              <p className="detail-text">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gallery Strip */}
      <section className="gallery-strip">
        <motion.div
          className="gallery-grid"
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={sectionTransition}
        >
          <div className="gallery-item">
            <img src="/pizza.png" alt="Artisan Wood-Fired Pizza" className="gallery-img" />
            <div className="gallery-label">Artisan Wood-Fired</div>
          </div>
          <div className="gallery-item">
            <img src="/pasta.png" alt="Handmade Pappardelle" className="gallery-img" />
            <div className="gallery-label">Handmade Pasta</div>
          </div>
          <div className="gallery-item">
            <img src="/hero_dish.png" alt="Signature Saffron Pasta" className="gallery-img" />
            <div className="gallery-label">Signature Dishes</div>
          </div>
          <div className="gallery-item">
            <img src="/pasta_dish.png" alt="Truffle Gnocchi" className="gallery-img" />
            <div className="gallery-label">Rich Flavors</div>
          </div>
          <div className="gallery-item">
            <img src="/hot_dish.png" alt="Signature Curries" className="gallery-img" />
            <div className="gallery-label">Indo-Italian Fusion</div>
          </div>
          <div className="gallery-item">
            <img src="/interior.png" alt="Our Beautiful Setting" className="gallery-img" />
            <div className="gallery-label">Beautiful Setting</div>
          </div>
        </motion.div>
      </section>

      {/* Chef Story — with background image */}
      <section className="chef-story-section">
        <div className="chef-story-overlay">
          <motion.div
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={sectionTransition}
          >
            <h2 className="detail-title" style={{ fontSize: '2.8rem', color: 'var(--bg-accent)', marginBottom: '0.5rem' }}>La Famiglia</h2>
            <div className="detail-line" style={{ margin: '0 auto 2rem auto' }}></div>
            <p style={{ maxWidth: '750px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 2, color: 'var(--text-secondary)' }}>
              Chef Alessandro Singh brings his dual heritage to Basilico Blu. Trained in the heart of Milan and raised in the vibrant streets of Delhi, he masterfully harmonizes the rich, earthy flavors of traditional Italian recipes with the fragrant, bold spices of India. Every dish is a bridge between two ancient culinary worlds.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Info Ribbon */}
      <section className="info-ribbon">
        <motion.div
          className="ribbon-content"
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={sectionTransition}
        >
          {[
            { label: 'Established', value: '2018' },
            { label: 'Dishes Served', value: '50,000+' },
            { label: 'Wood-Fired Oven', value: '900°F' },
            { label: 'Cuisines Fused', value: '2 Worlds' }
          ].map((stat, i) => (
            <div key={i} className="ribbon-stat">
              <span className="ribbon-value">{stat.value}</span>
              <span className="ribbon-label">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </section>



      {/* CTA — Reservation Banner */}
      <section className="cta-section">
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={sectionTransition}
          style={{ textAlign: 'center' }}
        >
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '1rem' }}>Ready for an Unforgettable Evening?</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
            Reserve your table now and let us craft an evening of extraordinary flavors, warm hospitality, and memories that linger.
          </p>
          <button className="accent-btn" onClick={() => setPage('booking')}>
            Reserve a Table
          </button>
        </motion.div>
      </section>
    </motion.div>
  );
}

/* ══════════════════════════════════════
   MENU PAGE
   ══════════════════════════════════════ */
function Menu() {
  const categories = [...new Set(menuItems.map(item => item.category))];

  const categoryIcons = {
    'Wood Fired Pizza': <Pizza size={26} style={{ filter: 'drop-shadow(0px 4px 6px rgba(227,169,60,0.5))', marginRight: '10px', verticalAlign: 'middle' }} />,
    'Handmade Pasta': <Utensils size={26} style={{ filter: 'drop-shadow(0px 4px 6px rgba(227,169,60,0.5))', marginRight: '10px', verticalAlign: 'middle' }} />,
    'Secondi (Mains)': <Flame size={26} style={{ filter: 'drop-shadow(0px 4px 6px rgba(227,169,60,0.5))', marginRight: '10px', verticalAlign: 'middle' }} />,
    'Antipasti e Pane': <Leaf size={26} style={{ filter: 'drop-shadow(0px 4px 6px rgba(227,169,60,0.5))', marginRight: '10px', verticalAlign: 'middle' }} />,
    'Dolci': <Coffee size={26} style={{ filter: 'drop-shadow(0px 4px 6px rgba(227,169,60,0.5))', marginRight: '10px', verticalAlign: 'middle' }} />
  };

  return (
    <motion.div 
      className="page menu-page-wrapper"
      {...calmFade}
      transition={calmTransition}
    >
      <div className="menu-page-header">
        <motion.h1 className="page-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>I Nostri Piatti</motion.h1>
        <motion.p className="page-subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.3 }}>A culinary journey through Italy & India</motion.p>
      </div>

      <div className="menu-classic-container">
        {categories.map((cat, idx) => (
          <div key={idx} className="menu-category-section">
            <motion.h2 
              className="category-title"
              variants={sectionReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={sectionTransition}
            >
              {categoryIcons[cat]}{cat}
            </motion.h2>
            <div className="menu-list">
              {menuItems.filter(item => item.category === cat).map((item, i) => (
                <motion.div 
                  key={item.id} 
                  className="menu-item-row"
                  variants={sectionReveal}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ ...sectionTransition, delay: i * 0.08 }}
                >
                  <div className="menu-item-info">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-desc">{item.desc}</p>
                  </div>
                  <div className="menu-item-price">{item.price}</div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════
   BOOKING PAGE
   ══════════════════════════════════════ */
function Booking() {
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('booked');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (status === 'booked') {
    return (
      <motion.div className="page center-content" {...calmFade} transition={calmTransition}>
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
      {...calmFade}
      transition={calmTransition}
    >
      <div className="booking-page-header">
        <motion.h1 className="page-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>Reserve a Table</motion.h1>
        <motion.p className="page-subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.3 }}>Experience the magic of authentic Indo-Italian dining</motion.p>
      </div>

      <div className="booking-container">
        <motion.form 
          className="booking-form" 
          onSubmit={handleSubmit}
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={sectionTransition}
        >
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
        </motion.form>

        <motion.div 
          className="booking-sidebar"
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ ...sectionTransition, delay: 0.3 }}
        >
          <h3 className="sidebar-title">Important Details</h3>
          <ul className="sidebar-list">
            <li><strong>Grace Period:</strong> Tables are held for 15 minutes past the reserved time.</li>
            <li><strong>Dress Code:</strong> Smart casual dining attire is appreciated.</li>
            <li><strong>Cancellations:</strong> Please notify us at least 24 hours in advance.</li>
            <li><strong>Large Parties:</strong> For parties of 9 or more, a specialized chef's tasting menu is provided.</li>
          </ul>
          
          <div className="contact-box mt-4">
             <h4 className="detail-title" style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Need assistance?</h4>
             <p style={{ color: 'var(--text-secondary)' }}>Call us at: +91 9318368267, +91 8287768083<br/>Email: ciao@basilicoblu.in</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
