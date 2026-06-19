import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiPackage, FiChevronRight } from "react-icons/fi";

const API = "http://localhost:5000";

const statusColors = {
  Pending: { bg: "#fef3c7", color: "#92400e" },
  Processing: { bg: "#dbeafe", color: "#1e40af" },
  Shipped: { bg: "#e0e7ff", color: "#3730a3" },
  Delivered: { bg: "#dcfce7", color: "#166534" },
  Cancelled: { bg: "#fee2e2", color: "#991b1b" },
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/orders`)
      .then((r) => r.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container" style={{ padding: 40, textAlign: "center", color: "var(--gray-500)" }}>
        Loading orders...
      </div>
    );
  }

  return (
    <div className="container" style={styles.page}>
      <h1 style={styles.title}>My Orders ({orders.length})</h1>
      {orders.length === 0 ? (
        <div style={styles.empty}>
          <FiPackage size={48} style={{ color: "var(--gray-300)" }} />
          <h3 style={{ marginTop: 16 }}>No orders yet</h3>
          <p style={{ color: "var(--gray-500)", marginTop: 8 }}>Start shopping to see your orders here.</p>
          <Link to="/shop" className="btn btn-primary" style={{ marginTop: 16 }}>Browse Products</Link>
        </div>
      ) : (
        <div style={styles.list}>
          {orders.map((order) => (
            <div key={order.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <div>
                  <span style={styles.orderId}>{order.id}</span>
                  <span style={styles.orderDate}>{order.date}</span>
                </div>
                <span
                  style={{
                    ...styles.status,
                    ...(statusColors[order.status] || statusColors.Pending),
                  }}
                >
                  {order.status}
                </span>
              </div>
              <div style={styles.items}>
                {order.items.map((item, i) => (
                  <div key={i} style={styles.item}>
                    <span style={styles.itemName}>{item.name}</span>
                    <span style={styles.itemQty}>×{item.quantity}</span>
                    <span style={styles.itemPrice}>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div style={styles.cardFooter}>
                <span style={styles.total}>Total: <strong>₹{order.total}</strong></span>
                <span style={styles.address}>📦 {order.address}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: { padding: "32px 20px 48px" },
  title: { fontSize: 24, fontWeight: 700, marginBottom: 24 },
  empty: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 300 },
  list: { display: "flex", flexDirection: "column", gap: 16 },
  card: { background: "white", borderRadius: "var(--radius)", boxShadow: "var(--shadow)", overflow: "hidden", border: "1px solid var(--gray-100)" },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid var(--gray-100)" },
  orderId: { fontWeight: 700, fontSize: 15 },
  orderDate: { display: "block", fontSize: 12, color: "var(--gray-500)", marginTop: 2 },
  status: { padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600 },
  items: { padding: "12px 20px" },
  item: { display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 14, color: "var(--gray-600)" },
  itemName: { flex: 1 },
  itemQty: { marginRight: 24, color: "var(--gray-400)" },
  itemPrice: { fontWeight: 600, minWidth: 60, textAlign: "right" },
  cardFooter: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", borderTop: "1px solid var(--gray-100)", background: "var(--gray-50)" },
  total: { fontSize: 14 },
  address: { fontSize: 12, color: "var(--gray-500)" },
};
