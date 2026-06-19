import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FiShoppingCart, FiMenu, FiX, FiSearch, FiUser } from "react-icons/fi";

export default function Navbar() {
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.nav}>
      <div className="container" style={styles.container}>
        <Link to="/" style={styles.logo}>
          <span style={styles.logoIcon}>🛍️</span>
          <span style={styles.logoText}>Intercity<span style={{ color: "var(--primary)" }}>Mall</span></span>
        </Link>

        <div style={styles.desktopMenu}>
          <Link to="/" style={{ ...styles.link, ...(isActive("/") && styles.activeLink) }}>Home</Link>
          <Link to="/shop" style={{ ...styles.link, ...(isActive("/shop") && styles.activeLink) }}>Shop</Link>
          <Link to="/orders" style={{ ...styles.link, ...(isActive("/orders") && styles.activeLink) }}>Orders</Link>
          <Link to="/admin" style={{ ...styles.link, ...(isActive("/admin") && styles.activeLink) }}>
            <FiUser size={16} /> Admin
          </Link>
        </div>

        <div style={styles.actions}>
          <form onSubmit={handleSearch} style={styles.searchForm}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={searchOpen ? styles.searchInputOpen : styles.searchInput}
              onFocus={() => setSearchOpen(true)}
              onBlur={() => !searchQuery && setSearchOpen(false)}
            />
            <button type="submit" style={styles.searchBtn}>
              <FiSearch size={18} />
            </button>
          </form>

          <Link to="/cart" style={styles.cartBtn}>
            <FiShoppingCart size={20} />
            {cartCount > 0 && <span style={styles.cartBadge}>{cartCount}</span>}
          </Link>

          <button
            style={styles.menuToggle}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div style={styles.mobileMenu}>
          <Link to="/" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/shop" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link to="/orders" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>Orders</Link>
          <Link to="/cart" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>Cart ({cartCount})</Link>
          <Link to="/admin" style={styles.mobileLink} onClick={() => setMenuOpen(false)}>Admin Panel</Link>
        </div>
      )}
    </nav>
  );
}

const styles = {
  nav: {
    background: "white",
    borderBottom: "1px solid var(--gray-200)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow: "var(--shadow)",
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 64,
    gap: 20,
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontWeight: 800,
    fontSize: 22,
  },
  logoIcon: { fontSize: 28 },
  logoText: { color: "var(--dark)" },
  desktopMenu: {
    display: "flex",
    gap: 8,
    alignItems: "center",
  },
  link: {
    padding: "8px 16px",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    color: "var(--gray-600)",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  activeLink: {
    background: "var(--gray-100)",
    color: "var(--primary)",
    fontWeight: 600,
  },
  actions: { display: "flex", alignItems: "center", gap: 12 },
  searchForm: { position: "relative", display: "flex", alignItems: "center" },
  searchInput: {
    width: 0,
    padding: 0,
    border: "none",
    outline: "none",
    transition: "all 0.3s",
    background: "transparent",
  },
  searchInputOpen: {
    width: 200,
    padding: "8px 36px 8px 12px",
    border: "1px solid var(--gray-300)",
    borderRadius: 8,
    outline: "none",
    fontSize: 14,
    background: "var(--gray-50)",
  },
  searchBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 8,
    display: "flex",
    color: "var(--gray-500)",
  },
  cartBtn: {
    position: "relative",
    padding: 8,
    color: "var(--gray-700)",
    display: "flex",
  },
  cartBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    background: "var(--primary)",
    color: "white",
    fontSize: 10,
    fontWeight: 700,
    width: 18,
    height: 18,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  menuToggle: {
    display: "none",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 8,
    color: "var(--gray-700)",
  },
  mobileMenu: {
    display: "none",
    flexDirection: "column",
    padding: "12px 20px",
    borderTop: "1px solid var(--gray-200)",
    background: "white",
  },
  mobileLink: {
    padding: "12px 0",
    fontSize: 15,
    fontWeight: 500,
    color: "var(--gray-700)",
    borderBottom: "1px solid var(--gray-100)",
  },
};

const mediaStyle = document.createElement("style");
mediaStyle.textContent = `
  @media (max-width: 768px) {
    .desktop-menu { display: none !important; }
    button[style*="menu-toggle"] { display: flex !important; }
    div[style*="mobile-menu"] { display: flex !important; }
    form[style*="search-form"] input { width: 120px !important; }
  }
`;
document.head.appendChild(mediaStyle);
