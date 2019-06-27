#include <LiquidCrystal_I2C.h>
#include <Wire.h>

#define VIN A0 // define the Arduino pin A0 as voltage input (V in)

 
LiquidCrystal_I2C lcd(0x27,16,2); // set the LCD address to 0x27 for a 16 chars and 2 line display
 
const float VCC   = 5.0;// supply voltage is from 4.5 to 5.5V. Normally 5V.
const int model   = 1;   // enter the model number (see below)

/*
          "ACS712ELCTR-05B-T",// for model use 0
          "ACS712ELCTR-20A-T",// for model use 1
          "ACS712ELCTR-30A-T"// for model use 2  
sensitivity array is holding the sensitivy of the  ACS712
current sensors. Do not change. All values are from page 5  of data sheet          
*/
float sensitivity[] ={
          0.185,// for ACS712ELCTR-05B-T
          0.100,// for ACS712ELCTR-20A-T
          0.066// for ACS712ELCTR-30A-T
       }; 

const float QOV = 0.5 * VCC;// set quiescent Output voltage of 0.5V
float inst_voltage = 0; // internal variable for voltage
float voltage   = 0;
float current   = 0;
float watt      = 0;
float energy    = 0;


/*
 * funciton to print power, voltage and amps to LCD display
 */
void printToLCD(float watt, float voltage, float energy, float amps) {
    lcd.setCursor(1,0); // set the cursor at 1st col and 1st row
    lcd.print(watt);
    lcd.print("mW ");
    lcd.print(voltage);
    lcd.print("V  ");
    lcd.setCursor(1,1); // set the cursor at 1st col and 2nd row
    lcd.print(energy, 3);
    lcd.print("mWH ");
    lcd.print(amps);
    lcd.print("A ");
}

/*
 * function to read current form ACS current sensor module
 */
float readCurrent() {
    float voltage_raw =   (5.0 / 1023.0)* analogRead(VIN);// Read the voltage from sensor
    inst_voltage =  voltage_raw - QOV + 0.012 ;// 0.000 is a value to make voltage zero when there is no current
    float current = inst_voltage / sensitivity[model];

    if (current < 0) 
        current = abs(current);

    return current;
}

/*
 * function to read voltage from solar panel
 */
float readVoltage() {
    int sensorValue = analogRead(A1);
    float voltage = sensorValue * (5.0/1023.0);
    //Serial.println(voltage);

    return voltage;
}

void setup() {
    Serial.begin(9600);

    // initialize LCD
    lcd.init(); 
    lcd.backlight(); 
}

void loop() {
    // get time passed since program has started
    long milisec = millis();
    long time = milisec/1000;
  
    // read current and voltage
    current = readCurrent();
    voltage = readVoltage();
  
    // calculate power in watts and watt/hrs
    if (current == 0) 
      current = 0.01;
    watt = voltage * current * 100.00;
    energy = (watt * time) / (3600);
  
    // print readings
    printToLCD(watt, voltage, energy, current);  
    
    delay(500);
} 
