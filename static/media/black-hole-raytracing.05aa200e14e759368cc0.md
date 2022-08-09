# Black Hole Raytracing

![](/img/black-holes/black-holes.jpg)

<div id="modal-scroll-point"/>

<div id="modal-subtitle-container"><h2 id="modal-subtitle">A classic computer graphics algorithm, in warped spacetime</h2></div>

Raytracing is a computer graphics algorithm that leverages the properties of geometric light transport to calculate very convincing specular reflections. Nearly every student of graphics has implemented raytracing in one form or another—it's arguably the most well-known algorithm in computer graphics.

The algorithm is simple: treat the image you're trying to render as a virtual "film plane", place it in your 3D scene, and send a ray of light through each pixel, bouncing it around the scene and accumulating color values with each bounce. This ends up being pretty easy, because light travels in a straight line.

For our final project for Brown's PHYS1100 course, "General Relativity", me and my friend Alex Lawson posed the question, "what if light doesn't travel in a straight line?".

In other words, we decided to try to raytrace scenes that had a black hole in them. The black hole warps spacetime in such a way that light bends around its singularity, creating a beautifully haunting fisheye-looking effect known as "gravitational lensing".

To understand how we implemented this project, you'll need to know a bit of General Relativity, the brainchild of Albert Einstein that changed our notions of space, time, and gravity forever.

Einstein kicks off the theory of General Relativity with the statement that space and time are really one thing, "spacetime", which is a four-dimensional object called a manifold. It's called four-dimensional because it has three spatial dimensions and one time dimension. To know where you are in spacetime, you have to know where you are as an (x, y, z) point in space, and what time "t" it is. In this sense, your location in spacetime is (t, x, y, z).

You can think of a manifold kind of like a surface, like a sphere or a plane. If there was no matter in our universe—nothing with mass—then the surface of spacetime would be flat, like a trampoline without any weight on it. The key statement of General Relativity is that when you put an object with mass into spacetime, spacetime "warps" around it. This is like what happens when you put a heavy ball in the middle of the trampoline and see the trampoline surface bend under its weight.

The mathematical object that tells us what the spacetime manifold looks like is called the metric. The Einstein equation relates the metric to something called the stress-energy tensor, which you can think of as a way of representing the matter distributed across the universe. When you solve Einstein's equation, you are essentially answering the question "what does spacetime look like when it has this distribution of matter in it?".

The simplest solution to Einstein's field equations is the Schwarzschild metric, and when it was discovered (three weeks after Einstein published his theory of General Relativity), it was already a representation of remarkable new physics. The Schwarzschild metric describes a non-rotating black hole.

At the time, nobody really believed the solution made physical sense. It wasn't until the mid-1900's, when astronomers studying the night sky began observing massive gravitational lensing, that it became clear that Schwarzschild's solution actually represented real, enormous physical entities that exist out there in the universe.

Returning to light transport: things on the manifold of spacetime like matter and light move along particular paths. These paths are called "geodesics", and they're the shortest paths between two points on the manifold. For instance, a geodesic on a flat plane is just a straight line.

The geodesics on a manifold are solutions to a second-order differential equation known as the geodesic equation. To figure out how an object moves in curved spacetime, you just need to solve the geodesic equation with the right initial conditions.

Light follows a particular subset of geodesics called "null" geodesics—these are geodesics for which the right hand side of the geodesic equation is zero. So, to figure out how light moves around a black hole, we can find the geodesic equation for the Schwarzschild metric, and solve it numerically to find the null geodesics—this is the analogue of "tracing rays" in the usual flat-space raytracing algorithm.

Of course, this ends up being wildly computationally expensive, so to make things go faster, we set up a static scene where an image is placed some distance behind a black hole. For each pixel in the image we wanted to render, we marched rays of light around the scene using the geodesic equation until they either fell into the black hole or hit the image behind the black hole. We recorded which pixel each pixel in the output rendered image corresponded to in the image behind the black hole, and used this data to generate a lookup table. In this way, we can run the rendering algorithm once to generate the table, then use the lookup table to place any image behind the black hole.

The results? Pretty cool!

Want to see the code? This is a [public repository on GitHub!](https://github.com/bguesman/black-hole-raytracing)

<!-- Easiest way to display 2 images side-by-side is to use a markdown table -->

|                                      |                                      |
| :----------------------------------: | :----------------------------------: |
| ![](/img/black-holes/stars-1-bh.jpg) | ![](/img/black-holes/stars-2-bh.jpg) |

##
