# Modern Warfare

![](/img/mw/farah.jpeg)

<div id="modal-scroll-point"/>

<div id="modal-subtitle-container"><h2 id="modal-subtitle">Interactive, informative game audio systems</h2></div>

I spent the summer in 2019 working at Raven Software on the Call of Duty: Modern Warfare's audio engine. After some initial experimentation, me and the team decided I would focus on improving the sound transport system---the system that determines how sound gets propagated around COD's virtual world.

In the real world, sound transport is a matter of airwaves propagating around an environment. Modeling this in a game is both computationally intractable and not very art-directable though, so transport is generally split up into a few piecemeal "effects" that mimick the salient perceptual features well enough,

- *Reverb/Reflections.* This the echo you hear when you make a loud sound in a room.
- *Spatialization.* Sound arrives at each of your ears at different times, and gets filtered in a particular way depending on where the source is. This influences what "direction" you think a sound is coming from.
- *Occlusion.* When an obstacle is between you and a sound source, some of the sound gets filtered as it passes through the obstacle, and some of it diffracts around the obstacle. Both of these effects combine to dampen the final sound you hear.

The prompt "improve sound transport" is pretty open-ended, so we played around with a lot of ideas---implementing convolution reverb, adjusting room reflections based on a nearby geometry estimate, to name a few. Ultimately, we decided that we'd get the biggest bang for our buck improving the occlusion system.

The way that the engine computed occlusion was pretty basic, but was reliable and performant. To get an estimate of how much occlusion there is between the listener and a source, it sent 7 raycasts out to the source, starting at increasing distances to the left and right of the listener.

DIAGRAM OF OLD STRATEGY HERE

We noticed that this approach lacked a few salient features of real world occlusion. For one, as the player gets close to a big obstacle, it takes up more of their field of view, and thus has more occluding power.

In test cases like this, the old strategy actually allows for sound to pass through big occluders like in the following diagram.

Another flaw with the old system was that it lacked vertical occlusion information. This is not so crucial when you're thinking about walking down corridors---a common environment in old school COD. 

The development of Warzone changed this assumption. Maps were about to get much larger, and incorporate varied building structures with more "verticality" than traditional COD maps. Not handling vertical occlusion breaks immersion and gives players the false impression that sounds are much closer or farther away than they really are.
