import React, { Component } from "react";
import axios from "axios";

import "./FullPost.css";

class FullPost extends Component {
	state = {
		loadedPost: null,
	};
	componentDidUpdate(prevProps) {
		if (this.props.id !== prevProps.id) {
			axios
				.get(`/posts/${this.props.id}`)
				.then((response) => {
					this.setState({ loadedPost: response.data });
				});
		}
	}

	deletePost = () => {
		axios
			.delete(`/posts/${this.props.id}`)
			.then((resp) => {
				console.log(resp);
			});
	};

	render() {
		let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;

		if (this.props.id) {
			post = <p style={{ textAlign: "center" }}>Loading...</p>;
		}

		if (this.state.loadedPost) {
			post = (
				<div className="FullPost">
					<h1>{this.state.loadedPost.title}</h1>
					<p>{this.state.loadedPost.body}</p>
					<div className="Edit">
						<button onClick={this.deletePost} className="Delete">
							Delete
						</button>
					</div>
				</div>
			);
		}

		return post;
	}
}

export default FullPost;
