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

The breakneck advance of scope that comes with productizing a creation necessitates a sort of mandatory adaptability in strategy. Rigid, top-down plans break down quickly in the face of changing circumstances. That said, to build something people like, you have to balance listening to others' advice with your own vision. In a world obsessed with collecting data it doesn't know how to use, data-driven design statistics can be the modern equivalent of the misguided focus group study.

Given all of this, at the outset of development, I tried to lay down a framework of principles that could serve less as a ruleset and more as a series of mantras to turn to when faced with tough decisions

**Expanse looks better than everything else.** It's crucial that people believe this because, first and foremost, Expanse is a visual product. The bar for visual fidelity, both in terms of realism and art direction of the promotional material, has to be high---even if it means inventing new things to get there.

**Stellar performance**. Since Expanse is a tool for use in realtime experiences, it needs to fit cleanly into a 17ms (60 FPS) frame budget. This automatically rules out particular algorithms.

**Everything is physically-based**. Material parameters are fully decoupled from lighting parameters, so that everything looks consistent under all lighting conditions. Rendering methods based on statistical formulations of light transport are preferred over visually-driven hacks.

**Modularity**. Expanse must be flexible depending on use case, so modularity is a good UX paradigm. Expanse is designed as a collection of interactable “LEGO pieces” you can use to build a custom sky.

**Everything Happens in Unity**. Often times, game engines will frustratingly require artists to generate content in a more sophisticated outside application (like Houdini or Substance Designer). To author skies in Expanse, you should never have to leave your Unity project.

**Intuitive, but expressive**. Novice game designers should be able to control Expanse on a high level with human-interpretable parameters, but expert technical artists should have access to more sophisticated controls.

These values are useful for litmus testing new solutions to user issues. Expanse certainly doesn't hit the mark 100% of the time, but having these goals in the background helps to keep the product experience focused.

### Case Study 1: The Atmosphere

It's easy to rattle off principles in a way that doesn't belie the challenging negotiation between them during the design process. Choices like the following one came up frequently:

- Should the atmosphere be fully parameterizable in a physically accurate way, or...
- Should it be simple and easy to interact with artistically?

Option #1 serves the goal of "everything is physically-based", while option #2 might be the better choice for "intuitive, but expressive".

In this specific example, Expanse tries to accommodate both usage patterns. The atmosphere is composed of a series of modular, interactable "layers" that speak the language of atmospheric science. However, by default, these layers are composed into an Earth-like atmosphere with high-level controls to adjust intuitive parameters like daytime and sunset color.

IMAGE HERE OF LAYERS VS CREATIVE ATMOSPHERE

In this way, users with more advanced needs can invest the time to build their own complex atmospheres, and everyone else can have immediate access to a fast, expressive default.

Expanse uses this design pattern frequently: namely, build out a powerful feature-set, and, when necessary, wrap it in a simpler interface. To keep things accessible, Expanse places more advanced components directly underneath their high-level wrappers in Unity's GameObject hierarchy. This naturally piques users' curiosity, indicating to them that there's more to the story than what's visible at first glance.

### Case Study 2: Multiple Scattering In Clouds

When you think of clouds, you probably imagine white, fluffy little creatures scudding across a blue sky. What you might not realize is that this "Platonic ideal" of a cloud is notoriously challenging to simulate in realtime.

Light scatters around inside of dense clouds thousands of times, brightening up parts of the cloud that would otherwise be very dark, resulting in that familiar white and fluffy appearance. The name for this repeated bouncing around of light is "multiple scattering", and simulating it is extremely computationally expensive. For this reason, most realtime systems will use some sort of cheap approximation to get the clouds looking decent.

After spending a year steeped in the literature of realtime atmospheres, I made the observation that most cloud rendering systems vastly under-index on the time they spend developing a good multiple scattering approximation. From Cyberpunk 2077 to Unity's own implementation, most just throw up their hands and say "good enough".

Given design tenet #1 ("Expanse looks better than everything else"), this wasn't going to work. So, early on, I decided to invest a large amount of time to develop an art-directable multiple scattering model that captures the salient features of clouds.

I won't go into the details of how it works, but I think the results speak for themselves. Artists can control the multiple scattering behavior of clouds with intuitive controls like "shadowing", "ambient", and "multiple scattering amount". If they so choose, they can dig underneath and further adjust the lighting model to get the look they want.

IMAGES COMPARING MULTIPLE SCATTERING PARAMETERS

### Marketing and Content Production

Expanse simulates skies, and skies can make us feel many ways. After toying around with a lot of ideas, I decided that Expanse's promo videos should capture something reminiscent of the sense of awe you feel when faced with the pure massiveness of the natural world. They should have a moody spirituality to them, a sense of zooming out from the details of life to look at a bigger picture.

Ideally, the first encounter users have with Expanse is sensory, almost impressionistic. It consists of "promo" images and videos of Expanse looking its best---displayed on the front page of the Unity asset store, in a reddit post, in the Expanse Discord showoff channel, or on a recommended promo video on YouTube.

These promo videos need to leave an emotional impression. They have to be more than just tech demos; they need to show the viewer the sort of art they can create with the tool, the moods they can evoke.

Because of this, I chose to lay them out more like vibey B-Roll edits, set to an ethereal soundtrack reminiscent of Washed Out's work (see the page on Expanse's score for more about this). Most of the shots are of the sky, set over big open landscapes (natural and man-made). There is no text in the videos---just footage.

These videos would definitely look better if a more seasoned professional was authoring the content and stitching together the shots. But, given that it's just me working on this project, I had to make do with my own (limited) skillset.

INSERT LINK TO VIDEO

To back up this flashy, visual promotional material, Expanse has a series of video tutorials that explain the feature-set in depth. It also has a very complete, detailed documentation site. Both of these have been critical for educating users on the tool, and for inspiring trust in prospective customers.

Most of the exposure Expanse gets is via the Unity asset store page, but guerilla marketing has also been somewhat successful. Maintaining an active Discord server and Reddit account, and posting in various communities/allowing spread through word of mouth has been an effective supplement to the visibility Expanse gets on the asset store.

### Community Management

Expanse's primary channels for support are email and a very active Discord server. Generally, users who email are re-routed to the Discord server, where discussion is easier.

Having an open-ended, chat-based community has been invaluable, both for Expanse as a product and for me as a developer. When the support forum is also a place to hang out, share inspiring material, and chat about projects, a collective ethos builds around the product and, in some sense, becomes a part of the product itself.

This risks sounding a little sleazy, when phrased this way, but it's an honest observation. Support and advocacy on Expanse's behalf from this community of game designers, developers, and artists is one of the main reasons Expanse has been so successful.

### What's Next for Expanse

Currently, Expanse is on version 1.6, with plans in the works for a v1.7 to be released soon. To stay up to date, subscribe to the [Expanse Discord Server](https://discord.gg/F3VQ2vJy9p).

If you or your company is looking for a virtual sky solution and would like to speak about licensing or acquiring Expanse's IP, please contact [brad.guesman@gmail.com](mailto:brad.guesman@gmail.com).
