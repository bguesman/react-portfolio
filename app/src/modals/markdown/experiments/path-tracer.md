# Path Tracer

![](/img/path-tracer/path-tracer.jpg)

<div id="modal-scroll-point"/>

<div id="modal-subtitle-container"><h2 id="modal-subtitle">Coursework for Brown's Advanced Computer Graphics Class</h2></div>

The first project in Brown's CS2240 course, "Advanced Computer Graphics", was to write a CPU path tracer, a renderer that models physically accurate light transport. The baseline requirements for the project were to implement a basic brute force path tracer that supports 4 kinds of BSDF's: Lambertian, Phong, perfect mirror, and refractive dielectric with Fresnel reflection.

Russian-Roulette path termination was a required feature, though it was left up to our discretion how to do it. I chose to make the termination probability proportional to the square root of the norm of the BSDF, this way paths were more likely to terminate when bouncing off of surfaces that were minimally reflective. We were also required to implement direct lighting to reduce the noise in our image. All the images below were rendered with direct lighting, because without it the results are so noisy they're almost unusable.

I had some extra time, so I decided to work on a few additional features. I figured I would start by trying to reduce the variance in my image, that way I could spend less time rendering tests. I implemented two features toward this end.

The first of these was "stratified sampling". The idea is simple: to get a more uniform sample of rays per pixel, divide the pixel into grid cells and sample rays through each cell to guarantee that the whole pixel area gets covered. Ultimately this didn't produce a noticeable improvement—likely because the sample counts I used were so high that the pixel area was generally well-sampled, even when using white noise as the distribution function.

The second was "importance sampling". The idea here is to sample important BSDF directions more, and less important BSDF directions less—this reduces variance in the image. There is a huge difference in noise between the importance/non-importance sampled images, but it's particularly visible when rendering scenes that make use of the phong BRDF.

I also tried my hand at implementing the Cook-Torrance BSDF, a microfacet model commonly used in PBR workflows (and the one used in Blender's Principled BSDF shader). I used the Beckmann distribution function. I wasn't able to get the importance sampler to work in time though, so the final images were not great.

The final extra feature I implemented was depth of field. It's not so much a physically based model as a hack where I scatter the ray origins around the eye point within some radius (the "aperture") and then move the virtual film plane to where I want to place the focus plane. That being said, I still think it looks pretty good.

I'd love to revisit this project in my free time and build out a more feature-complete path tracer, with more material models and more sophisticated samplers. Chances are good that when I do this again it will be a realtime GPU implementation.

Want to see the code? This is a [private repository on GitHub](https://github.com/bguesman/path) for academic code reasons. Email me and I can give you access (as long as you're not a student at Brown in CS224!).

<figure>

|                                     |                                     |                                     |
| :---------------------------------: | :---------------------------------: | ----------------------------------- |
| ![](/img/path-tracer/cornell-1.jpg) | ![](/img/path-tracer/cornell-1.jpg) | ![](/img/path-tracer/cornell-3.jpg) |

<figcaption align = "center">Some cornell boxes rendered with importance sampling.</figcaption>

</figure>

<figure>
<p align="center">
    <img src="/img/path-tracer/tree.jpg">
</p>
<figcaption align="center">A tree from the Digital Arboretum project, rendered with the path tracer.</figcaption>
</figure>

##
