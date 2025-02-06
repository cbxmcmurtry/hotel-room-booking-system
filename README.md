# Hotel Room Booking System

## Overview

I developed a **web-based hotel room booking system** that enables users to:
- Select **check-in and check-out dates**.
- View **multilingual welcome messages**.
- See **converted times** for international guests.
- Explore available rooms with **images**.

This project was built using **HTML, CSS, JavaScript, and Node.js**, with **Docker** for containerization, ensuring a smooth and consistent development environment. Docker allows the project to be easily deployed across different systems.

## Features

- **Multilingual Support**: Displays welcome messages in multiple languages.
- **Time Zone Conversion**: Converts and displays times for international guests.
- **Room Availability & Booking**: Users can browse available rooms with images.
- **Responsive UI**: Ensures a seamless experience across devices.
- **Dockerized Deployment**: Streamlined and consistent deployment using Docker.

## Technologies & Tools Used

### Front-End
- **HTML, CSS, JavaScript**: Creates a user-friendly interface.
- **Responsive Design**: Ensures usability across different screen sizes.

### Back-End
- **Node.js**: Manages server-side logic and API handling.
- **Express.js**: Handles routing and HTTP requests.

### Deployment & Infrastructure
- **Docker**: Containerizes the application for consistent deployment.
- **Maven**: Manages dependencies and project builds.
- **Git & GitHub**: Version control and project management.

## Installation & Setup

### Prerequisites
Ensure you have the following installed:
- **Node.js** (Latest LTS version)
- **Docker** (For containerized deployment)
- **Git** (For version control)

### Clone the Repository
* git clone https://github.com/yourusername/hotel-booking-system.git
* cd hotel-booking-system

### Install Dependencies
* npm install
* npm start
  
### Run With Docker
* docker build -t hotel-booking .
* docker run -p 3000:3000 hotel-booking

### API Endpoints
Method	Endpoint	Description
GET	/api/rooms	Fetch available rooms
POST	/api/book	Book a room
GET	/api/timezones	Get time zone conversions

## Deployment to Cloud
This project can be deployed using Azure, AWS, or Vercel. To deploy with Docker on Azure:

### 1. Create an Azure Container Registry:
* az acr create --resource-group myResourceGroup --name myContainerRegistry --sku Basic
### 2. Build and Push the Docker Image:
* docker tag hotel-booking myContainerRegistry.azurecr.io/hotel-booking
* docker push myContainerRegistry.azurecr.io/hotel-booking
### 3. Deploy the Container:
* az container create --resource-group myResourceGroup --name hotelBookingContainer --image myContainerRegistry.azurecr.io/hotel-booking --dns-name-label myhotelapp --ports 3000



