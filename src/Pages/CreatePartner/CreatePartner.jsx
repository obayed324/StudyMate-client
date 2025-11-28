import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";


const CreatePartner = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  if (authLoading) return <p>Loading...</p>;
  if (!user) return <p>You must be logged in.</p>;

  const handleCreate = async (e) => {
    e.preventDefault();

    const form = e.target;

    const partnerData = {
      name: form.name.value,
      profileimage: form.profileimage.value,
      subject: form.subject.value,
      studyMode: form.studyMode.value,
      availabilityTime: form.availabilityTime.value,
      location: form.location.value,
      experienceLevel: form.experienceLevel.value,
      rating: 0,
      partnerCount: 0,
      email: user.email, // auto-filled
    };

    try {
      setLoading(true);
      const token = await user.getIdToken();

      const res = await fetch("https://study-mate-server-steel-nine.vercel.app/partners", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(partnerData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Profile created successfully!");
        form.reset();
      } else {
        toast.error(data.message || "Failed to create profile");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 my-10 bg-white shadow-xl rounded-xl">
      <h1 className="text-3xl font-bold text-purple-600 text-center mb-6">
        Create Your Study Partner Profile
      </h1>

      <form onSubmit={handleCreate} className="space-y-4">

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          className="input input-bordered w-full"
        />

        <input
          type="url"
          name="profileimage"
          placeholder="Profile Image URL"
          required
          className="input input-bordered w-full"
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject (e.g. Math)"
          required
          className="input input-bordered w-full"
        />

        <select
          name="studyMode"
          required
          className="input input-bordered w-full"
        >
          <option value="">Select Study Mode</option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
        </select>

        <input
          type="text"
          name="availabilityTime"
          placeholder="Availability Time (e.g. Evening 6–9 PM)"
          required
          className="input input-bordered w-full"
        />

        <input
          type="text"
          name="location"
          placeholder="Your Location"
          required
          className="input input-bordered w-full"
        />

        <select
          name="experienceLevel"
          required
          className="input input-bordered w-full"
        >
          <option value="">Experience Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Expert">Expert</option>
        </select>

        {/* Read-only email */}
        <input
          type="email"
          value={user.email}
          disabled
          className="input input-bordered w-full bg-gray-100"
        />

        <button
          type="submit"
          disabled={loading}
          className="btn bg-purple-600 text-white w-full mt-4"
        >
          {loading ? "Creating..." : "Create Profile"}
        </button>
      </form>
    </div>
  );
};

export default CreatePartner;
