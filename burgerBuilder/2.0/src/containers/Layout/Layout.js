import { Component } from "react";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
	state = {
		showSideDrawer: false,
	};

	sideDrawerToggle = () => {
		this.setState((prevState) => {
			return { showSideDrawer: !prevState.showSideDrawer };
		});
	};

	render() {
		return (
			<>
				<Toolbar drawerToggleClicked={this.sideDrawerToggle}/>
				<SideDrawer
					open={this.state.showSideDrawer}
					closed={this.sideDrawerToggle}
				/>
				<main className={classes.Content}>{this.props.children}</main>
			</>
		);
	}
}

export default Layout;
