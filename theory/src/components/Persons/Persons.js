import React, { PureComponent } from "react";
import Person from "./Person/Person";

class Persons extends PureComponent {
	static getDerivatedStateFromProps(props, state) {
		console.log("[Persons.js] getDerivatedStateFromProps");
		return state;
	}

	// shouldComponentUpdate(nextProps, nextState) {
	// 	console.log("[Persons.js] ShouldComponentUpdate");
	// 	if (nextProps.persons !== this.props.persons) {
	// 		return true;
	// 	} else return false;
	// }

	getSnapshotBeforeUpdate(prevProps, prevState) {
		console.log("[Persons.js] getSnapshotBeforeUpdate");
		return { message: "Snapshot" };
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log("[Persons.js] componentDidUpdate");
		console.log(snapshot);
	}

	componentWillUnmount() {
		console.log("[Persons.js] componentWillUnmount");
	}

	render() {
		console.log("[Persons.js] rendering...");
		return this.props.persons.map((person, i) => {
			return (
				<Person
					click={() => this.props.clicou(i)}
					nome={person.nome}
					idade={person.idade}
					key={person.id}
					mudou={(e) => this.props.mudou(e, person.id)}
				/>
			);
		});
	}
}

export default Persons;
