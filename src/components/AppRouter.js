import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import CollectionPage from "./CollectionPage/CollectionPage.js";
import DetailPage from "./DetailPage/DetailPage.js";

class AppRouter extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<Switch>
				<Route
					exact
					path="/"
					render={props => (
						<CollectionPage
							{...props}
							isCover={this.props.isCover}
							handleLoadingComplete={
								this.props.handleLoadingComplete
							}
							handleProgressChange={
								this.props.handleProgressChange
							}
						/>
					)}
				/>
				<Route
					path="/details/:id"
					render={props => (
						<DetailPage
							{...props}
							isCover={this.props.isCover}
							handleLoadingComplete={
								this.props.handleLoadingComplete
							}
							handleProgressChange={
								this.props.handleProgressChange
							}
						/>
					)}
				/>
			</Switch>
		);
	}
	componentDidUpdate(prevProps, prevState) {
		if (this.props.location.pathname !== prevProps.location.pathname) {
			this.props.handleRouteChange();
		}
	}
}

export default withRouter(AppRouter);
