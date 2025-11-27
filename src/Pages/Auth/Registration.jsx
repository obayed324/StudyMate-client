import { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { IoLogoGoogle } from "react-icons/io5";
import { AuthContext } from "../../context/AuthContext";

const Registration = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  
  const validatePassword = (password) => {
    if (!/[A-Z]/.test(password)) return "Password must include at least one uppercase letter.";
    if (!/[a-z]/.test(password)) return "Password must include at least one lowercase letter.";
    if (password.length < 6) return "Password must be at least 6 characters long.";
    return "";
  };

  
  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);

    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const error = validatePassword(password);
    if (error) {
      setPasswordError(error);
      setLoading(false);
      return;
    } else {
      setPasswordError("");
    }

    createUser(email, password)
      .then(() => updateUserProfile(name, photo))
      .then(() => {
        toast.success("Registration successful!");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        toast.error(err.message || "Registration failed!");
      })
      .finally(() => setLoading(false));
  };

  // ✅ Handle Google Registration/Login
  const handleGoogleRegister = () => {
    setLoading(true);
    signInWithGoogle()
      .then(() => {
        toast.success("Registered with Google!");
        navigate(from, { replace: true });
      })
      .catch((err) => toast.error(err.message || "Google registration failed!"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">

        <h2 className="text-3xl font-bold text-center mb-6">
          Create Your <span className="text-blue-600">StudyMate</span> Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">

          <div>
            <label className="font-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              required
              className="input input-bordered w-full mt-1"
            />
          </div>

          <div>
            <label className="font-semibold">Photo URL</label>
            <input
              type="text"
              name="photo"
              required
              className="input input-bordered w-full mt-1"
            />
          </div>

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
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full rounded-full mt-2"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?
          <Link
            to="/auth/login"
            className="text-blue-600 font-semibold ml-1 hover:underline"
          >
            Login
          </Link>
        </p>

        <div className="divider">OR</div>

        <button
          onClick={handleGoogleRegister}
          disabled={loading}
          className="btn w-full rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2"
        >
          <IoLogoGoogle size={22} /> Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Registration;
