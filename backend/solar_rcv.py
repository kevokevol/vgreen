import socket

# Init listener socket to poll for energy (KwH) from Arduino
pwr_listener_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM, 0)
pwr_listener_socket.bind(("", 8888))

# Poll for energy data
while True:
    received_data = pwr_listener_socket.recvfrom(1024)
    print("Received pkt: ", received_data)

pwr_listener_socket.close()


