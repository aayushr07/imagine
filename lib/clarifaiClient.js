// lib/clarifaiClient.js
const clarifai = require('clarifai');

// Initialize Clarifai with your API Key
const app = new clarifai.App({
  apiKey: '3dd628d9a357478cb46785dd01ee02b7', // Replace with your Clarifai API Key
});

export default app;
