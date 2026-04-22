"use client";
import Link from "next/link";
import { useState } from "react";
import { AlertCircle, Loader2, CheckCircle2 } from "lucide-react";
import { apiFetch } from "@/lib/api";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    requestedRole: "worker",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);
    try {
      await apiFetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          role: formData.requestedRole,
        }),
      });
      setIsSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white">
        <div className="text-center">
          <CheckCircle2 size={64} className="mx-auto mb-6 text-green-400" />
          <h1 className="text-3xl font-bold mb-4">
            Registration Submitted!
          </h1>
          <p className="text-gray-400 mb-6 max-w-md">
            Your account has been created. You can now sign in with your
            credentials.
          </p>
          <Link href="/login">
            <button className="px-5 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition">
              Continue to Login
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white py-12">
      <div className="w-full max-w-md">

        {/* LOGO */}
        <div className="text-center mb-8">
          <Link href="/">
            <h1 className="text-3xl font-bold mb-2 hover:text-orange-400 transition">
              MineOps
            </h1>
          </Link>
          <p className="text-gray-400 text-sm">Create Your Account</p>
        </div>

        {/* REGISTRATION CARD */}
        <div className="p-8 bg-neutral-900 rounded-2xl shadow-lg border border-neutral-800">
          <h2 className="text-2xl font-bold mb-2 text-center">
            User Registration
          </h2>
          <p className="text-xs text-gray-400 mb-6 text-center">
            Account request workflow with admin approval
          </p>

          {/* ERROR */}
          {error && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded-lg flex items-start gap-2 text-sm text-red-300">
              <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 mb-2 block">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-orange-400 text-white"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-2 block">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-orange-400 text-white"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-2 block">
                Requested Role (Read-Only Request)
              </label>
              <select
                name="requestedRole"
                value={formData.requestedRole}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-orange-400 text-white"
              >
                <option value="worker">Worker</option>
                <option value="supervisor">Supervisor</option>
                <option value="safety">Safety Officer</option>
              </select>
              <p className="text-xs text-gray-500 mt-2">
                Final role assignment is made by Admin/Authority policy engine
              </p>
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-2 block">
                Create Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Minimum 6 characters"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-orange-400 text-white"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-2 block">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter your password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-orange-400 text-white"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-semibold disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Registration Request"
              )}
            </button>
          </form>

          {/* SECURITY NOTE */}
          <div className="mt-6 bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-xs text-gray-400">
            <div className="flex gap-2">
              <AlertCircle
                size={14}
                className="flex-shrink-0 mt-0.5 text-orange-400"
              />
              <p>
                Your final role will be assigned by the system administrator
                after approval.
              </p>
            </div>
          </div>
        </div>

        {/* LOGIN LINK */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-400 mb-3">Already have an account?</p>
          <Link href="/login">
            <button className="w-full py-3 border border-orange-400 text-orange-400 rounded-lg hover:bg-orange-500/10 transition font-semibold">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
