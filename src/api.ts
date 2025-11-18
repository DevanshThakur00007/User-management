import type { User } from "./types";

const BASE = "https://jsonplaceholder.typicode.com";

async function handleResponse(res: Response) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API Error: ${res.status} ${res.statusText} - ${text}`);
  }
  return res.json();
}

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${BASE}/users`);
  return handleResponse(res);
}

export async function fetchUser(id: number): Promise<User> {
  const res = await fetch(`${BASE}/users/${id}`);
  return handleResponse(res);
}

export async function createUser(user: User): Promise<User> {
  const res = await fetch(`${BASE}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return handleResponse(res);
}

export async function updateUser(id: number, user: User): Promise<User> {
  const res = await fetch(`${BASE}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return handleResponse(res);
}

export async function deleteUser(id: number): Promise<{}> {
  const res = await fetch(`${BASE}/users/${id}`, {
    method: "DELETE",
  });
  return handleResponse(res);
}
