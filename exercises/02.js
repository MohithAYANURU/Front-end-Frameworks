// ## Part 1 — Variables, Arrow Functions, Destructuring, Spread
// ### Exercise 2 — Arrow Functions
// Convert each function to an arrow function.
// Where possible, use the concise body (implicit return). AKE one-liner

// 1.
function formatTitle(title, year) {
  return title + " (" + year + ")";
}

// 2.
function isHighRated(movie) {
  return movie.rating >= 8.0;
}

// 3.
function double(n) {
  return n * 2;
}

// 4. This one returns an object — wrap the object in parentheses: () => ({ ... })
//    Without the parentheses, the curly braces are treated as a function body, not an object.
function toSummary(movie) {
  return { title: movie.title, rating: movie.rating };
}

console.log(formatTitle("Inception", 2010)); // "Inception (2010)"
console.log(isHighRated({ rating: 9.0 })); // true
console.log(double(5)); // 10
console.log(toSummary({ title: "Dune", rating: 8.0 })); // { title: "Dune", rating: 8 }
