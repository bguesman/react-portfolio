# Shape From Tracing

![](img/sft/dragon.png)

<div id="modal-scroll-point"/>

<div id="modal-subtitle-container"><h2 id="modal-subtitle">Geometry and material acquisition through differentiable path tracing</h2></div>

Read the [paper on arxiv](https://arxiv.org/pdf/2012.03939.pdf), or check out the [code on GitHub](https://github.com/brownvc/shapefromtracing-webpage).

In my last year at Brown, I worked on a research project under professors [Daniel Ritchie](https://dritchie.github.io/) and [James Tompkin](https://jamestompkin.com/), with grad students [Purvi Goel](https://www.purvigoel.com/) and [Loudon Cohen](https://github.com/loudonclear). Our aim was to build a system that used the differentiable path tracer [Redner](https://github.com/BachiLi/redner) to recover geometry and material estimates of an object from various images of it.

Our strategy is, roughly, to compute image-space gradients from comparisons of ground truth images and renders of an initial guess. We then descend these gradients to adjust the geometry and material estimate, render new images, and rinse and repeat.

One of the pitches for using a (computationally heavy) differentiable path tracer for this purpose is that correct global illumination is crucial to disambiguating between albedo and lighting/ambient occlusion. In our paper, we performed a number of "toy case" ablation studies to prove that accounting for global illumination can indeed be important.

<figure>
<p align="center">
    <img src="img/sft/gi.png">
</p>
<figcaption align = "center">One of our most demonstrative ablation studies. Even though the floor is actually grey, failing to account for global illumination causes the optimization process to believe it's purple, "baking in" the illumination from the walls into the albedo.</figcaption>
</figure>

Ultimately, we published the paper in the [3DV 2020 conference](https://visual.cs.brown.edu/projects/shapefromtracing-webpage/). You can learn more about the project by [reading the paper here](https://arxiv.org/pdf/2012.03939.pdf).

##