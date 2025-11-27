import { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { IoLogoGoogle } from "react-icons/io5";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; // redirect here after login

  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then(() => {
        toast.success("Login successful!");
        navigate(from, { replace: true }); // ✅ redirect to original page
      })
      .catch((err) => {
        toast.error(err.message || "Login failed!");
      })
      .finally(() => setLoading(false));
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    signInWithGoogle()
      .then(() => {
        toast.success("Logged in with Google!");
        navigate(from, { replace: true }); // ✅ redirect to original page
      })
      .catch((err) => {
        toast.error(err.message || "Google login failed!");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          Login to <span className="text-blue-600">StudyMate</span>
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="font-semibold">Email</label>
            <input
              type="email"
              name="email"
              required
              className="input input-bordered w-full mt-1"
            />
          </div>

          <div>
            <label className="font-semibold">Password</label>
            <input
              type="password"
              name="password"
              required
              className="input input-bordered w-full mt-1"
            />
            <p className="text-xs mt-1 text-right text-gray-500 cursor-pointer">
              Forgot Password?
            </p>
          </div>

          <button
            disabled={loading}
            className="btn btn-primary w-full rounded-full"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-4">
          Don’t have an account?
          <Link to="/auth/register" className="text-blue-600 font-semibold ml-1">
            Register
          </Link>
        </p>

        <div className="divider">OR</div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="btn w-full rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2"
        >
          <IoLogoGoogle size={22} /> Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
