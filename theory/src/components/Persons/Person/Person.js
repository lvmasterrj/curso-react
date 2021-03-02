import React, { Component } from "react";
import classes from "./Person.module.css";
import withClass from "../../../hoc/withClass";
import AuthContext from '../../../context/auth-context';

class Person extends Component {
	
	static contextType = AuthContext;

	componentDidMount(){
		this.inputElement.focus();
	}

	render() {
		console.log("[Person.js] rendering...");
		return (
			<>
				{this.context.authenticated ? <p>Authenticated!</p> : <p>Please Log in</p>}
				<p onClick={this.props.click}>
					Sou {this.props.nome} e tenho {this.props.idade} anos!{" "}
					{this.props.children}
				</p>
				<input
					ref={(inputEl)=> {this.inputElement = inputEl}}
					type="text"
					onChange={this.props.mudou}
					value={this.props.nome}
				/>
			</>
		);
	}
}

export default withClass(Person, classes.Person);
