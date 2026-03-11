import { useState } from 'react';

// Type definitions
// OrderItem: één productregel
// Order: hele bestelling
type OrderItem = {
  qty: number;
  name: string;
  price: number;
};
type Order = {
  items: OrderItem[];
  total: number;
};

const PRINTER_VENDORS: number[] = [
  0x0483, // STM Microelectronics (Xprinter)
  0x04b8, // Seiko Epson
  0x0456, // Microtek
  0x067b, // Prolific Technology
];

function buildReceipt(order: Order) {
  let receipt = '\x1B\x40\n\n'; // Init
  receipt += '\x1B\x61\x01'; // Center align
  receipt += 'Koen zijn Awesome shop\n';
  receipt += '\x1B\x61\x00'; // Left align
  receipt += '------------------------------------\n';
  order.items.forEach((item: OrderItem) => {
    receipt += `${item.qty}x ${item.name.padEnd(22)} EUR ${item.price.toFixed(2).padStart(6)}\n`;
  });
  receipt += '------------------------------------\n';
  receipt += `Totaal: ${' '.repeat(20)} EUR ${order.total.toFixed(2)}\n`;
  receipt += '\n\nBedankt voor uw bezoek!\n\n\n\n\x1D\x56\x00'; // Cut paper
  return receipt;
}

interface ReceiptPrinterProps {
  order: Order;
}

export default function ReceiptPrinter({ order }: ReceiptPrinterProps) {
  const [status, setStatus] = useState('Klaar om af te drukken');
  const [selectedDevice, setSelectedDevice] = useState<any>(null);

  async function autoDetectPrinter() {
    try {
      const nav: any = navigator;
      if (!nav.usb) {
        throw new Error('WebUSB niet ondersteund');
      }
      const devices = await nav.usb.getDevices();
      const printer = devices.find((device: any) => PRINTER_VENDORS.includes(device.vendorId));
      if (printer) {
        setSelectedDevice(printer);
        setStatus(`✓ Printer gevonden: ${printer.productName || printer.manufacturerName}`);
        return true;
      }
      setStatus('Geen geauthoriseerde printer gevonden. Selecteer uw printer...');
      const filters = PRINTER_VENDORS.map(vendorId => ({ vendorId }));
      const device = await nav.usb.requestDevice({ filters });
      setSelectedDevice(device);
      setStatus(`✓ Printer geselecteerd: ${device.productName || device.manufacturerName}`);
      return true;
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      setStatus(`Auto-detectie fout: ${msg}`);
      return false;
    }
  }

  async function printUSB() {
    try {
      const nav: any = navigator;
      if (!selectedDevice && !nav.usb) {
        setStatus('WebUSB niet ondersteund in deze browser');
        return;
      }
      setStatus('USB printer verbinden...');
      let device = selectedDevice;
      if (!device) {
        await autoDetectPrinter();
        device = selectedDevice;
        if (!device) return;
      }
      await device.open();
      if (device.configuration === null) {
        await device.selectConfiguration(1);
      }
      try {
        await device.claimInterface(0);
      } catch (e) {
        // Interface al geclaimd
      }
      const encoder = new TextEncoder();
      const receipt = buildReceipt(order);
      const intf = device.configuration.interfaces[0].alternates[0];
      const endpoint = intf.endpoints.find((e: any) => e.direction === 'out');
      if (!endpoint) {
        throw new Error('Output endpoint niet gevonden');
      }
      await device.transferOut(endpoint.endpointNumber, encoder.encode(receipt));
      setStatus('✓ Bon succesvol geprint!');
      setTimeout(() => {
        device.close();
      }, 1000);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      setStatus(`USB Fout: ${msg}`);
    }
  }

  async function printNetwork() {
    try {
      setStatus('Bon naar printer sturen...');
      const response = await fetch('/api/xprint.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'print',
          receipt: buildReceipt(order)
        })
      });
      const data = await response.json();
      if (data.success) {
        setStatus('✓ Bon succesvol geprint!');
      } else {
        setStatus(`Printerfout: ${data.error}`);
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      setStatus(`Netwerkfout: ${msg}`);
    }
  }

  return (
    <div style={{background:'#fff',borderRadius:10,padding:20,maxWidth:400,margin:'auto',boxShadow:'0 10px 30px rgba(0,0,0,0.1)'}}>
      <h2 style={{textAlign:'center'}}>Bonprinter</h2>
      <div style={{marginBottom:10,padding:10,background:'#f5f5f5',borderRadius:5}}>{status}</div>
      <div style={{display:'flex',gap:10,marginBottom:10}}>
        <button onClick={printUSB} style={{flex:1,padding:10,background:'#667eea',color:'#fff',border:'none',borderRadius:5,fontWeight:'bold'}}>Print via USB</button>
        <button onClick={printNetwork} style={{flex:1,padding:10,background:'#6c757d',color:'#fff',border:'none',borderRadius:5,fontWeight:'bold'}}>Print via Netwerk</button>
      </div>
    </div>
  );
}
