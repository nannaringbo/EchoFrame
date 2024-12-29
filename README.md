*EchoFrame Instructions*
-------------------------------------------------------------------------------------------------------------------------------------------


Prerequisites
-------------------------------------------------------------------------------------------------------------------------------------------

As the AR functionalities in EchoFrame is handled by the WebXR device API, the following is required:

- An ARCore supported android device (https://developers.google.com/ar/devices#google_play_devices)
- Google Play Services for AR installed and enabled on the device
- Chrome 81+ installed on the device with XR flags enabled (chrome://flags/)
- A secure context (https://)

Some of the AR functionalitites might perform differently (e.g. depth sensing, real world understanding, 3D model rendering), depending on the device.

NOTE: WebXR is not compatible with iOS

Instructions to run and access EchoFrame
-------------------------------------------------------------------------------------------------------------------------------------------
There are two ways to access and experience EchoFrame. (1) Through the website, where EchoFrame is hosted or (2) running the code on your device by cloning the GitHub repository.

(1) Website:
EchoFrame can be accessed from the Chrome browser on an Android phone  by following this link: https://nannaringbo.github.io/EchoFrame/.

(2) GitHub Repository:
If you want to run EchoFrame from your IDE, follow the steps outlined below: 
NOTE: Node.js is required to install the dependencies. 

1. Clone the github repository or download the project files.
2. Open a terminal in the project directory.
3. Run "npm install" in the terminal, to install all dependencies and dev dependencies.

4. Run "npm run dev" in the terminal. 
This will start the following servers:

A local server running on your device, which can be accessed by following the "Local" link specified in the terminal (by default: https://localhost:5173/EchoFrame/). This is only accessible from the device running the server. 

A network server running on your local network, which can be accessed by following the "Network" link specified in the terminal (by default: https://<device-ip-address>:5173/EchoFrame). This is accessible from any device on your local network. 

You will have to use the network server, accessing it from a Chrome browser on an android phone, to enter the AR functionalities. It is not possible to access AR functions on a computer, however, the scores implemented in EchoFrame, can still be seen without AR, showing it as a normal Three.js scene in the web browser. 

Instructions to experience EchoFrame
-------------------------------------------------------------------------------------------------------------------------------------------
When you have accessed EchoFrame, either through the hosted website or cloning the repository and run it locally, you can experience the implemented AR scores, by following the steps outlined below:

1. From the landingpage, you can navigate to five different AR scores (Score 1, Score 2, Score 3, Score 4, Score 5), which are described in the thesis (Chapter X, x.x).

2. Click on one of the AR scores to begin.

3. Start the AR experience by clicking the "Enter AR"-button at the bottom of the screen. 

4. To exit the AR experience, click the cross in the top right corner. 

5. To return to the landingpage, refresh the page.


