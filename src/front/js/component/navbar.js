import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/tags">
						<button className="btn btn-primary">Tags Page</button>
					</Link>
					<Link to="/artistas">
						<button className="btn btn-primary">Artist View</button>
					</Link>
					<Link to="/FanListView">
						<button className="btn btn-primary">Fan View</button>
					</Link>
					<Link to="/followerView">
						<button className="btn btn-primary">Followers view</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
