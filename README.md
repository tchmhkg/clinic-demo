# Installation

## Server

Change directory to server folder and install modules

``` cd <ROOT_DIRECTORY>/server ```

and

``` yarn install ```

Copy .env.example file to .env

``` cp .env.example .env ```

then edit .env variables

Run the server

``` yarn start ```

## Clinic app

Change directory to client app folder and install modules

``` cd <ROOT_DIRECTORY>/client-app ```

and

``` yarn install ```

Copy .env.example file to .env

``` cp .env.example .env ```

or use the demo server & database directly

``` cp .env.demo .env ```

then edit .env variables

Run the app

``` yarn start ```

- Demo account

  username: 
  
  ``` hqclinic@truman.com ```
  
  password: 
  
  ``` hq@1234 ```  

- Registration rules

  1. All fields are required
  2. Password must longer than 8 characters  

- Create consultation record rules

  1. All fields are required
  
- Authorization 
  1. JWT 
  2. Default expired after 24 hours, can edit the expiry time in ``` server/.env ```

