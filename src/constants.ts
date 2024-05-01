// An implementation of Nordic Semicondutor's UART/Serial Port Emulation over Bluetooth low energy
export const UART_SERVICE_UUID = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';

// Allows the micro:bit to transmit a byte array
export const UART_TX_CHARACTERISTIC_UUID =
  '6e400002-b5a3-f393-e0a9-e50e24dcca9e';

// Allows a connected client to send a byte array
export const UART_RX_CHARACTERISTIC_UUID =
  '6e400003-b5a3-f393-e0a9-e50e24dcca9e';

export const stepsToKM = (steps: number) =>
  Number((steps / 1312.33595801).toPrecision(2));
export const celiusToFahrenheit = (celsius: number) => (celsius - 32) * 0.5556;
export const kmToMiles = (km: number) => km * 0.62137119;
