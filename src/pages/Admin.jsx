import { useState, useEffect } from "react";
import { FiUsers, FiShoppingBag, FiPackage, FiDollarSign, FiTrendingUp } from "react-icons/fi";

const API = "http://localhost:5000";

export default function Admin() {
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 0, revenue: 0 });
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    Promise.all([
      fetch(`${API}/products`).then((r) => r.json()),
      fetch(`${API}/orders`).then((r) => r.json()),
      fetch(`${API}/users`).then((r) => r.json()),
    ]).then(([prods, ords, users]) => {
      setProducts(prods);
      setOrders(ords);
      const revenue = ords.reduce((s, o) => s + o.total, 0);
      setStats({
        products: prods.length,
        orders: ords.length,
        users: users.length,
        revenue,
      });
    });
  }, []);

  return (
    <div className="container" style={styles.page}>
      <h1 style={styles.title}>Admin Dashboard</h1>

      <div style={styles.statsGrid}>
        <div style={{ ...styles.statCard, borderTopColor: "var(--primary)" }}>
          <FiShoppingBag size={24} color="var(--primary)" />
          <div>
            <span style={styles.statValue}>{stats.products}</span>
            <span style={styles.statLabel}>Products</span>
          </div>
        </div>
        <div style={{ ...styles.statCard, borderTopColor: "var(--secondary)" }}>
          <FiPackage size={24} color="var(--secondary)" />
          <div>
            <span style={styles.statValue}>{stats.orders}</span>
            <span style={styles.statLabel}>Orders</span>
          </div>
        </div>
        <div style={{ ...styles.statCard, borderTopColor: "var(--accent)" }}>
          <FiUsers size={24} color="var(--accent)" />
          <div>
            <span style={styles.statValue}>{stats.users}</span>
            <span style={styles.statLabel}>Users</span>
          </div>
        </div>
        <div style={{ ...styles.statCard, borderTopColor: "var(--danger)" }}>
          <FiDollarSign size={24} color="var(--danger)" />
          <div>
            <span style={styles.statValue}>₹{stats.revenue}</span>
            <span style={styles.statLabel}>Revenue</span>
          </div>
        </div>
      </div>

      <div style={styles.tabs}>
        <button
          style={{ ...styles.tab, ...(activeTab === "dashboard" ? styles.tabActive : {}) }}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </button>
        <button
          style={{ ...styles.tab, ...(activeTab === "orders" ? styles.tabActive : {}) }}
          onClick={() => setActiveTab("orders")}
        >
          Orders
        </button>
        <button
          style={{ ...styles.tab, ...(activeTab === "products" ? styles.tabActive : {}) }}
          onClick={() => setActiveTab("products")}
        >
          Products
        </button>
      </div>

      {activeTab === "dashboard" && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Recent Orders</h2>
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Order ID</th>
                  <th style={styles.th}>Items</th>
                  <th style={styles.th}>Total</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td style={styles.td}><strong>{order.id}</strong></td>
                    <td style={styles.td}>{order.items.length} items</td>
                    <td style={styles.td}>₹{order.total}</td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.statusBadge,
                        background: order.status === "Delivered" ? "#dcfce7" : order.status === "Shipped" ? "#dbeafe" : "#fef3c7",
                        color: order.status === "Delivered" ? "#166534" : order.status === "Shipped" ? "#1e40af" : "#92400e",
                      }}>
                        {order.status}
                      </span>
                    </td>
                    <td style={styles.td}>{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "orders" && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>All Orders Management</h2>
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Order ID</th>
                  <th style={styles.th}>Items</th>
                  <th style={styles.th}>Total</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td style={styles.td}><strong>{order.id}</strong></td>
                    <td style={styles.td}>
                      {order.items.map((item, i) => (
                        <div key={i}>{item.name} × {item.quantity}</div>
                      ))}
                    </td>
                    <td style={styles.td}>₹{order.total}</td>
                    <td style={styles.td}>
                      <select
                        style={styles.statusSelect}
                        defaultValue={order.status}
                      >
                        <option>Pending</option>
                        <option>Processing</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                      </select>
                    </td>
                    <td style={styles.td}>{order.date}</td>
                    <td style={styles.td}>
                      <button style={styles.actionBtn}>
                        <FiTrendingUp size={14} /> Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "products" && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Product Catalog ({products.length})</h2>
          <div style={styles.grid}>
            {products.map((p) => (
              <div key={p.id} style={styles.productCard}>
                <img src={p.image} alt={p.name} style={styles.productImg} />
                <div style={styles.productInfo}>
                  <h4 style={styles.productName}>{p.name}</h4>
                  <span style={styles.productCategory}>{p.category}</span>
                  <span style={styles.productPrice}>₹{p.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: { padding: "32px 20px 48px" },
  title: { fontSize: 28, fontWeight: 700, marginBottom: 24 },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 },
  statCard: {
    display: "flex", alignItems: "center", gap: 16, padding: 20,
    background: "white", borderRadius: "var(--radius)", boxShadow: "var(--shadow)",
    borderTop: "3px solid",
  },
  statValue: { display: "block", fontSize: 24, fontWeight: 700 },
  statLabel: { fontSize: 13, color: "var(--gray-500)" },
  tabs: { display: "flex", gap: 8, marginBottom: 24 },
  tab: { padding: "10px 20px", borderRadius: 8, border: "none", fontSize: 14, fontWeight: 500, cursor: "pointer", background: "var(--gray-100)", color: "var(--gray-600)" },
  tabActive: { background: "var(--primary)", color: "white" },
  section: { background: "white", borderRadius: "var(--radius)", padding: 24, boxShadow: "var(--shadow)" },
  sectionTitle: { fontSize: 18, fontWeight: 600, marginBottom: 16 },
  tableWrap: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { textAlign: "left", padding: "10px 12px", fontSize: 12, fontWeight: 600, color: "var(--gray-500)", textTransform: "uppercase", borderBottom: "2px solid var(--gray-200)" },
  td: { padding: "12px", fontSize: 14, borderBottom: "1px solid var(--gray-100)" },
  statusBadge: { padding: "4px 10px", borderRadius: 12, fontSize: 12, fontWeight: 600 },
  statusSelect: { padding: "6px 8px", borderRadius: 6, border: "1px solid var(--gray-300)", fontSize: 13, cursor: "pointer" },
  actionBtn: { display: "inline-flex", alignItems: "center", gap: 4, padding: "6px 12px", borderRadius: 6, border: "none", background: "var(--primary)", color: "white", fontSize: 12, cursor: "pointer" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16 },
  productCard: { background: "var(--gray-50)", borderRadius: 8, overflow: "hidden", border: "1px solid var(--gray-100)" },
  productImg: { width: "100%", height: 120, objectFit: "cover" },
  productInfo: { padding: 10 },
  productName: { fontSize: 13, fontWeight: 600 },
  productCategory: { display: "block", fontSize: 11, color: "var(--gray-500)", marginTop: 2 },
  productPrice: { display: "block", fontSize: 14, fontWeight: 700, color: "var(--primary)", marginTop: 4 },
};
