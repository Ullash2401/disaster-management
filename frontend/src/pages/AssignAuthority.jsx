import { useEffect, useState } from "react";
import "../styles/AssignAuthority.css";

const AssignAuthority = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  // Fetch all users (admin only)
  useEffect(() => {
    if (!token) return;

    let isMounted = true; // prevent state updates if component unmounts

    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch users");

        if (isMounted) {
          setUsers(data.users);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setMessage("Failed to fetch users.");
          setLoading(false);
        }
      }
    };

    fetchUsers();

    return () => { isMounted = false }; // cleanup
  }, [token]);

  // Update user role
  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/users/${userId}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newRole }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Failed to update role");
        return;
      }

      // Update local state without re-fetching
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );

      setMessage(`Role updated for ${data.user.name} ✅`);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setMessage("Server error while updating role.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="home-root">
      <div className="overlay"></div>

      <div className="content">
        <h1>
          Assign <span>Authority</span>
        </h1>
        <p>Admin can assign roles to users here.</p>

        {message && <div className="message">{message}</div>}

        {loading ? (
          <p>Loading users...</p>
        ) : users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Current Role</th>
                <th>Assign Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    >
                      <option value="admin">Admin</option>
                      <option value="scriptwriter">Scriptwriter</option>
                      <option value="viewer">Viewer</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AssignAuthority;