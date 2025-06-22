# React UI for the Widget App

## Requirements

Node 20 -- Node can be acquired using [Node Version Manager](https://github.com/nvm-sh/nvm)

## Running the Application

As mentioned in the requirements, this project requires Node v20.19.2 which can be installed using nvm.

Follow the steps below -

First, start the backend service by running ./gradlew bootRun.

Then, do 

npm install 

npm start (for starting the development server) 

Or, if you want to create and run the production build, do the following -

npm run build 

npm install -g serve 

serve -s build 

## Dashboard Screens

![alt text](image.png)

![alt text](image-1.png)

![alt text](image-2.png)

![alt text](image-3.png)

![alt text](image-4.png)

## Issues
* I faced some issues with a test case (probably something to do with JS hoisting) which I was not able to resolve 
* I have focussed on achieving the core functionality of CRUD operations for Widgets and not much on the styling. I have just followed the MUI theme that existed in the intial template.