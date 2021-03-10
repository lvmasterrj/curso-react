import React, { Component, Suspense } from "react";
import "./Blog.css";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import Posts from "./Posts/Posts";
//import NewPost from "./NewPost/NewPost";
//import asyncComponent from "../../hoc/asyncComponent";
const AsyncNewPost = React.lazy(() => import("./NewPost/NewPost"));

class Blog extends Component {
	render() {
		return (
			<div className="Blog">
				<header>
					<nav>
						<ul>
							<li>
								<NavLink to="/" exact>
									Home
								</NavLink>
							</li>
							<li>
								<NavLink
									to={{
										pathname: "/new-post",
										// hash: "#submit",
										// search: '?quick-submit=true'
									}}
								>
									New Post
								</NavLink>
							</li>
						</ul>
					</nav>
				</header>
				{/* <Route path="/" exact render={()=><Posts />}/> */}
				<Switch>
					<Route
						path="/new-post"
						render={() => (
							<Suspense fallback={<div>Loading...</div>}>
								<AsyncNewPost />
							</Suspense>
						)}
					/>
					<Route path="/posts" component={Posts} />
					<Redirect from="/" to="/posts" exact />
					<Route render={() => <h1>404</h1>} />
				</Switch>
			</div>
		);
	}
}

export default Blog;
