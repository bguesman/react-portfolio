# Digital Arboretum

![](img/digital-arboretum/golf-course.png)

<div id="modal-scroll-point"/>

<div id="modal-subtitle-container"><h2 id="modal-subtitle">Procedural branch structures for realistic tree generation</h2></div>

For our final project in Brown's CS1230 course, myself, Leo Ko, and Eddie Jiao decided to tackle procedural generation of branch structures and leaf patterns for realistic trees. While many tactics exist for modeling self-similar branch structures, one of the most established is to use the mathematical object known as the L-System. L-Systems are, more or less, nice and compact ways of representing fractals.

During the first few meetings of brainstorming about the project, we laid out a few guiding principles. The first was that we were only interested in modeling realistic tree geometry, not texture. Simulating the material properties of bark/leaves and finding a good way to texture a mesh as complex as a tree are both very interesting problems, but we had keep our scope narrow enough to wrap things up within 3 weeks.

We also set a goal of keeping things as modular as possible. Keeping this in mind, we designed the tree generation process to have three completely separable and abstract stages: L-system generation, L-system to skeleton translation, and skeleton to 3D mesh translation. First, we instantiate a fully parameterizable L-System object that can generate branch structures as lists of symbols. These lists of symbols encode the fractal branch structure of the tree, but don't specify anything about how that branch structure is realized as a physical object. We use a user-specified random seed to generate a list of symbols and then pass this to the skeleton generator, which converts it to a series of "branch" line segments in 3-space. The skeleton generator makes decisions about how to set the lengths and orientations of branches, but makes no changes to the branching pattern specified by the symbol string. Finally, the skeleton is passed to the mesh generator, which takes the line segments and transforms them into a 3D mesh with solid branches that connect to each other.

|                                        |                                           |
| :------------------------------------: | :---------------------------------------: |
| ![](img/digital-arboretum/orange.png) |   ![](img/digital-arboretum/green.png)   |
| ![](img/digital-arboretum/willow.png) | ![](img/digital-arboretum/jacaranda.png) |

<figure>
<figcaption align = "center">A wide variety of trees can be generated with Digital Arboretum.</figcaption>
</figure>

There were many design challenges along the way, but the most important to the success of the project was finding a way to address the uniformity of straightforward L-Systems. Vanilla L-Systems are exactly self-similar, and trees in the real world aren't. We knew we had to add randomness, but the question was "where?".

We first experimented with "stochastic L-Systems", which incorporate randomness into their branching structure. This helped give the branching structures more of an organic feel, but the tree meshes themselves still felt like just a bunch of cylinders cobbled together.

Our solution to this problem was to introduce stochasticity to the translation process from L-System branch structure to 3D mesh. Introducing user-controllable random perturbations to the otherwise uniform length, orientation, and thickness decisions made in each step of the translation from symbol list to skeleton to mesh significantly increased the realism of the trees we were able to generate.

Even with these modifications, the trees still didn't look quite right. We realized this was because certain branches "stuck out" in ways that looked physically impossible. To remedy this issue, we implemented a variable "gravity" parameter, that bends branches toward the ground in a way that's physically-based, using torque/moment of inertia calculations.

<figure>
<p align="center">
    <img src="img/digital-arboretum/neon.png">
</p>
<figcaption align = "center">Having some fun with emissive shaders in blender.</figcaption>
</figure>

We expected leaves to be quite a challenge, and left them as a "nice-to-have". But it turned out that the modular-first structure of our code allowed us to treat leaves just like other skeleton branches that, when translated to a mesh, became small, flat hexagons instead of thick cylinders. In hindsight, a higher poly leaf mesh would have given better results, but length/thickness-adjustable hexagons are enough to create a decent variety of leaves that look ok when viewed from afar.

One of the last features we added, but possibly the most important, is the ability to export the branch structure and leaf pattern (separately) to .obj files. This allowed us to produce some nice scenes in Maya/Blender, and even to render a whole forest of trees in realtime, since each tree is only 20k-50k triangles. While we have no plans to continue the project, it certainly serves as proof of concept that may inspire us to create something like a blender or maya plugin in the future.

If I individually were ever to work on tree-generation again, I'd like to experiment with more physically-based strategies for generating branch structures. How possible is it to analytically "grow" a tree from a seed? How could you parameterize that growth to create different species of trees? I also think that the question of texturing branch structures is an interesting one to explore. Trees are challening to unwrap, and cylinder projections cause visible artifacts. Could you generate a seamless procedural mesh-color texture for a tree as you generate its geometry? Do analytical models exist for bark emulation, or could this be taken care of by a statistical model like a generative adversarial network?

Want to see the code? This is a [private repository on GitHub](https://github.com/bguesman/cs1230-final-project) for academic code reasons. Email me and I can give you access (as long as you're not a student at Brown in CS123!).

<div class="video-wrapper">
    <iframe src="https://www.youtube.com/embed/jDcx-KobpdU" title="Digital Arboretum - Eddie Jiao '19, Leo Ko '20 & Brad Guesman '20" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

<figure>
<figcaption align = "center">The final demo video for the project.</figcaption>
</figure>

##