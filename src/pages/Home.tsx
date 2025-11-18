import React, { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "../api";
import { type User } from "../types";
import UserList from "../component//UserList";
import LoadingSpinner from "../component/LoadingSpinner";


const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchUsers()
      .then((data) => setUsers(data))
      .catch((err) => setError(err.message || "Failed to load users"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete user");
    } finally {
      setDeletingId(null);
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 flex items-start justify-center p-6">

    {/* Glass Card Container */}
    <div className="w-full max-w-4xl bg-white/70 backdrop-blur-xl shadow-xl rounded-2xl p-8 border border-white/40">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          Users
        </h1>

        <a
          href="/users/new"
          className="px-5 py-2.5 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-200"
        >
          + Create User
        </a>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-16">
          <LoadingSpinner />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 mb-4 bg-red-200/70 text-red-800 rounded-lg shadow">
          {error}
        </div>
      )}

      {/* User List */}
      {!loading && !error && (
        <UserList
          users={users}
          onDelete={handleDelete}
          deletingId={deletingId ?? undefined}
        />
      )}
    </div>
  </div>
);

};

export default Home;
