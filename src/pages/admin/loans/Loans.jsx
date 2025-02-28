import React, { useContext, useEffect, useMemo, useState } from "react";
import { context } from "../../../_context/GlobalContext";
import Tables from "../../../components/tables/Tables";

const Loans = () => {
  const { user, getAllLoans, } = useContext(context);
  const [loading, setLoading] = useState(true);
  const [loansList, setBookList] = useState([]);
  const [open, setOpen] = useState(false);

  const [bookLoanOpen, setBookLoanOpen] = useState(false);
  const [bookEditOpen, setBookEditOpen] = useState(false);
  const [bookDeleteOpen, setBookDeleteOpen] = useState(false);
  const [loanObject, setBookObject] = useState();
  
  const [deneme, setDeneme] = useState(false);

  useEffect(() => {
    const loanStatus = async () => {
      try {
        const response = await getAllLoans(); // API çağrısı
        console.log("SA", response);
        // console.log("Bayi Status:", response.data); // Gelen veriyi kontrol et
        setBookList(response.data); // 🟢 Yalnızca `results` dizisini kaydet
      } catch (error) {
        //console.error("Bayi Status Error:", error); // Hataları kontrol et
      } finally {
        setLoading(false); // Yükleme durumunu kapat
      }
    };

    loanStatus();
  }, []);
  
  
  useEffect(() => {
    const loanStatus = async () => {
      try {
        const response = await getAllLoans(); // API çağrısı
        // console.log("SA", response);
        // console.log("Bayi Status:", response.data); // Gelen veriyi kontrol et
        setBookList(response.data); // 🟢 Yalnızca `results` dizisini kaydet
      } catch (error) {
        //console.error("Bayi Status Error:", error); // Hataları kontrol et
      } finally {
        setLoading(false); // Yükleme durumunu kapat
      }
    };

    loanStatus();
  }, [deneme]);

  const handleEdit = async (obj) => {
    setBookObject(obj);
    setBookEditOpen(!bookEditOpen)
  }

  const handleDelete = async (obj) => {
    setBookObject(obj);
    setBookDeleteOpen(!bookDeleteOpen)
  }

  const hiddenColumns = [
    "id"
  ]; //

  const columns = useMemo(() => {
    if (!loansList || loansList.length === 0 || !loansList[0]) return [];

    return [
      ...Object.keys(loansList[0] || {})
        .filter((key) => !hiddenColumns.includes(key))
        .map((key) => ({
          name: key.replace(/_/g, " ").toUpperCase(),
          selector: (row) => {
            const value = row[key];

            if (!value) return "Veri Yok";

            if(key == "user_info") return `${value["tckn"] ? value["tckn"] : value["username"]} - ${value["first_name"]} ${value["last_name"]}`;
            if(key == "book_info") return `${value["title"]}`;

            if (typeof value === "object") {
                return JSON.stringify(value);  // Obje ise stringe çevir
            }

            return value;
          },
          sortable: true,
        })),
      {
        name: "ISLEMLER",
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
  }, [loansList, hiddenColumns]);

  //   if (!roleConditions[user.role]) return <>Not found.</>;
  if (loading) return <>Loading...</>;

  return (
    <>
        <div className="flex items-center justify-between">
            <div className="flex px-5">
              <h1 className="text-4xl">Ödünç Verilenler</h1>
            </div>
            <button onClick={() => setOpen(!open)} className="bg-black text-white hover:cursor-pointer my-5 mx-5 py-3 px-2 rounded-2xl">
                Kitap Ekle
            </button>
        </div>
      <Tables columns={columns} data={loansList} loading={loading} />
      {/* <AddBookModal deneme={deneme} setDeneme={setDeneme} open={open} setOpen={setOpen} />
      <LoanBookModal deneme={deneme} setDeneme={setDeneme} loanObject={loanObject} open={bookLoanOpen} setOpen={setBookLoanOpen} />
      <EditBookModal deneme={deneme} setDeneme={setDeneme} loanObject={loanObject} open={bookEditOpen} setOpen={setBookEditOpen} />
      <DeleteBookModal deneme={deneme} setDeneme={setDeneme} loanObject={loanObject} open={bookDeleteOpen} setOpen={setBookDeleteOpen} /> */}
    </>
  );
};

export default Loans;
