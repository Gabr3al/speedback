/* Functions to update CSS props */
let topSpeed = 0;

function updateRpm(value) {
    document.querySelector('#revmeter .gauge').style.setProperty('--rpm', value);
    let roundedValue = Math.floor(value / 100) * 100;
    let formattedValue = roundedValue.toString();
    document.querySelector('#rpm_text').innerText = formattedValue;
}

function updateKmh(value) {
    document.querySelector('#speedmeter .gauge').style.setProperty('--kmh', Math.round(value));
    let formattedValue = Math.floor(value)
    document.querySelector('#speed_text_big').innerText = formattedValue.toString().padStart(3, '0');

    let roundedValue = Math.floor(value);
    if (roundedValue > topSpeed) {
        topSpeed = roundedValue;
        document.querySelector('#speed_text').innerText = topSpeed;
    }
}

updateRpm(0);
updateKmh(0);

let ws;

function connectWebSocket() {
  ws = new WebSocket('ws://localhost:8765');

  ws.onopen = () => {
    console.log('Connected to WebSocket server');
  };

  ws.onmessage = (event) => {
    const [rpm, speed] = event.data.split(',').map(parseFloat);
    updateRpm(rpm);
    updateKmh(speed);
  };

  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  ws.onclose = () => {
    console.log('WebSocket connection closed. Attempting to reconnect...');
    setTimeout(connectWebSocket, 1000);
  };
}

connectWebSocket();
