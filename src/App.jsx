import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Clock, MessageSquare, CheckCircle } from 'lucide-react';
import './App.css';

export const pageVariants = {
  initial: { opacity: 0, rotateX: 45, transformPerspective: 1200, scale: 0.95 },
  in: { opacity: 1, rotateX: 0, transformPerspective: 1200, scale: 1 },
  out: { opacity: 0, rotateX: -30, transformPerspective: 1200, scale: 0.97 }
};

export const pageTransition = { duration: 1.4, ease: [0.22, 1, 0.36, 1] };

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

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loader-container">
        <motion.div 
          animate={{ rotateY: 360 }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
        >
          <span style={{ fontSize: '5rem', fontFamily: 'var(--font-script)', color: 'var(--bg-accent)'}}>BB</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          style={{ marginTop: '2.5rem', fontFamily: 'var(--font-sans)', letterSpacing: '8px', fontSize: '1rem', color: 'var(--text-secondary)' }}
        >
          PREPARING EXPERIENCE
        </motion.h2>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Navbar */}
      <motion.nav 
        className="navbar"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
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

      {/* Floating Widget */}
      <motion.div 
        className="floating-widget" 
        onClick={() => setCurrentPage('booking')}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <Calendar size={20} />
        <span>Reserve</span>
      </motion.div>
    </div>
  );
}

function Home({ setPage }) {
  return (
    <motion.div 
      className="page"
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      style={{ transformOrigin: "top center" }}
    >
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-text-left">
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
          </div>
          
          <div className="hero-image-wrapper">
             <motion.img 
                src="/hero_dish.png" 
                alt="Signature Dish" 
                className="hero-dish"
                initial={{ opacity: 0, scale: 0.85, rotateZ: -3 }}
                animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
                transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
             />
          </div>
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

      {/* Chef Story */}
      <section className="chef-story" style={{ padding: '8rem 10%', background: 'linear-gradient(rgba(0,18,15,0.7), rgba(0,18,15,0.9)), url(/chef_bg.png)', backgroundSize: 'cover', backgroundAttachment: 'fixed', backgroundPosition: 'center', textAlign: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, rotateY: 30 }}
          whileInView={{ opacity: 1, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformPerspective: 1000 }}
        >
           <h2 className="detail-title" style={{ fontSize: '3rem', color: 'var(--bg-accent)' }}>La Famiglia</h2>
           <div className="detail-line" style={{ margin: '0 auto 2rem auto' }}></div>
           <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', lineHeight: 2, color: 'var(--text-secondary)'}}>
             Chef Alessandro Singh brings his dual heritage to Basilico Blu. Trained in the heart of Milan and raised in the vibrant streets of Delhi, he masterfully harmonizes the rich, earthy flavors of traditional Italian recipes with the fragrant, bold spices of India. Every dish is a bridge between two ancient culinary worlds.
           </p>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="testimonials" style={{ padding: '6rem 10%' }}>
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            <motion.div className="glass-card" whileHover={{ rotateX: 5, rotateY: -5, scale: 1.05 }} style={{ transformPerspective: 1000, padding: '3rem 2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
               <p style={{ fontStyle: 'italic', fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>"A revelatory dining experience. The Truffle Malai Broccoli is nothing short of spectacular."</p>
               <h4 style={{ color: 'var(--bg-accent)', fontFamily: 'var(--font-sans)', letterSpacing: '2px', textTransform: 'uppercase'}}>- The Culinary Times</h4>
            </motion.div>
            <motion.div className="glass-card" whileHover={{ rotateX: 5, rotateY: 5, scale: 1.05 }} style={{ transformPerspective: 1000, padding: '3rem 2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
               <p style={{ fontStyle: 'italic', fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>"Basilico Blu executes Indo-Italian fusion with an elegance previously unseen in the fine dining space."</p>
               <h4 style={{ color: 'var(--bg-accent)', fontFamily: 'var(--font-sans)', letterSpacing: '2px', textTransform: 'uppercase'}}>- Vogue Gastronomy</h4>
            </motion.div>
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
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      style={{ transformOrigin: "top center", background: "transparent" }}
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
              {menuItems.filter(item => item.category === cat).map((item, i) => (
                <motion.div 
                  key={item.id} 
                  className="menu-item-row"
                  initial={{ opacity: 0, rotateX: 60 }}
                  whileInView={{ opacity: 1, rotateX: 0 }}
                  whileHover={{ scale: 1.05, rotateX: 10, rotateY: 5, boxShadow: "0px 15px 35px rgba(0,0,0,0.6)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
                  style={{ transformPerspective: 1000, cursor: "pointer", background: "rgba(0,26,21,0.8)", padding: "1.5rem", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.05)" }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 1.2, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
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
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      style={{ transformOrigin: "top center" }}
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
