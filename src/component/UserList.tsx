import React from "react";
import { type User } from "../types";
import { Link } from "react-router-dom";

interface Props {
  users: User[];
  onDelete: (id: number) => void;
  deletingId?: number | null;
}

const UserList: React.FC<Props> = ({ users, onDelete, deletingId }) => {
  return (
    <table className="users-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th style={{ width: 200 }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td>
              <Link to={`/users/${u.id}`}>{u.name}</Link>
            </td>
            <td>{u.email}</td>
            <td>{u.phone}</td>
            <td>
              <div className="actions">
                <Link to={`/users/${u.id}/edit`} className="btn btn-ghost">Edit</Link>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    if (!u.id) return;
                    if (!confirm(`Delete user "${u.name}"? This is simulated.`)) return;
                    onDelete(u.id);
                  }}
                  disabled={deletingId === u.id}
                >
                  {deletingId === u.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
