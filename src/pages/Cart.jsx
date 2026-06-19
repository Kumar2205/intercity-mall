import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowLeft } from "react-icons/fi";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container" style={styles.emptyState}>
        <FiShoppingBag size={64} style={{ color: "var(--gray-300)" }} />
        <h2 style={styles.emptyTitle}>Your cart is empty</h2>
        <p style={styles.emptyText}>Looks like you haven't added anything yet.</p>
        <Link to="/shop" className="btn btn-primary" style={{ marginTop: 8 }}>
          <FiArrowLeft size={16} /> Continue Shopping
        </Link>
      </div>
    );
  }

  const deliveryFee = cartTotal > 500 ? 0 : 99;
  const grandTotal = cartTotal + deliveryFee;

  return (
    <div className="container" style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Shopping Cart ({cart.length} items)</h1>
        <button style={styles.clearBtn} onClick={clearCart}>
          <FiTrash2 size={14} /> Clear All
        </button>
      </div>

      <div style={styles.content}>
        <div style={styles.items}>
          {cart.map((item) => (
            <div key={item.id} style={styles.card}>
              <Link to={`/product/${item.id}`}>
                <img src={item.image} alt={item.name} style={styles.image} />
              </Link>
              <div style={styles.info}>
                <Link to={`/product/${item.id}`} style={styles.name}>{item.name}</Link>
                <span style={styles.category}>{item.category}</span>
                <span style={styles.itemPrice}>₹{item.price}</span>
              </div>
              <div style={styles.quantity}>
                <button
                  style={styles.qtyBtn}
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <FiMinus size={14} />
                </button>
                <span style={styles.qtyValue}>{item.quantity}</span>
                <button
                  style={styles.qtyBtn}
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <FiPlus size={14} />
                </button>
              </div>
              <div style={styles.subtotal}>
                <span style={styles.subtotalLabel}>Subtotal</span>
                <span style={styles.subtotalValue}>₹{item.price * item.quantity}</span>
              </div>
              <button style={styles.removeBtn} onClick={() => removeFromCart(item.id)}>
                <FiTrash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <div style={styles.summary}>
          <h2 style={styles.summaryTitle}>Order Summary</h2>
          <div style={styles.row}>
            <span>Subtotal</span>
            <span>₹{cartTotal}</span>
          </div>
          <div style={styles.row}>
            <span>Delivery</span>
            <span style={deliveryFee === 0 ? { color: "var(--accent)", fontWeight: 600 } : {}}>
              {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
            </span>
          </div>
          {cartTotal > 0 && cartTotal < 500 && (
            <p style={styles.freeDeliveryNote}>
              Add ₹{500 - cartTotal} more for FREE delivery!
            </p>
          )}
          <div style={{ ...styles.row, ...styles.totalRow }}>
            <span>Total</span>
            <span style={styles.totalValue}>₹{grandTotal}</span>
          </div>
          <Link
            to="/checkout"
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center", padding: "14px", fontSize: 16 }}
          >
            Proceed to Checkout
          </Link>
          <Link to="/shop" style={styles.continue}>Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { padding: "32px 20px 48px" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 },
  title: { fontSize: 24, fontWeight: 700 },
  clearBtn: {
    display: "flex", alignItems: "center", gap: 6, padding: "8px 16px",
    background: "none", border: "1px solid var(--danger)", borderRadius: 8,
    color: "var(--danger)", fontSize: 13, cursor: "pointer", fontWeight: 500,
  },
  content: { display: "grid", gridTemplateColumns: "1fr 360px", gap: 32, alignItems: "start" },
  items: { display: "flex", flexDirection: "column", gap: 16 },
  card: {
    display: "flex", alignItems: "center", gap: 16, padding: 16,
    background: "white", borderRadius: "var(--radius)", boxShadow: "var(--shadow)",
    position: "relative",
  },
  image: { width: 80, height: 80, borderRadius: 8, objectFit: "cover", flexShrink: 0 },
  info: { flex: 1, display: "flex", flexDirection: "column", gap: 4 },
  name: { fontSize: 15, fontWeight: 600, color: "var(--gray-800)" },
  category: { fontSize: 12, color: "var(--primary)", fontWeight: 600 },
  itemPrice: { fontSize: 16, fontWeight: 700, color: "var(--primary)" },
  quantity: { display: "flex", alignItems: "center", gap: 8 },
  qtyBtn: {
    width: 32, height: 32, borderRadius: 8, border: "1px solid var(--gray-200)",
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "white", cursor: "pointer", color: "var(--gray-600)",
  },
  qtyValue: { width: 32, textAlign: "center", fontWeight: 600, fontSize: 15 },
  subtotal: { textAlign: "right", minWidth: 80 },
  subtotalLabel: { display: "block", fontSize: 11, color: "var(--gray-400)" },
  subtotalValue: { fontSize: 16, fontWeight: 700 },
  removeBtn: {
    background: "none", border: "none", cursor: "pointer",
    color: "var(--gray-400)", padding: 8,
    position: "absolute", top: 8, right: 8,
  },
  summary: {
    background: "white", borderRadius: "var(--radius)", boxShadow: "var(--shadow)",
    padding: 24, position: "sticky", top: 88,
  },
  summaryTitle: { fontSize: 18, fontWeight: 700, marginBottom: 16 },
  row: { display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 14, color: "var(--gray-600)" },
  totalRow: { borderTop: "1px solid var(--gray-200)", paddingTop: 12, marginTop: 12 },
  totalValue: { fontSize: 20, fontWeight: 700, color: "var(--gray-900)" },
  freeDeliveryNote: { fontSize: 12, color: "var(--accent)", marginTop: -8, marginBottom: 12 },
  continue: { display: "block", textAlign: "center", marginTop: 12, fontSize: 13, color: "var(--primary)" },
  emptyState: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 400, textAlign: "center" },
  emptyTitle: { fontSize: 22, marginTop: 16 },
  emptyText: { color: "var(--gray-500)", marginTop: 8 },
};

const mediaStyle = document.createElement("style");
mediaStyle.textContent = `@media (max-width: 768px) { .content { grid-template-columns: 1fr !important; } }`;
document.head.appendChild(mediaStyle);
