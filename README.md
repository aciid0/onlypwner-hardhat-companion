# Onlypwner Hardhat Companion

Setup and scripts to help you get started quickly with the challenges at https://onlypwner.xyz

## Getting started

### Install Dependencies

`npm install`

### Compile contracts

`npx hardhat compile`

### Configure onlypwner

Copy `.env.sample` and rename it `.env`

When you Launch your first challenge, you'll be given a 'RPC' url and a 'USER PRIV' key.

Copy these into your `.env` file.

**Note:** The RPC_URL will change each time you Launch a challenge. If signed in, PRIVATE_KEY will remain the same for all challenges.

### Run your first challenge - Tutorial

The [Tutorial challenge](https://onlypwner.xyz/challenges/1) has already been coded. Run it locally and against the onlypwner node, to ensure your setup is ready to go.

#### Locally

`npm run tutorial`

You should be a winner!

#### Against OnlyPwner

1. Visit the [Tutorial challenge page](https://onlypwner.xyz/challenges/1)
2. Click 'LAUNCH' to start the challenge
3. Copy the 'RPC rule to your .env file. And also the 'USER PRIV' key, if you haven't already done so
4. Run `npm run tutorial:onlypwner`
5. You should be a winner!
6. Go back to the [Tutorial challenge page](https://onlypwner.xyz/challenges/1) and click 'CHECK' to confirm if it was solved.
