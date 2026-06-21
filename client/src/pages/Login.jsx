import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await api.login(email, password);
      login(data.token, data.user);
      navigate("/tasks");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF6B5B] to-[#FFD23F] text-[#1A1625] text-xl font-black mb-4 shadow-lg shadow-[#FF6B5B]/20">
            ✓
          </div>
          <h1 className="text-2xl font-black tracking-tight">Welcome back</h1>
          <p className="text-sm text-[#9D96B8] mt-1">Let's see what's on deck.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wide text-[#9D96B8] mb-1.5 font-semibold">
              Email
            </label>
            <input
              className="w-full bg-[#252033] border-2 border-[#3A3450] rounded-xl px-3 py-2.5 text-sm text-[#F4F1F8] focus:outline-none focus:border-[#FF6B5B] transition placeholder:text-[#5C5570]"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wide text-[#9D96B8] mb-1.5 font-semibold">
              Password
            </label>
            <input
              className="w-full bg-[#252033] border-2 border-[#3A3450] rounded-xl px-3 py-2.5 text-sm text-[#F4F1F8] focus:outline-none focus:border-[#FF6B5B] transition"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-sm text-[#FF3D71] bg-[#FF3D71]/10 border border-[#FF3D71]/30 rounded-xl px-3 py-2">
              {error}
            </p>
          )}

          <button
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#FF6B5B] to-[#FF3D71] text-white rounded-xl py-3 text-sm font-bold hover:opacity-90 transition disabled:opacity-50 shadow-lg shadow-[#FF6B5B]/20"
          >
            {loading ? "Logging in…" : "Log in"}
          </button>
        </form>

        <p className="text-sm text-[#9D96B8] mt-6 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#4ECDC4] font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}