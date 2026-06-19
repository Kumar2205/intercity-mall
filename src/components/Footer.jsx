import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.container}>
        <div style={styles.grid}>
          <div>
            <h3 style={styles.brand}>🛍️ IntercityMall</h3>
            <p style={styles.desc}>
              Your trusted online shopping destination. Quality products at the best prices.
            </p>
          </div>
          <div>
            <h4 style={styles.heading}>Quick Links</h4>
            <Link to="/shop" style={styles.link}>All Products</Link>
            <Link to="/orders" style={styles.link}>My Orders</Link>
            <Link to="/cart" style={styles.link}>Cart</Link>
          </div>
          <div>
            <h4 style={styles.heading}>Categories</h4>
            <Link to="/shop?category=Electronics" style={styles.link}>Electronics</Link>
            <Link to="/shop?category=Fashion" style={styles.link}>Fashion</Link>
            <Link to="/shop?category=Home & Lifestyle" style={styles.link}>Home & Lifestyle</Link>
          </div>
          <div>
            <h4 style={styles.heading}>Contact</h4>
            <p style={styles.text}>📧 support@intercitymall.com</p>
            <p style={styles.text}>📞 +91 98765 43210</p>
          </div>
        </div>
        <div style={styles.bottom}>
          <p>© 2026 IntercityMall. Built with ❤️ by Aman Kumar</p>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: "var(--dark)",
    color: "white",
    marginTop: "auto",
  },
  container: { padding: "40px 20px 20px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 32,
    marginBottom: 32,
  },
  brand: { fontSize: 22, fontWeight: 800, marginBottom: 8 },
  desc: { color: "var(--gray-400)", fontSize: 14, lineHeight: 1.6 },
  heading: { fontSize: 16, fontWeight: 600, marginBottom: 12, color: "var(--gray-200)" },
  link: {
    display: "block",
    color: "var(--gray-400)",
    fontSize: 14,
    marginBottom: 8,
    transition: "color 0.2s",
    cursor: "pointer",
  },
  text: { color: "var(--gray-400)", fontSize: 14, marginBottom: 8 },
  bottom: {
    borderTop: "1px solid var(--gray-700)",
    paddingTop: 20,
    textAlign: "center",
    color: "var(--gray-500)",
    fontSize: 13,
  },
};
