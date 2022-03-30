# Token Image Contribution Guide
To list your token image on Hermes (or other DEXs that utilize our asset repo), please follow the following guidelines. Following these guidelines are extremely important for a streamlined and beautiful experience.

## Cloning The repository
If you are unfamiliar with git/Github, here is a quick little guide to get started.
1. Download git (with an optional GUI interface) for your operating system. https://git-scm.com/downloads/guis 
2. 'Fork' the Hermes DeFi Asset repository
3. Clone your forked repository to your computer, follow the rest of this contribution guide to add your properly-formatted image.

## Image format
To make sure that your token looks as good as possible, please follow this contribution guide.
* 256x256 pixels 
* Transparent background
* Named "logo.png"
* Minimized using https://tinypng.com/ 

We have provided two different Token Templates (AI and PSD) to help assist you in designing your token logo.
If you are using these templates, please make sure to hide the example token layer before exporting.

## Placement within the repository
Now that you have your properly formatted and minified PNG file, you need to place it in the correct location. The scheme for this follows a predictable and scalable system that utilizes the CHECKSUM value of the token's contract address on each blockchain. **Importantly, this address MUST be in checksummed format.** Use https://ethsum.netlify.app/ to transform the token address into the proper checksum format.

The generalized format is `./blockchains/$BLOCKCHAIN/$TOKENADDRESS/logo.png`

For an example, here the IRIS token on Harmony.
`./blockchains/harmony/0x85FD5f8dBD0c9Ef1806E6c7d4B787d438621C1dC/logo.png`

## Publish your token
1. Git commit with a message like "Added TOKEN from ProjectName".
2. Push your changes to your forked repository.
3. Create a pull request and we will merge your changes into our main repository!