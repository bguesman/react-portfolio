# Constructibles

![](img/constructibles/constructibles.jpg)

<div id="modal-scroll-point"/>

<div id="modal-subtitle-container"><h2 id="modal-subtitle">A fun visualization of a classic mathematical result</h2></div>

This project lives on the web! You can find it [here](https://dhalper1.github.io/Constructing_Constructibles/web/index.html).

This was a project for a math course I took second semester sophomore year that focused on Galois Theory—in short, the study of the relationship between groups, fields, and polynomials. I worked with some friends at Brown—David Halpern and Adam Shelby—over the course of about a week and a half to put it together.

One of the topics we covered was the notion of constructibility. A question of interest to the geometers of classical times was "what numbers can you construct with a compass and a straight edge"? In other words, starting with the points (0, 0) and (1, 0) in the plane and allowing yourself to only draw a finite number of lines between two points and circles with center at one point and intersecting another, what points in the plane can you get to?

This may seem like a trivial question, but it turns out that it is not so easy to answer. In fact, it wasn't shown until 1796 that the regular 17-gon was constructible (by Gauss, when he was 18).

To provide a true criterion for constructibility, one has to draw a connection between the idea of "geometrically constructible" and "algebraically constructible". We've already mentioned what it means to be geometrically constructible. An algebraically constructible number is one which can be constructed from performing field operations (addition, multiplication, subtraction, division) and a finite number of square roots with rational numbers. If you know some algebra, you might recognize this as performing successive field extensions to the rationals.

We won't go into the proof here, but it turns out that these two definitions are actually the same—this is because there is an algorithm for performing field operations and taking square roots in the plane, and this algorithm involves only drawing lines and circles, starting with two rational points.

So what does this website do? It visualizes this construction process. You enter an algebraically constructible number, and it will draw out the geometric construction process for you!

Want to see the code? This is a [public repository on GitHub!](https://github.com/dhalper1/Constructing_Constructibles)
