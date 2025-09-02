import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserByUsername, updateUser } from "@/store/services/userManagement";

export default function EditUser() {
  const { id } = useParams(); // id = username
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    surname: "",
    password: "",
    userrole: "",
  });
  const [loading, setLoading] = useState(true);

  // Kullanıcı verilerini getir
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserByUsername(id!, token!); // axios.get
        setFormData(user);
        setLoading(false);
      } catch (err) {
        console.error("Kullanıcı getirilemedi", err);
      }
    };
    fetchUser();
  }, [id, token]);

  // Form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser(id!, formData, token!); // axios.post veya put
      alert("Kullanıcı başarıyla güncellendi!");
      navigate("/users"); // güncelleme sonrası listeye dön
    } catch (err) {
      console.error("Güncelleme hatası", err);
      alert("Güncelleme başarısız!");
    }
  };

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div>
      <h1>{id} Kullanıcısını Düzenle</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
        </label>
        <label>
          Name:
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </label>
        <label>
          Surname:
          <input
            type="text"
            value={formData.surname}
            onChange={(e) =>
              setFormData({ ...formData, surname: e.target.value })
            }
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </label>
        <label>
          User Role:
          <select
            value={formData.userrole}
            onChange={(e) =>
              setFormData({ ...formData, userrole: e.target.value })
            }
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </label>
        <button type="submit">Güncelle</button>
      </form>
    </div>
  );
}



