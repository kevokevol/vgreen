# Dynamically Powering Data Centers with Renewable Energy

This project visualizes the power usage of worldwide data centers, along with their relative CO2 outputs.
![](https://github.com/kevinl94303/roketto-dan/blob/master/docs/demo.png?raw=true)

[Data centers are set to consume 20% of the world's electricity by 2025](https://www.theguardian.com/environment/2017/dec/11/tsunami-of-data-could-consume-fifth-global-electricity-by-2025). However, the energy used to power these centers are mainly from fossil fuels. (The challenge)[http://ceng.eskisehir.edu.tr/DuyuruDosyalari/9913436191.pdf] with sustainably powering these data centers is that renewable energy sources, such as wind and solar, have highly unstable outputs, leading their capacity to be rated lower than their maximum output, and wasted output. Rong et al. identified a major challenge in determining the energy profile of data centers as a major challenge.

Our project seeks to solve that challenge. Together with [technology that allows companies to selectively reduce power consumption at data centers](https://www.technologyreview.com/s/409724/saving-energy-in-data-centers/), our visualization helps data center administrators identify which data centers are currently experiencing a surge in renewable energy, and dynamically reallocate energy needs to data centers using greener energy at the time. 

The frontend is created using [WebGL Globe](https://github.com/dataarts/webgl-globe) and [react-vis](https://github.com/uber/react-vis). The backend is created using Python3 and MySQL. There is a hardware component: Our worldwide power output is represented by a solar panel connected to our database through an Arduino. The circuit diagram for this can be found at https://github.com/kevinl94303/roketto-dan/blob/master/backend/borathon_circuit_diagram.png. 

# Startup Instructions

Clone the repo

Run `npm install`

Run `npm run start`
