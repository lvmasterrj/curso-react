import React, { Component } from "react";
import { Link, Route } from "react-router-dom";

import "./Courses.css";
import Course from "../Course/Course";

class Courses extends Component {
	state = {
		courses: [
			{ id: 1, title: "Angular - The Complete Guide" },
			{ id: 2, title: "Vue - The Complete Guide" },
			{ id: 3, title: "PWA - The Complete Guide" },
		],
		selected: null,
	};

	cursoSelecionado = (id, title) => {
		console.log(this.props.history);
		this.setState({ selected: { id: id, title: title } });
		this.props.history.push({ pathName: "/course/" + id });
	};

	render() {
		let whatToShow = (
			<div>
				<h1>Amazing Udemy Courses</h1>

				<section className="Courses">
					{this.state.courses.map((course) => {
						return (
							<Link
								key={course.id}
								to={{
									pathname: `${this.props.match.url}/${course.id}`,
									search: `?title=${course.title}`
								}}
							>
								<article className="Course">{course.title}</article>
							</Link>
						);
					})}
				</section>
				<Route path="/courses/:id/" component={Course} />
			</div>
		);

		if (this.state.selected) {
			console.log(this.state.selected);
			whatToShow = <Course dados={this.state.selected} />;
			//whatToShow = <Course id={this.state.selected} title={this.state.courses.id[this.state.selected].title}/>;
		}

		return <>{whatToShow}</>;
	}
}

export default Courses;
