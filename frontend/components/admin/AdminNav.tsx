"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function AdminNav() {
  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-gray-800 text-white p-4">
      <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
      <ul className="space-y-4">
        <li>
          <Link href="/admin/tours" className="block hover:bg-gray-700 p-2 rounded">
            Tours
          </Link>
        </li>
        <li>
          <Link href="/admin/durations" className="block hover:bg-gray-700 p-2 rounded">
            Durations
          </Link>
        </li>
        <li>
          <Link href="/admin/activities" className="block hover:bg-gray-700 p-2 rounded">
            Activities
          </Link>
        </li>
        <li>
          <Link href="/admin/programs" className="block hover:bg-gray-700 p-2 rounded">
            Programs
          </Link>
        </li>
        <li>
          <Link href="/admin/images" className="block hover:bg-gray-700 p-2 rounded">
            Images
          </Link>
        </li>
        <li className="mt-8">
          <button 
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full text-left hover:bg-gray-700 p-2 rounded"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}