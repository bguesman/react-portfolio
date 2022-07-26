# Drivesim

![](https://blogs.nvidia.com/wp-content/uploads/2021/04/image-2.png)

<div id="modal-scroll-point"/>

<div id="modal-subtitle-container"><h2 id="modal-subtitle">A digital twin for autonomous agents</h2></div>

After graduating from undergrad, I wanted to find a job where I could sharpen my engineering skills. I'd done a good amount of computer graphics and simulation work in my last two years of school, so I knew that was the space I'd be looking in.

Sometime during my senior year, I interviewed with the DRIVESim team at NVIDIA, and got excited about what they were working on. Fast forward two years to now, and I'm a part of the DRIVESim framework team, building out the core featureset of a next-generation reality simulator for self-driving cars.

On a high level, you could compare DRIVESim to a game engine like Unreal or Unity---but this would gloss over a lot of what makes DRIVESim such a challenging product to build.

For one, unlike a game engine, a single instance of DRIVESim has to be capable of rendering an entire AV sensor set of Radar, LiDAR, and visual light spectrum cameras at high resolution. This is extremely costly from a performance perspective---especially when you consider the standard of photorealism necessary for training and testing perception systems.

This is flat out too much work for a single machine to handle (even one equipped with 8 massive GPU's). This being the case, DRIVESim has to be designed as a natively distributed application, capable of splitting its work across many "nodes" in a high-powered compute cluster. Traditional game engines typically don't have to contend with this problem at all.

DRIVESim also needs to enable users to collect performance metrics on scenarios after execution, to analyze performance of the AV stack. It also needs to be able to synthetically generate data for non-realtime use (training a perception model, for instance). DRIVESim solves both of these issues by enforcing that simulation runs are loggable and deterministic. This means both that,

1. All procedural elements have to be tightly controlled and seeded.
2. All simulation state needs to be captured in a common, performant serializable data structure---i.e., no simulate state can be stored as transient runtime data (in local C++ data structures, for instance).

Finally, DRIVESim has to address a vast array of use cases, from data generation, to validation, to AV stack "debugging". Emphasizing that last case, the scenario description needs to be rich; users need to be able to author specific scenarios to isolate specific behaviors. Above that base level of expressiveness, though, users need to have coarser-grained procedural controls to quickly author more complex and varied test cases.

I bring all of this up because, in my time at NVIDIA, I've directly worked on all of these problems, ranging from hardcore tech (working out the strategy for multi-node execution) to more user-facing challenges (designing the procedural traffic spawner system). That's one of the most valuable parts about working on this project: having to learn about and work with almost every aspect of the system.

Building a simulator for digital worlds is a cross-disciplinary undertaking. The DRIVESim team is massively diverse, composed of engineers, designers, 3D artists, scientists, and everyone in between. Being on the framework team has led to interfacing with almost all of them at some point of another, and that in itself has been a rewarding learning experience.