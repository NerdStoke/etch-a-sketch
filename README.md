# etch-a-sketch

This is the code that runs on the Raspberry Pi.
It is a node app and I use pm2 to keep it up and running 
If you are wondering why I use a cloud server to talk to the pi instead of funneling user traffic straight to it, it is becuase I don't know how many people would be connecting to it at a time. This way, there is only one point of connection to the pi and one source of commands foing to to the GPIOs


## Node Requirements
Just use npm to install these...
- `socket.io`
- `opencv4nodejs`
- `express`
- `pm2`


### Setting up port forwarding
Honestly, you are going to have to google this for yourself.  
Depending on your ISP and router, it is all going to be different.  
Just use port 80 and TCP where prompted.

### Configuring ports on Raspberry Pi
if you used port 80, then - on your raspberry pi - you need to redirect traffic from port 80 to port 3000
`sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000`
