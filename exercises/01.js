// ## Part 1 — Variables, Arrow Functions, Destructuring, Spread
// ### Exercise 1 — `const` and `let`
// Identify which variables should be `const` and which should be `let`. Rewrite the block.

var movieTitle = "Inception";
var releaseYear = 2010;
var isWatched = false;
var rating = 8.8;

// Later in the code:
isWatched = true;
rating = 8.8 + 0.2;
movieTitle = "Interstellar"; // should this be allowed?

console.log(movieTitle, releaseYear, isWatched, rating);
