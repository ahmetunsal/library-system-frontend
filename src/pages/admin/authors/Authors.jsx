import React, { useContext, useEffect, useMemo, useState } from "react";
import Tables from "../../../components/tables/Tables";
import { context } from "../../../_context/GlobalContext";
import AddCategoryModal from "../../../components/modal/AddCategoryModal";
import EditCategoryModal from "../../../components/modal/edit/EditCategoryModal";
import DeleteCategoryModal from "../../../components/modal/delete/DeleteCategoryModal";
import AddAuthorModal from "../../../components/modal/add/AddAuthorModal";
import EditAuthorModal from "../../../components/modal/edit/EditAuthorModal";
import DeleteAuthorModal from "../../../components/modal/delete/DeleteAuthorModal";

const Authors = () => {
  const { getAllAuthors } = useContext(context);

  const [loading, setLoading] = useState(false);
  const [authorObject, setAuthorObject] = useState([]);
  const [authorModalOpen, setAuthorModalOpen] = useState(false);
  const [editAuthorModalOpen, setEditAuthorModalOpen] = useState(false);
  const [deleteAuthorModalOpen, setDeleteAuthorModalOpen] = useState(false);
  const [authorList, setAuthorList] = useState([]);
  const [deneme, setDeneme] = useState(false);

  useEffect(() => {
    const authorStatus = async () => {
        try {
          const response = await getAllAuthors(); // API çağrısı
        //   console.log("CATEGORIES", response);
          // console.log("Bayi Status:", response.data); // Gelen veriyi kontrol et
          setAuthorList(response.data); // 🟢 Yalnızca `results` dizisini kaydet
        } catch (error) {
          //console.error("Bayi Status Error:", error); // Hataları kontrol et
        } finally {
          setLoading(false); // Yükleme durumunu kapat
        }
      };
  
      authorStatus();
  }, [deneme]);

  useEffect(() => {
    const authorStatus = async () => {
      try {
        const response = await getAllAuthors(); // API çağrısı
        // console.log("CATEGORIES", response);
        // console.log("Bayi Status:", response.data); // Gelen veriyi kontrol et
        setAuthorList(response.data); // 🟢 Yalnızca `results` dizisini kaydet
      } catch (error) {
        //console.error("Bayi Status Error:", error); // Hataları kontrol et
      } finally {
        setLoading(false); // Yükleme durumunu kapat
      }
    };

    authorStatus();
  }, []);

  const handleEdit = (id) => {
    console.log("EDIT", id);
    setAuthorObject(id);
    setEditAuthorModalOpen(!editAuthorModalOpen)
  }

  const handleDelete = (obj) => {
    console.log("DELETE", obj);
    setAuthorObject(obj);
    setDeleteAuthorModalOpen(true)
  }

  const hiddenColumns = [
    "description",
    "created_at",
    "updated_at",
    "publisher",
    "publication_date",
  ]; //

  const columns = useMemo(() => {
    if (!authorList || authorList.length === 0 || !authorList[0])
      return [];

    return [
      ...Object.keys(authorList[0] || {})
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
              onClick={() => handleDelete(row)}
            >
              Sil
            </button>
          </div>
        ),
      },
    ];
  }, [authorList, hiddenColumns]);

  return (
    <div>
      <div className="flex justify-end">
        <button
          onClick={() => setAuthorModalOpen(!authorModalOpen)}
          className="bg-black text-white hover:cursor-pointer my-5 mx-5 py-3 px-2 rounded-2xl"
        >
          Yazar Ekle
        </button>
      </div>
      <Tables columns={columns} data={authorList} loading={loading} />
      <AddAuthorModal deneme={deneme} setDeneme={setDeneme} open={authorModalOpen} setOpen={setAuthorModalOpen} />
      <EditAuthorModal deneme={deneme} setDeneme={setDeneme} authorObject={authorObject} open={editAuthorModalOpen} setOpen={setEditAuthorModalOpen} />
      <DeleteAuthorModal deneme={deneme} setDeneme={setDeneme} authorObject={authorObject} open={deleteAuthorModalOpen} setOpen={setDeleteAuthorModalOpen} />
    </div>
  );
};

export default Authors;
