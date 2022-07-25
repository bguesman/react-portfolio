# Drivesim

![](https://blogs.nvidia.com/wp-content/uploads/2021/04/image-2.png)

<div id="modal-scroll-point"/>

<div id="modal-subtitle-container"><h2 id="modal-subtitle">A digital twin for autonomous agents</h2></div>

After graduating from undergrad, I wanted to find a job where I could sharpen my engineering skills. I'd done a good amount of computer graphics and simulation work in my last two years of school, so I knew that was the space I'd be looking in.

Sometime during my senior year, I interviewed with the DRIVESim team at NVIDIA, and got excited about what they were working on. Fast forward two years to now, and I'm a part of the DRIVESim framework team, building out the core featureset of a next-generation reality simulator for self-driving cars.

On a high level, you could compare DRIVESim to a game engine like Unreal or Unity---but this would gloss over a lot of what makes DRIVESim such a challenging product to build.

For one, unlike a game engine, a single application instance of DRIVESim has to be capable of rendering an entire sensor set 

Outline: 
- sensor rendering => multi machine, natively distributed
- high level of required compute power => cloud native, containerized
- after the fact performance metrics, data generation, and playback => entire simulation must be deterministic and loggable (no transient runtime data)
- training mission-critical computer vision systems on synthetic data => standard for photorealism is much higher
- vast array of use cases, from data generation, to validation, to AV stack "debugging" means that scenario description needs to be rich/expressive but also
expose multiple levels of procedurality
- given the fast pace of development in the AV world and the lack of standardization 