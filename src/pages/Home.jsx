import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FiStar, FiShoppingCart, FiChevronRight, FiTruck, FiShield, FiRefreshCw, FiHeadphones } from "react-icons/fi";

const API = "http://localhost:5000";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const scrollRef = useRef(null);

  useEffect(() => {
    fetch(`${API}/products`)
      .then((r) => r.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const featured = products.filter((p) => p.featured);
  const bestsellers = [...products].sort((a, b) => b.reviewsCount - a.reviewsCount).slice(0, 4);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 300, behavior: "smooth" });
    }
  };

  return (
    <div>
      <section style={styles.hero}>
        <div className="container" style={styles.heroContent}>
          <div style={styles.heroText}>
            <span style={styles.heroBadge}>🔥 New Arrivals</span>
            <h1 style={styles.heroTitle}>
              Shop Smarter,<br />
              <span style={{ color: "var(--primary)" }}>Live Better</span>
            </h1>
            <p style={styles.heroDesc}>
              Discover amazing deals on electronics, fashion, and lifestyle products.
              Quality guaranteed with free delivery on orders above ₹500!
            </p>
            <div style={styles.heroBtns}>
              <Link to="/shop" className="btn btn-primary" style={{ padding: "14px 32px", fontSize: 16 }}>
                Shop Now <FiChevronRight size={18} />
              </Link>
              <Link to="/shop?category=Electronics" className="btn btn-outline" style={{ padding: "14px 32px", fontSize: 16 }}>
                Electronics
              </Link>
            </div>
            <div style={styles.stats}>
              <div><strong>10K+</strong><span>Products</span></div>
              <div><strong>5K+</strong><span>Happy Customers</span></div>
              <div><strong>4.8★</strong><span>Avg Rating</span></div>
            </div>
          </div>
          <div style={styles.heroImage}>
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500"
              alt="Shopping"
              style={styles.heroImg}
            />
          </div>
        </div>
      </section>

      <section className="container" style={styles.features}>
        {[
          { icon: FiTruck, title: "Free Delivery", desc: "On orders above ₹500" },
          { icon: FiShield, title: "Secure Payment", desc: "100% secure transactions" },
          { icon: FiRefreshCw, title: "Easy Returns", desc: "7-day return policy" },
          { icon: FiHeadphones, title: "24/7 Support", desc: "Dedicated customer service" },
        ].map((f, i) => (
          <div key={i} style={styles.featureCard}>
            <f.icon size={24} color="var(--primary)" />
            <h4 style={styles.featureTitle}>{f.title}</h4>
            <p style={styles.featureDesc}>{f.desc}</p>
          </div>
        ))}
      </section>

      {!loading && (
        <>
          <section className="container" style={styles.section}>
            <div style={styles.sectionHeader}>
              <div>
                <h2 style={styles.sectionTitle}>Featured Products</h2>
                <p style={styles.sectionSub}>Handpicked just for you</p>
              </div>
              <Link to="/shop" style={styles.viewAll}>View All →</Link>
            </div>
            <div style={styles.carouselWrap}>
              <button style={{ ...styles.scrollBtn, left: 0 }} onClick={() => scroll(-1)}>‹</button>
              <div style={styles.carousel} ref={scrollRef}>
                {featured.map((product) => (
                  <div key={product.id} style={styles.featuredCard}>
                    {product.badge && <span style={styles.badge}>{product.badge}</span>}
                    <Link to={`/product/${product.id}`}>
                      <img src={product.image} alt={product.name} style={styles.featuredImg} />
                    </Link>
                    <div style={styles.featuredBody}>
                      <Link to={`/product/${product.id}`} style={styles.featuredName}>{product.name}</Link>
                      <div style={styles.ratingRow}>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <FiStar key={i} size={12} fill={i <= Math.floor(product.rating) ? "var(--secondary)" : "none"}
                            color={i <= Math.floor(product.rating) ? "var(--secondary)" : "var(--gray-300)"} />
                        ))}
                        <span style={{ fontSize: 12, color: "var(--gray-500)" }}>({product.reviewsCount})</span>
                      </div>
                      <div style={styles.priceRow}>
                        <span style={styles.price}>₹{product.price}</span>
                        <span style={styles.originalPrice}>₹{product.originalPrice}</span>
                      </div>
                      <button style={styles.addBtn} onClick={() => addToCart(product)}>
                        <FiShoppingCart size={14} /> Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button style={{ ...styles.scrollBtn, right: 0 }} onClick={() => scroll(1)}>›</button>
            </div>
          </section>

          <section className="container" style={styles.section}>
            <div style={styles.sectionHeader}>
              <div>
                <h2 style={styles.sectionTitle}>Bestsellers</h2>
                <p style={styles.sectionSub}>Most loved products this month</p>
              </div>
              <Link to="/shop?sort=rating" style={styles.viewAll}>View All →</Link>
            </div>
            <div style={styles.grid}>
              {bestsellers.map((product) => (
                <div key={product.id} style={styles.card}>
                  <Link to={`/product/${product.id}`}>
                    <img src={product.image} alt={product.name} style={styles.cardImg} />
                  </Link>
                  <div style={styles.cardBody}>
                    <Link to={`/product/${product.id}`} style={styles.cardName}>{product.name}</Link>
                    <div style={styles.priceRow}>
                      <span style={styles.price}>₹{product.price}</span>
                      <span style={styles.originalPrice}>₹{product.originalPrice}</span>
                    </div>
                    <button style={styles.addBtn} onClick={() => addToCart(product)}>
                      <FiShoppingCart size={14} /> Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section style={styles.cta}>
            <div className="container" style={styles.ctaContent}>
              <h2 style={styles.ctaTitle}>Ready to start shopping?</h2>
              <p style={styles.ctaDesc}>Join thousands of happy customers. Quality products at unbeatable prices.</p>
              <Link to="/shop" className="btn btn-primary" style={{ padding: "14px 40px", fontSize: 16 }}>
                Browse All Products <FiChevronRight size={18} />
              </Link>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

const styles = {
  hero: {
    background: "linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #dbeafe 100%)",
    padding: "60px 0",
  },
  heroContent: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" },
  heroText: { display: "flex", flexDirection: "column", gap: 16 },
  heroBadge: {
    display: "inline-block", padding: "6px 16px", borderRadius: 20,
    background: "var(--primary)", color: "white", fontSize: 13, fontWeight: 600,
    width: "fit-content",
  },
  heroTitle: { fontSize: 44, fontWeight: 800, lineHeight: 1.1 },
  heroDesc: { fontSize: 16, color: "var(--gray-600)", lineHeight: 1.7, maxWidth: 480 },
  heroBtns: { display: "flex", gap: 12, flexWrap: "wrap" },
  stats: { display: "flex", gap: 32, marginTop: 8 },
  stats: { display: "flex", gap: 24, marginTop: 8 },
  heroImage: { display: "flex", justifyContent: "center", alignItems: "center" },
  heroImg: { width: "100%", maxWidth: 450, borderRadius: "var(--radius)", boxShadow: "var(--shadow-xl)" },
  features: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, padding: "40px 20px" },
  featureCard: { textAlign: "center", padding: 24, background: "white", borderRadius: "var(--radius)", boxShadow: "var(--shadow)" },
  featureTitle: { fontSize: 15, fontWeight: 600, marginTop: 8 },
  featureDesc: { fontSize: 13, color: "var(--gray-500)", marginTop: 4 },
  section: { padding: "40px 20px" },
  sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 },
  sectionTitle: { fontSize: 24, fontWeight: 700 },
  sectionSub: { fontSize: 14, color: "var(--gray-500)", marginTop: 4 },
  viewAll: { color: "var(--primary)", fontWeight: 600, fontSize: 14 },
  carouselWrap: { position: "relative" },
  carousel: { display: "flex", gap: 20, overflowX: "auto", scrollSnapType: "x mandatory", padding: "4px 0" },
  scrollBtn: {
    position: "absolute", top: "50%", transform: "translateY(-50%)", zIndex: 2,
    width: 36, height: 36, borderRadius: "50%", border: "none",
    background: "white", boxShadow: "var(--shadow-lg)", cursor: "pointer",
    fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center",
    color: "var(--gray-700)",
  },
  featuredCard: {
    minWidth: 240, background: "white", borderRadius: "var(--radius)",
    overflow: "hidden", boxShadow: "var(--shadow)", position: "relative",
    border: "1px solid var(--gray-100)",
  },
  badge: { position: "absolute", top: 8, left: 8, background: "var(--primary)", color: "white", padding: "2px 8px", borderRadius: 12, fontSize: 10, fontWeight: 600, zIndex: 1 },
  featuredImg: { width: "100%", height: 180, objectFit: "cover" },
  featuredBody: { padding: 12 },
  featuredName: { fontSize: 14, fontWeight: 600, display: "block", marginBottom: 4 },
  ratingRow: { display: "flex", alignItems: "center", gap: 4, marginBottom: 6 },
  priceRow: { display: "flex", alignItems: "center", gap: 6 },
  price: { fontSize: 16, fontWeight: 700, color: "var(--primary)" },
  originalPrice: { fontSize: 12, color: "var(--gray-400)", textDecoration: "line-through" },
  addBtn: {
    width: "100%", marginTop: 8, padding: "6px", borderRadius: 6,
    border: "none", background: "var(--primary)", color: "white",
    fontSize: 13, fontWeight: 600, cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
  },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 },
  card: { background: "white", borderRadius: "var(--radius)", overflow: "hidden", boxShadow: "var(--shadow)", border: "1px solid var(--gray-100)" },
  cardImg: { width: "100%", height: 200, objectFit: "cover" },
  cardBody: { padding: 16 },
  cardName: { fontSize: 15, fontWeight: 600, display: "block", marginBottom: 8 },
  cta: { background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)", padding: "60px 0", marginTop: 40, textAlign: "center" },
  ctaContent: { display: "flex", flexDirection: "column", alignItems: "center", gap: 12 },
  ctaTitle: { color: "white", fontSize: 32, fontWeight: 700 },
  ctaDesc: { color: "rgba(255,255,255,0.8)", fontSize: 16, maxWidth: 500 },
};

const mediaStyle = document.createElement("style");
mediaStyle.textContent = `
  @media (max-width: 768px) {
    .hero-content { grid-template-columns: 1fr !important; }
    .hero-title { font-size: 32px !important; }
    .features { grid-template-columns: repeat(2, 1fr) !important; }
  }
  .carousel::-webkit-scrollbar { display: none; }
`;
document.head.appendChild(mediaStyle);
