import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FiCheck, FiCreditCard, FiMapPin, FiUser } from "react-icons/fi";

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "Aman Kumar",
    email: "aman@example.com",
    phone: "9876543210",
    address: "123 Main Street",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110001",
  });
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);

  const deliveryFee = cartTotal > 500 ? 0 : 99;
  const grandTotal = cartTotal + deliveryFee;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      const orderNo = "ORD-" + Date.now().toString().slice(-6);
      setPlacing(false);
      setPlaced(true);
      clearCart();
    }, 1500);
  };

  if (cart.length === 0 && !placed) {
    navigate("/cart");
    return null;
  }

  if (placed) {
    return (
      <div className="container" style={styles.success}>
        <div style={styles.successIcon}><FiCheck size={40} /></div>
        <h1 style={styles.successTitle}>Order Placed Successfully! 🎉</h1>
        <p style={styles.successText}>Your order has been confirmed. You'll receive a confirmation email shortly.</p>
        <button className="btn btn-primary" onClick={() => navigate("/orders")} style={{ padding: "14px 32px", fontSize: 16 }}>
          View My Orders
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={styles.page}>
      <h1 style={styles.title}>Checkout</h1>

      <div style={styles.steps}>
        <div style={{ ...styles.step, ...(step >= 1 ? styles.stepActive : {}) }}>
          <FiMapPin size={18} /> <span>Shipping</span>
        </div>
        <div style={styles.stepLine} />
        <div style={{ ...styles.step, ...(step >= 2 ? styles.stepActive : {}) }}>
          <FiCreditCard size={18} /> <span>Payment</span>
        </div>
      </div>

      {step === 1 && (
        <div style={styles.form}>
          <h2 style={styles.formTitle}>Shipping Address</h2>
          <div style={styles.formGrid}>
            <div style={styles.field}>
              <label style={styles.label}>Full Name</label>
              <input name="name" value={form.name} onChange={handleChange} style={styles.input} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Email</label>
              <input name="email" value={form.email} onChange={handleChange} style={styles.input} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} style={styles.input} />
            </div>
            <div style={{ ...styles.field, gridColumn: "1 / -1" }}>
              <label style={styles.label}>Address</label>
              <input name="address" value={form.address} onChange={handleChange} style={styles.input} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>City</label>
              <input name="city" value={form.city} onChange={handleChange} style={styles.input} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>State</label>
              <input name="state" value={form.state} onChange={handleChange} style={styles.input} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Pincode</label>
              <input name="pincode" value={form.pincode} onChange={handleChange} style={styles.input} />
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => setStep(2)} style={{ marginTop: 16, padding: "12px 32px" }}>
            Continue to Payment
          </button>
        </div>
      )}

      {step === 2 && (
        <div style={styles.payment}>
          <div style={styles.orderSummary}>
            <h3 style={styles.summaryTitle}>Order Summary</h3>
            {cart.map((item) => (
              <div key={item.id} style={styles.summaryRow}>
                <span>{item.name} × {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
            <div style={{ ...styles.summaryRow, borderTop: "1px solid var(--gray-200)", paddingTop: 8, marginTop: 8 }}>
              <span>Subtotal</span>
              <span>₹{cartTotal}</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Delivery</span>
              <span style={deliveryFee === 0 ? { color: "var(--accent)" } : {}}>
                {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
              </span>
            </div>
            <div style={{ ...styles.summaryRow, fontWeight: 700, fontSize: 18 }}>
              <span>Total</span>
              <span>₹{grandTotal}</span>
            </div>
          </div>

          <div style={styles.paymentMethod}>
            <h3 style={styles.summaryTitle}>Payment Method</h3>
            <div style={styles.paymentOption}>
              <input type="radio" checked readOnly />
              <span>Cash on Delivery (COD)</span>
            </div>
            <p style={styles.paymentNote}>Pay when you receive your order. No online payment needed.</p>
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            <button className="btn btn-secondary" onClick={() => setStep(1)} style={{ padding: "12px 24px" }}>
              Back
            </button>
            <button className="btn btn-primary" onClick={placeOrder} disabled={placing}
              style={{ padding: "12px 32px", opacity: placing ? 0.7 : 1 }}>
              {placing ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: { padding: "32px 20px 48px", maxWidth: 720, margin: "0 auto" },
  title: { fontSize: 28, fontWeight: 700, marginBottom: 24 },
  steps: { display: "flex", alignItems: "center", gap: 16, marginBottom: 32 },
  step: { display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 8, fontSize: 14, fontWeight: 500, color: "var(--gray-400)", background: "var(--gray-100)" },
  stepActive: { background: "var(--primary)", color: "white" },
  stepLine: { flex: 1, height: 2, background: "var(--gray-200)" },
  form: { background: "white", borderRadius: "var(--radius)", padding: 24, boxShadow: "var(--shadow)" },
  formTitle: { fontSize: 18, fontWeight: 600, marginBottom: 16 },
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  field: { display: "flex", flexDirection: "column", gap: 4 },
  label: { fontSize: 13, fontWeight: 500, color: "var(--gray-600)" },
  input: { padding: "10px 12px", borderRadius: 8, border: "1px solid var(--gray-300)", fontSize: 14, outline: "none" },
  payment: { background: "white", borderRadius: "var(--radius)", padding: 24, boxShadow: "var(--shadow)" },
  orderSummary: { marginBottom: 24 },
  summaryTitle: { fontSize: 16, fontWeight: 600, marginBottom: 12 },
  summaryRow: { display: "flex", justifyContent: "space-between", fontSize: 14, color: "var(--gray-600)", marginBottom: 6 },
  paymentMethod: { marginBottom: 16 },
  paymentOption: { display: "flex", alignItems: "center", gap: 8, padding: 12, border: "1px solid var(--gray-200)", borderRadius: 8, marginBottom: 8 },
  paymentNote: { fontSize: 13, color: "var(--gray-500)", marginLeft: 24 },
  success: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 400, textAlign: "center", gap: 12 },
  successIcon: { width: 80, height: 80, borderRadius: "50%", background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)" },
  successTitle: { fontSize: 28, fontWeight: 700 },
  successText: { color: "var(--gray-500)", maxWidth: 400 },
};
