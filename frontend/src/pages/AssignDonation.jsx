import { useEffect, useState } from "react";
import "../styles/AssignDonation.css";

const AssignDonation = () => {
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [assignAmounts, setAssignAmounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    let isMounted = true;

    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/donations/summary", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch categories");
        if (isMounted) setCategories(data);
      } catch (err) {
        console.error(err);
        if (isMounted) setMessage("Failed to load categories");
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch users");
        if (isMounted) setUsers(data.users);
      } catch (err) {
        console.error(err);
        if (isMounted) setMessage("Failed to load users");
      }
    };

    fetchCategories();
    fetchUsers();
    setLoading(false);

    return () => { isMounted = false; };
  }, [token]);

  const handleAmountChange = (userId, value) => {
    setAssignAmounts(prev => ({
      ...prev,
      [userId]: Number(value)
    }));
  };

  const handleAssign = async (userId) => {
    if (!selectedCategory) {
      setMessage("Select a category first");
      return;
    }
    const amount = assignAmounts[userId] || 0;
    if (amount <= 0) {
      setMessage("Enter an amount to assign");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/donations/assign", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          assignee: userId,
          disasterType: selectedCategory,
          amountToAssign: amount
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to assign donation");

      setMessage(`Assigned $${amount} of ${selectedCategory} to ${data.assigneeName || "user"}`);
      setAssignAmounts(prev => ({ ...prev, [userId]: "" }));

      // Refresh category totals
      const catRes = await fetch("http://localhost:5000/api/donations/summary", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const catData = await catRes.json();
      setCategories(catData);
    } catch (err) {
      console.error(err);
      setMessage(err.message || "Error assigning donation");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const currentCategory = categories.find(c => c.disasterType === selectedCategory);

  if (loading) return <div className="assign-root"><div className="assign-overlay"></div><p>Loading...</p></div>;

  return (
    <div className="assign-root">
      <div className="assign-overlay"></div>
      <div className="assign-container">
        <h1>Assign Donations</h1>
        {message && <div className="message">{message}</div>}

        {/* Category Selector */}
        <section className="category-select">
          <label>Select Category:</label>
          <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
            <option value="">-- Choose Category --</option>
            {categories.map(cat => (
              <option key={cat.disasterType} value={cat.disasterType}>
                {cat.disasterType} (Unassigned: ${cat.unassignedAmount})
              </option>
            ))}
          </select>
        </section>

        {/* User Assignment */}
        <section className="users">
          <h2>Assign Donations to Users</h2>
          {users.length === 0 ? (
            <p>No users found.</p>
          ) : selectedCategory === "" ? (
            <p>Please select a category first.</p>
          ) : (
            users.map(user => (
              <div key={user._id} className="user-card">
                <h3>{user.name} ({user.email})</h3>
                <div className="inputs">
                  <label>Amount to assign:</label>
                  <input
                    type="number"
                    min="0"
                    max={currentCategory?.unassignedAmount || 0}
                    value={assignAmounts[user._id] || ""}
                    onChange={e => handleAmountChange(user._id, e.target.value)}
                  />
                </div>
                <button onClick={() => handleAssign(user._id)}>Assign</button>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
};

export default AssignDonation;