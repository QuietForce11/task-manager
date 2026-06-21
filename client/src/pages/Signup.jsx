import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [name, setName] = useState("");
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
      const data = await api.signup(name, email, password);
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
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4ECDC4] to-[#FFD23F] text-[#1A1625] text-xl font-black mb-4 shadow-lg shadow-[#4ECDC4]/20">
            ✓
          </div>
          <h1 className="text-2xl font-black tracking-tight">Get started</h1>
          <p className="text-sm text-[#9D96B8] mt-1">Build your list. Start checking things off.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wide text-[#9D96B8] mb-1.5 font-semibold">
              Name
            </label>
            <input
              className="w-full bg-[#252033] border-2 border-[#3A3450] rounded-xl px-3 py-2.5 text-sm text-[#F4F1F8] focus:outline-none focus:border-[#4ECDC4] transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wide text-[#9D96B8] mb-1.5 font-semibold">
              Email
            </label>
            <input
              className="w-full bg-[#252033] border-2 border-[#3A3450] rounded-xl px-3 py-2.5 text-sm text-[#F4F1F8] focus:outline-none focus:border-[#4ECDC4] transition"
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
              className="w-full bg-[#252033] border-2 border-[#3A3450] rounded-xl px-3 py-2.5 text-sm text-[#F4F1F8] focus:outline-none focus:border-[#4ECDC4] transition"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="text-xs text-[#5C5570] mt-1.5">At least 8 characters.</p>
          </div>

          {error && (
            <p className="text-sm text-[#FF3D71] bg-[#FF3D71]/10 border border-[#FF3D71]/30 rounded-xl px-3 py-2">
              {error}
            </p>
          )}

          <button
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#4ECDC4] to-[#2BAFA6] text-[#1A1625] rounded-xl py-3 text-sm font-bold hover:opacity-90 transition disabled:opacity-50 shadow-lg shadow-[#4ECDC4]/20"
          >
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="text-sm text-[#9D96B8] mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-[#FF6B5B] font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}