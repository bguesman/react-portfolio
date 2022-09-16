# Virtual Sky

<img src="img/virtual-sky/moody.jpg" style="width:100%"/>

<div id="modal-scroll-point"/>

<div id="modal-subtitle-container"><h2 id="modal-subtitle">Offline simulation of cumuliform clouds with computational fluid dynamics</h2></div>

For the culminating project of Brown's CS224 course, "Advanced Computer Graphics", I worked with my friends Vicki Tan and Kelly Wang to implement [R. Miyazaki's seminal cloud simulation paper](https://pdfs.sematicscholar.org/f398/7e9e83fe0a969be249ef23ad187ec713dc94.pdf). Over the course of six weeks, we studied, understood, and implemented the algorithm described in the paper from scratch. In fact (to our own surprise) we even fixed a part of it.

### To Make Clouds, You Need Air

Physically-based cloud simulation starts with physically-based fluid simulation—after all, clouds are a product of atmospheric fluid dynamics. The famous Navier-Stokes equations govern the macroscopic motion of a fluid. They are based on a key observation: to completely describe the state of a body of fluid at some point in time, all you need to know is its velocity at every point in space. Because of this, they model the fluid as a vector field of velocities, and describe how that vector field evolves with time.

The Navier-Stokes equations, in their full form, are a huge tensorial monster that can get very complex (in fact, it's still not known if solutions always exist in certain configurations). To make things easier on ourselves, we make two key assumptions.

First, we assume that the fluid is "isotropic", meaning that the way it responds to stress is the same in each direction. This lets us reduce the stress tensor to basically one number. Second, we assume that the fluid is "incompressible", meaning that, roughly, the density of the fluid in a unit volume doesn't change unless more mass is added to the volume. The first Navier-Stokes equation states that the field is divergenceless, which, coupled with the incompressibility assumption, can be shown to imply that the flow conserves mass.

The second Navier-Stokes equation is basically a list of the accelerations that the fluid experiences. These include a) external accelerations, like gravity, b) an acceleration that moves fluid from areas of high to low pressure, c) a "diffusive" acceleration that reduces the differences between neighboring velocities in accordance with a "viscosity" parameter, and d) an "advective" acceleration that compensates for the fluid velocity being transported through space by itself during the interval used to calculate the time derivative.

### Stable Fluids

To simulate the Navier-Stokes equations for incompressible isotropic flow, we used the (now classic) semi-Lagrangian scheme developed by Jos Stam back in the early 2000's. This isn't necessarily the most accurate strategy for fluid simulation, but it is preferred for simulating atmospheric fluid dynamics because it is unconditionally stable. This means that you can make the time step as big as you want without the simulation "blowing up", something necessary to make simulating the large time scales associated with atmospheric fluid dynamics computationally tractable.

We represent the simulation space with a voxel grid—you can think of this as a big grid of little cubes, each of which has an associated velocity value (a natural discretization of a vector field). During a single time-step, Stam's method separates out each of the accelerations and applies them to the velocity field sequentially. External accelerations are applied via a simple first-order forward integration. Pressure and diffusion are formulated as sparse linear systems, which are solved using a sparse solver.

Where Stam's method really gets innovative is in the advection step. To account for the velocity of the fluid in a voxel being transported by itself, Stam proposes that we imagine a particle from that voxel being traced backward in time to a previous place in the grid. We then sample the velocity at this place in the grid, and then use that as the velocity for our voxel. From this description, it's clear why the method is unconditionally stable: it only ever interpolates velocity values that are already in the grid, so it can never "blow up" to hugely positive or hugely negative values.

To implement semi-Lagrangian advection, we had to implement a voxel grid class in C++ that could be sampled at non-integer points and store its data in a way that was conducive to being used in sparse-matrix computations. Using the Eigen math library, we stored the entire grid as a one-dimensional vector in x-major/y-middle/z-minor order, and wrote an accompanying discrete derivatives class that generated the appropriate discretized vector calculus operators as matrices that could multiply this 1D vector. We then used the Eigen SparseLU solver to implement the diffusion and pressure steps. We exposed access to individual points in the grid via a sampling function that tri-linearly interpolated between grid cells. This made back-sampling for the advection step easy and readable.

Here's a fun little animation we rendered of a high-vorticity fluid to demonstrate our implementation of Stam's method. To generate it, we wrote out the voxel grid to a file using OpenVDB, and rendered it using Maya/Arnold.

<img src="img/virtual-sky/vortexconverted.gif" style="width:100%"/>

Semi-Lagrangian advection is pretty cool, but it's not without its faults. It is not inherently mass-conserving (though it can be made to be), and it also can have trouble handling particular boundary conditions, as we found out painfully during our implementation process.

### The Physics of Cloud Formation

Once you've got a fluid simulator, making the transition to cloud simulation is only a matter of making a few extensions.

The broad strokes explanation for how clouds form is easy enough to understand. The sun heats the ground. This creates a buoyant force, transporting water vapor up higher into the atmosphere. As it moves upwards, its temperature decreases—a process known as "adiabatic cooling". Once its temperature decreases enough, it is too cold to remain as water vapor, so it condenses into water droplets: clouds. When water vapor is converted into water droplets, it releases latent heat, which results in additional buoyant force that transports the water droplets and remaining vapor even further skyward, creating the puffy cloud tops we're all familiar with.

Ok, cool, so that's how it works. Now how do we simulate it?

To start, we're going to need to store more data. In particular, we'll need voxel grids to store cloud density, vapor density, and temperature. These will be transported around the simulation space via the velocity field, using semi-Lagrangian advection.

To model bouyancy, we'll apply an additional force to the velocity field in the upward direction that is proportial to the difference between the temperature and the "ambient temperature" (which we'll set for each cell in the grid beforehand and which will remain constant with time) at a point. We'll simulate the heating of the ground by placing a heat source along the bottom of the simulation space.

Adiabatic cooling is easy enough—just increase or decrease the temperature of a grid cell in a way that's proportional to its upward velocity.

The phase transition gets a little trickier. We can define a quantity called the "saturation vapor density" that depends on temperature. If there's more vapor in a cell than its saturation vapor density, then some of that excess vapor starts getting converted to clouds. If there's less, then whatever cloud density is there starts getting converted back to vapor. Seems simple enough, right? Turns out the Miyazaki paper got it wrong, and the way they calculated saturation vapor density guaranteed that no clouds would ever form. We had to make a slight modification to the equation to ensure that it modeled the correct behavior.

Finally, to ensure that we don't lose small-scale detail to the smoothing effect of semi-Lagrangian advection, we'll apply a force that encourages areas of the fluid with high curl to continue swirling—a well-known augmentation to Stam's method known as "vorticity confinement".

So, if you manage to do all that correctly, you'll be able to generate physically based clouds. Of course, chances are, instead you'll run into...

### Bugs

We thought we were close to being done once we'd written all the code. In reality, we spent more time debugging the simulation than we did writing it. Such is the nature of code that takes an incredibly long time to run and can't really be unit-tested. Truth be told, there were more bugs than I have space to write about here, but I'll document some of the key ones.

One bug we encountered was some twist on the classic off-by-one error: we had a mistake in the way we were converting from physical "world space" (in meters) to non-physical index space (grid cell numbers). We had forgetten to account for the fact that we were assuming that the representative point for grid cells was in their center, not their bottom-left corner.

Another issue stemmed from the way we handled advection steps outside the simulation space. We initially just clamped the sample point to lie inside the grid, and used the value at that point. Upon further consideration, we realized this was completely wrong—you have to calculate the intersection of the advection path with the boundary it passes through, and use that point, or, better yet, bounce it off all boundaries it intersects until the full backward time-step is completed.

Perhaps the worst difficulty—though one that you might not necessarily call a bug—was determining and implementing the best boundary conditions for the voxel grids. We tried a number of different options, but all suffered from either artificial decrease or increase of total density. Ultimately, we opted to use a method that modeled collisions with the boundaries (a "reflective" boundary condition), and account for the density dissipation by adding a water vapor source at the bottom of the simulation space.

All in all, this was a very challenging project, and debugging the various boundary condition bugs and trying to make sense of the paper tested my patience more times than one. Ultimately though, it was massively rewarding when we were able to render some pretty cool looking clouds!

Want to see the code? This is a [private repository on GitHub](https://github.com/bguesman/clouds) for academic code reasons. Email me and I can give you access (as long as you're not a student at Brown in CS224!).

<img src="img/virtual-sky/hopeful.jpg" style="width:100%"/>
<img src="img/virtual-sky/swift.jpg" style="width:100%"/>

##
