import socket
import signal
import sys

# close socket when SIGINT signal is received
def signal_handler(sig, frame):
    print('SIGINT signal recieved, closing port')
    pwr_listener_socket.close()
    sys.exit(0)

# Decode ascii string from socket for power (KwH)
def decode_distance_data(binary_ascii_string):
  one_digit_char = binary_ascii_string[3]
  tens_digit_char = binary_ascii_string[2]
  hundreds_digit_char = binary_ascii_string[1]
  thousands_digit_char = binary_ascii_string[0]

  ones_digit = int(chr(one_digit_char))
  tens_digit = int(chr(tens_digit_char))
  hundreds_digit = int(chr(hundreds_digit_char))
  thousands_digit = int(chr(thousands_digit_char))

  distance = (thousands_digit*1000) +(hundreds_digit*100) + (tens_digit*10) + ones_digit

  return distance

print(socket.gethostbyname(socket.gethostname()))

# Init listener socket to poll for energy (KwH) from Arduino
pwr_listener_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM, 0)
pwr_listener_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
pwr_listener_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEPORT, 1)
#pwr_listener_socket.bind(("8.8.8.5", 9000))
pwr_listener_socket.bind(("", 9000))

# Init signal handler
signal.signal(signal.SIGINT, signal_handler)

# Poll for energy data
while True:
    print("Listening...")
    received_data = pwr_listener_socket.recvfrom(1024)
    distance_ascii_string = received_data[0][0:4]
    final_dist = decode_distance_data(distance_ascii_string)
    print("recieved", final_dist)

pwr_listener_socket.close()


