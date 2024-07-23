import React, { useEffect, useState } from 'react';

function App() {
  const [speed, setSpeed] = useState(0);
  const [rpm, setRpm] = useState(0);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const connectWebSocket = () => {
      const websocket = new WebSocket('ws://localhost:8765');

      websocket.onopen = () => {
        console.log('Connected to WebSocket server');
      };

      websocket.onmessage = (event) => {
        const [rpm, speed] = event.data.split(',').map(parseFloat);
        setRpm(rpm);
        setSpeed(speed);
      };

      websocket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      websocket.onclose = () => {
        console.log('WebSocket connection closed. Attempting to reconnect...');
        setTimeout(() => connectWebSocket(), 1);
      };

      setWs(websocket);
    };

    connectWebSocket();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [ws]);

  return (
    <div className="App">
      <h1>Test</h1>
      <p>Speed: {speed}</p>
      <p>RPM: {rpm}</p>
    </div>
  );
}

export default App;
