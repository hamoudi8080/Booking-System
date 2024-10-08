# Booking System

This is a full-stack web application using the MERN stack (MongoDB, Express, React, Node) and Tailwind CSS. It is designed to be an Airbnb clone with all the main functionalities.

As a continuous learner, this project is aimed at self-training to enhance and grow my skills. The project is quite extensive and includes functionalities from front-end to back-end.

To protect my API endpoints, I am using JWT. For more details about it, go to the `client` folder > `README.md` file.

The application will be dockerized that involves packaging it into containers, which are lightweight, portable units that include everything needed to run the software, such as the code, runtime, libraries, and dependencies. This approach helps ensure that the application runs consistently across different environments, whether it's on a developer's local machine, a testing server, or a production environment.

By using Docker, the configuration and environment management become simpler because all the necessary components are encapsulated within the container. This means that the development team doesn't have to worry about variations in software versions or configurations that could cause issues when moving the application between environments. Essentially, Docker ensures that "it works on my machine" actually means it will work anywhere.  

Images are saved on local storage, but they can also be saved in Azure Blob Storage as an option.

Clients must be authenticated against the database and authorized to access certain functionalities.

## Functional Requirements

- **Admin:**
  - As an admin, I want to have an account so that I can manage places.
  - As an admin, I want to be able to add places (accommodations) with their information and images, so that users can book them.
  - As an admin, I want to be able to delete places from the places list.

- **User:**
  - As a user, I want to register so that I have an account in the database.
  - As a user, I want to securely log in so that I can book a place.
  - As a user, I want to be able to see my booked places, so that I have an overview of them.
  - As a user, I want to be able to delete a booking, so that it no longer exists in my bookings.

## Installation and Technical Information

For installation and all technical information, please go to the `README.md` file inside the `client` folder.


## for testing
npm init -y
npm install mocha chai axios --save
npm install mochawesome rimraf @faker-js/faker properties-reader --save
and to run the test fx
npx mocha ./tests/login.test.js


More details will be added soon...
