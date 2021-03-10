import React, { Component } from "react";
import { Link } from 'react-router-dom';

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
		this.setState({ selected: {id: id, title:title}});
		this.props.history.push({ pathName: "/course/" + id });
	};

	render() {
		let whatToShow = (
			<div>
				<h1>Amazing Udemy Courses</h1>

				<section className="Courses">
					{this.state.courses.map((course) => {
						return (
							<article
								key={course.id}
								className="Course"
								title={course.title}
								onClick={() => this.cursoSelecionado(course.id, course.title)}
							>
								{course.title}
							</article>
						);
					})}
				</section>
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
