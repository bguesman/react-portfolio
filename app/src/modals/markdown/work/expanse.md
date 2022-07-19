# Expanse

![](/img/expanse/mallow.jpg)

<div id="modal-scroll-point"/>

<div id="modal-subtitle-container"><h2 id="modal-subtitle">Realtime, expressive, physically-based procedural skies</h2></div>

Visit [Expanse's page on the Unity Asset store here](https://assetstore.unity.com/packages/tools/particles-effects/expanse-volumetric-skies-clouds-and-atmospheres-in-hdrp-192456). For in-depth information, check out the [Expanse Documentation here](https://bguesman.github.io/docsify-test/#/). To learn how to use Expanse, see my [YouTube channel for tutorials](https://www.youtube.com/channel/UCHBzoaGEDkI2P2jsUljq24Q).

Ever since working on Virtual Sky and playing through the stunningly beautiful [Zelda: Breath of the Wild](https://www.youtube.com/watch?v=mzDJ6DI170g), I've had a deepened appreciation for digital emulations of the Earth's atmosphere. Skies aren't just pretty—they're emotional. We have such strong associations with sunsets, sunrises, clear blue mornings and stormy evenings. To communicate those primal feelings in the digital medium is no small task.

Stuck inside the house mid-2020, going half-insane doing crossword puzzles, I decided to start a project in Unity 3D to implement [Sebastien Hillaire's recent EGSR paper on real-time atmosphere rendering](https://sebh.github.io/publications/egsr2020.pdf). I wouldn't have been able to predict that, 2 years down the road, this little experiment would have turned into a production-ready creative tool used by thousands of artists, designers, and developers all over the world.

As of today, Expanse is a state of the art volumetrics tool for Unity's High Definition Render Pipeline that gives artists the power to author convincing simulated skies. In as little as 15 minutes, users can create compelling and interactive atmospheres to breathe new life into their digital experiences.

IMAGES HERE OF EXPANSE

### Design Philosophy

The breakneck advance of scope that comes with productizing a creation necessitates a sort of mandatory adaptability in strategy. Rigid, top-down plans break down quickly in the face of changing circumstances. Sure, this is one of those ancient truisms that's parrotted around so often that it carries a ring of triteness, but that doesn't change that it's (sometimes painfully) accurate.

That said, to build something people like, you have to balance listening to others' advice with your own vision. In a world obsessed with collecting data it doesn't know how to use, data-driven design statistics can be the modern equivalent of the misguided focus group study. It's important to listen to your user base; it's arguably just as important to know _how_ to listen.

Given all of this, at the outset of development, I tried to lay down a framework of principles that could serve less as a ruleset and more as a series of mantras to turn to when faced with tough decisions. Some core ideas to lean on when my instincts were in conflict with what Expanse users wanted.

**Expanse looks better than everything else.** It's crucial that people believe this because, first and foremost, Expanse is a visual product. The success of Expanse's marketing material is entirely predicated on it looking very good. This means that the bar for visual fidelity, both in terms of realism and art direction of the promotional material, has to be high---even if it means inventing new things to get there.

**Stellar performance**. Since Expanse is a tool for use in realtime experiences, it needs to fit cleanly into a 17ms (60 FPS) frame budget, with options to scale performance based on target hardware and target framerate. This automatically rules out particular algorithms, and pursuit of this goal is often the bulk of the work of building a realtime system.

**Everything is physically-based**. Material parameters are fully decoupled from lighting parameters, so that everything looks consistent under all lighting conditions. Rendering methods that are based on statistical formulations of light transport are preferred over visually-driven “hacks”. Every potential authoring choice that deviates from the physically-based paradigm is demarcated as an artistic override.

**Modularity**. Since Expanse must be flexible depending on use case, modularity is a good UX paradigm. Overall, Expanse is built as a monolithic application (you either use Expanse or you don’t), but within its framework you can choose to use or not use different modular components. Put another way, Expanse is designed as a collection of interactable “LEGO pieces” you can use to build a custom sky.

**Intuitive, but expressive**. Novice game designers should be able to control Expanse on a high level with human-interpretable parameters, but expert technical artists should have access to the controls they need to use Expanse in a more nuanced way.

These values were useful for litmus testing new solutions to user issues. Expanse certainly doesn't hit the mark 100% of the time---some of these tenets are conflicting, so that would be impossible. That said, having these goals in the background helped to keep the product experience focused.

### Case Study 1: The Atmosphere

It's easy to rattle off principles in a way that doesn't belie the challenging negotiation between them during the design process. Choices like the following one came up frequently:

- Should the atmosphere be fully parameterizable in a physically accurate way, or...
- Should it be simple and easy to interact with artistically?

Option #1 serves the goal of "everything is physically-based", while option #2 might be the better choice for "intuitive, but expressive".

In this specific example, Expanse tries to accommodate both usage patterns. The atmosphere is composed of a series of modular, interactable "layers" that speak the language of atmospheric science. However, by default, these layers are composed into an Earth-like atmosphere with high-level controls to adjust intuitive parameters like daytime and sunset color.

IMAGE HERE OF LAYERS VS CREATIVE ATMOSPHERE

In this way, users with more advanced needs can invest the time to build their own complex atmospheres, and everyone else can have immediate access to a fast, expressive default.

Expanse is the sum total of hundreds of these little decisions, and it approaches many of them with a similar strategy: build out a powerful feature-set, and, when necessary, wrap it in a simpler interface by default.

It's tempting to lean hard on this pattern of nested functionality. Go too far in this direction, though, and you'll end up hiding a lot of your product's features behind layers of cruft.

To keep things accessible, Expanse places more advanced components directly underneath their high-level wrappers in Unity's GameObject hierarchy. This naturally piques users' curiosity, indicating to them that there's more to the story than what's visible at first glance.

### Case Study 2: Multiple Scattering In Clouds

### Marketing and Content Production

tutorials

music and aesthetics

the importance of written documentation

guerilla marketing

### Community Management
