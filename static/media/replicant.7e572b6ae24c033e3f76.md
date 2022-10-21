# The Replicant

![](img/replicant/full.jpg)

<div id="modal-scroll-point"/>

<div id="modal-subtitle-container"><h2 id="modal-subtitle">Smooth, lush analogue delay simulation</h2></div>

A demo video is available [here](https://www.youtube.com/watch?v=y902-qY_0hs&t=1119s), and you can download the plugin for free [here](https://bguesman.github.io/ReplicantDelaySite/web/index.html)! It should work with most DAW's (Logic, Ableton, ProTools).

After completing [Martin Finke's tutorial](http://www.martin-finke.de/blog/articles/audio-plugins-001-introduction/) on designing and building audio plugins with Oli Larkin's WDL-OL interace, I decided to try my hand at writing my own.

"The Replicant" Analog Delay Engine is meant to emulate the sound and color of old school analog delay circuits. It sports some key features to this end—rich channel-independent modulation, distortion that can be shaped with hi-pass and low-pass filters, and "analog" meters that mimick the repeat to repeat high frequency loss present in classic analog delay units.

Despite having a vintage sound color, the Replicant is designed to fit comfortably into a modern production workflow. Features like tempo sync of delay time and modulation, tap tempo, and L/R sync for each control allow for the precision you'd expect from a modern effects unit.

From a development standpoint, I ran into quite a few stumbling blocks before getting to the finished product. For one, I was bogged down for a while by some digital artifacts that would come through when the delay time was modulated. Ultimately, the solution to getting rid of these was using a robust interpolation method to cope with fractional delay times---Hermite (polynomial) interpolation did the trick.

I also encountered issues when attempting to implement classic analog delay feedback loop behavior. It was pretty apparent that to get baseline functionality, content already in the delay buffer had to be resampled, resulting in that swooshing time strecthing sound that anyone with a delay stompbox knows so well.

The basic version of this sounded terrible. Harsh digital artifacts and aliasing abounded. I worked on this project before I understood anything about anti-aliasing and reconstruction filters. In hindsight, the right strategy here would have been to apply the right filtering to the signal when resampling. Instead, I ended up applying what was basically a 3 point low pass filter every time I wanted to resample the buffer. I think this ended up working as an anti-aliasing filter, since usually the delay control is moved slowly enough that a filter kernel of 3 ends up being roughly the right size for an AA filter anyway.

Want to see the code? This is a [public repository on GitHub](https://github.com/bguesman/ReplicantDelay)!
