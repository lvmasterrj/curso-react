import React, { Component } from "react";
//import axios from "axios";
import axios from "../../axios";
import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";

class Blog extends Component {
	state = {
		posts: [],
		selectedPostId: null,
		error: false,
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
				//console.log(err);
				this.setState({ error: true });
			});
	}

	postClicked = (id) => {
		this.setState({ selectedPostId: id });
	};

	render() {
		let posts = <p>Something went wrong!</p>
		
		if (!this.state.error) {
			posts = this.state.posts.map((post) => {
				return (
					<Post
						key={post.id}
						title={post.title}
						author={post.author}
						clicked={() => this.postClicked(post.id)}
					/>
				);
			});
		}

		return (
			<div>
				<section className="Posts">{posts}</section>
				<section>
					<FullPost id={this.state.selectedPostId} />
				</section>
				<section>
					<NewPost />
				</section>
			</div>
		);
	}
}

export default Blog;
