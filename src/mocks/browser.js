import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);  //it is uses to set up msw 


//This file for making a mock service worker that intercepts network requests and provides mock responses based on the defined handlers. It is useful for testing and development purposes, allowing you to simulate API responses without needing a real backend server.

//Here mock responses are defined in the handlers.js file, and the worker is set up to listen for requests and respond accordingly. This helps in testing the frontend application in isolation from the backend.