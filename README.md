# Smalsuolis WEB

[![License](https://img.shields.io/github/license/AplinkosMinisterija/smalsuolis-web)](https://github.com/AplinkosMinisterija/smalsuolis-web/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/AplinkosMinisterija/smalsuolis-web)](https://github.com/AplinkosMinisterija/smalsuolis-web/issues)
[![GitHub stars](https://img.shields.io/github/stars/AplinkosMinisterija/smalsuolis-web)](https://github.com/AplinkosMinisterija/smalsuolis-web/stargazers)

This repository contains the source code and documentation for the Smalsuolis WEB, developed by the Aplinkos
Ministerija.

## Table of Contents

- [About the Project](#about-the-project)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## About the Project

The Smalsuolis WEB is designed to provide information and functionalities related to public events happening in Lithuania.

This is a client application that utilizes
the [Smalsuolis API](https://github.com/AplinkosMinisterija/smalsuolis-api).

## Getting Started

To get started with the Smalsuolis WEB, follow the instructions below.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AplinkosMinisterija/smalsuolis-web.git
   ```

2. Install the required dependencies:

   ```bash
   cd smalsuolis-web
   yarn install
   ```

### Usage

1. Set up the required environment variables. Copy the `.env.example` file to `.env` and provide the necessary values for the variables.

2. Start the WEB server:

   ```bash
   yarn start
   ```

The WEB will be available at `http://localhost:8080`.

## Deployment

### Production

To deploy the application to the production environment, create a new GitHub release:

1. Go to the repository's main page on GitHub.
2. Click on the "Releases" tab.
3. Click on the "Create a new release" button.
4. Provide a version number, such as `1.2.3`, and other relevant information.
5. Click on the "Publish release" button.

### Staging

The `main` branch of the repository is automatically deployed to the staging environment. Any changes pushed to the main
branch will trigger a new deployment.

### Development

To deploy any branch to the development environment use the `Deploy to Development` GitHub action.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a
pull request. For more information, see the [contribution guidelines](./CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](./LICENSE).
