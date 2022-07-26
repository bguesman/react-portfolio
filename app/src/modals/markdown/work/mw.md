# Modern Warfare

![](/img/mw/farah.jpeg)

<div id="modal-scroll-point"/>

<div id="modal-subtitle-container"><h2 id="modal-subtitle">Interactive, informative game audio systems</h2></div>

I spent the summer in 2019 working at Raven Software on the Call of Duty: Modern Warfare's audio engine. After some initial experimentation, me and the team decided I would focus on improving the sound transport system---the system that determines how sound gets propagated around COD's virtual world.

In the real world, sound transport is a matter of airwaves propagating around an environment. Modeling this in a game is both computationally intractable and not very art-directable though, so transport is generally split up into a few piecemeal "effects" that mimick the salient perceptual features well enough,

- *Reverb/Reflections.* This the echo you hear when you make a loud sound in a room.
- *Spatialization.* Sound arrives at each of your ears at different times, and gets filtered in a particular way depending on where the source is. This influences what "direction" you think a sound is coming from.
- *Occlusion.* When an obstacle is between you and a sound source, some of the sound gets filtered as it passes through the obstacle, and some of it diffracts around the obstacle. Both of these effects combine to dampen the final sound you hear.

The prompt "improve sound transport" is pretty open-ended, so we played around with a lot of ideas---implementing convolution reverb, adjusting room reflections based on a nearby geometry estimate, to name a few. Ultimately, we decided that we'd get the biggest bang for our buck if we spent time improving the occlusion system.


