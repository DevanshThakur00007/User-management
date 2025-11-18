import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../component/UserForm";
import { createUser } from "../api";
import { type User } from "../types";

/**
 * New user page - uses UserForm, posts to API and navigates to home
 */
const NewUser: React.FC = () => {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: User) => {
    setBusy(true);
    setError(null);
    try {
      const created = await createUser(data);
      // JSONPlaceholder returns created object with id (101)
      alert(`User created (simulated) with id ${created.id}`);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Failed to create");
      throw err;
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <h1>Create User</h1>
      {error && <div className="error">{error}</div>}
      <UserForm onSubmit={onSubmit} busy={busy} />
    </>
  );
};

export default NewUser;
