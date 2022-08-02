# This Website

![](/img/site/splash.png)

<div id="modal-scroll-point"/>

<div id="modal-subtitle-container"><h2 id="modal-subtitle">How do you make something fun and informative at the same time?</h2></div>

Somewhere around mid-2021, in the thick of managing Expanse support requests and giving 3D artists advice on making beautiful skies, I started to think of myself less as a developer and more as a product designer. Maybe this was wishful thinking more than anything else, but that kernel of a feeling gradually changed the way I relate to software. Hence the title of this site, Brad Guesman: _Creative Technologist_.

Ruminating about the job search, coming off a round of Tech Art interviews that turned into (almost successful) conversations about acquiring Expanse, I resolved to put together a portfolio page that reflects the creative nature of the work I enjoy.

The project took almost two and a half months from start to finish---from gathering a mood board, to blocking out page concepts on Figma, to implementing it from scratch in React (including what I think is the first interactive fluid sim built for a website splash screen). Plenty of real struggles blocked the way, not all of them surmounted; if anyone knows how to render a custom cursor over a YouTube embed, DM me.

All in all, it was such a time investment that it feels wrong to not write a little about the process. So, that's what follows here: a quick tour of how this site was made.

### Setting the Mood

Before doing any concrete design or implementation work, it felt important to gather information and get myself in the right headspace. To this end, I spent a week putting together a mood board for the site in [Figma](https://www.figma.com/).

![](/img/site/mood.png)
<figure>
<figcaption align = "center">The mood board I put together for this website.</figcaption>
</figure>

There were no rules. For me, this step in the process is more meditative; a space where ideas can flow freely without the restrictions of a strong, intelligible goal.

One part of the board was populated with inspiring sites that could serve as references. These included everything from individual portfolios, like [Thai Pham's](https://www.thaiphamphotography.com/), to full on commercial retail sites ([Royal Salute Whiskey's](https://www.royalsalutevirtual.com/en) was particularly bizarre).

Another section was dedicated wholly to typefaces. As I gathered examples, I became increasingly interested in using serif fonts in some capacity. Where sans-serifs are clean and have a strong association with modern tech (mono-spaced fonts give off "vintage" tech vibes), serif fonts evoke something like the dignity of print material. A serif font felt like it could nicely counterbalance the tech-forwardness of the site content.

There were various other ideas that littered the board. Screencaps of French New Wave films, with harsh black and white tones; the sepia plus undersaturated primary colors of old architectural manuscripts. Calm, jade figurines paired with gold rings. 

A lot of it wasn't precise. Though, without being too melodramatic, that's exactly the point: to churn around vague ideas in the subconscious that will express themselves when you actually start drafting proposals.

### The Landing Page

The first thing I went about prototyping---again, in Figma---was the first thing users would see when they visited the site: the landing page.

You only get one chance to make a first impression. I wanted the landing page to be captivating. Early on, I had the idea of making something dynamic and interactive; a sort of "toy" visitors could play with. 

In addition to just being fun, this seemed like a good idea from a philosophical standpoint. A stylish, interactable toy is a good demonstration of the ability to design something, implement it, and integrate it into a seamless holistic experience.

I mocked up a number of designs, experimenting with different patterns and color palettes. It was challenging to extrapolate from the stills to imagine how each idea would play out once it was dynamic, but they got the idea across.

![](/img/site/landing-pages.png)
<figure>
<figcaption align = "center">Various landing page concepts. Some other ideas included an animated particle grid of ripples, and 70's-style poly-chromatic stripes shooting across the page.</figcaption>
</figure>

Ultimately, I opted for an interactive fluid sim, with inverse-color text, _LET'S MAKE COOL THINGS TOGETHER_, overlaid on top. It seemed right to have a welcoming message, to make the presence of the toy feel more justified (it's in the background, rather than being the sole focus). The message also serves as a sort of justification for the site: it's a public invitation to collaborate. 

The black and white ripples almost take on the appearance of marble, so some of those connotations make their way into the experience. I also experimented with a parchment-esque color for the background, but this turned out to clash too much with other media the site needed to display (various project images). The attitude of that color scheme was cool, though, so it lives on in the text, which ranges along a gradient from parchment to ink-blue.

I implemented the fluid simulation in Three.js, and integrated it into the site as a React component. It's a straightforward 2D implementation of Jos Stam's now classic fluid simulation paper, using semi-Lagrangian advection.

### "About"

This section is in quotes because this site doesn't really have an about section at all. This little flip-book (and the Contact section, which we'll get to later) is about it.

I wanted to lean into the "show not tell" strategy for all the main page content. A lengthy "about me" writeup seemed unnecessary and less effective than a simple statement and a picture. So, instead, I took inspiration from a typewriter effect used on [IDEO's landing page](https://www.ideo.com/) to come up with what's on the site now: something I referred to as the "rolodex" element.

![](/img/site/rolodex.png)
<figure>
<figcaption align = "center">Initial block-out and description of the rolodex.</figcaption>
</figure>

I like this because it underscores a diversity of interests in a meta-textual way. In the way it presents in the information, it's almost saying "look, I'm versatile".

It's also good that it's dynamic, because it helps sustain the momentum from the fluid sim landing page. Experimenting with a static writeup here felt jarring.

### Project Examples

The layout for this section came pretty easily, and was largely inspired by [Richard Ekwonye's portfolio](https://www.richardekwonye.com/). The alternating text justifications counterbalance each other, and the cursor changing on mouse-over to read "click for more" is a simple way of retaining some interactivity.

![](/img/site/project.png)
<figure>
<figcaption align = "center">The prototype project example section for Expanse---with a stock image placeholder.</figcaption>
</figure>

As for the text itself, bold statements were key here---users can learn more by clicking to enter the project modal. To clear up any confusion, my role on the project is also listed.

### Contact

This page was much harder to design, and took many iterations to get right. For one, it was unclear how much contact info to present---phone number, address, email, social media links? Beyond that, it was challenging to find a way to keep this section aesthetically interesting. Initial mockups looked too much like PowerPoint slides.

![](/img/site/contact-proto.png)
<figure>
<figcaption align = "center">Some initial prototypes for the contact section.</figcaption>
</figure>

Eventually I landed on the idea of the interactive word cloud with proposed conversation topics. This is nice because it's another opportunity to communicate some personality to the visitor, through the list of conversation ideas---something especially important given that there's no about writeup.

![](/img/site/contact.png)
<figure>
<figcaption align = "center">The final version of the contact section.</figcaption>
</figure>

Just displaying the email keeps the messaging concise. Unobtrusive social icons at the footer avoid detracting from the aesthetics of the page.

### Modals

The primary way visitors learn about various projects I've worked on is through their respective project modals. These fade in over the main page, and are accessed via links in the nav bar (or clicking on the projects in the project examples section).

Simplicity and uniformity were the key ideas here. Users should feel like they're reading a page in some kind of biological compendium, a catalogue. The focus is on the information and project images, and the site aesthetics move into a supporting role to make room for a diverse range of content.

![](/img/site/modal.png)
<figure>
<figcaption align = "center">A snippet of the modal for Expanse.</figcaption>
</figure>

The modals themselves are split into three categories: work, music, and experiments. The decision here was largely about couching the presentation of some projects. Light-hearted projects get lumped in with "experiments", so the expectation of quality is lower. Big, ambitious projects go into "work". Music gets its own category because it's a fundamentally different pursuit.

Most writeups are relatively short, but vary based on project scope. From an implementation perspective, the writeups are authored in markdown, to make them easier to write, and translated to React on the fly.

### Wrap Up

Hopefully this short writeup gave you some insights into my design process for a project like this. If you have any questions about the page---design or implementation---feel free to shoot me an email at [brad.guesman@gmail.com](mailto:brad.guesman@gmail.com).

##