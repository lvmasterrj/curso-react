import React, { Component } from "react";
import classes from "./App.module.css";
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";
import withClass from "../hoc/withClass";
import AuthContext from "../context/auth-context";

class App extends Component {
	constructor(props) {
		super(props);
		console.log("[App.js] constructor");
	}

	state = {
		persons: [
			{ id: "p1", nome: "Leo", idade: 35 },
			{ id: "p2", nome: "Lu", idade: 34 },
			{ id: "p3", nome: "Lele", idade: 4 },
		],
		showPersons: false,
		showCockpit: true,
		contadorMudanca: 0,
		authenticated: false,
	};

	static getDerivedStateFromProps(props, state) {
		console.log("[App.js] getDerivedStateFromProps", props);
		return state;
	}

	componentDidMount() {
		console.log("[App.js] componentDidMount");
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log("[App.js] shouldComponentUpdate");
		return true;
	}

	componentDidUpdate() {
		console.log("[App.js] componentDidUpdate");
	}

	nomeMudou = (e, id) => {
		const personIndex = this.state.persons.findIndex((p) => {
			return p.id === id;
		});

		const person = { ...this.state.persons[personIndex] };

		person.nome = e.target.value;

		const persons = [...this.state.persons];
		persons[personIndex] = person;

		this.setState((prevState, props) => {
			return {
				persons: persons,
				contadorMudanca: prevState.contadorMudanca + 1,
			};
		});
	};

	deletePerson = (personIndex) => {
		const persons = [...this.state.persons];
		persons.splice(personIndex, 1);
		this.setState({ persons: persons });
	};

	trocaExibicaoPessoas = () => {
		const mostra = this.state.showPersons;
		this.setState({ showPersons: !mostra });
	};

	logIn = () => {
		this.setState({ authenticated: true });
	};

	render() {
		console.log("[App.js] render");

		let persons = null;

		if (this.state.showPersons) {
			persons = (
				<Persons
					persons={this.state.persons}
					clicou={this.deletePerson}
					mudou={this.nomeMudou}
					isAuthenticated={this.state.authenticated}
				/>
			);
		}

		return (
			<>
				<button
					onClick={() => {
						this.setState({ showCockpit: false });
					}}
				>
					Remove Cockpit
				</button>
				<AuthContext.Provider
					value={{ 
						authenticated: this.state.authenticated,
						login: this.logIn }}
				>
					{this.state.showCockpit ? (
						<Cockpit
							mostra={this.state.showPersons}
							personsTamanho={this.state.persons.length}
							clicou={this.trocaExibicaoPessoas}
						/>
					) : null}
					{persons}
				</AuthContext.Provider>
			</>
		);
	}
}

export default withClass(App, classes.App);
