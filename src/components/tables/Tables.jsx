import React, { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import "./tables.css";
import { REASON_CHOICES_OBJ, STATUS } from "../../utils/config";

const Tables = ({ columns, data, loading }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);

  const customStyle = {
    headCells: {
      style: {
        backgroundColor: "black",
        color: "#FAF4F0", // ✅ Başlık yazı rengi
        fontSize: "17px",
        fontWeight: "bolder",
      },
    },
    rows: {
      style: {
        backgroundColor: "#FAF4F0", // ✅ Satır arka plan rengi
        "&:hover": {
          backgroundColor: "#e0e0e0", // ✅ Satır hover rengi
          transition: "background-color 0.3s ease-in-out",
        },
      },
    },
    pagination: {
      style: {
        backgroundColor: "#FAF4F0", // ✅ Sayfalama arka planı (Açık gri)
        borderTop: "1px solid #ddd", // ✅ Üst çizgi ile ayırma
        padding: "10px",
      },
      pageButtonsStyle: {
        color: "black", // ✅ Sayfa numarası yazı rengi
        backgroundColor: "#fff", // ✅ Arka plan rengi
        border: "1px solid #ddd", // ✅ Buton kenarlık
        borderRadius: "5px",
        padding: "5px 10px",
        margin: "0 5px",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#e0e0e0", // ✅ Hover rengi (Açık gri)
        },
        "&.selected": {
          backgroundColor: "#007bff", // ✅ Seçili sayfa rengi (Mavi)
          color: "white",
          fontWeight: "bold",
        },
      },
    },
    // ✅ ExpandableRow (Detay Açılır Satır) Stili
    expanderCell: {
      style: {
        backgroundColor: "#FAF4F0", // ✅ Açılır butonun bulunduğu hücre rengi
        borderRight: "1px solid #aaa",
      },
    },
    expanderRow: {
      style: {
        backgroundColor: "#FAF4F0", // ✅ Açılan satırın arka planı (Satırlarla aynı renk)
        borderBottom: "1px solid #ddd",
        padding: "10px",
      },
    },
  };

    const filteredRecords = useMemo(() => {
      if (!searchQuery) return data;

      return data.filter((item) =>
          (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.language && item.language.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.first_name && item.first_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.last_name && item.last_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.isbn && item.isbn.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }, [searchQuery, data]);

  const ExpandedRow = ({ data }) => {
    return (
      <div className="expanded-row">
        <h4>Detaylar</h4>
        <div className="details-grid">
          {Object.entries(data).map(([key, value]) => {
            if (!value) value = "Veri Yok";
            const exclude = ["id","created_at","updated_at","category","author","publisher"];
            if(exclude.includes(key)) return;

            // Kapak görseli için resim etiketi ekle
            if (key === "cover_image") {
              value = <img src={value} alt="Kapak" width="100" />;
            }

            if (key === "profile_picture") {
              value = <img src={value} alt="Kapak" width="100" />;
            }
            
            if (key === "status") {
              value = STATUS[value].text;
            }

            if(key === "loans") value = value.map(r => `${r.book_title}`).join(", ");
            if(key === "reservations") value = value.map(r => `${r.book_title}`).join(", ");
            if(key === "favorite_books") value = value.map(f => `${f.title}`).join(", ");
            if(key === "penalties") value = value.map(f => `${REASON_CHOICES_OBJ[f.reason]}`).join(", ");

            return (
              <div key={key} className="detail-item">
                <strong>{key.replace(/_/g, " ").toUpperCase()}:</strong> {value}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Arayın.."
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            minWidth: "300px",
            padding: "8px",
            marginBottom: "10px",
            marginLeft: "45px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        {filteredRecords.length === 0 && <p>Aramanızla eşleşen sonuç bulunamadı.</p>}

        <DataTable
          columns={columns}
          data={filteredRecords}
          customStyles={customStyle}
          progressPending={loading} // Yükleme durumu
          pagination
          expandableRows
          expandableRowsComponent={ExpandedRow} // ✅ Satıra tıklayınca detay açılır
          onRowClicked={(row) =>
            setExpandedRow(row.id === expandedRow ? null : row.id)
          }
        />
      </div>
    </>
  );
};

export default Tables;
