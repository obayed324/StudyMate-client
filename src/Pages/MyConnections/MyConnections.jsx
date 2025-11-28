import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const MyConnections = () => {
    const { user } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const [editData, setEditData] = useState(null);

    // Fetch partner requests
    useEffect(() => {
        const fetchRequests = async () => {
            if (!user) return;

            try {
                const token = await user.getIdToken();
                const res = await fetch("http://localhost:3000/my-requests", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                setRequests(data.requests || []);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchRequests();
    }, [user]);

    // Delete a request
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this connection?"))
            return;

        try {
            const token = await user.getIdToken();
            const res = await fetch(`http://localhost:3000/my-requests/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();

            if (data.success) {
                setRequests((prev) => prev.filter((r) => r._id !== id));
            }
        } catch (err) {
            console.error(err);
        }
    };

    // Update a request
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        if (!editData) return;
        const token = await user.getIdToken();

        // ✨ Destructure _id so it is NOT sent to MongoDB
        const { _id, ...updateFields } = editData;

        const res = await fetch(`http://localhost:3000/my-requests/${_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updateFields), // only send the fields you want to update
        });

        const data = await res.json();

        if (data.success) {
            // update UI
            setRequests((prev) =>
                prev.map((r) => (r._id === _id ? data.updated : r))
            );

            // close modal
            document.getElementById("update_modal").close();
            setEditData(null);
        }
    };


    if (loading) return <p>Loading...</p>;

    return (
        <div className="max-w-6xl mx-auto mt-10 p-4">
            <h1 className="text-3xl font-bold mb-6">My Connections</h1>

            <table className="table w-full border">
                <thead>
                    <tr>
                        <th>Partner</th>
                        <th>Subject</th>
                        <th>Study Mode</th>
                        <th>Experience</th>
                        <th>Availability</th>
                        <th>Location</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {requests.map((req) => (
                        <tr key={req._id}>
                            <td className="flex items-center gap-3">
                                <img
                                    src={req.partnerImage}
                                    className="w-12 h-12 rounded-full"
                                    alt={req.partnerName}
                                />
                                {req.partnerName}
                            </td>
                            <td>{req.subject}</td>
                            <td>{req.studyMode}</td>
                            <td>{req.experienceLevel}</td>
                            <td>{req.availabilityTime}</td>
                            <td>{req.location}</td>
                            <td className="flex gap-2">
                                <button
                                    className="btn btn-sm btn-info text-white"
                                    onClick={() => {
                                        setEditData(req);
                                        document.getElementById("update_modal").showModal();
                                    }}
                                >
                                    Update
                                </button>

                                <button
                                    className="btn btn-sm btn-error text-white"
                                    onClick={() => handleDelete(req._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* UPDATE MODAL */}
            <dialog id="update_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-3">Update Connection</h3>

                    {editData && (
                        <form onSubmit={handleUpdateSubmit} className="grid gap-3">
                            {/* Profile Image */}
                            <div>
                                <label className="font-semibold">Profile Image URL</label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={editData.partnerImage}
                                    onChange={(e) =>
                                        setEditData({ ...editData, partnerImage: e.target.value })
                                    }
                                />
                            </div>

                            {/* Subject */}
                            <div>
                                <label className="font-semibold">Subject</label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={editData.subject}
                                    onChange={(e) =>
                                        setEditData({ ...editData, subject: e.target.value })
                                    }
                                />
                            </div>

                            {/* Study Mode */}
                            <div>
                                <label className="font-semibold">Study Mode</label>
                                <select
                                    className="select select-bordered w-full"
                                    value={editData.studyMode}
                                    onChange={(e) =>
                                        setEditData({ ...editData, studyMode: e.target.value })
                                    }
                                >
                                    <option>Online</option>
                                    <option>Offline</option>
                                </select>
                            </div>

                            {/* Experience */}
                            <div>
                                <label className="font-semibold">Experience Level</label>
                                <select
                                    className="select select-bordered w-full"
                                    value={editData.experienceLevel}
                                    onChange={(e) =>
                                        setEditData({
                                            ...editData,
                                            experienceLevel: e.target.value,
                                        })
                                    }
                                >
                                    <option>Beginner</option>
                                    <option>Intermediate</option>
                                    <option>Expert</option>
                                </select>
                            </div>

                            {/* Availability */}
                            <div>
                                <label className="font-semibold">Availability Time</label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={editData.availabilityTime}
                                    onChange={(e) =>
                                        setEditData({
                                            ...editData,
                                            availabilityTime: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            {/* Location */}
                            <div>
                                <label className="font-semibold">Location</label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={editData.location}
                                    onChange={(e) =>
                                        setEditData({ ...editData, location: e.target.value })
                                    }
                                />
                            </div>

                            <button className="btn btn-success w-full mt-3">
                                Save Changes
                            </button>
                        </form>
                    )}

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-outline">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default MyConnections;
