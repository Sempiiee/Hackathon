--------
# Water Saver ICP Website

This application tracks water usage and provides insights to help users reduce water consumption. Below are the setup instructions for running the project.

## Environment Setup

- Install Visual Studio Code
- Install Gitpod [VSCode Extension]
- Install Remote - SSH [VSCode Extension]
 

## In your browser:

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/Sempiiee/Hackathon/)

>  Select Visual Studio Code Desktop   
>  Select Standard Class

When the editor is opened, run the following commands to start a local ICP node and deploy the canister smart contract:


## Installation Guide

Follow these steps to set up the canisters
   
1. **Install npm version 10.9.0 globally**:

   ```bash
   npm install -g npm@10.9.0
   ```

2. **Make the build script executable**:
   ```bash
   chmod +x ./build_backend.sh
   ```

3. **Fix npm vulnerabilities**:
   ```bash
   npm audit fix
   ```

4. **Run the following in a new terminal window** to force fix vulnerabilities:
   ```bash
   npm audit fix --force
   ```

5. **Start the Internet Computer local replica**:
   ```bash
   dfx start --clean
   ```

6. **Create the backend canister**:
   ```bash
   dfx canister create backend
   ```

7. **Build the canister**:
   ```bash
   dfx build
   ```

8. **Deploy the canister**:
   ```bash
   dfx deploy
   ```

---
The smart contract will be reachable under `http://bkyz2-fmaaa-aaaaa-qaaaq-cai.localhost:4943`


## 🛠️ Technology Stack

- [Azle CDK](https://demergent-labs.github.io/azle/): the Canister Development Kit for JS/TS
- [Vite](https://vitejs.dev/): high-performance tooling for front-end web development
- [React](https://reactjs.org/): a component-based UI library
- [TypeScript](https://www.typescriptlang.org/): JavaScript extended with syntax for types
- [Sass](https://sass-lang.com/): an extended syntax for CSS stylesheets

## 📚 Documentation

- [Azle book](https://demergent-labs.github.io/azle/the_azle_book.html)
- [Internet Computer docs](https://internetcomputer.org/docs/current/developer-docs/ic-overview)
- [Internet Computer wiki](https://wiki.internetcomputer.org/)
- [Internet Computer forum](https://forum.dfinity.org/)
- [Vite developer docs](https://vitejs.dev/guide/)
- [React quick start guide](https://react.dev/learn)
- [`dfx.json` reference schema](https://internetcomputer.org/docs/current/references/dfx-json-reference/)
- [Developer Experience Feedback Board](https://dx.internetcomputer.org/)

## Team Members
- Dean, Jack Harry F.       (Front End Developer)
- Iguico, Sean Linard A.    (Front End Developer)
- Rodriguez, Ron Brian D.   (Back End Developer)
- Yumul, Lattrelle L.       (Back End Developer)

## Video Walkthrough Link
