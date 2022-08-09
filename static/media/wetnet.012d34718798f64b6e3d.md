# Wet Net

![](img/wetnet/wetnet-alt.jpg)

<div id="modal-scroll-point"/>

<div id="modal-subtitle-container"><h2 id="modal-subtitle">An experiment in fast neural fluid simulation</h2></div>

Interactive fluid simulations have been a sort of “holy grail” for real-time graphics applications for some time now. The main issue is that they’re very slow to compute. We (me and Natalie Lindsay, Michael Cosgrove, and [Purvi Goel](https://www.purvigoel.com/)) hypothesized that it’s possible to compute a physically accurate fluid simulation at low resolution in real-time, and use deep learning to efficiently up-sample the resulting fluid simulation in a way that is aesthetically convincing, even if it's not physically accurate.

As a reminder from the fluid dynamics course that I'm sure we all took in undergrad, the state of a fluid is described by,

- t: global time
- v(x, t): the velocity of the fluid at time t and position x
- ⍴(x, t): the density of the fluid at time t and position x
- Some additional parameters (viscosity, external forces, etc.)

The [Navier-Stokes equations](https://en.wikipedia.org/wiki/Navier%E2%80%93Stokes_equations) tell us how such a fluid’s state evolves with time. The job of a fluid sim is to discretize the fluid’s state somehow, and then approximate a solution to the Navier-Stokes equations to time evolve the fluid. We represent v(x, t) and ⍴(x, t) as discretized grids that we can sample at any point via interpolation.

![](img/wetnet/interpolate.jpg)

Then, a really, really high-level diagram of a traditional fluid sim might look something like the following:

![](img/wetnet/traditional-sim.jpg)

Our goal was to augment such a fluid simulation such that, given hi-res V(x, t) and Ρ(x, t), we downsample them to a lower resolution to get V(x, t) and ⍴(x, t), use a fluid sim to get v(x, t + 1) and ⍴(x, t + 1), and run the result through Wetnet to upsample the grids to get an approximation of V(x, t + 1) and Ρ(x, t + 1). Using yet another high-level diagram:

![](img/wetnet/wetnet-sim.jpg)

Our model architecture is an extended autoencoder that shrinks frames of the velocity grid down to features using convolutional layers, and then upsamples them with transposed convolutional layers to predict a modification to the velocity field. We then add this predicted offset to the original lo-res field to get our estimate of the hi-res field.

The key difference between our model and a vanilla autoencoder is the use of RNN cells at the bottleneck. Every frame of a fluid simulation is entirely dependent on preceding frames. In order to capture that important causal behavior, we need something in the network that can maintain state across frames of the simulation—in our case, a series of RNNs.

More precisely, we concatenated each of the encoded frames’s features and passed each feature into a separate RNN. The idea here was that every encoded high-detail feature will time-evolve in a different way, and each per-feature RNN can capture this information and make use of it to improve the temporal consistency of the predictions.

You may be wondering where the architecture diagram is. If you scroll down a bit, you'll find it, but it's useful to talk about one more thing before we get to that: the loss.

The natural loss that comes to mind when working with regular grid data is a summation over the L2 norm of the grid differences. Our loss terms mostly conform to this standard, but we made a few key choices about what grids to compare.

Our first loss term is just the vanilla L2 loss between the predicted frame and the actual high-res frame; straightforward. However, we also introduce a second L2 loss term, bidirectional physically based consequence loss. That's quite a mouthful, but the idea is simple: to improve temporal consistency, we regularize the usual L2 loss with the L2 loss between the actual high-res frame at time t+1 and the upsampled frame put through a traditional high-res fluid sim to get the predicted upsampled frame at t+1. In other words, we enforce that our prediction, once plugged back into a regular fluid sim, produces reasonable results. We also do this for t-1 by running the sim backwards.

To optimize the parameters of the network to minimize this consequence loss, the fluid sim you use needs to be differentiable... so we built a differentiable fluid sim in numpy!

Our third loss term is not an L2 loss at all, but rather a discriminator loss. We train the discriminator in conjunction with the autoencoder to recognize if frames of a high-res fluid sim are really high-res or results of the upsampling process---in other words, if they're real or fake. The idea here is that, at the end of the day, we don't really care if the upsampled frame is exactly the same as the real high-res frame, we care if it appears real or not.

So, with that, we have our final architecture diagram, discriminator included.

![](img/wetnet/architecture.jpg)

Here is an image of our results. The above image is a screen capture of our results. On the left is the low resolution fluid simulation, and on the right is the detailed target fluid simulation. The middle is our upsampled simulation.

![](img/wetnet/compare.jpg)

While we don’t achieve the fine-grained details of the high resolution fluid simulation, our simulation still displays some of the curls and vortices that the low-resolution simulation could not capture. We also found that the deep-learning-upsampled simulation took about 25% less time to run when compared to the high resolution simulation, which was one of our ultimate goals. We predict that this number would be even more relevant as the target simulations became higher and higher resolution, and is a promising observation for production fluid simulations that have high speed and computational demands.

All in all, we feel pretty good about the chances of this being possible, even if our method wasn’t a complete success. Some possible further directions include,

- Using a conditional GAN, as opposed to an autoencoder with a discriminator loss. This is the approach taken by [TempoGAN](https://arxiv.org/abs/1801.09710) and it seems to work quite well.
- Projecting the sim into a higher-dimensional sparser representation to make it easier to separate distinct features—so-called “dictionary learning”, described in [Dynamic Upsampling of Smoke Through Dictionary-based Learning.](http://www.geometry.caltech.edu/pubs/BLDL19.pdf)
- Passing in more prior frames as input to the network. Realistically, only 2 prior frames should be necessary, so that finite differences that are second order in time can be approximated more accurately.
- Applying the same forces at the same time to the high-res simulation and our upsampled simulation, so we can compare them side by side.

Want to see the code? This is a [public repository on GitHub!](https://github.com/bguesman/wetnet)
