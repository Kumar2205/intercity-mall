import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FiStar, FiShoppingCart, FiCheck, FiTruck, FiShield, FiRefreshCw } from "react-icons/fi";

const API = "http://localhost:5000";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    Promise.all([
      fetch(`${API}/products/${id}`).then((r) => r.json()),
      fetch(`${API}/reviews?productId=${id}`).then((r) => r.json()),
    ]).then(([prod, revs]) => {
      setProduct(prod);
      setReviews(revs);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner}></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container" style={styles.notFound}>
        <h2>Product not found</h2>
        <Link to="/shop" className="btn btn-primary">Back to Shop</Link>
      </div>
    );
  }

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="container" style={styles.page}>
      <Link to="/shop" style={styles.back}>← Back to Shop</Link>
      <div style={styles.main}>
        <div style={styles.imageSection}>
          <img src={product.image} alt={product.name} style={styles.image} />
        </div>
        <div style={styles.info}>
          <span style={styles.category}>{product.category}</span>
          <h1 style={styles.name}>{product.name}</h1>
          <div style={styles.ratingRow}>
            <div style={styles.stars}>
              {[1, 2, 3, 4, 5].map((i) => (
                <FiStar
                  key={i}
                  size={18}
                  fill={i <= Math.floor(product.rating) ? "var(--secondary)" : "none"}
                  color={i <= Math.floor(product.rating) ? "var(--secondary)" : "var(--gray-300)"}
                />
              ))}
            </div>
            <span style={styles.ratingText}>
              {product.rating} ({product.reviewsCount} reviews)
            </span>
          </div>
          <div style={styles.priceRow}>
            <span style={styles.price}>₹{product.price}</span>
            <span style={styles.originalPrice}>₹{product.originalPrice}</span>
            <span style={styles.discount}>
              {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
            </span>
          </div>
          <p style={styles.description}>{product.description}</p>
          <button
            style={{
              ...styles.addBtn,
              ...(added ? styles.addedBtn : {}),
            }}
            onClick={handleAdd}
          >
            {added ? (
              <><FiCheck size={18} /> Added to Cart!</>
            ) : (
              <><FiShoppingCart size={18} /> Add to Cart</>
            )}
          </button>
          <div style={styles.features}>
            <div style={styles.feature}><FiTruck size={18} /><span>Free Delivery</span></div>
            <div style={styles.feature}><FiShield size={18} /><span>1 Year Warranty</span></div>
            <div style={styles.feature}><FiRefreshCw size={18} /><span>7-Day Returns</span></div>
          </div>
        </div>
      </div>

      <div style={styles.reviewsSection}>
        <h2 style={styles.reviewsTitle}>Customer Reviews ({reviews.length})</h2>
        {reviews.map((review) => (
          <div key={review.id} style={styles.reviewCard}>
            <div style={styles.reviewHeader}>
              <strong>{review.user}</strong>
              <div style={styles.reviewStars}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <FiStar
                    key={i}
                    size={12}
                    fill={i <= review.rating ? "var(--secondary)" : "none"}
                    color={i <= review.rating ? "var(--secondary)" : "var(--gray-300)"}
                  />
                ))}
              </div>
            </div>
            <p style={styles.reviewComment}>{review.comment}</p>
            <span style={styles.reviewDate}>{review.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: { padding: "24px 20px 48px" },
  loading: { display: "flex", justifyContent: "center", alignItems: "center", minHeight: 400 },
  spinner: {
    width: 40,
    height: 40,
    border: "3px solid var(--gray-200)",
    borderTopColor: "var(--primary)",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  notFound: { textAlign: "center", padding: 80, display: "flex", flexDirection: "column", gap: 16, alignItems: "center" },
  back: { display: "inline-block", color: "var(--primary)", fontSize: 14, fontWeight: 500, marginBottom: 20 },
  main: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 40,
    marginBottom: 48,
  },
  imageSection: {
    background: "white",
    borderRadius: "var(--radius)",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "var(--shadow)",
    minHeight: 400,
  },
  image: { width: "100%", maxHeight: 400, objectFit: "cover" },
  info: { display: "flex", flexDirection: "column", gap: 12 },
  category: { fontSize: 13, color: "var(--primary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 },
  name: { fontSize: 28, fontWeight: 700, lineHeight: 1.2 },
  ratingRow: { display: "flex", alignItems: "center", gap: 8 },
  stars: { display: "flex", gap: 2 },
  ratingText: { fontSize: 14, color: "var(--gray-500)" },
  priceRow: { display: "flex", alignItems: "center", gap: 12, marginTop: 4 },
  price: { fontSize: 28, fontWeight: 700, color: "var(--primary)" },
  originalPrice: { fontSize: 18, color: "var(--gray-400)", textDecoration: "line-through" },
  discount: { fontSize: 14, color: "var(--accent)", fontWeight: 600, padding: "4px 8px", background: "#dcfce7", borderRadius: 6 },
  description: { fontSize: 15, color: "var(--gray-600)", lineHeight: 1.7, marginTop: 8 },
  addBtn: {
    padding: "14px 32px",
    borderRadius: 8,
    border: "none",
    background: "var(--primary)",
    color: "white",
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    transition: "all 0.2s",
    width: "fit-content",
  },
  addedBtn: { background: "var(--accent)" },
  features: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 12, padding: 16, background: "var(--gray-50)", borderRadius: "var(--radius)" },
  feature: { display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 500, color: "var(--gray-600)" },
  reviewsSection: { borderTop: "1px solid var(--gray-200)", paddingTop: 32 },
  reviewsTitle: { fontSize: 22, fontWeight: 700, marginBottom: 20 },
  reviewCard: { padding: "20px 0", borderBottom: "1px solid var(--gray-100)" },
  reviewHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  reviewStars: { display: "flex", gap: 2 },
  reviewComment: { fontSize: 14, color: "var(--gray-600)", lineHeight: 1.6 },
  reviewDate: { fontSize: 12, color: "var(--gray-400)", marginTop: 8, display: "block" },
};

const mediaStyle = document.createElement("style");
mediaStyle.textContent = `
  @media (max-width: 768px) {
    .main { grid-template-columns: 1fr !important; }
  }
  @keyframes spin { to { transform: rotate(360deg); } }
`;
document.head.appendChild(mediaStyle);
