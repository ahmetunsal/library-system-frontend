import React, { useContext, useEffect, useMemo, useState } from "react";
import Tables from "../../../components/tables/Tables";
import { context } from "../../../_context/GlobalContext";
import AddCategoryModal from "../../../components/modal/AddCategoryModal";
import EditCategoryModal from "../../../components/modal/edit/EditCategoryModal";
import DeleteCategoryModal from "../../../components/modal/delete/DeleteCategoryModal";

const Categories = () => {
  const { getAllCategories } = useContext(context);

  const [loading, setLoading] = useState(false);
  const [categoryObject, setCategoryObject] = useState([]);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editCategoryModalOpen, setEditCategoryModalOpen] = useState(false);
  const [deleteCategoryModalOpen, setDeleteCategoryModalOpen] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [deneme, setDeneme] = useState(false);

  useEffect(() => {
    const categoryStatus = async () => {
        try {
          const response = await getAllCategories(); // API çağrısı
        //   console.log("CATEGORIES", response);
          // console.log("Bayi Status:", response.data); // Gelen veriyi kontrol et
          setCategoryList(response.data); // 🟢 Yalnızca `results` dizisini kaydet
        } catch (error) {
          //console.error("Bayi Status Error:", error); // Hataları kontrol et
        } finally {
          setLoading(false); // Yükleme durumunu kapat
        }
      };
  
      categoryStatus();
  }, [deneme]);

  useEffect(() => {
    const categoryStatus = async () => {
      try {
        const response = await getAllCategories(); // API çağrısı
        // console.log("CATEGORIES", response);
        // console.log("Bayi Status:", response.data); // Gelen veriyi kontrol et
        setCategoryList(response.data); // 🟢 Yalnızca `results` dizisini kaydet
      } catch (error) {
        //console.error("Bayi Status Error:", error); // Hataları kontrol et
      } finally {
        setLoading(false); // Yükleme durumunu kapat
      }
    };

    categoryStatus();
  }, []);

  const handleEdit = (id) => {
    setCategoryObject(id);
    setEditCategoryModalOpen(!editCategoryModalOpen)
  }

  const handleDelete = (obj) => {
    console.log("DELETE", obj);
    setCategoryObject(obj);
    setDeleteCategoryModalOpen(true)
  }

  const hiddenColumns = [
    "description",
    "created_at",
    "updated_at",
    "publisher",
    "publication_date",
  ]; //

  const columns = useMemo(() => {
    if (!categoryList || categoryList.length === 0 || !categoryList[0])
      return [];

    return [
      ...Object.keys(categoryList[0] || {})
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
  }, [categoryList, hiddenColumns]);

  return (
    <div>
      <div className="flex justify-end">
        <button
          onClick={() => setCategoryModalOpen(!categoryModalOpen)}
          className="bg-black text-white hover:cursor-pointer my-5 mx-5 py-3 px-2 rounded-2xl"
        >
          Kategori Ekle
        </button>
      </div>
      <Tables columns={columns} data={categoryList} loading={loading} />
      <AddCategoryModal deneme={deneme} setDeneme={setDeneme} open={categoryModalOpen} setOpen={setCategoryModalOpen} />
      <EditCategoryModal deneme={deneme} setDeneme={setDeneme} categoryObject={categoryObject} open={editCategoryModalOpen} setOpen={setEditCategoryModalOpen} />
      <DeleteCategoryModal deneme={deneme} setDeneme={setDeneme} categoryObject={categoryObject} open={deleteCategoryModalOpen} setOpen={setDeleteCategoryModalOpen} />
    </div>
  );
};

export default Categories;
