# Fund-Me front end decentralized application

### Overview:

This is a simple front end application for interacting with the FundMe smart contract stored in https://gitlab.com/lambov/hardhat-fund-me-fcc

### Local Installation:

#### Requirements:

1. Frontend - Git clone this repository.
2. Backend - Git clone [THIS](https://gitlab.com/lambov/hardhat-fund-me-fcc) repository.
3. The Metamask extension installed in your browser.

#### Installation:

`npm install`

### Local Development:

#### Backend:

Start a local blockchain on your machine using the following command:

`yarn hardhat node`

Leave it running in the background.

Connect your local blockchain to metamask.

#### Frontend:

-   Create a `constants.js ` file in the root directory of the project and copy the contents of the `sample.constants.js` into it.

-   Update the values of `abi` and `address` using the values from `BACKEND_PROJECT/deployments/localhost/FundMe.json`.

#### How to use it:

Open the `index.html` file in your browser. You can interact with the smart contract using the simple UI provided on the page.

### Credits:

This project was created while following Patrick Collins' instructions in the [Learn Blockchain, Solidity, and Full Stack Web3 Development with JavaScript FreeCodeCamp course!](https://www.youtube.com/watch?v=gyMwXuJrbJQ)
