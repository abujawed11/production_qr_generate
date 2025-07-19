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


import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
// import  api  from './utils/api';
import axios from 'axios';
import './App.css';

function App() {
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


  const base_url = 'http://localhost:8000/api';

  const fetchInitialData = async () => {
    const [clientRes, kitRes] = await Promise.all([
      axios.get(`${base_url}/clients/`),
      axios.get(`${base_url}/kits/`)
    ]);

    console.log("Clients", clientRes.data)
    setClients(clientRes.data);
    setKits(kitRes.data);
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (clientId) {
      axios.get(`${base_url}/client-order-count/${clientId}/`)
        .then(res => setOrderCount(res.data.count))
        .catch(err => console.error(err));
    }
  }, [clientId]);

  // const generateQrCodes = () => {
  //   if (!clientId || !kitId) return alert("Select client and kit");

  //   const date = new Date().toISOString().split('T')[0];
  //   const project_id = `${clientId}/ ${String(orderCount).padStart(2, '0')}`;

  //   const qrList = [];
  //   for (let i = 1; i <= kitCount; i++) {
  //     const data = {
  //       type: 'KIT',
  //       kit_id: kitId,
  //       prod_unit: prodUnit,
  //       warehouse,
  //       project_id,
  //       kit_no: i,
  //       date,
  //     };
  //     qrList.push(useJson ? JSON.stringify(data, null, 2) : Object.values(data).join(' | '));
  //   }
  //   setQrCodes(qrList);
  // };

  // const generateQrCodes = async () => {
  //   if (!clientId || !kitId) {
  //     alert("Please select both client and kit.");
  //     return;
  //   }

  //   const today = new Date().toISOString().split('T')[0];
  //   const projectId = `${clientId}/ ${String(orderCount).padStart(2, '0')}`;
  //   const payload = {
  //     type: "KIT",
  //     kit_id: kitId,
  //     prod_unit: prodUnit,
  //     warehouse,
  //     project_id: projectId,
  //     kit_no: kitCount,  // ✅ Send only 1 record with total count
  //     date: today
  //   };

  //   try {
  //     const res = await axios.post(`${base_url}/save-qr/`, payload);
  //     console.log("QR saved:", res.data);

  //     // ✅ Generate QR display, but do NOT send each to backend
  //     const qrList = [];
  //     for (let i = 1; i <= kitCount; i++) {
  //       const visualData = {
  //         ...payload,
  //         kit_no: i  // For showing different QR visually
  //       };
  //       const code = useJson
  //         ? JSON.stringify(visualData, null, 2)
  //         : Object.values(visualData).join(' | ');
  //       qrList.push(code);
  //     }

  //     setQrCodes(qrList);
  //   } catch (error) {
  //     console.error("Error saving QR:", error.response?.data || error.message);
  //     alert("QR saving failed. Possible duplicate or invalid data.");
  //   }
  // };


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

    try {
      const res = await axios.post(`${base_url}/save-qr/`, payload);
      console.log("QR saved:", res.data);

      const qrList = [];
      for (let i = 1; i <= kitCount; i++) {
        const visualData = {
          ...payload,
          kit_no: i
        };
        const code = useJson
          ? JSON.stringify(visualData, null, 2)
          : Object.values(visualData).join(' | ');
        qrList.push(code);
      }

      setQrCodes(qrList);
    } catch (error) {
      console.error("Error saving QR:", error.response?.data || error.message);
      alert("QR saving failed. Possible duplicate or invalid data.");
    }
  };


  return (
    <div className="App">
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
          <option value="RH">Ranchi(RH)</option>
          <option value="BS">Boisar(BS)</option>
        </select>
      </label>

      <label>Warehouse:
        <select value={warehouse} onChange={(e) => setWarehouse(e.target.value)}>
          <option value="RH">Ranchi(RH)</option>
          <option value="BS">Boisar(BS)</option>
          <option value="CN">Chennai(CN)</option>
        </select>
      </label>

      <label>No. of Kits:
        <input type="number" value={kitCount} onChange={(e) => setKitCount(Number(e.target.value))} />
      </label>

      {/* <label>Format:
        <select value={useJson ? 'json' : 'text'} onChange={(e) => setUseJson(e.target.value === 'json')}>
          <option value="json">JSON</option>
          <option value="text">Plain Text</option>
        </select>
      </label> */}

      <button onClick={generateQrCodes}>Generate QR Codes</button>

      <div className="qr-codes">
        {qrCodes.map((code, i) => (
          <div key={i} className="qr-item">
            <QRCode value={code} size={128} />
            <pre>{`${kitId} | ${prodUnit} | ${warehouse} | ${projectId} | ${i + 1} | ${today}`}</pre>
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;


