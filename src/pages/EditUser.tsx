import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserForm from "../component/UserForm";
import { fetchUser, updateUser } from "../api";
import LoadingSpinner from "../component/LoadingSpinner";
import type { User } from "../types";


const EditUser: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [busy, setBusy] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    fetchUser(Number(id))
      .then((u) => setUser(u))
      .catch((err) => setError(err.message || "Could not fetch user"))
      .finally(() => setLoading(false));
  }, [id]);

  const onSubmit = async (data: User) => {
    if (!id) return;
    setBusy(true);

    try {
      await updateUser(Number(id), data);
      alert(`User updated (simulated).`);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Failed to update");
      throw err;
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error">{error}</div>;
  if (!user) return <div className="card-inline">User not found</div>;

  return (
    <>
      <h1>Edit User</h1>
      <UserForm initial={user} onSubmit={onSubmit} busy={busy} />
    </>
  );
};


export default EditUser;
