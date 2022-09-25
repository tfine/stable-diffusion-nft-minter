<<<<<<< glitch
# Hello Node!

This project includes a Node.js server script and a web page that connects to it. The front-end page presents a form the visitor can use to submit a color name, sending the submitted value to the back-end API running on the server. The server returns info to the page that allows it to update the display with the chosen color. 🎨

[Node.js](https://nodejs.org/en/about/) is a popular runtime that lets you run server-side JavaScript. This project uses the [Fastify](https://www.fastify.io/) framework and explores basic templating with [Handlebars](https://handlebarsjs.com/).

## Prerequisites

You'll get best use out of this project if you're familiar with basic JavaScript. If you've written JavaScript for client-side web pages this is a little different because it uses server-side JS, but the syntax is the same!

## What's in this project?

← `README.md`: That’s this file, where you can tell people what your cool website does and how you built it.

← `public/style.css`: The styling rules for the pages in your site.

← `server.js`: The **Node.js** server script for your new site. The JavaScript defines the endpoints in the site back-end, one to return the homepage and one to update with the submitted color. Each one sends data to a Handlebars template which builds these parameter values into the web page the visitor sees.

← `package.json`: The NPM packages for your project's dependencies.

← `src/`: This folder holds the site template along with some basic data files.

← `src/pages/index.hbs`: This is the main page template for your site. The template receives parameters from the server script, which it includes in the page HTML. The page sends the user submitted color value in the body of a request, or as a query parameter to choose a random color.

← `src/colors.json`: A collection of CSS color names. We use this in the server script to pick a random color, and to match searches against color names.

← `src/seo.json`: When you're ready to share your new site or add a custom domain, change SEO/meta settings in here.

## Try this next 🏗️

Take a look in `TODO.md` for next steps you can try out in your new site!

___Want a minimal version of this project to build your own Node.js app? Check out [Blank Node](https://glitch.com/edit/#!/remix/glitch-blank-node)!___

![Glitch](https://cdn.glitch.com/a9975ea6-8949-4bab-addb-8a95021dc2da%2FLogo_Color.svg?v=1602781328576)

## You built this with Glitch!

[Glitch](https://glitch.com) is a friendly community where millions of people come together to build web apps and websites.

- Need more help? [Check out our Help Center](https://help.glitch.com/) for answers to any common questions.
- Ready to make it official? [Become a paid Glitch member](https://glitch.com/pricing) to boost your app with private sharing, more storage and memory, domains and more.
=======
# stable-diffusion-nft-minter
Webapp to make Stable Diffussion images and mint them on Polygon easily using NFTPort

The project is based on pure Fastify in Node.JS, without any additional dynamic web framework. In the ENV file, there are API keys for Replicate, NFTPort, and Covalent.

Using HTML forms, the user picks a label for a Stable Diffusion image. Right now, it just uses default settings and gives the process around 10 seconds to run. (However, it would be nice in the future to give the user full control of the Stable Diffusion instance). The app uses the Replicate compute-as-a-service API protocol to run Stable Diffusion.

This Replicate instance returns an image url, which is shown to the user. The user is given the option then to mint the NFT on Polygon and given a form for the name, description, and wallet.  NFTPort takes care of everything, uploading the image to IPFS and minting the NFT to the provided wallet with the provided name and description.

The webapp finally returns a link to the polygonscan page for the transaction. It also automatically populates a simple form that checks the transaction status using the Covalent API.

The sponsor technology (NFTPort) did the most important work, which I think is the purpose of the hack, to show how valuable web apps that meet user demands can be made quickly with such commercial utilities. Of course, the affordability of the Polygon blockchain is also another factor, which makes this all possible!
>>>>>>> main
