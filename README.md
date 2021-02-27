# LEDctrl backend

Server application for [LEDctrl app](https://github.com/fischi1/LEDctrl).

This Node.js project was designed to run on a Raspberry Pi alongside [RPI-WS2812-Server](https://github.com/tom-2015/rpi-ws2812-server) to control a WS2812 led strip. In the repository is also a configuration for managing both applications with [supervisor](http://supervisord.org/).

## Things needed

-   WS2812 led strip
-   Raspberry Pi
-   Power supply for the led strip (optional, depends on the amount of leds you want to control)

## Setup

-   Connect your led strip to the Raspberry Pi. See [this article](https://learn.adafruit.com/neopixels-on-raspberry-pi/raspberry-pi-wiring) for more information  
    Make sure the led strip is connected to **GPIO pin 18**
-   Install RPI-WS2812-Server on your Pi in the home directory `~/rpi-ws2812-server`  
    See [Installation](https://github.com/tom-2015/rpi-ws2812-server#installation)
-   Clone this repository into `~/LEDctrl-backend`
-   `cd` into the project folder
-   Run `npm install` and `npm run build`
-   Install _supervisor_ with `apt-get install supervisor`
-   Copy the config file `supervisor/ledctrl.conf` to `/etc/supervisor/conf.d/`
-   Run `supervisorctl reread` and `supervisorctl update`
-   `supervisorctl status` should display both applications as _RUNNING_
-   Open the settings of the app on your phone and enter the settings
-   Enter the ip or hostname of your Raspberry Pi in the corresponding field
-   Congratulations! You should now be able to control the leds via the app
