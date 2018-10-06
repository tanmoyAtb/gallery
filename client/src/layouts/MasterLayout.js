import React, { Component } from "react";
import Header from "../components/header/Header";
import LandingPage from "./LandingPage";
import NotFound from "./NotFound";
import AddImage from "./AddImage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default class MasterLayout extends Component {
	render() {
		return (
			<Router>
				<div>
					<Header />
					<div>
						<Switch>
							<Route exact path="/" component={LandingPage} />
							<Route path="/add" component={AddImage} />
							<Route path="*" component={NotFound} />
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}
