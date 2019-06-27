#include <Ethernet.h>
#include <EthernetUdp.h>


// create an EthernetUdp instance to let us send/receive packets
EthernetUDP Udp;

// mac address for arduino
byte mac[] = {
   0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED
};

// local port to send data
unsigned int sendPort = 9000;

// desktop IP
//IPAddress ip(10, 1, 193, 147);
//IPAddress ip(169, 254, 49, 21);
//IPAddress ip(169, 254, 190, 234);
IPAddress ip(8, 8, 8, 4);

void setup() {
  Serial.begin(115200);
  
  // establish Ethernet connection
  Ethernet.begin(mac, ip);

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
  Udp.begin(sendPort);
}

void loop() {
  char kwData[4];

  kwData[0] = 1;
  kwData[1] = 2;
  kwData[2] = 3;
  kwData[3] = 5;

  // send data to desktop
  if(Udp.beginPacket(ip, sendPort)) {
    Serial.println("success!");
  } else {
    Serial.println("failed connection");
  }
  Udp.write(kwData);
  Udp.endPacket();

//  Serial.println(Ethernet.localIP());
  //Serial.println("test");

  delay(5);
}
