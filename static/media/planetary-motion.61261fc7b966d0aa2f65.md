# Planetary Motion

![](/img/planetary-motion-sim/planetary-motion-sim.jpg)

<div id="modal-scroll-point"/>

<div id="modal-subtitle-container"><h2 id="modal-subtitle">A fun web demo of planets moving under mutual gravitational forces</h2></div>

This project lives on the web. You can find it [here](https://bguesman.github.io/planetary-motion-sim/)!

I had the idea a while back to do a simulation of Newtonian gravity in VR using AFrame.io, but figured it would be a good idea to implement it as a 2-D project first and work out the kinks in that environment. I never actually ended up implementing a WebVR version—I moved on to other projects instead. However, this still lurks in the back of my mind as a fun project idea.

For the modelling element, the program is spartan enough that all the computations can be done client side. The integrator is a simple application of Euler's method—I wrote this before I knew about more reliable methods like RK4. For the graphics element, I used p5.js.

Want to see the code? This is a [public repository on GitHub](https://github.com/bguesman/planetary-motion-sim)!
