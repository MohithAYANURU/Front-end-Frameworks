// ## Part 1 — Variables, Arrow Functions, Destructuring, Spread
// ### Exercise 1 — `const` and `let`
// Identify which variables should be `const` and which should be `let`. Rewrite the block.

const releaseYear = 2010; // never reassigned — use const
let movieTitle = "Inception"; // reassigned below — use let
let isWatched = false; // reassigned below — use let
let rating = 8.8; // reassigned below — use let

// Later in the code:
isWatched = true;
rating = 9.0;
movieTitle = "Interstellar"; // allowed because movieTitle is let — but worth asking whether
// reassigning a title makes sense in your data model.
// In practice you would likely use a new const for a different movie.

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
