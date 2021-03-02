import React, { useEffect, useContext } from 'react';
import classes from './Cockpit.module.css';
import AuthContext from '../../context/auth-context';

const Cockpit = (props) => {
	const authContext = useContext(AuthContext);
	useEffect(() => {
		console.log('[Cockpit.js] useEffect');
		setTimeout(()=>{
			//alert('Saved data to cloud!');
		}, 1000);
		return () => {
			console.log('[Cockpit.js] cleanup work in useEffect');
		}
	}, [])

	let novasClasses = []
	let btnClass = '';

	if (props.mostra){
		btnClass = classes.Red;
	}
	
	if ( props.personsTamanho <=2 ) novasClasses.push( classes.red );
	if ( props.personsTamanho <= 1 ) novasClasses.push( classes.bold );

	return (
		<div className={classes.Cockpit}>
			<h1>Hello World!!!</h1>
			<p className={novasClasses.join(' ')}>App funcionando!</p>
			<button className={btnClass} onClick={props.clicou}>
				Trocar nome
			</button>
			<button onClick={authContext.login}>Log in</button>
		</div>
	)
}

export default React.memo(Cockpit);