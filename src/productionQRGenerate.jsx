// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import QRCode from 'react-qr-code';
// import Select from 'react-select';

// const base_url = 'http://localhost:8000/api';

// export default function QRGenerator() {
//   const [customers, setCustomers] = useState([]);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [orderCount, setOrderCount] = useState(0);

//   const [kitId, setKitId] = useState('');
//   const [prodUnit, setProdUnit] = useState('');
//   const [warehouse, setWarehouse] = useState('');
//   const [kitQty, setKitQty] = useState(1);

//   const [qrCodes, setQrCodes] = useState([]);

//   useEffect(() => {
//     axios.get(`${base_url}/customers/`).then(res => {
//       const options = res.data.map(cust => ({
//         value: cust.customer_id,
//         label: cust.customer_id,
//       }));
//       setCustomers(options);
//     });
//   }, []);

//   const fetchOrderCount = async (customerId) => {
//     try {
//       const res = await axios.get(`${base_url}/orders/count/${customerId}/`);
//       setOrderCount(res.data.count || 0);
//     } catch (err) {
//       console.error(err);
//       setOrderCount(0);
//     }
//   };

//   const handleCustomerSelect = (selected) => {
//     setSelectedCustomer(selected);
//     fetchOrderCount(selected.value);
//   };

//   const handleGenerate = async () => {
//     if (!selectedCustomer || !kitId || !prodUnit || !warehouse || kitQty < 1) {
//       alert('Please fill all fields');
//       return;
//     }

//     const project_id = `${selectedCustomer.value}/ ${String(orderCount + 1).padStart(2, '0')}`;
//     const date = new Date().toISOString().split('T')[0];

//     const newQRCodes = Array.from({ length: kitQty }).map((_, index) => ({
//       type: 'KIT',
//       kit_id: kitId,
//       prod_unit: prodUnit,
//       warehouse,
//       project_id,
//       kit_no: index + 1,
//       date,
//     }));

//     setQrCodes(newQRCodes);

//     try {
//       await axios.post(`${base_url}/qr/save-bulk/`, newQRCodes);
//       console.log('QR data saved');
//     } catch (err) {
//       console.error('Failed to save QR:', err);
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>QR Generator</h2>

//       <div style={{ marginBottom: 10 }}>
//         <label>Customer ID:</label>
//         <Select
//           options={customers}
//           onChange={handleCustomerSelect}
//           isSearchable
//           placeholder="Select or type customer..."
//         />
//       </div>

//       <input
//         placeholder="Kit ID (e.g., 2P3_2M_10D)"
//         value={kitId}
//         onChange={(e) => setKitId(e.target.value)}
//       />
//       <input
//         placeholder="Production Unit (e.g., RH)"
//         value={prodUnit}
//         onChange={(e) => setProdUnit(e.target.value)}
//       />
//       <input
//         placeholder="Warehouse (e.g., BS)"
//         value={warehouse}
//         onChange={(e) => setWarehouse(e.target.value)}
//       />
//       <input
//         type="number"
//         min="1"
//         value={kitQty}
//         onChange={(e) => setKitQty(parseInt(e.target.value))}
//         placeholder="No of Kits"
//       />

//       <button style={{ marginTop: 10 }} onClick={handleGenerate}>Generate QR Codes</button>

//       <div style={{ marginTop: 20 }}>
//         {qrCodes.map((qr, idx) => (
//           <div key={idx} style={{ marginBottom: 20 }}>
//             <QRCode value={JSON.stringify(qr)} />
//             <pre>{JSON.stringify(qr, null, 2)}</pre>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// import React, { useState } from 'react';
// // import { QRCode } from 'qrcode.react';
// import QRCode from 'react-qr-code';
// import './App.css';

// const clients = [
//   { name: 'ABC Energy', id: 'ABE' },
//   { name: 'Tata Solar', id: 'TSO' },
//   { name: 'Reliance Renewables', id: 'RRE' },
// ];

// const kitTypes = [
//   '2P3-2M-10D',
//   '2P3-2M-15D',
//   '2P5-2M-10D',
//   '2P5-2.5M-15D',
// ];

// const productionUnits = ['Ranchi(RH)', 'Boiser(BS)'];
// const warehouses = ['RH', 'BS', 'CN'];

// function App() {
//   const [client, setClient] = useState(clients[0]);
//   const [orderNumber, setOrderNumber] = useState(1);
//   const [kitType, setKitType] = useState(kitTypes[0]);
//   const [productionUnit, setProductionUnit] = useState(productionUnits[0]);
//   const [warehouse, setWarehouse] = useState(warehouses[0]);
//   const [kitCount, setKitCount] = useState(1);
//   const [qrCodes, setQrCodes] = useState([]);
//   const [useJson, setUseJson] = useState(false);

//   const generateQrCodes = () => {
//     const today = new Date().toISOString().split('T')[0].split('-').reverse().join('-');
//     const projectId = `${client.id}/${String(orderNumber).padStart(2, '0')}`;
//     const qrList = [];

//     for (let i = 1; i <= kitCount; i++) {
//       const qrData = useJson
//         ? JSON.stringify({
//             kit_id: kitType,
//             production_unit: productionUnit,
//             warehouse,
//             project_id: projectId,
//             kit_number: i,
//             date: today,
//           }, null, 2)
//         : `${kitType} | ${productionUnit} | ${warehouse} | ${projectId} | ${i} | ${today}`;
//       qrList.push(qrData);
//     }

//     setQrCodes(qrList);
//   };

//   return (
//     <div className="App">
//       <h1>QR Code Generator for Kits</h1>

//       <div className="form">
//         <label>
//           Client:
//           <select onChange={(e) => setClient(clients.find(c => c.id === e.target.value))}>
//             {clients.map(c => (
//               <option key={c.id} value={c.id}>{c.name}</option>
//             ))}
//           </select>
//         </label>

//         <label>
//           Order Number:
//           <input type="number" value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} />
//         </label>

//         <label>
//           Kit Type:
//           <select onChange={(e) => setKitType(e.target.value)}>
//             {kitTypes.map(k => (
//               <option key={k} value={k}>{k}</option>
//             ))}
//           </select>
//         </label>

//         <label>
//           Production Unit:
//           <select onChange={(e) => setProductionUnit(e.target.value)}>
//             {productionUnits.map(p => (
//               <option key={p} value={p}>{p}</option>
//             ))}
//           </select>
//         </label>

//         <label>
//           Warehouse:
//           <select onChange={(e) => setWarehouse(e.target.value)}>
//             {warehouses.map(w => (
//               <option key={w} value={w}>{w}</option>
//             ))}
//           </select>
//         </label>

//         <label>
//           Number of Kits:
//           <input type="number" value={kitCount} onChange={(e) => setKitCount(e.target.value)} />
//         </label>

//         <label>
//           QR Format:
//           <select onChange={(e) => setUseJson(e.target.value === 'json')}>
//             <option value="text">Plain Text</option>
//             <option value="json">JSON</option>
//           </select>
//         </label>

//         <button onClick={generateQrCodes}>Generate QR Codes</button>
//       </div>

//       <div className="qr-codes">
//         {qrCodes.map((code, idx) => (
//           <div key={idx} className="qr-item">
//             <QRCode value={code} size={128} />
//             <pre>{code}</pre>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;


// import React, { useEffect, useState } from 'react';
// import QRCode from 'react-qr-code';
// import axios from 'axios';
// import './App.css';

// function App() {
//   const [clients, setClients] = useState([]);
//   const [kits, setKits] = useState([]);
//   const [clientId, setClientId] = useState('');
//   const [kitId, setKitId] = useState('');
//   const [orderCount, setOrderCount] = useState(0);
//   const [kitCount, setKitCount] = useState(1);
//   const [prodUnit, setProdUnit] = useState('RH');
//   const [warehouse, setWarehouse] = useState('BS');
//   const [qrCodes, setQrCodes] = useState([]);
//   const [useJson, setUseJson] = useState(true);
//   const [projectId, setProjectId] = useState('');
//   const [today, setToday] = useState('');

//   const base_url = 'http://10.20.2.78:8000/api';

//   const fetchInitialData = async () => {
//     const [clientRes, kitRes] = await Promise.all([
//       axios.get(`${base_url}/clients/`),
//       axios.get(`${base_url}/kits/`)
//     ]);

//     setClients(clientRes.data);
//     setKits(kitRes.data);
//   };

//   useEffect(() => {
//     fetchInitialData();
//   }, []);

//   useEffect(() => {
//     if (clientId) {
//       axios.get(`${base_url}/client-order-count/${clientId}/`)
//         .then(res => setOrderCount(res.data.count + 1))
//         .catch(err => console.error(err));
//     }
//   }, [clientId]);

//   const generateQrCodes = async () => {
//     if (!clientId || !kitId) {
//       alert("Please select both client and kit.");
//       return;
//     }

//     const _today = new Date().toISOString().split('T')[0];
//     const _projectId = `${clientId}/ ${String(orderCount).padStart(2, '0')}`;

//     setToday(_today);
//     setProjectId(_projectId);

//     const payload = {
//       type: "KIT",
//       kit_id: kitId,
//       prod_unit: prodUnit,
//       warehouse,
//       project_id: _projectId,
//       Total_Kit: kitCount,
//       date: _today,
//     };

//     try {
//       const res = await axios.post(`${base_url}/save-qr/`, payload);
//       console.log("QR saved:", res.data);

//       const qrList = [];
//       for (let i = 1; i <= kitCount; i++) {
//         const visualData = {
//           ...payload,
//           kit_no: i
//         };
//         const code = useJson
//           ? JSON.stringify(visualData, null, 2)
//           : Object.values(visualData).join(' | ');
//         qrList.push(code);
//       }

//       setQrCodes(qrList);
//     } catch (error) {
//       console.error("Error saving QR:", error.response?.data || error.message);
//       alert("QR saving failed. Possible duplicate or invalid data.");
//     }
//   };

//   return (
//     <div className="App">
//       <div className="form-container">
//         <h2>Kit QR Code Generator</h2>

//         <label>Client:
//           <select value={clientId} onChange={(e) => setClientId(e.target.value)}>
//             <option value="">-- Select Client --</option>
//             {clients.map(c => (
//               <option key={c.client_id} value={c.client_id}>{c.company_name}</option>
//             ))}
//           </select>
//         </label>

//         <label>Kit:
//           <select value={kitId} onChange={(e) => setKitId(e.target.value)}>
//             <option value="">-- Select Kit --</option>
//             {kits.map(k => (
//               <option key={k.kit_id} value={k.kit_id}>{k.kit_id}</option>
//             ))}
//           </select>
//         </label>

//         <label>Production Unit:
//           <select value={prodUnit} onChange={(e) => setProdUnit(e.target.value)}>
//             <option value="RH">Ranchi(RH)</option>
//             <option value="BS">Boisar(BS)</option>
//           </select>
//         </label>

//         <label>Warehouse:
//           <select value={warehouse} onChange={(e) => setWarehouse(e.target.value)}>
//             <option value="RH">Ranchi(RH)</option>
//             <option value="BS">Boisar(BS)</option>
//             <option value="CN">Chennai(CN)</option>
//           </select>
//         </label>

//         <label>No. of Kits:
//           <input type="number" value={kitCount} onChange={(e) => setKitCount(Number(e.target.value))} />
//         </label>

//         <button onClick={generateQrCodes}>Generate QR Codes</button>
//       </div>

//       <div className="qr-codes">
//         {qrCodes.map((code, i) => (
//           <div key={i} className="qr-item">
//             <QRCode value={code} size={128} />
//             <pre>{`${kitId} | ${prodUnit} | ${warehouse} | ${projectId} | ${i + 1} | ${today}`}</pre>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;

// import React, { useEffect, useState } from 'react';
// import QRCode from 'react-qr-code';
// import axios from 'axios';
// import html2canvas from 'html2canvas';
// import './App.css';

// function ProductionQRGenerate() {
//   const [clients, setClients] = useState([]);
//   const [kits, setKits] = useState([]);
//   const [clientId, setClientId] = useState('');
//   const [kitId, setKitId] = useState('');
//   const [orderCount, setOrderCount] = useState(0);
//   const [kitCount, setKitCount] = useState(1);
//   const [prodUnit, setProdUnit] = useState('RH');
//   const [warehouse, setWarehouse] = useState('BS');
//   const [qrCodes, setQrCodes] = useState([]);
//   const [useJson, setUseJson] = useState(true);
//   const [projectId, setProjectId] = useState('');
//   const [today, setToday] = useState('');

//   const base_url = 'http://10.20.2.78:8000/api';

//   useEffect(() => {
//     const fetchInitialData = async () => {
//       try {
//         const [clientRes, kitRes] = await Promise.all([
//           axios.get(`${base_url}/clients/`),
//           axios.get(`${base_url}/kits/`)
//         ]);
//         setClients(clientRes.data);
//         setKits(kitRes.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchInitialData();
//   }, []);

//   useEffect(() => {
//     if (clientId) {
//       axios
//         .get(`${base_url}/client-order-count/${clientId}/`)
//         .then((res) => setOrderCount(res.data.count + 1))
//         .catch((err) => console.error(err));
//     }
//   }, [clientId]);

//   const generateQrCodes = async () => {
//     if (!clientId || !kitId) {
//       alert('Please select both client and kit.');
//       return;
//     }

//     const _today = new Date().toISOString().split('T')[0];
//     const _projectId = `${clientId}/ ${String(orderCount).padStart(2, '0')}`;

//     setToday(_today);
//     setProjectId(_projectId);

//     const payload = {
//       type: 'KIT',
//       kit_id: kitId,
//       prod_unit: prodUnit,
//       warehouse,
//       project_id: _projectId,
//       Total_Kit: kitCount,
//       date: _today
//     };

//     try {
//       const res = await axios.post(`${base_url}/save-qr/`, payload);
//       console.log('QR saved:', res.data);

//       const qrList = [];
//       for (let i = 1; i <= kitCount; i++) {
//         const visualData = {
//           ...payload,
//           kit_no: i
//         };
//         const code = useJson
//           ? JSON.stringify(visualData, null, 2)
//           : Object.values(visualData).join(' | ');
//         qrList.push(code);
//       }

//       setQrCodes(qrList);
//     } catch (error) {
//       console.error('Error saving QR:', error.response?.data || error.message);
//       alert('QR saving failed. Possible duplicate or invalid data.');
//     }
//   };

//   const handleDownload = async (index) => {
//     const element = document.getElementById(`qr-container-${index}`);
//     const canvas = await html2canvas(element, { scale: 2 });
//     const link = document.createElement('a');
//     link.download = `QR_${index + 1}.png`;
//     link.href = canvas.toDataURL('image/png');
//     link.click();
//   };

//   const handlePrint = async (index) => {
//     const element = document.getElementById(`qr-container-${index}`);
//     const canvas = await html2canvas(element, { scale: 2 });
//     const dataUrl = canvas.toDataURL('image/png');

//     const printWindow = window.open('', '_blank');
//     printWindow.document.write(`
//       <html>
//         <head>
//           <title>Print QR</title>
//           <style>
//             body { margin: 0; text-align: center; }
//             img { width: 4in; height: 6in; margin: 0 auto; display: block; }
//           </style>
//         </head>
//         <body>
//           <img src="${dataUrl}" onload="window.print();window.close();" />
//         </body>
//       </html>
//     `);
//     printWindow.document.close();
//   };

//   return (
//     <div className="App">
//       <div className="form-container">
//         <h2>Kit QR Code Generator</h2>

//         <label>Client:
//           <select value={clientId} onChange={(e) => setClientId(e.target.value)}>
//             <option value="">-- Select Client --</option>
//             {clients.map(c => (
//               <option key={c.client_id} value={c.client_id}>{c.company_name}</option>
//             ))}
//           </select>
//         </label>

//         <label>Kit:
//           <select value={kitId} onChange={(e) => setKitId(e.target.value)}>
//             <option value="">-- Select Kit --</option>
//             {kits.map(k => (
//               <option key={k.kit_id} value={k.kit_id}>{k.kit_id}</option>
//             ))}
//           </select>
//         </label>

//         <label>Production Unit:
//           <select value={prodUnit} onChange={(e) => setProdUnit(e.target.value)}>
//             <option value="RH">Ranchi (RH)</option>
//             <option value="BS">Boisar (BS)</option>
//           </select>
//         </label>

//         <label>Warehouse:
//           <select value={warehouse} onChange={(e) => setWarehouse(e.target.value)}>
//             <option value="RH">Ranchi (RH)</option>
//             <option value="BS">Boisar (BS)</option>
//             <option value="CN">Chennai (CN)</option>
//           </select>
//         </label>

//         <label>No. of Kits:
//           <input
//             type="number"
//             value={kitCount}
//             onChange={(e) => setKitCount(Number(e.target.value))}
//             min="1"
//           />
//         </label>

//         <label>
//           Output Format:
//           <select value={useJson ? "json" : "text"} onChange={(e) => setUseJson(e.target.value === "json")}>
//             <option value="json">JSON</option>
//             <option value="text">Text (pipe separated)</option>
//           </select>
//         </label>

//         <button onClick={generateQrCodes}>Generate QR Codes</button>
//       </div>

//       <div className="qr-codes">
//         {qrCodes.map((code, i) => (
//           <div key={i} className="qr-item">
//             <div id={`qr-container-${i}`}>
//               <QRCode value={code} size={200} />
//               <pre>{`${kitId} | ${prodUnit} | ${warehouse} | ${projectId} | ${i + 1} | ${today}`}</pre>
//             </div>
//             <div className="qr-buttons">
//               <button onClick={() => handleDownload(i)}>Download</button>
//               <button onClick={() => handlePrint(i)}>Print</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ProductionQRGenerate;
// File: src/productionQRGenerate.jsx


// import React, { useEffect, useState } from 'react';
// import QRCode from 'react-qr-code';
// import axios from 'axios';
// import { toPng } from 'html-to-image';
// import jsPDF from 'jspdf';
// import './App.css';

// function App() {
//   const [clients, setClients] = useState([]);
//   const [kits, setKits] = useState([]);
//   const [clientId, setClientId] = useState('');
//   const [kitId, setKitId] = useState('');
//   const [orderCount, setOrderCount] = useState(0);
//   const [kitCount, setKitCount] = useState(1);
//   const [prodUnit, setProdUnit] = useState('RH');
//   const [warehouse, setWarehouse] = useState('BS');
//   const [qrCodes, setQrCodes] = useState([]);
//   const [useJson, setUseJson] = useState(true);
//   const [projectId, setProjectId] = useState('');
//   const [today, setToday] = useState('');

//   // const base_url = 'http://10.20.2.78:8000/api'; working inoffice
//   const base_url = 'http://192.168.1.107:8000/api';

//   const fetchInitialData = async () => {
//     const [clientRes, kitRes] = await Promise.all([
//       axios.get(`${base_url}/clients/`),
//       axios.get(`${base_url}/kits/`)
//     ]);

//     setClients(clientRes.data);
//     setKits(kitRes.data);
//   };

//   useEffect(() => {
//     fetchInitialData();
//   }, []);

//   useEffect(() => {
//     if (clientId) {
//       axios.get(`${base_url}/client-order-count/${clientId}/`)
//         .then(res => setOrderCount(res.data.count))
//         .catch(err => console.error(err));
//     }
//   }, [clientId]);

//   const generateQrCodes = async () => {
//     if (!clientId || !kitId) {
//       alert("Please select both client and kit.");
//       return;
//     }

//     const _today = new Date().toISOString().split('T')[0];
//     const _projectId = `${clientId}/ ${String(orderCount).padStart(2, '0')}`;

//     setToday(_today);
//     setProjectId(_projectId);

//     const payload = {
//       type: "KIT",
//       kit_id: kitId,
//       prod_unit: prodUnit,
//       warehouse,
//       project_id: _projectId,
//       Total_Kit: kitCount,
//       date: _today,
//     };

//     try {
//       const res = await axios.post(`${base_url}/save-qr/`, payload);
//       console.log("QR saved:", res.data);

//       const qrList = [];
//       for (let i = 1; i <= kitCount; i++) {
//         const visualData = {
//           ...payload,
//           kit_no: i
//         };
//         const code = useJson
//           ? JSON.stringify(visualData, null, 2)
//           : Object.values(visualData).join(' | ');
//         qrList.push({ code, label: `${kitId} | ${prodUnit} | ${warehouse} | ${_projectId} | ${i} | ${_today}` });
//       }

//       setQrCodes(qrList);
//     } catch (error) {
//       console.error("Error saving QR:", error.response?.data || error.message);
//       alert("QR saving failed. Possible duplicate or invalid data.");
//     }
//   };

//   const handleDownload = async (index) => {
//     const node = document.getElementById(`qr-block-${index}`);
//     try {
//       const dataUrl = await toPng(node);
//       const link = document.createElement('a');
//       link.download = `QR_${index + 1}.png`;
//       link.href = dataUrl;
//       link.click();
//     } catch (err) {
//       console.error('Download failed:', err);
//     }
//   };

//   const handlePrint = async (index) => {
//     const node = document.getElementById(`qr-block-${index}`);
//     try {
//       const dataUrl = await toPng(node);
//       const win = window.open();
//       if (!win) return;

//       win.document.write(`
//         <html>
//           <head><title>Print QR</title></head>
//           <body style="margin:0; padding:0; display:flex; justify-content:center; align-items:center; height:100vh;">
//             <img src="${dataUrl}" style="width:6cm; height:auto;" onload="window.print(); window.close()" />
//           </body>
//         </html>
//       `);
//       win.document.close();
//     } catch (err) {
//       console.error('Print failed:', err);
//     }
//   };

//   const handleDownloadPDF = async () => {
//     const pdf = new jsPDF({
//       orientation: 'portrait',
//       unit: 'cm',
//       format: 'a4'
//     });

//     const margin = 2;
//     const qrSize = 6;
//     let x = margin;
//     let y = margin;

//     for (let i = 0; i < qrCodes.length; i++) {
//       const node = document.getElementById(`qr-block-${i}`);
//       if (!node) continue;

//       try {
//         const dataUrl = await toPng(node);
//         pdf.addImage(dataUrl, 'PNG', x, y, qrSize, qrSize + 1.2);
//         x += qrSize + margin;

//         if (x + qrSize > 21) {
//           x = margin;
//           y += qrSize + 2;
//         }

//         if (y + qrSize > 29.7 - margin) {
//           pdf.addPage();
//           x = margin;
//           y = margin;
//         }
//       } catch (err) {
//         console.error('Error rendering QR to PDF:', err);
//       }
//     }

//     pdf.save('All_QRCodes.pdf');
//   };

//   return (
//     <div className="App">
//       <div className="form-container">
//         <h2>Kit QR Code Generator</h2>

//         <label>Client:
//           <select value={clientId} onChange={(e) => setClientId(e.target.value)}>
//             <option value="">-- Select Client --</option>
//             {clients.map(c => (
//               <option key={c.client_id} value={c.client_id}>{c.company_name}</option>
//             ))}
//           </select>
//         </label>

//         <label>Kit:
//           <select value={kitId} onChange={(e) => setKitId(e.target.value)}>
//             <option value="">-- Select Kit --</option>
//             {kits.map(k => (
//               <option key={k.kit_id} value={k.kit_id}>{k.kit_id}</option>
//             ))}
//           </select>
//         </label>

//         <label>Production Unit:
//           <select value={prodUnit} onChange={(e) => setProdUnit(e.target.value)}>
//             <option value="RH">Ranchi(RH)</option>
//             <option value="BS">Boisar(BS)</option>
//           </select>
//         </label>

//         <label>Warehouse:
//           <select value={warehouse} onChange={(e) => setWarehouse(e.target.value)}>
//             <option value="RH">Ranchi(RH)</option>
//             <option value="BS">Boisar(BS)</option>
//             <option value="CN">Chennai(CN)</option>
//           </select>
//         </label>

//         <label>No. of Kits:
//           <input type="number" value={kitCount} onChange={(e) => setKitCount(Number(e.target.value))} />
//         </label>

//         <button onClick={generateQrCodes}>Generate QR Codes</button>
//       </div>

//       {qrCodes.length > 0 && (
//         <div style={{ textAlign: 'center', marginTop: '1rem' }}>
//           <button onClick={handleDownloadPDF} style={{ backgroundColor: '#6c63ff', padding: '0.75rem 1.5rem', fontSize: '1rem', borderRadius: '8px', color: 'white', border: 'none', cursor: 'pointer' }}>
//             Download All as PDF
//           </button>
//         </div>
//       )}

//       <div className="qr-codes">
//         {qrCodes.map((item, i) => (
//           <div key={i} className="qr-item">
//             <div id={`qr-block-${i}`} className="qr-block">
//               <div className="qr-svg-wrapper" style={{ position: 'relative' }}>
//   <QRCode value={item.code} size={227} />
//   <img
//     src="/Logo.png"  // <-- Important: leading slash
//     alt="Logo"
//     className="qr-logo"
//   />
// </div>

//               <div className="qr-label">{item.label}</div>
//             </div>
//             <div className="qr-buttons">
//               <button onClick={() => handlePrint(i)}>Print</button>
//               <button onClick={() => handleDownload(i)}>Download</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;


// import React, { useEffect, useState } from 'react';
// import QRCode from 'react-qr-code';
// import axios from 'axios';
// import { toPng } from 'html-to-image';
// import jsPDF from 'jspdf';

// import './App.css';

// function App() {
//   const [clients, setClients] = useState([]);
//   const [kits, setKits] = useState([]);
//   const [clientId, setClientId] = useState('');
//   const [kitId, setKitId] = useState('');
//   const [orderCount, setOrderCount] = useState(0);
//   const [kitCount, setKitCount] = useState(1);
//   const [prodUnit, setProdUnit] = useState('RH');
//   const [warehouse, setWarehouse] = useState('BS');
//   const [qrCodes, setQrCodes] = useState([]);
//   const [useJson, setUseJson] = useState(true);
//   const [projectId, setProjectId] = useState('');
//   const [today, setToday] = useState('');

//   const base_url = 'http://10.20.2.78:8000/api'; // office URL
//   // const base_url = 'http://192.168.1.110:8000/api';      //PG URL

//   useEffect(() => {
//     const fetchInitialData = async () => {
//       try {
//         const [clientRes, kitRes] = await Promise.all([
//           axios.get(`${base_url}/clients/`),
//           axios.get(`${base_url}/kits/`)
//         ]);
//         setClients(clientRes.data);
//         setKits(kitRes.data);
//       } catch (error) {
//         console.error('Error fetching clients/kits:', error);
//       }
//     };

//     fetchInitialData();
//   }, []);

//   useEffect(() => {
//     if (clientId) {
//       axios.get(`${base_url}/client-order-count/${clientId}/`)
//         .then(res => setOrderCount(res.data.count))
//         .catch(err => console.error(err));
//     }
//   }, [clientId]);

//   const generateQrCodes = async () => {
//     if (!clientId || !kitId) {
//       alert("Please select both client and kit.");
//       return;
//     }

//     const _today = new Date().toISOString().split('T')[0];
//     const _projectId = `${clientId}/${String(orderCount).padStart(2, '0')}`;
//     setToday(_today);
//     setProjectId(_projectId);

//     const payload = {
//       type: "KIT",
//       kit_id: kitId,
//       prod_unit: prodUnit,
//       warehouse,
//       project_id: _projectId,
//       Total_Kit: kitCount,
//       date: _today,
//     };

//     try {
//       const res = await axios.post(`${base_url}/save-qr/`, payload);
//       console.log("QR saved:", res.data);

//       const qrList = [];
//       for (let i = 1; i <= kitCount; i++) {
//         const visualData = { ...payload, kit_no: i };
//         const code = useJson
//           ? JSON.stringify(visualData, null, 2)
//           : Object.values(visualData).join(' | ');

//         qrList.push({
//           code,
//           label: `${kitId} | ${prodUnit} | ${warehouse} | ${_projectId} | ${i} | ${_today}`
//         });
//       }

//       setQrCodes(qrList);
//     } catch (error) {
//       console.error("Error saving QR:", error);
//       alert("QR saving failed. Possible duplicate or invalid data.");
//     }
//   };

//   const handleDownload = async (index) => {
//     const node = document.getElementById(`qr-block-${index}`);
//     try {
//       const dataUrl = await toPng(node);
//       const link = document.createElement('a');
//       link.download = `QR_${index + 1}.png`;
//       link.href = dataUrl;
//       link.click();
//     } catch (err) {
//       console.error('Download failed:', err);
//     }
//   };

//   const handlePrint = async (index) => {
//     const node = document.getElementById(`qr-block-${index}`);
//     try {
//       const dataUrl = await toPng(node);
//       const win = window.open();
//       if (!win) return;

//       win.document.write(`
//         <html>
//           <head><title>Print QR</title></head>
//           <body style="margin:0; padding:0; display:flex; justify-content:center; align-items:center; height:100vh;">
//             <img src="${dataUrl}" style="width:6cm; height:auto;" onload="window.print(); window.close()" />
//           </body>
//         </html>
//       `);
//       win.document.close();
//     } catch (err) {
//       console.error('Print failed:', err);
//     }
//   };

//   const handleDownloadPDF = async () => {
//     const pdf = new jsPDF({
//       orientation: 'portrait',
//       unit: 'cm',
//       format: 'a4'
//     });

//     const margin = 2;
//     const qrSize = 6;
//     let x = margin;
//     let y = margin;

//     for (let i = 0; i < qrCodes.length; i++) {
//       const node = document.getElementById(`qr-block-${i}`);
//       if (!node) continue;

//       try {
//         const dataUrl = await toPng(node);
//         pdf.addImage(dataUrl, 'PNG', x, y, qrSize, qrSize + 1.2);
//         x += qrSize + margin;

//         if (x + qrSize > 21) {
//           x = margin;
//           y += qrSize + 2;
//         }

//         if (y + qrSize > 29.7 - margin) {
//           pdf.addPage();
//           x = margin;
//           y = margin;
//         }
//       } catch (err) {
//         console.error('Error rendering QR to PDF:', err);
//       }
//     }

//     pdf.save('All_QRCodes.pdf');
//   };

//   return (
//     <div className="App">
//       <div className="form-container">
//         <h2>Kit QR Code Generator</h2>

//         <label>Client:
//           <select value={clientId} onChange={(e) => setClientId(e.target.value)}>
//             <option value="">-- Select Client --</option>
//             {clients.map(c => (
//               <option key={c.client_id} value={c.client_id}>{c.company_name}</option>
//             ))}
//           </select>
//         </label>

//         <label>Kit:
//           <select value={kitId} onChange={(e) => setKitId(e.target.value)}>
//             <option value="">-- Select Kit --</option>
//             {kits.map(k => (
//               <option key={k.kit_id} value={k.kit_id}>{k.kit_id}</option>
//             ))}
//           </select>
//         </label>

//         <label>Production Unit:
//           <select value={prodUnit} onChange={(e) => setProdUnit(e.target.value)}>
//             <option value="RH">Ranchi (RH)</option>
//             <option value="BS">Boisar (BS)</option>
//           </select>
//         </label>

//         <label>Warehouse:
//           <select value={warehouse} onChange={(e) => setWarehouse(e.target.value)}>
//             <option value="RH">Ranchi (RH)</option>
//             <option value="BS">Boisar (BS)</option>
//             <option value="CN">Chennai (CN)</option>
//           </select>
//         </label>

//         <label>No. of Kits:
//           <input type="number" min="1" value={kitCount} onChange={(e) => setKitCount(Number(e.target.value))} />
//         </label>

//         <button onClick={generateQrCodes}>Generate QR Codes</button>
//       </div>

//       {qrCodes.length > 0 && (
//         <div className="pdf-download-container">
//           <button onClick={handleDownloadPDF}>Download All as PDF</button>
//         </div>
//       )}

//       <div className="qr-codes">
//         {qrCodes.map((item, i) => (
//           <div key={i} className="qr-item">
//             <div id={`qr-block-${i}`} className="qr-block">
//               <div className="qr-svg-wrapper">
//                 <QRCode value={item.code} size={227} />
//                 <img src="/Logo.png" alt="Logo" className="qr-logo" />
//               </div>
//               <div className="qr-label">{item.label}</div>
//             </div>
//             <div className="qr-buttons">
//               <button onClick={() => handlePrint(i)}>Print</button>
//               <button onClick={() => handleDownload(i)}>Download</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;

// import React, { useEffect, useState } from 'react';
// import QRCode from 'react-qr-code';
// import axios from 'axios';
// import { toPng } from 'html-to-image';
// import jsPDF from 'jspdf';

// import './App.css';

// function App() {
//   const [clients, setClients] = useState([]);
//   const [kits, setKits] = useState([]);
//   const [clientId, setClientId] = useState('');
//   const [kitId, setKitId] = useState('');
//   const [orderCount, setOrderCount] = useState(0);
//   const [kitCount, setKitCount] = useState(1);
//   const [prodUnit, setProdUnit] = useState('RH');
//   const [warehouse, setWarehouse] = useState('BS');
//   const [qrCodes, setQrCodes] = useState([]);
//   const [useJson, setUseJson] = useState(true);
//   const [projectId, setProjectId] = useState('');
//   const [today, setToday] = useState('');

//   const base_url = 'http://10.20.2.78:8000/api'; // office URL

//   useEffect(() => {
//     const fetchInitialData = async () => {
//       try {
//         const [clientRes, kitRes] = await Promise.all([
//           axios.get(`${base_url}/clients/`),
//           axios.get(`${base_url}/kits/`)
//         ]);
//         setClients(clientRes.data);
//         setKits(kitRes.data);
//       } catch (error) {
//         console.error('Error fetching clients/kits:', error);
//       }
//     };

//     fetchInitialData();
//   }, []);

//   useEffect(() => {
//     if (clientId) {
//       axios.get(`${base_url}/client-order-count/${clientId}/`)
//         .then(res => setOrderCount(res.data.count))
//         .catch(err => console.error(err));
//     }
//   }, [clientId]);

//   const generateQrCodes = async () => {
//     if (!clientId || !kitId) {
//       alert("Please select both client and kit.");
//       return;
//     }

//     const _today = new Date().toISOString().split('T')[0];
//     const _projectId = `${clientId}/${String(orderCount).padStart(2, '0')}`;
//     setToday(_today);
//     setProjectId(_projectId);

//     const payload = {
//       type: "KIT",
//       kit_id: kitId,
//       prod_unit: prodUnit,
//       warehouse,
//       project_id: _projectId,
//       Total_Kit: kitCount,
//       date: _today,
//     };

//     try {
//       const res = await axios.post(`${base_url}/save-qr/`, payload);
//       console.log("QR saved:", res.data);

//       const qrList = [];
//       for (let i = 1; i <= kitCount; i++) {
//         const visualData = { ...payload, kit_no: i };
//         const code = useJson
//           ? JSON.stringify(visualData, null, 2)
//           : Object.values(visualData).join(' | ');

//         qrList.push({
//           code,
//           label: `${kitId} | ${prodUnit} | ${warehouse} | ${_projectId} | ${i} | ${_today}`
//         });
//       }

//       setQrCodes(qrList);
//     } catch (error) {
//       console.error("Error saving QR:", error);
//       alert("QR saving failed. Possible duplicate or invalid data.");
//     }
//   };

//   const handleDownload = async (index) => {
//     const node = document.getElementById(`qr-block-${index}`);
//     try {
//       const dataUrl = await toPng(node);
//       const link = document.createElement('a');
//       link.download = `QR_${index + 1}.png`;
//       link.href = dataUrl;
//       setTimeout(() => {
//         link.click();
//       }, 100); // avoid blocking UI
//     } catch (err) {
//       console.error('Download failed:', err);
//     }
//   };

//   const handlePrint = async (index) => {
//     const node = document.getElementById(`qr-block-${index}`);
//     try {
//       const dataUrl = await toPng(node);
//       const printWindow = window.open('', '_blank', 'width=800,height=600');
//       if (!printWindow) {
//         alert("Pop-up blocked! Please allow pop-ups for this site.");
//         return;
//       }

//       printWindow.document.write(`
//         <html>
//           <head><title>Print QR</title></head>
//           <body style="margin:0; padding:0; display:flex; justify-content:center; align-items:center; height:100vh;">
//             <img src="${dataUrl}" style="width:6cm; height:auto;" />
//             <script>
//               window.onload = function() {
//                 setTimeout(() => {
//                   window.print();
//                   window.close();
//                 }, 500);
//               };
//             </script>
//           </body>
//         </html>
//       `);
//       printWindow.document.close();
//     } catch (err) {
//       console.error('Print failed:', err);
//     }
//   };

//   const handleDownloadPDF = async () => {
//     const pdf = new jsPDF({
//       orientation: 'portrait',
//       unit: 'cm',
//       format: 'a4'
//     });

//     const margin = 2;
//     const qrSize = 6;
//     let x = margin;
//     let y = margin;

//     for (let i = 0; i < qrCodes.length; i++) {
//       const node = document.getElementById(`qr-block-${i}`);
//       if (!node) continue;

//       try {
//         const dataUrl = await toPng(node);
//         pdf.addImage(dataUrl, 'PNG', x, y, qrSize, qrSize + 1.2);
//         x += qrSize + margin;

//         if (x + qrSize > 21) {
//           x = margin;
//           y += qrSize + 2;
//         }

//         if (y + qrSize > 29.7 - margin) {
//           pdf.addPage();
//           x = margin;
//           y = margin;
//         }
//       } catch (err) {
//         console.error('Error rendering QR to PDF:', err);
//       }
//     }

//     pdf.save('All_QRCodes.pdf');
//   };

//   return (
//     <div className="App">
//       <div className="form-container">
//         <h2>Kit QR Code Generator</h2>

//         <label>Client:
//           <select value={clientId} onChange={(e) => setClientId(e.target.value)}>
//             <option value="">-- Select Client --</option>
//             {clients.map(c => (
//               <option key={c.client_id} value={c.client_id}>{c.company_name}</option>
//             ))}
//           </select>
//         </label>

//         <label>Kit:
//           <select value={kitId} onChange={(e) => setKitId(e.target.value)}>
//             <option value="">-- Select Kit --</option>
//             {kits.map(k => (
//               <option key={k.kit_id} value={k.kit_id}>{k.kit_id}</option>
//             ))}
//           </select>
//         </label>

//         <label>Production Unit:
//           <select value={prodUnit} onChange={(e) => setProdUnit(e.target.value)}>
//             <option value="RH">Ranchi (RH)</option>
//             <option value="BS">Boisar (BS)</option>
//           </select>
//         </label>

//         <label>Warehouse:
//           <select value={warehouse} onChange={(e) => setWarehouse(e.target.value)}>
//             <option value="RH">Ranchi (RH)</option>
//             <option value="BS">Boisar (BS)</option>
//             <option value="CN">Chennai (CN)</option>
//           </select>
//         </label>

//         <label>No. of Kits:
//           <input type="number" min="1" value={kitCount} onChange={(e) => setKitCount(Number(e.target.value))} />
//         </label>

//         <button onClick={generateQrCodes}>Generate QR Codes</button>
//       </div>

//       {qrCodes.length > 0 && (
//         <div className="pdf-download-container">
//           <button onClick={handleDownloadPDF}>Download All as PDF</button>
//         </div>
//       )}

//       <div className="qr-codes">
//         {qrCodes.map((item, i) => (
//           <div key={i} className="qr-item">
//             <div id={`qr-block-${i}`} className="qr-block">
//               <div className="qr-svg-wrapper">
//                 <QRCode value={item.code} size={227} />
//                 <img src="/Logo.png" alt="Logo" className="qr-logo" />
//               </div>
//               <div className="qr-label">{item.label}</div>
//             </div>
//             <div className="qr-buttons">
//               <button onClick={() => handlePrint(i)}>Print</button>
//               <button onClick={() => handleDownload(i)}>Download</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import axios from 'axios';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import { BASE_URL } from './utils/constants';

import './App.css';

function QRGenerator() {
  const [clients, setClients] = useState([]);
  const [kits, setKits] = useState([]);
  const [clientId, setClientId] = useState('');
  const [kitId, setKitId] = useState('');
  const [orderCount, setOrderCount] = useState(0);
  const [kitCount, setKitCount] = useState(1);
  const [prodUnit, setProdUnit] = useState('RH');
  const [warehouse, setWarehouse] = useState('BS');
  const [qrCodes, setQrCodes] = useState([]);
  const [useJson, setUseJson] = useState(true);
  const [projectId, setProjectId] = useState('');
  const [today, setToday] = useState('');

  const navigate = useNavigate();


  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [clientRes, kitRes] = await Promise.all([
          axios.get(`${BASE_URL}/clients/`),
          axios.get(`${BASE_URL}/kits/`)
        ]);
        setClients(clientRes.data);
        setKits(kitRes.data);
      } catch (error) {
        console.error('Error fetching clients/kits:', error);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (clientId) {
      axios.get(`${BASE_URL}/client-order-count/${clientId}/`)
        .then(res => setOrderCount(res.data.count))
        .catch(err => console.error(err));
    }
  }, [clientId]);

  const generateQrCodes = async () => {
    if (!clientId || !kitId) {
      alert("Please select both client and kit.");
      return;
    }

    const _today = new Date().toISOString().split('T')[0];
    const _projectId = `${clientId}/${String(orderCount).padStart(2, '0')}`;
    setToday(_today);
    setProjectId(_projectId);

    const payload = {
      type: "KIT",
      kit_id: kitId,
      prod_unit: prodUnit,
      warehouse,
      project_id: _projectId,
      Total_Kit: kitCount,
      date: _today,
    };

    // Don't POST now, we'll post after images are captured and saved as batch.
    const qrList = [];
    for (let i = 1; i <= kitCount; i++) {
      const visualData = { ...payload, kit_no: i };
      const code = useJson
        ? JSON.stringify(visualData, null, 2)
        : Object.values(visualData).join(' | ');

      qrList.push({
        code,
        label: `${kitId} | ${prodUnit} | ${warehouse} | ${_projectId} | ${i} | ${_today}`,
      });
    }

    setQrCodes(qrList);
  };

  // ----- NEW: save all QRs (with their rendered PNGs) as JSON array -----
  const handleSaveAllQRCodes = async () => {
    if (!qrCodes.length) {
      alert("No QR codes generated.");
      return;
    }
    const qrImages = [];
    for (let i = 0; i < qrCodes.length; i++) {
      const node = document.getElementById(`qr-block-${i}`);
      if (node) {
        try {
          const dataUrl = await toPng(node);
          qrImages.push({
            kit_no: i + 1,
            image: dataUrl,
          });
        } catch (err) {
          alert(`Failed to capture QR image for kit ${i + 1}`);
          return;
        }
      }
    }

    const payload = {
      type: "KIT",
      kit_id: kitId,
      prod_unit: prodUnit,
      warehouse: warehouse,
      project_id: projectId,
      Total_Kit: kitCount,
      date: today,
      qr_images: qrImages,
    };

    try {
      const res = await axios.post(`${BASE_URL}/save-qr/`, payload);
      alert(res.data.message || "QR images saved!");
    } catch (error) {
      alert("Error saving QR images.");
      console.error(error);
    }
  };
  // ---- End new function ----

  const handleDownload = async (index) => {
    const node = document.getElementById(`qr-block-${index}`);
    try {
      const dataUrl = await toPng(node);
      const link = document.createElement('a');
      link.download = `QR_${index + 1}.png`;
      link.href = dataUrl;
      setTimeout(() => {
        link.click();
      }, 100);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  const handlePrint = async (index) => {
    const node = document.getElementById(`qr-block-${index}`);
    try {
      const dataUrl = await toPng(node);
      const printWindow = window.open('', '_blank', 'width=800,height=600');
      if (!printWindow) {
        alert("Pop-up blocked! Please allow pop-ups for this site.");
        return;
      }
      printWindow.document.write(`
        <html>
          <head><title>Print QR</title></head>
          <body style="margin:0; padding:0; display:flex; justify-content:center; align-items:center; height:100vh;">
            <img src="${dataUrl}" style="width:6cm; height:auto;" />
            <script>
              window.onload = function() {
                setTimeout(() => {
                  window.print();
                  window.close();
                }, 500);
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    } catch (err) {
      console.error('Print failed:', err);
    }
  };

  const handleDownloadPDF = async () => {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'cm',
      format: 'a4'
    });

    const margin = 2;
    const qrSize = 6;
    let x = margin;
    let y = margin;

    for (let i = 0; i < qrCodes.length; i++) {
      const node = document.getElementById(`qr-block-${i}`);
      if (!node) continue;
      try {
        const dataUrl = await toPng(node);
        pdf.addImage(dataUrl, 'PNG', x, y, qrSize, qrSize + 1.2);
        x += qrSize + margin;
        if (x + qrSize > 21) {
          x = margin;
          y += qrSize + 2;
        }
        if (y + qrSize > 29.7 - margin) {
          pdf.addPage();
          x = margin;
          y = margin;
        }
      } catch (err) {
        console.error('Error rendering QR to PDF:', err);
      }
    }

    pdf.save('All_QRCodes.pdf');
  };

  return (
    <div className="App">
      <div className="form-container">
        <h2>Kit QR Code Generator</h2>

        <label>Client:
          <select value={clientId} onChange={(e) => setClientId(e.target.value)}>
            <option value="">-- Select Client --</option>
            {clients.map(c => (
              <option key={c.client_id} value={c.client_id}>{c.company_name}</option>
            ))}
          </select>
        </label>

        <label>Kit:
          <select value={kitId} onChange={(e) => setKitId(e.target.value)}>
            <option value="">-- Select Kit --</option>
            {kits.map(k => (
              <option key={k.kit_id} value={k.kit_id}>{k.kit_id}</option>
            ))}
          </select>
        </label>

        <label>Production Unit:
          <select value={prodUnit} onChange={(e) => setProdUnit(e.target.value)}>
            <option value="RH">Ranchi (RH)</option>
            <option value="BS">Boisar (BS)</option>
          </select>
        </label>

        <label>Warehouse:
          <select value={warehouse} onChange={(e) => setWarehouse(e.target.value)}>
            <option value="RH">Ranchi (RH)</option>
            <option value="BS">Boisar (BS)</option>
            <option value="CN">Chennai (CN)</option>
          </select>
        </label>

        <label>No. of Kits:
          <input type="number" min="1" value={kitCount} onChange={(e) => setKitCount(Number(e.target.value))} />
        </label>

        <button onClick={generateQrCodes}>Generate QR Codes</button>
        <button onClick={() => navigate('/history')} style={{ marginLeft: '12px' }}>View History
        </button>
      </div>

      {qrCodes.length > 0 && (
        <div className="pdf-download-container" style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
          <button onClick={handleDownloadPDF}>Download All as PDF</button>
          <button onClick={handleSaveAllQRCodes}>Save All QRs to DB</button>
        </div>
      )}

      <div className="qr-codes">
        {qrCodes.map((item, i) => (
          <div key={i} className="qr-item">
            <div id={`qr-block-${i}`} className="qr-block">
              <div className="qr-svg-wrapper">
                <QRCode value={item.code} size={227} />
                <img src="/Logo.png" alt="Logo" className="qr-logo" />
              </div>
              <div className="qr-label">{item.label}</div>
            </div>
            <div className="qr-buttons">
              <button onClick={() => handlePrint(i)}>Print</button>
              <button onClick={() => handleDownload(i)}>Download</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QRGenerator;

