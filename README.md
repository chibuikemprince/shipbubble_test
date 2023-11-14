## Bus Ticketing Platform API
This is the README documentation for the Bus Ticketing Platform API. The API provides a set of functions that power the bus ticketing platform, similar to a tap-and-pay system. Users can create accounts, log in, create bus ticket IDs, credit their accounts, pay for tickets, view account balance and transactions, and send credit to other users.

## Technologies Used

### Node.js with Express.js (TypeScript)
### MySQL database
### Sequelize ORM for database migrations
###  Docker for containerization

## Prerequisites
Make sure you have the following installed on your machine:

### Node.js
### Docker
### Docker Compose 

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/chibuikemprince/shipbubble_test.git
   cd shipbubble_test
   ```

2. Build and start the Docker containers using docker-compose:

   ```bash
   docker-compose up -d
   ```

   The API will be running at `http://localhost:7002`.

3. Access the API and start using the available endpoints according to the API documentation on postman via this link https://documenter.getpostman.com/view/12210600/2s9YXmXfkq

Please note that the Docker containers will handle the setup and initialization of the database using Sequelize, so there is no separate step required for setting up the database.