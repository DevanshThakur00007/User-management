import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { type User } from "../types";
import { fetchUser } from "../api";
import LoadingSpinner from "./LoadingSpinner";

const UserDetail: React.FC = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchUser(Number(id))
      .then((u) => setUser(u))
      .catch((err) => setError(err.message || "Failed to fetch user"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error">{error}</div>;
  if (!user) return <div className="card-inline">User not found</div>;

  return (
    <div className="card-inline">
      <h2>{user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      {user.address && <p><strong>Address:</strong> {user.address.city}, {user.address.street}</p>}
      <div style={{ marginTop: 12 }}>
        <Link to={`/users/${user.id}/edit`} className="btn btn-ghost">Edit</Link>
        <Link to="/" style={{ marginLeft: 8 }} className="btn">Back</Link>
      </div>
    </div>
  );
};

export default UserDetail;
