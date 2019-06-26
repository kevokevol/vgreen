#include <Ethernet.h>
#include <EthernetUdp.h>


// create an EthernetUdp instance to let us send/receive packets
EthernetUDP Udp;

// mac address for arduino
byte mac[] = {
   0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED
};

// local port to send data
unsigned int localPort = 8888;

void setup() {
  Serial.begin(115200);
  
  // establish Ethernet connection
  Ethernet.begin(mac, Ethernet.localIP());

  // Check for Ethernet hardware present
  if (Ethernet.hardwareStatus() == EthernetNoHardware) {
    Serial.println("Ethernet shield was not found.  Sorry, can't run without hardware. :(");
    while (true) {
      delay(1); // do nothing, no point running without Ethernet hardware
    }
  }
  if (Ethernet.linkStatus() == LinkOFF) {
    Serial.println("Ethernet cable is not connected.");
  }

  // start UDP
  Udp.begin(localPort);
}

void loop() {
  char kwData[4];

  kwData[0] = "t";
  kwData[1] = "e";
  kwData[2] = "s";
  kwData[3] = "t";

  // send data to desktop
  Udp.beginPacket(Ethernet.localIP(), localPort);
  Udp.write(kwData);
  Udp.endPacket();
  
}
