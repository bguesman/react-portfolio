# Expanse

![](/img/expanse/mallow.jpg)

<div id="modal-scroll-point"/>

<div id="modal-subtitle-container"><h2 id="modal-subtitle">Realtime, expressive, physically-based procedural skies</h2></div>

Ever since working on Virtual Sky and playing through the stunningly beautiful Zelda: Breath of the Wild, I've had a deepened appreciation for digital emulations of the Earth's atmosphere. Skies aren't just pretty—they're emotional. We have such strong associations with sunsets, sunrises, clear blue mornings and stormy evenings. To communicate those primal feelings in the digital medium is no small task.

I first had the idea for this project as I was slogging through the Vulkan tutorial, fantasizing about what cool stuff I could do once I had written and (hopefully) understood the 2000 or so lines of boilerplate necessary to get a triangle mesh to show up on the screen. I was playing a lot of The Witcher III's "Blood and Wine" DLC at the time, and was enamored with the vast, teal skydome that floats over the Duchy of Toussaint. In particular, I was curious about the fluffy clouds that dotted the sea of infinite blue—how do you render convincing clouds in realtime?

Turns out that it's not so easy. If you're familiar with path-tracing, you know how computationally expensive it is to accurately simulate the illumination of 2D surfaces. With volumes of gas, like clouds and the atmosphere, you're adding a whole new dimension to the rendering equation. It can take hours, sometimes even days, to simulate light transport through a complex volume. In a realtime digital experience, we have milliseconds.

There's also the question of modeling. Modeling the atmosphere isn't so challenging---it's easy enough to construct analytical approximations that are accurate enough for our purposes. Clouds are a different story: they get their unique shapes from the complex drama of fluid dynamics and heat dispersion playing out in the sky. While it's possible to simulate this so that it looks convincing from far away, a huge part of what really imbues clouds with a sense of scale is all of their small tendrils and swirls. Running a fluid simulation at a high enough resolution to capture these details is just too expensive in the context of a realtime application.

At first glance the problem seems intractable. However, as you can imagine, there's been a lot of effort put into solving it.

The model I chose to implement for the atmosphere is based on Sebastien Hillaire's 2020 EGSR paper. The key realization he makes that differentiates this work from its predecessors is that multiple scattering behavior in Earth's atmosphere is low-frequency---it doesn't change very quickly across the sky. Because of this, you can get away with pre-computing and caching a sort of global approximation to the multiple scattering contribution, and composite it on top of the local single-scattering result.

The model does have some drawbacks---for one, it's extremely expensive to model fog with volumetric shadows. So I made a few modifications based on the now classic Volumetric Scattering as a Post-Process article. The final results are pretty convincing!
