// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { BASE_URL } from './utils/constants';

// function HistoryPage() {
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchHistory() {
//       try {
//         const res = await axios.get(`${BASE_URL}/kit-qr-history/`);
//         // console.log(res.data)
//         // setHistory(res.data);
//         setHistory(res.data.results || []);
//       } catch (err) {
//         alert("Failed to fetch history");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchHistory();
//   }, []);

//   return (
//     <div style={{ padding: 24 }}>
//       <h2>QR Code History</h2>
//       {loading && <div>Loading...</div>}
//       <button onClick={() => window.location.href = "/"}>Back to Generator</button>
//       {!loading && history.length === 0 && <div>No history found.</div>}
//       <div style={{ marginTop: 24 }}>
//         {history.map((entry, idx) => (
//           <div
//             key={idx}
//             style={{
//               border: '1px solid #ccc',
//               borderRadius: 8,
//               marginBottom: 32,
//               padding: 16,
//             }}
//           >
//             <div><b>Type:</b> {entry.type}</div>
//             <div><b>Kit ID:</b> {entry.kit_id}</div>
//             <div><b>Production Unit:</b> {entry.prod_unit}</div>
//             <div><b>Warehouse:</b> {entry.warehouse}</div>
//             <div><b>Project ID:</b> {entry.project_id}</div>
//             <div><b>Total Kits:</b> {entry.Total_Kit}</div>
//             <div><b>Date:</b> {entry.date}</div>
//             <div style={{ marginTop: 12 }}><b>QR Images:</b></div>
//             <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 8 }}>
//               {(entry.qr_images || []).map((qr, i) => (
//                 <div key={i} style={{ textAlign: 'center' }}>
//                   <div style={{ fontSize: 14, marginBottom: 4 }}>Kit {qr.kit_no}</div>
//                   <img
//                     src={qr.image}
//                     alt={`QR Kit ${qr.kit_no}`}
//                     style={{ width: 128, height: 128, border: '1px solid #aaa', borderRadius: 6 }}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default HistoryPage;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { BASE_URL } from './utils/constants';

// const ACCENT = "#FAD90E";
// const PRIMARY_BG = "#0B0B0E";
// const CARD_BG = "#18181b";
// const FG = "#fff";

// // Helper for card stats
// function Stat({ label, value }) {
//   return (
//     <div style={{ marginBottom: 0, minWidth: 0 }}>
//       <div style={{
//         fontSize: 13.5,
//         color: "#ededed",
//         marginBottom: 2,
//         letterSpacing: 0.1,
//         fontWeight: 600
//       }}>{label}</div>
//       <div style={{
//         fontWeight: 700,
//         fontSize: 17,
//         color: "#fad90e",
//         wordWrap: "break-word"
//       }}>{value != null && value !== "" ? value : <span style={{ color: "#ccc" }}>-</span>}</div>
//     </div>
//   );
// }

// function HistoryPage() {
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchHistory() {
//       try {
//         const res = await axios.get(`${BASE_URL}/kit-qr-history/`);
//         setHistory(res.data.results || []);
//       } catch (err) {
//         alert("Failed to fetch history");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchHistory();
//   }, []);

//   return (
//     <div style={{
//       width: "100vw",
//       height: "100vh",
//       minHeight: "100vh",
//       background: PRIMARY_BG,
//       color: FG,
//       fontFamily: "Inter, 'Segoe UI', Arial, sans-serif",
//       overflowX: 'hidden',
//       position: 'fixed', // locks to full window size
//       top: 0,
//       left: 0
//     }}>
//       <div style={{
//         maxWidth: 900,
//         margin: "0 auto",
//         padding: "0 18px"
//       }}>
//         <h2 style={{
//           fontSize: 28,
//           fontWeight: 800,
//           letterSpacing: 0.5,
//           color: ACCENT,
//           textShadow: `0 2px 10px rgba(250,217,14,0.15)`
//         }}>QR Code History</h2>
//         {/* Navigation */}
//         <div style={{ margin: '16px 0 32px', display: 'flex', alignItems: 'center' }}>
//           <button
//             onClick={() => window.location.href = "/"}
//             style={{
//               background: ACCENT,
//               color: "#23232a",
//               border: 'none',
//               padding: "11px 26px",
//               borderRadius: 24,
//               fontWeight: 700,
//               boxShadow: `0 2px 12px #fad90e50`,
//               letterSpacing: 1,
//               cursor: 'pointer',
//               fontSize: 16,
//               transition: 'background 0.15s'
//             }}
//           >← Back to Generator</button>
//         </div>

//         {/* Loader and Nothing found */}
//         {loading && (
//           <div style={{ color: ACCENT, fontWeight: 700, margin: '36px 0', letterSpacing: 1 }}>
//             Loading...
//           </div>
//         )}
//         {!loading && history.length === 0 && (
//           <div style={{
//             color: "#b0b0b0",
//             background: "#18181b",
//             padding: 24,
//             borderRadius: 14,
//             marginTop: 36,
//             fontSize: 17,
//             letterSpacing: 0.4,
//             textAlign: "center",
//             boxShadow: "0 2px 8px #1112"
//           }}>No history found.</div>
//         )}

//         <div style={{
//           marginTop: 16,
//           display: "flex",
//           flexDirection: "column",
//           gap: 30,
//         }}>
//           {history.map((entry, idx) => (
//             <div
//               key={idx}
//               style={{
//                 background: CARD_BG,
//                 border: `1.7px solid ${ACCENT}`,
//                 borderRadius: 18,
//                 padding: "22px 26px 20px 26px",
//                 boxShadow: '0 2px 16px #fad90e16,0 4px 18px #0003',
//               }}
//             >
//               <div style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))",
//                 gap: 13,
//                 marginBottom: 9
//               }}>
//                 <Stat label="Type" value={entry.type} />
//                 <Stat label="Kit ID" value={entry.kit_id} />
//                 <Stat label="Prod. Unit" value={entry.prod_unit} />
//                 <Stat label="Warehouse" value={entry.warehouse} />
//                 <Stat label="Project ID" value={entry.project_id} />
//                 <Stat label="Total Kits" value={entry.Total_Kit} />
//                 <Stat label="Date" value={entry.date} />
//               </div>
//               <div>
//                 <div style={{
//                   color: ACCENT,
//                   fontWeight: 700,
//                   marginBottom: 8,
//                   marginTop: 9,
//                   fontSize: 16,
//                   letterSpacing: 0.2
//                 }}>QR Images</div>
//                 <div
//                   style={{
//                     display: 'flex',
//                     flexWrap: 'wrap',
//                     gap: 20,
//                     marginTop: 8,
//                     overflowX: 'auto',
//                     paddingBottom: 2,
//                   }}>
//                   {/* QR Cards */}
//                   {(entry.qr_images || []).length > 0 ?
//                     entry.qr_images.map((qr, i) => (
//                       <div key={i} style={{
//                         textAlign: 'center',
//                         background: "#212124",
//                         borderRadius: 8,
//                         boxShadow: "0 1.5px 8px #0006",
//                         minWidth: 130,
//                         width: 130,
//                         height: 165,
//                         padding: 0,
//                         border: `1.2px solid ${ACCENT}`,
//                         display: 'flex',
//                         flexDirection: 'column',
//                         justifyContent: 'flex-start',
//                         alignItems: 'center',
//                         overflow: 'hidden'
//                       }}>
//                         <div style={{
//                           fontSize: 14,
//                           marginBottom: 0,
//                           color: ACCENT,
//                           fontWeight: 600,
//                           background: "#18181b",
//                           width: "100%",
//                           padding: "7px 0 5px",
//                           borderBottom: `1px solid ${ACCENT}`,
//                           letterSpacing: 0.1
//                         }}>Kit {qr.kit_no}</div>
//                         <img
//                           src={qr.image}
//                           alt={`QR Kit ${qr.kit_no}`}
//                           style={{
//                             width: "100%",
//                             height: "calc(100% - 36px)", // 36px for label
//                             objectFit: "contain",
//                             border: "none",
//                             display: "block",
//                             background: "#fff"
//                           }}
//                         />
//                       </div>
//                     )) :
//                     <div style={{
//                       color: "#aaa", fontStyle: "italic", fontSize: 15,
//                       alignSelf: "center"
//                     }}>(No QR images)</div>
//                   }
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       {/* Custom Scrollbar Style */}
//       <style>
//         {`
//         ::-webkit-scrollbar {height: 10px;}
//         ::-webkit-scrollbar-thumb { background: #fad90e; border-radius: 8px;}
//         ::-webkit-scrollbar-track { background: #23232a;}
//         `}
//       </style>
//     </div>
//   );
// }

// export default HistoryPage;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from './utils/constants';

const ACCENT = "#FAD90E";
const PRIMARY_BG = "#0B0B0E";
const CARD_BG = "#18181b";
const FG = "#fff";

function Stat({ label, value }) {
  return (
    <div style={{ marginBottom: 0, minWidth: 0 }}>
      <div style={{
        fontSize: 13.5,
        color: "#ededed",
        marginBottom: 2,
        letterSpacing: 0.1,
        fontWeight: 600
      }}>{label}</div>
      <div style={{
        fontWeight: 700,
        fontSize: 17,
        color: "#fad90e",
        wordWrap: "break-word"
      }}>{value != null && value !== "" ? value : <span style={{ color: "#ccc" }}>-</span>}</div>
    </div>
  );
}

function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await axios.get(`${BASE_URL}/kit-qr-history/`);
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
    <div style={{
      width: "100vw",
      height: "100vh",
      minHeight: "100vh",
      background: PRIMARY_BG,
      color: FG,
      fontFamily: "Inter, 'Segoe UI', Arial, sans-serif",
      overflowX: 'hidden',
      position: 'fixed',
      top: 0,
      left: 0
    }}>
      <div style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "0 18px"
      }}>
        <h2 style={{
          fontSize: 28,
          fontWeight: 800,
          letterSpacing: 0.5,
          color: ACCENT,
          textShadow: `0 2px 10px rgba(250,217,14,0.15)`
        }}>QR Code History</h2>
        {/* Navigation */}
        <div style={{ margin: '16px 0 32px', display: 'flex', alignItems: 'center' }}>
          <button
            onClick={() => window.location.href = "/"}
            style={{
              background: ACCENT,
              color: "#23232a",
              border: 'none',
              padding: "11px 26px",
              borderRadius: 24,
              fontWeight: 700,
              boxShadow: `0 2px 12px #fad90e50`,
              letterSpacing: 1,
              cursor: 'pointer',
              fontSize: 16,
              transition: 'background 0.15s'
            }}
          >← Back to Generator</button>
        </div>

        {/* Loader and Nothing found */}
        {loading && (
          <div style={{ color: ACCENT, fontWeight: 700, margin: '36px 0', letterSpacing: 1 }}>
            Loading...
          </div>
        )}
        {!loading && history.length === 0 && (
          <div style={{
            color: "#b0b0b0",
            background: "#18181b",
            padding: 24,
            borderRadius: 14,
            marginTop: 36,
            fontSize: 17,
            letterSpacing: 0.4,
            textAlign: "center",
            boxShadow: "0 2px 8px #1112"
          }}>No history found.</div>
        )}

        <div style={{
          marginTop: 16,
          display: "flex",
          flexDirection: "column",
          gap: 30,
        }}>
          {history.map((entry, idx) => (
            <div
              key={idx}
              style={{
                background: CARD_BG,
                border: `1.7px solid ${ACCENT}`,
                borderRadius: 18,
                padding: "22px 26px 20px 26px",
                boxShadow: '0 2px 16px #fad90e16,0 4px 18px #0003',
              }}
            >
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))",
                gap: 13,
                marginBottom: 9
              }}>
                <Stat label="Type" value={entry.type} />
                <Stat label="Kit ID" value={entry.kit_id} />
                <Stat label="Prod. Unit" value={entry.prod_unit} />
                <Stat label="Warehouse" value={entry.warehouse} />
                <Stat label="Project ID" value={entry.project_id} />
                <Stat label="Total Kits" value={entry.Total_Kit} />
                <Stat label="Date" value={entry.date} />
              </div>
              <div>
                <div style={{
                  color: ACCENT,
                  fontWeight: 700,
                  marginBottom: 8,
                  marginTop: 9,
                  fontSize: 16,
                  letterSpacing: 0.2
                }}>QR Image</div>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 20,
                  marginTop: 8,
                  overflowX: 'auto',
                  paddingBottom: 2,
                }}>
                  {entry.qr_image ?
                    <div style={{
                      textAlign: 'center',
                      background: "#212124",
                      borderRadius: 8,
                      boxShadow: "0 1.5px 8px #0006",
                      minWidth: 130,
                      width: 130,
                      height: 165,
                      padding: 0,
                      border: `1.2px solid ${ACCENT}`,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      overflow: 'hidden'
                    }}>
                      <img
                        src={entry.qr_image}
                        alt={`QR for ${entry.kit_id}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          border: "none",
                          display: "block",
                          background: "#fff"
                        }}
                      />
                    </div>
                    :
                    <div style={{
                      color: "#aaa", fontStyle: "italic", fontSize: 15,
                      alignSelf: "center"
                    }}>(No QR image)</div>
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Custom Scrollbar Style */}
      <style>
        {`
        ::-webkit-scrollbar {height: 10px;}
        ::-webkit-scrollbar-thumb { background: #fad90e; border-radius: 8px;}
        ::-webkit-scrollbar-track { background: #23232a;}
        `}
      </style>
    </div>
  );
}

export default HistoryPage;
