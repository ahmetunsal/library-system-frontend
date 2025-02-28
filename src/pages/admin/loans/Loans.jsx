import React, { useContext, useEffect, useMemo, useState } from "react";
import { context } from "../../../_context/GlobalContext";
import Tables from "../../../components/tables/Tables";
import BookReturnedModal from "../../../components/modal/loan/BookReturnedModal";
import BookPenaltyModal from "../../../components/modal/loan/BookPenaltyModal";

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
        console.log("all_loansss", response);
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

  const handleBookReturned = async (obj) => {
    console.log("OBJ_LOAN_BOOK_RETURN", obj);
    setBookObject(obj);
    setBookDeleteOpen(!bookDeleteOpen)
  }

  const handlePenalty = async (obj) => {
    console.log("OBJ_PENALTY", obj);
    setBookObject(obj);
    setBookEditOpen(!bookEditOpen);
  }

  const hiddenColumns = [
    "id",
    // "is_returned "
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
            if (key === "is_returned") return value ? "Aktif" : "Dışarıda";

            if (!value) return "Veri Yok";

            
            if(key == "user_info") return `${value["tckn"] ? value["tckn"] : value["username"]} - ${value["first_name"]} ${value["last_name"]} - ${value["loans"][value['loans'].length-1].due_date}`;
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
        cell: (row) => {
          const due_date = new Date(row.user_info.loans[row.user_info.loans.length-1].due_date).getTime() || "";
          const now = new Date().getTime();
          let element;

          if(due_date < now) element = (
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
                Mail At
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
              onClick={() => handlePenalty(row)}
            >
              Ceza Ver
            </button>
            </div>
          )

          return (
            <>
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
                  onClick={() => handleBookReturned(row)}
                >
                  Kitap Geldi
                </button>
                {element}
              </div>
            </>
          )
        }
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
      <Tables columns={columns} data={loansList.filter(loan => !loan.is_returned)} loading={loading} />
      <BookReturnedModal deneme={deneme} setDeneme={setDeneme} loanObject={loanObject} open={bookDeleteOpen} setOpen={setBookDeleteOpen} />
      <BookPenaltyModal deneme={deneme} setDeneme={setDeneme} penaltyObject={loanObject} open={bookEditOpen} setOpen={setBookEditOpen} />
    </>
  );
};

export default Loans;
