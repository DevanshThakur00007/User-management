import React, { useState } from "react";
import { type User } from "../types";

interface Props {
  initial?: User;
  onSubmit: (data: User) => Promise<void>;
  busy?: boolean;
}

const UserForm: React.FC<Props> = ({ initial, onSubmit, busy }) => {
  const [name, setName] = useState(initial?.name ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");
  const [phone, setPhone] = useState(initial?.phone ?? "");
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !email.trim()) {
      setError("Name and email are required.");
      return;
    }
    try {
      await onSubmit({ ...initial, name, email, phone });
    } catch (err: any) {
      setError(err.message || "Failed");
    }
  };

  return (
    <form className="form" onSubmit={submit}>
      <div className="form-row">
        <div style={{ flex: 1 }}>
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
        </div>
        <div style={{ flex: 1 }}>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" />
        </div>
      </div>

      <div className="form-row">
        <div style={{ flex: 1 }}>
          <label>Phone</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
        </div>
      </div>

      {error && <div className="error">{error}</div>}

      <div style={{ marginTop: 12 }}>
        <button type="submit" className="btn btn-primary" disabled={busy}>
          {busy ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
