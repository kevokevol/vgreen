import socket

print(socket.gethostbyname(socket.gethostname()))
# Init listener socket to poll for energy (KwH) from Arduino
pwr_listener_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
pwr_listener_socket.bind(("8.8.8.4", 9000))

# Poll for energy data
while True:
    print("Listening...")
    received_data = pwr_listener_socket.recvfrom(1024)
    print("Received pkt: ", received_data)

pwr_listener_socket.close()


