# Parking Lot
This is a parking lot simple app.

This app was made using:
  ```
  React 17 (Hooks)
  Node 14.15
  Express ^4.17.1
  PostgreSQL Server 12
  Sequelize ^6.3.5
  ```

## Installation 

First you will need to install PostgreSQL server and create a database named ``parkinglot``

Then on root dir :
```
$ cd server
$ npm install
$ npm start
```
and 
```
$ cd client
$ npm install
$ npm start
```

## Usage

On screen you will see the Queue and the Parking Lot, you can add vehicles on the form and see all updates instantly.

The vehicles can park in the following spaces:
  + A motorcycle can part in all spaces, small, medium and large
  + A sedan can park only in the medium and large space
  + A truck can only park in the large space.

When a vehicle is removed by the X on every row, next vehicle in queue tries to park according to the rules above
