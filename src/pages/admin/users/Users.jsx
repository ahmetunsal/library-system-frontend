import React, { useContext, useEffect, useMemo, useState } from "react";
import { roleConditions } from "../../../utils/config";
import { context } from "../../../_context/GlobalContext";
import Tables from "../../../components/tables/Tables";
import AddBookModal from "../../../components/modal/AddBookModal";
import DeleteBookModal from "../../../components/modal/delete/DeleteBookModal";
import EditBookModal from "../../../components/modal/edit/EditBookModal";
import { Link } from "react-router";
import AddUserModal from "../../../components/modal/add/AddUserModal";
import DeleteUserModal from "../../../components/modal/delete/DeleteUserModal";
import EditUserModal from "../../../components/modal/edit/EditUserModal";

const Books = () => {
  const { user, getAllUsers, USER_ROLES_OBJ } = useContext(context);
  const [loading, setLoading] = useState(true);
  const [bookList, setBookList] = useState([]);
  const [open, setOpen] = useState(false);

  const [bookEditOpen, setBookEditOpen] = useState(false);
  const [bookDeleteOpen, setBookDeleteOpen] = useState(false);
  const [userObject, setBookObject] = useState();
  
  const [deneme, setDeneme] = useState(false);

  useEffect(() => {
    const bookStatus = async () => {
      try {
        const response = await getAllUsers(); // API çağrısı
        console.log("SA_USER", response);
        // console.log("Bayi Status:", response.data); // Gelen veriyi kontrol et
        setBookList(response.data); // 🟢 Yalnızca `results` dizisini kaydet
      } catch (error) {
        //console.error("Bayi Status Error:", error); // Hataları kontrol et
      } finally {
        setLoading(false); // Yükleme durumunu kapat
      }
    };

    bookStatus();
  }, []);
  
  
  useEffect(() => {
    const bookStatus = async () => {
      try {
        const response = await getAllUsers(); // API çağrısı
        console.log("SA_USERS", response);
        // console.log("Bayi Status:", response.data); // Gelen veriyi kontrol et
        setBookList(response.data); // 🟢 Yalnızca `results` dizisini kaydet
      } catch (error) {
        //console.error("Bayi Status Error:", error); // Hataları kontrol et
      } finally {
        setLoading(false); // Yükleme durumunu kapat
      }
    };

    bookStatus();
  }, [deneme]);

  const handleEdit = async (obj) => {
    console.log("USER_OBJECT",obj)
    setBookObject(obj);
    setBookEditOpen(!bookEditOpen)
  }

  const handleDelete = async (obj) => {
    setBookObject(obj);
    setBookDeleteOpen(!bookDeleteOpen)
  }

  const hiddenColumns = [
    "id",
    "username",
    "created_at",
    "updated_at",
    "address",
    "is_staff",
    "loans", 
    "favorite_books", 
    "reservations",
    "penalties",
    "profile_picture"
  ]; //

  const columns = useMemo(() => {
    if (!bookList || bookList.length === 0 || !bookList[0]) return [];

    return [
      ...Object.keys(bookList[0] || {})
        .filter((key) => !hiddenColumns.includes(key))
        .map((key) => ({
          name: key.replace(/_/g, " ").toUpperCase(),
          sortable: true,
          selector: (row) => {
            const value = row[key];
            if (!value) return "Veri Yok";

            if (key === "is_active") return value ? "Aktif" : "Pasif";

            if(key == "role") return USER_ROLES_OBJ[value];

            if (key === "profile_picture")
              return <img src={value} alt="Kapak" width="50" />;

            // if(key === "loans") return value.map(r => `${r.book_title}`).join(", ");
            // if(key === "reservations") return value.map(r => `${r.book_title}`).join(", ");
            // if(key === "favorite_books") return value.map(f => `${f.title}`).join(", ");

            return value;
          },
        })),
        user.role == "admin" && {
        name: "İşlemler",
        width: "250px",
        cell: (row) => (
          <div style={{ display: "flex", gap: "10px" }}>
            {/* Düzenle Butonu */}
            <button
              style={{
                backgroundColor: "#ffc107",
                color: "black",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
                borderRadius: "5px",
              }}
              onClick={() => handleEdit(row)}
            >
              Düzenle
            </button>

            {/* Sil Butonu */}
            <button
              style={{
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
                borderRadius: "5px",
              }}
              onClick={() => handleDelete(row)}
            >
              Sil
            </button>
            
            
            <Link
              to={`/user-detail/${row.id}`}
              style={{
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              Detay
            </Link>
          </div>
        ),
      },
    ];
  }, [bookList, hiddenColumns]);

  //   if (!roleConditions[user.role]) return <>Not found.</>;
  if (loading) return <>Loading...</>;

  return (
    <>
      <div className="flex items-center justify-between py-5 px-5">
          <div className="flex">
            <h1 className="text-4xl">Üyeler</h1>
          </div>
          {user.role == "admin" && (
            <button onClick={() => setOpen(!open)} className="bg-black text-white hover:cursor-pointer py-3 px-2 rounded-2xl">
                Üye Ekle
            </button>
          )}
      </div>
      <Tables columns={columns} data={bookList} loading={loading} />
      <AddUserModal deneme={deneme} setDeneme={setDeneme} open={open} setOpen={setOpen} />
      <EditUserModal deneme={deneme} setDeneme={setDeneme} userObject={userObject} open={bookEditOpen} setOpen={setBookEditOpen} />
      <DeleteUserModal deneme={deneme} setDeneme={setDeneme} userObject={userObject} open={bookDeleteOpen} setOpen={setBookDeleteOpen} />
    </>
  );
};

export default Books;
