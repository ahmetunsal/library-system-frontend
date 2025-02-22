import React, { useContext, useEffect, useMemo, useState } from "react";
import { roleConditions } from "../../utils/config";
import { context } from "../../_context/GlobalContext";
import Tables from "../../components/tables/Tables";
import AddBookModal from "../../components/modal/AddBookModal";

const Admin = () => {
  const { user, getAllBooks } = useContext(context);
  const [loading, setLoading] = useState(true);
  const [bookList, setBookList] = useState([]);
  const [open, setOpen] = useState(false)


  useEffect(() => {
    const bookStatus = async () => {
      try {
        const response = await getAllBooks(); // API çağrısı
        console.log("SA", response);
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

  const hiddenColumns = [
    "description",
    "created_at",
    "updated_at",
    "publisher",
    "publication_date",
  ]; //

  const columns = useMemo(() => {
    if (!bookList || bookList.length === 0 || !bookList[0]) return [];

    return [
      ...Object.keys(bookList[0] || {})
        .filter((key) => !hiddenColumns.includes(key))
        .map((key) => ({
          name: key.replace(/_/g, " ").toUpperCase(),
          selector: (row) => {
            const value = row[key];

            if (!value) return "Veri Yok";

            // Eğer kategori objeyse
            if (key === "category") return value.name;

            // Eğer yazar bir array ise
            if (key === "author")
              return value
                .map((a) => `${a.first_name} ${a.last_name}`)
                .join(", ");

            // Eğer yayınevi objeyse
            if (key === "publisher") return value.name;

            // Eğer kapak görseliyse
            if (key === "cover_image")
              return <img src={value} alt="Kapak" width="50" />;

            return value;
          },
          sortable: true,
        })),
      {
        name: "İşlemler",
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
              onClick={() => handleDelete(row.id)}
            >
              Sil
            </button>
          </div>
        ),
      },
    ];
  }, [bookList, hiddenColumns]);

  //   if (!roleConditions[user.role]) return <>Not found.</>;
  if (loading) return <>Loading...</>;

  return (
    <>
        <div className="flex justify-end">
            <button onClick={() => setOpen(!open)} className="bg-black text-white hover:cursor-pointer my-5 mx-5 py-3 px-2 rounded-2xl">
                Kitap Ekle
            </button>
        </div>
      <Tables columns={columns} data={bookList} loading={loading} />
      <AddBookModal open={open} setOpen={setOpen} />
    </>
  );
};

export default Admin;
