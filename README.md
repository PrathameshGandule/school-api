# school-api
Assignment submission of Educase internship to implement api endpoints related to schools and their locations
---

# School Management API

This is a simple and efficient API designed for managing school data, including adding schools, listing schools, and calculating distances between user-provided coordinates and schools.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## Overview

This School Management API allows you to perform various actions related to managing schools. It includes features like searching for schools based on geographic coordinates (latitude and longitude), adding new schools, and retrieving school data with pagination and caching.

## Features

- **Add School**: Allows users to add new school data to the system.
- **List Schools**: Fetches a list of schools based on the provided geographic coordinates, with pagination and caching.
- **Geolocation Support**: Calculates the distance between the user's location and the schools in the database.
- **Pagination**: Supports paginated responses for listing schools, making it efficient for large datasets.
- **Caching**: Results for school listings are cached to improve performance and avoid unnecessary database queries.

## Technologies Used

- **Node.js**: JavaScript runtime for the server-side logic.
- **Express.js**: Web framework for building the API.
- **MySQL**: Database used for storing school data.
- **Caching**: Simple in-memory caching for fast data retrieval.
- **Geolocation**: Distance calculations between geographic coordinates using the Haversine formula.
- **Environment Variables**: Managed using `.env` files for sensitive data like database credentials.

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/PrathameshGandule/school-api.git
    cd school-api
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file at the root of the project and add your database credentials and other configuration values. Here's an example:

    ```
    PORT=
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=password
    DB_NAME=school_db
    DB_PORT=mysql_db_port (default 3306)
    ```

4. **Start the application**:

    ```bash
    node app.js
    ```

    The server will start on `http://localhost:3000`.

## Usage

Once the server is running, you can make requests to the API endpoints. Here are the available routes:

### API Endpoints

1. **List Schools**  
   `GET /api/listSchools`  
   **Query Parameters**:
   - `latitude`: Latitude of the user's location (required).
   - `longitude`: Longitude of the user's location (required).
   - `limit`: Number of items per page (optional, default is 10).
   - `page`: Page number (optional, default is 1).

   **Example Request**:
   ```
   GET https://localhost:3000/api/listSchools?latitude=18.769833&longitude=73.818950&limit=5&page=2
   ```

   **Response**:
   ```json
   {
        "success": true,
        "source": "database",
        "currentPage": 2,
        "totalPages": 12,
        "pageSize": 5,
        "currentPageSize": 5,
        "data": [
            {
                "id": 43,
                "name": "Vidya Mandir High School",
                "address": "39, Kothrud, Pune, Maharashtra",
                "latitude": 18.7814,
                "longitude": 73.7615,
                "distance": 6.183
            },
            {
                "id": 38,
                "name": "Prathama Vidyalaya",
                "address": "27, Kothrud, Pune, Maharashtra",
                "latitude": 18.7062,
                "longitude": 73.8135,
                "distance": 7.099
            },
            {
                "id": 3,
                "name": "Vishwakarma International School",
                "address": "47, Main Road, Pune, Maharashtra",
                "latitude": 18.8106,
                "longitude": 73.8743,
                "distance": 7.382
            },
            ...
        ]
    }
   ```

2. **Add School**  
   `POST http://localhost:3000/api/addSchool`  
   **Body**:
   ```json
    {
        "name": "Modern International School",
        "address": "123, Baner Road, Pune, Maharashtra, India",
        "latitude": 18.551123,
        "longitude": 73.812321
    }

   ```

   **Response**:
   ```json
    {
        "success": true,
        "message": "School added successfully.",
        "schoolId": 58
    }
   ```

## Contributing

Feel free to fork the repository and submit pull requests. If you find any bugs or have suggestions, please open an issue.

1. Fork the repository.
2. Clone your fork.
3. Create a new branch (`git checkout -b feature/your-feature`).
4. Make your changes and commit (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Open a pull request.

---