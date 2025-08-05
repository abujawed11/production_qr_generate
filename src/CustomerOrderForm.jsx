// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import QRCode from "react-qr-code";

// export default function CustomerOrderForm() {
//   const [kits, setKits] = useState([]);
//   const [locations, setLocations] = useState({ manufacturing_locations: [], dispatch_locations: [] });
//   const [selectedKitParams, setSelectedKitParams] = useState({ tilt_angle: '', clearance: '', configuration: '' });
//   const [selectedKit, setSelectedKit] = useState(null);
//   const [qrData, setQrData] = useState(null);

//   const [formData, setFormData] = useState({
//     name: '',
//     address: '',
//     phone: '',
//     email: '',
//     manufacturing_location: '',
//     dispatch_location: '',
//     quantity: 1,
//   });

//   useEffect(() => {
//     axios.get('http://localhost:8000/api/kits/').then((res) => setKits(res.data));
//     axios.get('http://localhost:8000/api/locations/').then((res) => setLocations(res.data));
//   }, []);

//   useEffect(() => {
//     const match = kits.find(
//       (kit) =>
//         kit.tilt_angle == selectedKitParams.tilt_angle &&
//         kit.clearance == selectedKitParams.clearance &&
//         kit.configuration === selectedKitParams.configuration
//     );
//     setSelectedKit(match);
//   }, [selectedKitParams, kits]);

//   const handleInputChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleKitParamChange = (e) => {
//     setSelectedKitParams((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async () => {
//     if (!selectedKit) return alert('Please select a valid kit.');

//     const payload = {
//       ...formData,
//       kit_id: selectedKit.kit_id,
//       quantity: formData.quantity
//     };

//     try {
//       const response = await axios.post('http://localhost:8000/api/create-order/', payload);
//       setQrData(response.data);
//     } catch (error) {
//       console.error(error);
//       alert("Error creating order. Please check form values.");
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Customer Order Form</h2>

//       <input name="name" placeholder="Customer Name" onChange={handleInputChange} /><br />
//       <textarea name="address" placeholder="Customer Address" onChange={handleInputChange} /><br />
//       <input name="phone" placeholder="Phone" onChange={handleInputChange} /><br />
//       <input name="email" placeholder="Email" onChange={handleInputChange} /><br />

//       <h3>Kit Selection</h3>
//       <select name="tilt_angle" onChange={handleKitParamChange}>
//         <option value="">Tilt Angle</option>
//         {[...new Set(kits.map((k) => k.tilt_angle))].map((angle) => (
//           <option key={angle} value={angle}>{angle}°</option>
//         ))}
//       </select>
//       <select name="clearance" onChange={handleKitParamChange}>
//         <option value="">Clearance</option>
//         {[...new Set(kits.map((k) => k.clearance))].map((clr) => (
//           <option key={clr} value={clr}>{clr}</option>
//         ))}
//       </select>
//       <select name="configuration" onChange={handleKitParamChange}>
//         <option value="">Configuration</option>
//         {[...new Set(kits.map((k) => k.configuration))].map((cfg) => (
//           <option key={cfg} value={cfg}>{cfg}</option>
//         ))}
//       </select>

//       {selectedKit && (
//         <div>
//           <p>Panels: {selectedKit.num_panels}</p>
//           <p>Price: ₹{selectedKit.price}</p>
//         </div>
//       )}

//       <input
//         type="number"
//         name="quantity"
//         placeholder="Quantity"
//         min="1"
//         value={formData.quantity}
//         onChange={handleInputChange}
//       /><br />

//       <h3>Locations</h3>
//       <select name="manufacturing_location" onChange={handleInputChange}>
//         <option value="">Manufacturing Location</option>
//         {locations.manufacturing_locations.map((loc) => (
//           <option key={loc} value={loc}>{loc}</option>
//         ))}
//       </select>
//       <select name="dispatch_location" onChange={handleInputChange}>
//         <option value="">Dispatch Location</option>
//         {locations.dispatch_locations.map((loc) => (
//           <option key={loc} value={loc}>{loc}</option>
//         ))}
//       </select><br /><br />

//       <button onClick={handleSubmit}>Generate QR Code</button>

//       {qrData && (
//         <div style={{ marginTop: 20 }}>
//           <h4>QR Code (for Order)</h4>
//           <QRCode value={JSON.stringify(qrData)} />
//           <pre>{JSON.stringify(qrData, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QRCode from 'react-qr-code';

export default function CustomerOrderForm() {
  const [kits, setKits] = useState([]);
  const [locations, setLocations] = useState({ manufacturing_locations: [], dispatch_locations: [] });
  const [qrData, setQrData] = useState(null);


  const base_url = "http://localhost:8000/api";

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    manufacturing_location: '',
    dispatch_location: '',
  });

  // Kit selection state
  const [selectedKitParams, setSelectedKitParams] = useState({ tilt_angle: '', clearance: '', configuration: '' });
  const [kitQuantity, setKitQuantity] = useState(1);
  const [selectedKits, setSelectedKits] = useState([]); // Stores multiple kits

  useEffect(() => {
    axios.get(`${base_url}/kits/`).then((res) => setKits(res.data));
    axios.get(`${base_url}/locations/`).then((res) => setLocations(res.data));
  }, []);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleKitParamChange = (e) => {
    setSelectedKitParams((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddKit = () => {
    const match = kits.find(
      (kit) =>
        kit.tilt_angle == selectedKitParams.tilt_angle &&
        kit.clearance == selectedKitParams.clearance &&
        kit.configuration === selectedKitParams.configuration
    );
    if (!match) return alert("No matching kit found.");

    setSelectedKits((prev) => [...prev, { ...match, quantity: parseInt(kitQuantity) || 1 }]);
    setKitQuantity(1);
  };

  const handleSubmit = async () => {
    if (selectedKits.length === 0) return alert("Please add at least one kit.");

    const payload = {
      ...formData,
      kits: selectedKits.map((kit) => ({
        kit_id: kit.kit_id,
        quantity: kit.quantity,
      }))
    };

    try {
      const response = await axios.post(`${base_url}/create-order/`, payload);
      setQrData(response.data);
    } catch (error) {
      console.error(error);
      alert("Error creating order. Please check form values.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Production QR Generate</h2>

      {/* <input name="name" placeholder="Customer Name" onChange={handleInputChange} /><br />
      <textarea name="address" placeholder="Customer Address" onChange={handleInputChange} /><br />
      <input name="phone" placeholder="Phone" onChange={handleInputChange} /><br />
      <input name="email" placeholder="Email" onChange={handleInputChange} /><br /> */}

      <h3>Kit Selection</h3>
      <select name="tilt_angle" onChange={handleKitParamChange}>
        <option value="">Tilt Angle</option>
        {[...new Set(kits.map((k) => k.tilt_angle))].map((angle) => (
          <option key={angle} value={angle}>{angle}°</option>
        ))}
      </select>
      <select name="clearance" onChange={handleKitParamChange}>
        <option value="">Clearance</option>
        {[...new Set(kits.map((k) => k.clearance))].map((clr) => (
          <option key={clr} value={clr}>{clr}</option>
        ))}
      </select>
      <select name="configuration" onChange={handleKitParamChange}>
        <option value="">Configuration</option>
        {[...new Set(kits.map((k) => k.configuration))].map((cfg) => (
          <option key={cfg} value={cfg}>{cfg}</option>
        ))}
      </select>
      {/* <input
        type="number"
        value={kitQuantity}
        onChange={(e) => setKitQuantity(e.target.value)}
        min="1"
        placeholder="Quantity"
      /> */}
      {/* <button onClick={handleAddKit}>Add Kit</button> */}

      {/* Display list of kits added */}
      {/* {selectedKits.length > 0 && (
        <div>
          <h4>Selected Kits:</h4>
          <ul>
            {selectedKits.map((kit, index) => (
              <li key={index}>
                {kit.kit_id} — Qty: {kit.quantity}
                <button
                  onClick={() => {
                    const updatedKits = [...selectedKits];
                    updatedKits.splice(index, 1);
                    setSelectedKits(updatedKits);
                  }}
                  style={{
                    marginLeft: 10,
                    backgroundColor: 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: 4,
                    padding: '2px 6px',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

        </div>
      )} */}

      <h3>Locations</h3>
      <select name="manufacturing_location" onChange={handleInputChange}>
        <option value="">Manufacturing Location</option>
        {locations.manufacturing_locations.map((loc) => (
          <option key={loc} value={loc}>{loc}</option>
        ))}
      </select>
      <select name="dispatch_location" onChange={handleInputChange}>
        <option value="">Dispatch Location</option>
        {locations.dispatch_locations.map((loc) => (
          <option key={loc} value={loc}>{loc}</option>
        ))}
      </select><br /><br />

      <button onClick={handleSubmit}>Generate QR Code</button>

      {qrData && (
        <div style={{ marginTop: 20 }}>
          <h4>QR Code (for Order)</h4>
          <QRCode value={JSON.stringify(qrData)} />
          <pre>{JSON.stringify(qrData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

