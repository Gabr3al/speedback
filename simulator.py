import asyncio
import websockets
import numpy as np
import time

# Define the gear ratios and RPM limits for each gear
gear_ratios = [3.2, 2.1, 1.5, 1.2, 1.0, 0.8, 0.7]
max_rpm = 6500
min_rpm = 1000

# Define the max speed for each gear
gear_max_speeds = [62, 92, 130, 180, 250, 280, 300]
gear_start_rpm = [1000, 4000, 4500, 4500, 4500, 5000, 5500]

# Create an acceleration curve from 0 to 300 km/h over 20 seconds
def acceleration_curve(t):
    if t <= 20:
        return 300 * (1 - np.exp(-0.1 * t))  # Exponential approach to 300 km/h
    return 300

# Function to simulate RPM based on speed and gear
def calculate_rpm(speed, gear):
    # Ensure RPM is within realistic bounds based on speed and gear
    rpm = gear_start_rpm[gear] + (speed / gear_max_speeds[gear]) * (max_rpm - gear_start_rpm[gear])
    return min(max(rpm, min_rpm), max_rpm)

# WebSocket server to send RPM and speed data
async def send_rpm_and_speed(websocket, path):
    start_time = time.time()
    gear = 0
    while True:
        elapsed_time = time.time() - start_time
        speed = acceleration_curve(elapsed_time)
        
        # Shift gears based on speed
        if speed >= gear_max_speeds[gear] and gear < len(gear_ratios) - 1:
            gear += 1
            print(f"Gear shifted to: {gear}")

        rpm = calculate_rpm(speed, gear)

        # Send RPM and speed data in a simple format (e.g., "rpm,speed")
        data = f"{rpm:.2f},{speed:.2f}"
        print(f"Sending data: {data}")

        await websocket.send(data)

        await asyncio.sleep(0.1)  # Send data every 100 milliseconds

# Start the WebSocket server
start_server = websockets.serve(send_rpm_and_speed, "localhost", 8765)

print("Starting WebSocket server...")
asyncio.get_event_loop().run_until_complete(start_server)
print("WebSocket server started.")
asyncio.get_event_loop().run_forever()
