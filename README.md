# stable-diffusion-nft-minter
Webapp to make Stable Diffussion images and mint them on Polygon easily using NFTPort

The project is based on pure Fastify in Node.JS, without any additional dynamic web framework. In the ENV file, there need to be API keys for Replicate, NFTPort, and Covalent. They are hard-coded as: REPLICATE, NFTPORT, and COVALENT.

Using HTML forms, the user picks a label for a Stable Diffusion image. Right now, it just uses default settings and gives the process around 10 seconds to run. (However, it would be nice in the future to give the user full control of the Stable Diffusion instance). The app uses the Replicate compute-as-a-service API protocol to run Stable Diffusion.

This Replicate instance returns an image url, which is shown to the user. The user is given the option then to mint the NFT on Polygon and given a form for the name, description, and wallet.  NFTPort takes care of everything, uploading the image to IPFS and minting the NFT to the provided wallet with the provided name and description.

The webapp finally returns a link to the polygonscan page for the transaction. It also automatically populates a simple form that checks the transaction status using the Covalent API.

The sponsor technology (NFTPort) did the most important work, which I think is the purpose of the hack, to show how valuable web apps that meet user demands can be made quickly with such commercial utilities. Of course, the affordability of the Polygon blockchain is also another factor, which makes this all possible!
