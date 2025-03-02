import React, { useContext, useEffect, useMemo, useState } from "react";
import { roleConditions, STATUS } from "../../../utils/config";
import { context } from "../../../_context/GlobalContext";
import Tables from "../../../components/tables/Tables";
import AddBookModal from "../../../components/modal/AddBookModal";
import DeleteBookModal from "../../../components/modal/delete/DeleteBookModal";
import EditBookModal from "../../../components/modal/edit/EditBookModal";
import { Link } from "react-router";
import LoanBookModal from "../../../components/modal/loan/LoanBookModal";
import { FaHeart } from "react-icons/fa";

const Books = () => {
  const { user, getAllBooks, postAddToFavorites, postBookTrack, postBookRevervation, handleShowAlert } = useContext(context);
  const [loading, setLoading] = useState(true);
  const [bookList, setBookList] = useState([]);
  const [open, setOpen] = useState(false);

  const [bookLoanOpen, setBookLoanOpen] = useState(false);
  const [bookEditOpen, setBookEditOpen] = useState(false);
  const [bookDeleteOpen, setBookDeleteOpen] = useState(false);
  const [bookObject, setBookObject] = useState();
  
  const [deneme, setDeneme] = useState(false);

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
  
  
  useEffect(() => {
    const bookStatus = async () => {
      try {
        const response = await getAllBooks(); // API çağrısı
        // console.log("SA", response);
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
    setBookObject(obj);
    setBookEditOpen(!bookEditOpen)
  }

  const handleAddFavorites = (obj) => {
    postAddToFavorites(user.id, obj.id);
    handleShowAlert("Kitap başarıyla favorilerinize eklendi.");
  }

  const handleBookTrack = (obj) => {
    postBookTrack(user.id, obj.id);
    handleShowAlert("Kitap başarıyla takip edildi.");
  }

  const handleBookReservation = (obj) => {
    postBookRevervation(user.id, obj.id);
    handleShowAlert("Kitap başarıyla rezerve edildi.");
  }

  const handleLoanBook = (obj) => {
    setBookObject(obj);
    setBookLoanOpen(!bookLoanOpen);
  }

  const handleDelete = async (obj) => {
    setBookObject(obj);
    setBookDeleteOpen(!bookDeleteOpen)
  }

  let hiddenColumns = [
    "description",
    "created_at",
    "updated_at",
    "author",
    "category",
    "publisher",
    "publication_date",
  ]; //

  if(user.role != "admin") hiddenColumns += [
    "isbn",
    "stock",
    "id",
  ]

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
            if(value == "") return "Atanmamış.";

            if (key === "publisher") return value.name;

            if(key === "status") return STATUS[value].text

            if (key === "cover_image")
              return <img src={value} alt="Kapak" width="50" />;

            return value;
          },
          sortable: true,
        })),
        {
        name: "ISLEMLER",
        width: "350px",
        cell: (row) => {
          const isAdmin = user.role == "admin";
          let element = (
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                style={{
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
                onClick={() => handleAddFavorites(row)}
              >
                <FaHeart />
              </button>
              
              <button
                style={{
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
                onClick={() => handleBookTrack(row)}
              >
                Takip Et
              </button>
              
              <button
                style={{
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
                onClick={() => handleBookReservation(row)}
              >
                Rezerve Et
              </button>
              
              <Link
                to={`/book-detail/${row.id}`}
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
          )

          if(isAdmin) return (
            <div className="flex gap-2">
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
  
              <button
                style={{
                  backgroundColor: "#ffc107",
                  color: "black",
                  border: "none",
                  padding: "5px 10px",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
                onClick={() => handleLoanBook(row)}
              >
                Kitap Ver
              </button>
  
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
          )
          return element;
        }
        },
    ];
  }, [bookList, hiddenColumns]);

  if (loading) return <>Loading...</>;

  return (
    <>
        <div className="flex items-center justify-between">
            <div className="flex px-5">
              <h1 className="text-4xl">Kitaplar</h1>
            </div>
            <button onClick={() => setOpen(!open)} className="bg-black text-white hover:cursor-pointer my-5 mx-5 py-3 px-2 rounded-2xl">
                Kitap Ekle
            </button>
        </div>
      <Tables columns={columns} data={bookList} loading={loading} />
      <AddBookModal deneme={deneme} setDeneme={setDeneme} open={open} setOpen={setOpen} />
      <LoanBookModal deneme={deneme} setDeneme={setDeneme} bookObject={bookObject} open={bookLoanOpen} setOpen={setBookLoanOpen} />
      <EditBookModal deneme={deneme} setDeneme={setDeneme} bookObject={bookObject} open={bookEditOpen} setOpen={setBookEditOpen} />
      <DeleteBookModal deneme={deneme} setDeneme={setDeneme} bookObject={bookObject} open={bookDeleteOpen} setOpen={setBookDeleteOpen} />
    </>
  );
};

export default Books;
