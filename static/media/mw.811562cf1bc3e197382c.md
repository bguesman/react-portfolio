# Modern Warfare

![](img/mw/farah.jpeg)

<div id="modal-scroll-point"/>

<div id="modal-subtitle-container"><h2 id="modal-subtitle">Interactive, informative game audio systems</h2></div>

I spent the summer in 2019 working at Raven Software on the Call of Duty: Modern Warfare audio engine. After some initial experimentation, me and the team decided I would focus on improving sound transport---the system that determines how sound travels around COD's virtual world.

### Sound Transport

In the real world, sound transport is a matter of air pressure waves bouncing around an environment. Modeling this in a game is both computationally intractable and hard to art-direct, so transport is generally split up into a few piecemeal "effects" that mimick the salient perceptual features,

- **Reverb/Reflections.** This the echo you hear when you make a loud sound in a room.
- **Spatialization.** Sound arrives at each of your ears at different times, and gets filtered in a particular way depending on where the source is. This influences what "direction" you think a sound is coming from.
- **Occlusion.** When an obstacle is between you and a sound source, some of the sound gets filtered as it passes through the obstacle, and some of it diffracts around the obstacle. Both of these effects combine to dampen the final sound you hear.

The prompt "improve sound transport" is pretty open-ended, so we played around with a lot of ideas---implementing convolution reverb, adjusting room reflections based on a nearby geometry estimate, to name a few. Ultimately, we decided that we'd get the biggest bang for our buck improving the occlusion system.

### Problems With the Old System

The way that the engine computed occlusion was pretty basic, but was reliable and performant. To get an estimate of how much occlusion there is between the listener and a source, it sent 7 raycasts out to the source, starting at increasing distances to the left and right of the listener.

<figure>
<p align="center">
    <img src="img/mw/old.jpg">
</p>
<figcaption align = "center">The old system estimated occlusion by performing raycasts toward the sound source from the left and right of the player. This worked ok, but had its flaws.</figcaption>
</figure>

We noticed that this approach lacked a few salient features of real world occlusion. For one, as the player gets close to a big obstacle, it should mask more of their field of view, and thus have more occluding power. In this case, the old strategy allows sound to pass through big occluders, like in the following diagram.

<figure>
<p align="center">
    <img src="img/mw/problem.jpg">
</p>
<figcaption align = "center">Using the old system, a close up occluder that takes up most of the listener's field of view would fail to occlude a sound on the other side.</figcaption>
</figure>

Another flaw with the old system was that it lacked vertical occlusion information. For much of COD's history, this hasn't been a big deal. In old school COD, the spends most of their time walking down tight corridors.

The development of Warzone changed this. Maps were about to get much larger, and incorporate varied building structures with more "verticality". In this environment, not handling vertical occlusion breaks immersion and gives players the false impression that sounds are much closer or farther away than they really are.

|                                |                                      |
| :----------------------------: | :----------------------------------: |
| ![](img/mw/vertical-1.jpg) | ![](img/mw/vertical-2.jpg) |

<figure>
<figcaption align = "center">Vertical environments in COD: Warzone necessitate a non-planar sound occlusion system.</figcaption>
</figure>

### The New System: Fresnel Zones

To address both these issues, we took inspiration from the concept of Fresnel Zones from signal processing. The idea is simple: draw an ellipsoid with the sound source and the listener at the foci. The total cross-sectional fraction of that ellipsoid that is covered by obstacles is a good measure of how much of the source signal gets blocked on its way to the listener.

<figure>
<p align="center">
    <img src="img/mw/fresnel.jpg">
</p>
<figcaption align = "center">The "Fresnel Zone" is an ellipsoid with the listener and sound source at the foci. If you project the occluders onto the ellipsoid cross-section, you can estimate the occlusion as the proportion of the cross-section that's filled in.</figcaption>
</figure>

This occlusion estimate has both of the properties that we need it to. It reciprocally takes into account the proximity of occluders to the source _and_ the listener. It also takes into account occlusion across all spatial dimensions, so it naturally accounts for vertical obstacles.

The primary way you can get information about surrounding geometry in COD is via raycasts. We were able to approximately discretize the Fresnel zone with paths made out of two raycasts each, as shown in the diagram below.

<figure>
<p align="center">
    <img src="img/mw/discretize.jpg">
</p>
<figcaption align = "center">You can approximately discretize the Fresnel Zone with paths, each made up of two raycasts.</figcaption>
</figure>

Using this discretization scheme, the occlusion is then calculated as the proportion of occluded raycast paths. We tried a number of different weighting schemes, but ultimately keeping it simple worked well.

Performance more or less scales linearly with the number of paths. We found that we needed at least 5 x 5 = 25 paths to convincingly model occlusion without artifacts. Since there's 2 raycasts per path, this means 50 casts are required per frame---a lot more than the 7 the original solution needs!

To offset this issue, we temporally amortized the casts across frames. The player speed is pretty heavily capped in COD, so occlusion information remains valid for at least a few frames, if not more. We found that we could get away with only doing 10 or so casts per frame, and re-using the rest.

### Results

I wish I could share clips of the results, but sadly all of those are locked behind the closed doors of Raven Software in Madison, Wisconsin.

That said, the updated occlusion strategy received positive feedback from most folks at the studio. Qualitatively, it felt a lot better in the large environments of Warzone, but didn't introduce too many unknowns that sound and UX designers had to contend with.

The plan was to work it into the final release---we met with the folks at Infinity Ward on the last day of my internship to get things lined up. Ultimately, I think other things took precedence, and the improved system never got put in place. 

Still, it was an interesting problem to work with, and I would love to get the chance to work on game audio systems like this again some day.

## 