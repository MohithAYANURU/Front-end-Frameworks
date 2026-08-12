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

/*
 *
 * const releaseYear = 2010; // never reassigned
 * let movieTitle = "Inception"; // reassigned below
 * let isWatched = false; // reassigned below
 * let rating = 8.8; // reassigned below
 * // Later in the code:
 * isWatched = true;
 * rating = 9.0;
 * movieTitle = "Interstellar"; // allowed (but worth asking whether or not it's a good idea)
 *                              // reassigning a title makes sense in your data model.
 *
 * Expected output: "Interstellar", 2010, true, 9
 */
