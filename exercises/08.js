// ## Part 2 — Modules, Array Methods, async/await, Optional Chaining
// ### Exercise 8 — async/await
// Run this file in the browser console or with Node 18+.

const BASE_URL = "https://jsonplaceholder.typicode.com";

// 1. Write an async function fetchPosts() that:
//    - fetches BASE_URL + "/posts"
//    - parses the JSON response
//    - returns the first 5 items
//    - logs each item's title
const fetchPosts = async () => {
    try {
        const response = await fetch(BASE_URL + "/posts");
        const data = await response.json();
        const firstFive = data.slice(0, 5);
        firstFive.forEach(post => console.log(post.title));
        return firstFive;   
    } catch (error) {
        console.log("Failed to load posts");  
    }
};
// 2. Add try/catch to fetchPosts().
//    If the fetch fails, log "Failed to load posts".

// 3. Write an async function getPostById(id) that:
//    - fetches BASE_URL + "/posts/" + id
//    - throws an Error if res.ok is false  
//    - returns the parsed JSON object
const getPostById = async (id) => {
    try {
        const response = await fetch(BASE_URL + "/posts/" + id);
        if (!response.ok) {
            throw new Error("Post not found");
        }
        return await response.json();
    } catch (error) {
        console.log("Failed to load post:", error.message);
        throw error; 
    }
};
// Call getPostById(1) and log the result.
// Call getPostById(99999) — what happens? Handle it.
getPostById(1).then(post => console.log(post)); 
getPostById(99999)
  .then(post => console.log(post))
  .catch(err => console.log("Post not found:", err.message));