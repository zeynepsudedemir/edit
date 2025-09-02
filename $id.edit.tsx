import { useParams, useNavigate } from "react-router-dom"; // ya da TanStack Router
import { useEffect, useState } from "react";
import { getUserByUsername, updateUser } from "@/store/services/userManagement";

export default function EditUser() {
  const { id } = useParams(); // id = username
  const navigate = useNavigate();

  const [userData, setUserData] = useState({ userName: "", email: "" });
  const [loading, setLoading] = useState(true);

  // Kullanıcı bilgilerini getir
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserByUsername(id!); // api call
        setUserData(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [id]);

  // Form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser(id!, userData); // api call
      alert("Kullanıcı başarıyla güncellendi!");
      navigate("/users"); // güncelleme sonrası listeye yönlendir
    } catch (err) {
      console.error(err);
      alert("Güncelleme başarısız!");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>{id} Kullanıcısını Düzenle</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={userData.userName}
            onChange={(e) => setUserData({ ...userData, userName: e.target.value })}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          />
        </label>
        <button type="submit">Güncelle</button>
      </form>
    </div>
  );
}
