// src/QRWithHollow.jsx
import React, { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';

const QRWithHollow = ({ data }) => {
  const qrRef = useRef(null);

  useEffect(() => {
    const qr = new QRCodeStyling({
      width: 240,
      height: 240,
      type: 'svg',
      data: data,
      image: '',
      dotsOptions: {
        color: '#000000',
        type: 'rounded',
      },
      backgroundOptions: {
        color: '#ffffff',
      },
      qrOptions: {
        errorCorrectionLevel: 'H',
      },
    });

    qr.append(qrRef.current).then(() => {
      const svg = qrRef.current.querySelector('svg');
      if (svg) {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', '90');
        rect.setAttribute('y', '90');
        rect.setAttribute('width', '60');
        rect.setAttribute('height', '60');
        rect.setAttribute('fill', '#ffffff');
        svg.appendChild(rect);
      }
    });

    return () => {
      qrRef.current?.replaceChildren();
    };
  }, [data]);

  return <div ref={qrRef} style={{ width: 240, height: 240 }} />;
};

export default QRWithHollow;
