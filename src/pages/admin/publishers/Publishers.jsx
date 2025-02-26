import React, { useContext, useEffect, useMemo, useState } from "react";
import Tables from "../../../components/tables/Tables";
import { context } from "../../../_context/GlobalContext";
import AddAuthorModal from "../../../components/modal/add/AddAuthorModal";
import EditAuthorModal from "../../../components/modal/edit/EditAuthorModal";
import DeleteAuthorModal from "../../../components/modal/delete/DeleteAuthorModal";
import AddPublisherModal from "../../../components/modal/add/AddPublisherModal";
import EditPublisherModal from "../../../components/modal/edit/EditPublisherModal";
import DeletePublisherModal from "../../../components/modal/delete/DeletePublisherModal";

const Publishers = () => {
  const { getAllPublishers } = useContext(context);

  const [loading, setLoading] = useState(false);
  const [publisherObject, setPublisherObject] = useState([]);
  const [publisherModalOpen, setPublisherModalOpen] = useState(false);
  const [editPublisherModalOpen, setEditPublisherModalOpen] = useState(false);
  const [deletePublisherModalOpen, setDeletePublisherModalOpen] = useState(false);
  const [publisherList, setPublisherList] = useState([]);
  const [deneme, setDeneme] = useState(false);

  useEffect(() => {
    const authorStatus = async () => {
        try {
          const response = await getAllPublishers(); // API çağrısı
          // console.log("**PUBLISHERS**", response);
          // console.log("Bayi Status:", response.data); // Gelen veriyi kontrol et
          setPublisherList(response.data); // 🟢 Yalnızca `results` dizisini kaydet
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
        const response = await getAllPublishers(); // API çağrısı
        // console.log("CATEGORIES", response);
        // console.log("Bayi Status:", response.data); // Gelen veriyi kontrol et
        setPublisherList(response.data); // 🟢 Yalnızca `results` dizisini kaydet
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
    setPublisherObject(id);
    setEditPublisherModalOpen(!editPublisherModalOpen)
  }

  const handleDelete = (obj) => {
    console.log("DELETE", obj);
    setPublisherObject(obj);
    setDeletePublisherModalOpen(true)
  }

  const hiddenColumns = [
    "description",
    "created_at",
    "updated_at",
    "publisher",
    "publication_date",
  ]; //

  const columns = useMemo(() => {
    if (!publisherList || publisherList.length === 0 || !publisherList[0])
      return [];

    return [
      ...Object.keys(publisherList[0] || {})
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
  }, [publisherList, hiddenColumns]);

  return (
    <div>
      <div className="flex justify-end">
        <button
          onClick={() => setPublisherModalOpen(!publisherModalOpen)}
          className="bg-black text-white hover:cursor-pointer my-5 mx-5 py-3 px-2 rounded-2xl"
        >
          Yayınevi Ekle
        </button>
      </div>
      <Tables columns={columns} data={publisherList} loading={loading} />
      <AddPublisherModal deneme={deneme} setDeneme={setDeneme} open={publisherModalOpen} setOpen={setPublisherModalOpen} />
      <EditPublisherModal deneme={deneme} setDeneme={setDeneme} publisherObject={publisherObject} open={editPublisherModalOpen} setOpen={setEditPublisherModalOpen} />
      <DeletePublisherModal deneme={deneme} setDeneme={setDeneme} publisherObject={publisherObject} open={deletePublisherModalOpen} setOpen={setDeletePublisherModalOpen} />
    </div>
  );
};

export default Publishers;
