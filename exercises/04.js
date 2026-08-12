// ## Part 1 — Variables, Arrow Functions, Destructuring, Spread
// ### Exercise 4 — Destructuring Objects

const movie = {
  title: "Inception",
  year: 2010,
  rating: 8.8,
  genres: ["Action", "Sci-Fi", "Thriller"],
  director: {
    directorName: "Christopher Nolan",
    nationality: "British",
  },
};

// 1. Destructure title, year, and rating in one line.

// 2. Destructure director.name using nested destructuring.

// 3. Destructure title, and rename it to movieTitle.

// 4. Destructure a field that does not exist: tagline.
//    Give it a default value of "No tagline available".

// 5. Rewrite this function using destructuring in the parameter list:
function printMovie(movie) {
  console.log(movie.title, movie.year);
}

printMovie(movie); // "Inception" 2010
