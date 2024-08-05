# Gif Memes

## Description
Gif Memes is a simple web application that allows users to search for and view GIFs. Users can type a keyword into a text box and submit it to retrieve GIFs related to the keyword from the Giphy API. The application displays the GIFs in a grid layout, where users can click on the GIFs to toggle between still and animated states.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [API Details](#api-details)
- [Author](#author)
- [Contact](#contact)

## Features
* Predefined buttons for popular search queries.
* Search functionality via text input.
* Display of GIFs with a toggle feature between still and animated states.

## Technologies
* **Front-End:**
  * HTML
  * CSS & Bootstrap
  * JavaScript
* **Back-End:**
  * Node.js
  * Express
* **API:**
  * Giphy API
* **Deployment:**
  * Vercel

## Installation
To get started with GIFs Master, follow these steps:
1. **Clone the Repository**
   ``git clone https://github.com/your-username/gifs-master.git ``
2. **Navigate into the project directory:**
   ``cd gifs-master`` 
3. **Install Dependencies**
    - Make sure you have [Node.js](https://nodejs.org/) installed.
    - Install the required dependencies:
      ``npm install``
4. **Setup Environment Variables:**
   * Option 1: Manually create `.env` file:
     * Create a `.env` file in the root directory.
   * Option 2:
     * Use a script to create the .env file
     * `npm install dotenv --save`
5. **Obtain a Giphy API Key:**
   * Go to [Giphy Developers](https://developers.giphy.com/)
   * Create an account if you don't have one.
   * Create a new app to get your API key.
   * Add your API key to the `.env` file
   * `GIPHY_API_KEY=your_giphy_api_key`

## Project Structure
```
GIFS-
├── api
│   ├── search.js
│   └── index.js
├── public
│   ├── assets
│   │   ├── css
│   │   │   └── style.css
│   │   └── javascript
│   │       └── main.js
│   └── index.html
├── .env
├── .gitignore
├── package.json
├── package-lock.json




```
* `api/`Contains serverless functions for handling API requests
  * `search.js` A serverless function that interacts with the Giphy API to search for GIFs. It handles incoming requests, performs the search, and returns the results.
  * `index.js` A serverless function that serves the `index.html` file. It reads the HTML file from the `public` directory and sends it as a response to requests for the root endpoint.
* `public/`Contains static files that are served to the client.
  * `assets/`Holds stylesheets and JavaScript files used by the frontend
    * `css/style.css`The main stylesheet for the application, defining the visual style and layout.
    * `javascript/main.js` JavaScript file for handling client-side interactions and functionality.
  * `index.html`The main HTML file that serves as the entry point for the application. It structures the webpage and includes links to the CSS and JavaScript files.
* `.env`Contains environment variables such as the Giphy API key. This file is used to keep sensitive information out of the codebase.
* `.gitignore`Specifies files and directories that should be ignored by Git version control. This typically includes node modules, environment files, and other local configuration files.
* `package.json`Lists the project’s dependencies and scripts. It is used to manage the project’s Node.js packages and to define scripts for starting the server, running tests, etc.
* `package-lock.json`Automatically generated file that locks the versions of dependencies to ensure consistent installs across different environments.

## Usage
1. **Start the server:**
   `npm start`
2. **Open your browser and navigate to** `http://localhost:3000`
3. **Use the predefined buttons or type a search query into the input box and click "Submit" to fetch and display GIFs.**
4. **Click on the GIFs to toggle between still and animated states.**

## API Details
* **Base URL:** `https://api.giphy.com/v1/gifs`
  * GIPHY Search gives you instant access to our library of millions of GIFs by entering a word or phrase. See [GIPHY Docs](https://developers.giphy.com/docs/api/endpoint#trending) for more information
* **Endpoints:**
  * **Search GIFs:** `/search`
    * **Description:** Search for GIFs by a query term.
    * **Query Parameters:**
      * `q` **(required)**: The search query term.
      * `api_key` **(required)**: Your Giphy API key.
      * `limit` **(optional)**: The number of GIFs to return. Default is 25, maximum is 50.
* **Example Request:**
  * `GET https://api.giphy.com/v1/gifs/search?q=dogs&api_key=your_giphy_api_key&limit=20`
  * **Example Response:**
 ```
 {
  "data": [
    {
      "type": "gif",
      "id": "xT9IgDEI1iZyb2wqo8",
      "images": {
        "fixed_height_still": {
          "url": "https://media.giphy.com/media/xT9IgDEI1iZyb2wqo8/200_s.gif"
        },
        "fixed_height": {
          "url": "https://media.giphy.com/media/xT9IgDEI1iZyb2wqo8/200.gif"
        }
      }
    }
    // Additional GIF objects
  ]
}
```
* **Refer to the [Giphy Developer Portal](https://developers.giphy.com/docs/api/) for more options to customize your search and retrieve different types of GIFs**
## Author
**Carisa Saenz-Videtto**

## Contact
carisasaenz@gmail.com

