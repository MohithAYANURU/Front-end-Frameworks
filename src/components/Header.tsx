import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";

type HeaderProps = {
  search?: string;
  onSearch?: (value: string) => void;
};

export default function Header({ search = "", onSearch = () => {} }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <NavLink className="brand-logo" to="/" end>
          <span className="logo-dot" />
          <span className="logo-text">CineGrid</span>
        </NavLink>
        <SearchBar query={search} onChange={onSearch} />
        <nav aria-label="Main navigation">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </div>
    </header>
  );
}
