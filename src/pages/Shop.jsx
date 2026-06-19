import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FiStar, FiShoppingCart, FiFilter, FiX } from "react-icons/fi";

const API = "http://localhost:5000";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All");
  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useCart();

  const categoryFilter = searchParams.get("category") || "";
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    fetch(`${API}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  let filtered = [...products];

  if (categoryFilter) {
    filtered = filtered.filter((p) => p.category === categoryFilter);
    if (selectedCategory === "All") setSelectedCategory(categoryFilter);
  }

  if (searchQuery) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (selectedCategory !== "All" && !categoryFilter) {
    filtered = filtered.filter((p) => p.category === selectedCategory);
  }

  switch (sortBy) {
    case "price-low":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    if (cat === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner}></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="container" style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>
            {searchQuery
              ? `Results for "${searchQuery}"`
              : categoryFilter
              ? `${categoryFilter}`
              : "All Products"}
          </h1>
          <p style={styles.count}>{filtered.length} products found</p>
        </div>
        <div style={styles.headerActions}>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={styles.select}
          >
            <option value="default">Sort: Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
          <button
            style={styles.filterToggle}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter size={18} />
            Filters
          </button>
        </div>
      </div>

      <div style={styles.content}>
        <aside style={{ ...styles.sidebar, ...(showFilters ? styles.sidebarOpen : {}) }}>
          <div style={styles.sidebarHeader}>
            <h3>Categories</h3>
            {showFilters && (
              <button style={styles.closeBtn} onClick={() => setShowFilters(false)}>
                <FiX size={20} />
              </button>
            )}
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              style={{
                ...styles.categoryBtn,
                ...(selectedCategory === cat ? styles.categoryActive : {}),
              }}
            >
              {cat}
            </button>
          ))}
        </aside>

        <div style={styles.grid}>
          {filtered.map((product) => (
            <div key={product.id} style={styles.card}>
              {product.badge && (
                <span style={styles.badge}>{product.badge}</span>
              )}
              <Link to={`/product/${product.id}`}>
                <div style={styles.imageWrap}>
                  <img src={product.image} alt={product.name} style={styles.image} />
                </div>
              </Link>
              <div style={styles.cardBody}>
                <span style={styles.category}>{product.category}</span>
                <Link to={`/product/${product.id}`}>
                  <h3 style={styles.productName}>{product.name}</h3>
                </Link>
                <div style={styles.ratingRow}>
                  <div style={styles.stars}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <FiStar
                        key={i}
                        size={14}
                        fill={i <= Math.floor(product.rating) ? "var(--secondary)" : "none"}
                        color={i <= Math.floor(product.rating) ? "var(--secondary)" : "var(--gray-300)"}
                      />
                    ))}
                  </div>
                  <span style={styles.reviewCount}>({product.reviewsCount})</span>
                </div>
                <div style={styles.priceRow}>
                  <span style={styles.price}>₹{product.price}</span>
                  <span style={styles.originalPrice}>₹{product.originalPrice}</span>
                  <span style={styles.discount}>
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                </div>
                <button
                  style={styles.addBtn}
                  onClick={() => addToCart(product)}
                >
                  <FiShoppingCart size={16} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { padding: "24px 20px 48px" },
  loading: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 400,
    gap: 16,
    color: "var(--gray-500)",
  },
  spinner: {
    width: 40,
    height: 40,
    border: "3px solid var(--gray-200)",
    borderTopColor: "var(--primary)",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
    flexWrap: "wrap",
    gap: 16,
  },
  title: { fontSize: 28, fontWeight: 700 },
  count: { color: "var(--gray-500)", fontSize: 14, marginTop: 4 },
  headerActions: { display: "flex", gap: 12, alignItems: "center" },
  select: {
    padding: "8px 12px",
    borderRadius: 8,
    border: "1px solid var(--gray-300)",
    fontSize: 14,
    background: "white",
    cursor: "pointer",
  },
  filterToggle: {
    display: "none",
    padding: "8px 16px",
    borderRadius: 8,
    border: "1px solid var(--gray-300)",
    background: "white",
    fontSize: 14,
    cursor: "pointer",
    alignItems: "center",
    gap: 8,
  },
  content: { display: "flex", gap: 24 },
  sidebar: {
    width: 220,
    flexShrink: 0,
    background: "white",
    borderRadius: "var(--radius)",
    padding: 20,
    height: "fit-content",
    boxShadow: "var(--shadow)",
  },
  sidebarHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  closeBtn: { background: "none", border: "none", cursor: "pointer", color: "var(--gray-500)" },
  categoryBtn: {
    display: "block",
    width: "100%",
    padding: "10px 12px",
    marginBottom: 4,
    borderRadius: 8,
    border: "none",
    background: "transparent",
    textAlign: "left",
    fontSize: 14,
    cursor: "pointer",
    color: "var(--gray-600)",
    transition: "all 0.2s",
  },
  categoryActive: {
    background: "var(--primary)",
    color: "white",
    fontWeight: 600,
  },
  grid: {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: 20,
  },
  card: {
    background: "white",
    borderRadius: "var(--radius)",
    overflow: "hidden",
    boxShadow: "var(--shadow)",
    transition: "all 0.3s",
    position: "relative",
    border: "1px solid var(--gray-100)",
  },
  badge: {
    position: "absolute",
    top: 12,
    left: 12,
    background: "var(--primary)",
    color: "white",
    padding: "4px 10px",
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 600,
    zIndex: 1,
  },
  imageWrap: {
    height: 200,
    overflow: "hidden",
    background: "var(--gray-100)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s",
  },
  cardBody: { padding: 16 },
  category: { fontSize: 12, color: "var(--primary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 },
  productName: { fontSize: 15, fontWeight: 600, marginTop: 4, lineHeight: 1.3 },
  ratingRow: { display: "flex", alignItems: "center", gap: 6, marginTop: 8 },
  stars: { display: "flex", gap: 2 },
  reviewCount: { fontSize: 12, color: "var(--gray-500)" },
  priceRow: { display: "flex", alignItems: "center", gap: 8, marginTop: 8 },
  price: { fontSize: 18, fontWeight: 700, color: "var(--primary)" },
  originalPrice: { fontSize: 14, color: "var(--gray-400)", textDecoration: "line-through" },
  discount: { fontSize: 12, color: "var(--accent)", fontWeight: 600 },
  addBtn: {
    width: "100%",
    marginTop: 12,
    padding: "10px",
    borderRadius: 8,
    border: "none",
    background: "var(--primary)",
    color: "white",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    transition: "all 0.2s",
  },
};

const mediaStyle = document.createElement("style");
mediaStyle.textContent = `
  @media (max-width: 768px) {
    .filter-toggle { display: flex !important; }
    .sidebar { display: none; position: fixed; top: 0; left: 0; width: 280px; height: 100vh; z-index: 1001; border-radius: 0; box-shadow: var(--shadow-xl) !important; overflow-y: auto; }
    .sidebar.open { display: block; }
    .grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)) !important; }
  }
  @keyframes spin { to { transform: rotate(360deg); } }
`;
document.head.appendChild(mediaStyle);
