# etch-a-sketch

This is the code that runs on the Raspberry Pi.
It is a node app and I use pm2 to keep it up and running.
It also executes a little python,
If you are wondering why I listen to twitch to send commands to the pi instead of funneling user traffic straight to it through a web server or something, it is because I don't know how many people would be connecting to it at a time. This way, there is only one point of connection to the pi and one source of commands going to to the GPIOs


## Node Requirements
Just use npm to install these...
- `socket.io`
- `opencv4nodejs`
- `express`
- `pm2`


## Python Requirements
- I am using 3.7, but I think it is flexible.
- The only external requirement now is another repo that I am working on for the Pi. It can be pip installed with `pip install git+https://github.com/nerdstoke/raspiGPIOext.git#egg=measurements`


## Configuration
- After everything is installed, it is just a matter of changing the twitch channel in the `config.js` file


## Running
- Run it with `node server.js` or if you are using pm2, `pm2 server.js`