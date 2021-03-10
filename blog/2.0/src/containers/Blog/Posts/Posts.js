import { Component } from "react";
import axios from "../../../axios";
import Post from "../../../components/Post/Post";
import { Route } from "react-router-dom";
import "./Posts.css";
import FullPost from "../FullPost/FullPost";

class Posts extends Component {
	state = {
		posts: [],
	};

	componentDidMount() {
		// Pega os dados
		axios
			.get("/posts")
			.then((response) => {
				// Pega somente 4 posts de todos os retornados
				const posts = response.data.slice(0, 4);
				// Coloca o autor "Max" nos posts
				const updatedPosts = posts.map((post) => {
					return {
						...post,
						author: "Max",
					};
				});
				this.setState({ posts: updatedPosts });
				console.log(response);
			})
			.catch((err) => {
				console.log(err);
				//this.setState({ error: true });
			});
	}

	postClicked = (id) => {
		//this.setState({ selectedPostId: id });
		console.log(this.props.history)
		this.props.history.push({pathname: '/posts/' + id});
	};

	render() {
		let posts = <p>Something went wrong!</p>;

		if (!this.state.error) {
			posts = this.state.posts.map((post) => {
				return (
					//<Link to={"/" + post.id} key={post.id}>
					<Post
						key={post.id}
						title={post.title}
						author={post.author}
						clicked={() => this.postClicked(post.id)}
					/>
					//</Link>
				);
			});
		}

		return (
			<div>
				<section className="Posts">{posts}</section>
				<Route
					path={this.props.match.url + "/:id"}
					//path="/:id"
					exact
					component={FullPost}
				/>
			</div>
		);
	}
}

export default Posts;
