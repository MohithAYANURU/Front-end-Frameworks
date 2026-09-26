import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <main className="main-container">
      <h1>About CineGrid</h1>
      <p>Browse popular movies and discover your next watch.</p>
      <Link to="/">Back to Home</Link>
    </main>
  );
}
