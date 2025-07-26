import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from './utils/constants';
//const base_url = 'http://10.20.2.78:8000/api'; // Replace with your actual backend URL

function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await axios.get(`${BASE_URL}/kit-qr-history/`);
        // console.log(res.data)
        // setHistory(res.data);
        setHistory(res.data.results || []);
      } catch (err) {
        alert("Failed to fetch history");
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>QR Code History</h2>
      {loading && <div>Loading...</div>}
      <button onClick={() => window.location.href = "/"}>Back to Generator</button>
      {!loading && history.length === 0 && <div>No history found.</div>}
      <div style={{ marginTop: 24 }}>
        {history.map((entry, idx) => (
          <div
            key={idx}
            style={{
              border: '1px solid #ccc',
              borderRadius: 8,
              marginBottom: 32,
              padding: 16,
            }}
          >
            <div><b>Type:</b> {entry.type}</div>
            <div><b>Kit ID:</b> {entry.kit_id}</div>
            <div><b>Production Unit:</b> {entry.prod_unit}</div>
            <div><b>Warehouse:</b> {entry.warehouse}</div>
            <div><b>Project ID:</b> {entry.project_id}</div>
            <div><b>Total Kits:</b> {entry.Total_Kit}</div>
            <div><b>Date:</b> {entry.date}</div>
            <div style={{ marginTop: 12 }}><b>QR Images:</b></div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 8 }}>
              {(entry.qr_images || []).map((qr, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 14, marginBottom: 4 }}>Kit {qr.kit_no}</div>
                  <img
                    src={qr.image}
                    alt={`QR Kit ${qr.kit_no}`}
                    style={{ width: 128, height: 128, border: '1px solid #aaa', borderRadius: 6 }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryPage;
