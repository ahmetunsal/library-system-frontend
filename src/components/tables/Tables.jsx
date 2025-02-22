import React, { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import "./tables.css";

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

  // console.log("COLUMNS", columns);
  // console.log("DATA", data);

  // 🟢 useMemo ile performans optimizasyonu
    const filteredRecords = useMemo(() => {
      if (!searchQuery) return data;

      return data.filter((item) =>
          (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.language && item.language.toLowerCase().includes(searchQuery.toLowerCase())) || // 🔥 Alternatif alan eklendi
          (item.first_name && item.first_name.toLowerCase().includes(searchQuery.toLowerCase())) || // 🔥 Alternatif alan eklendi
          (item.last_name && item.last_name.toLowerCase().includes(searchQuery.toLowerCase())) // 🔥 Alternatif alan eklendi
      );
    }, [searchQuery, data]);

  // ✅ Detay Satır Bileşeni
  const ExpandedRow = ({ data }) => {
    return (
      <div className="expanded-row">
        <h4>Detaylar</h4>
        <div className="details-grid">
          {Object.entries(data).map(([key, value]) => {
            if (!value) value = "Veri Yok";

            // Kategori nesneyse adını al
            if (key === "category" && typeof value === "object") {
              value = value.name;
            }

            // Yazarlar array ise ad ve soyadları birleştir
            if (key === "author" && Array.isArray(value)) {
              value = value
                .map((a) => `${a.first_name} ${a.last_name}`)
                .join(", ");
            }

            // Yayınevi nesneyse adını al
            if (key === "publisher" && typeof value === "object") {
              value = value.name;
            }

            // Kapak görseli için resim etiketi ekle
            if (key === "cover_image") {
              value = <img src={value} alt="Kapak" width="100" />;
            }

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
          placeholder="Search by title"
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "300px",
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
