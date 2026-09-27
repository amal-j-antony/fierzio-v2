"use client";

import { useQuery } from "@tanstack/react-query";
import { AdminRoute } from "@/components/auth/route-guards";
import { api } from "@/lib/api";
import type { PublicUser } from "@/lib/auth/types";

const fetchAdminUsers = async (): Promise<PublicUser[]> => {
  const { data } = await api.get<{ users: PublicUser[] }>("/admin/users");
  return data.users;
};

function AdminUsersTable() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["admin", "users"],
    queryFn: fetchAdminUsers,
  });

  if (isPending) {
    return (
      <p className="p-8 text-sm text-on-surface-variant">Loading users...</p>
    );
  }

  if (isError) {
    return (
      <p className="p-8 text-sm text-error">Failed to load users.</p>
    );
  }

  return (
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="border-b border-white/5 text-on-surface-variant">
          <th className="px-6 py-3 font-medium">Email</th>
          <th className="px-6 py-3 font-medium">Role</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((user) => (
          <tr key={user.id} className="border-b border-white/5 last:border-0">
            <td className="px-6 py-3 text-on-surface">{user.email}</td>
            <td className="px-6 py-3">
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  user.globalRole === "ADMIN"
                    ? "bg-primary/15 text-primary"
                    : "bg-white/5 text-on-surface-variant"
                }`}
              >
                {user.globalRole}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function AdminPage() {
  return (
    <AdminRoute>
      <main className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
        <h1 className="font-display text-3xl font-bold text-on-surface">
          Admin
        </h1>
        <p className="mt-2 text-sm text-on-surface-variant">
          Manage Fierzio users. Access is enforced server-side via{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5">ADMIN</code> role
          checks.
        </p>
        <div className="mt-8 overflow-hidden rounded-lg border border-white/5 bg-surface-container-low">
          <AdminUsersTable />
        </div>
      </main>
    </AdminRoute>
  );
}
