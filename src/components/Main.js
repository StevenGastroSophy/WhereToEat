import React from "react";
import classNames from "classnames";
import { BrowserRouter } from "react-router-dom";
import PageLoadingEffects from "./Base/PageLoadingEffects/PageLoadingEffects.js";
import BookIcon from "./Base/PageLoadingEffects/BookIcon.js";
import AppRouter from "./AppRouter.js";

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.effectTypes = [
			"LazyStrech",
			"Circle",
			"Spill",
			"FrameIt",
			"TunnelVision",
			"WindscreenWiper",
			"JammedBlind",
			"Parallelogram",
			"Tilted",
			"LateralSwipe",
			"Wave",
			"Origami",
			"Curtain"
		];
		const pageStyles = ["wrapper--colorBWR", "wrapper--colorBWY"];
		let date = new Date();
		let minutes = date.getMinutes();
		this.pageStyle = pageStyles[minutes % pageStyles.length];
		this.state = {
			isCover: false,
			effectType: "LazyStrech",
			progress: 0
		};
	}
	handleLoadingStart = () => {
		const typeNum = this.effectTypes.length;
		const randomNum = Math.floor(Math.random() * typeNum);
		//const randomNum = 12;
		const randomType = this.effectTypes[randomNum];
		this.setState({
			isCover: true,
			effectType: randomType,
			progress: 0
		});
	};
	handleLoadingComplete = () => {
		// after some time hide loader
		setTimeout(() => {
			this.setState({
				isCover: false
			});
		}, 2000);
	};
	handleProgressChange = progress => {
		this.setState({
			progress: progress
		});
	};
	render() {
		const classes = classNames({
			wrapper: true,
			[this.pageStyle]: true
		});
		return (
			<div className={classes}>
				<PageLoadingEffects
					isCover={this.state.isCover}
					effectType={this.state.effectType}
					progress={this.state.progress}
				>
					<BookIcon />
				</PageLoadingEffects>
				<BrowserRouter>
					<AppRouter
						isCover={this.state.isCover}
						handleRouteChange={this.handleLoadingStart}
						handleLoadingComplete={this.handleLoadingComplete}
						handleProgressChange={this.handleProgressChange}
					/>
				</BrowserRouter>
			</div>
		);
	}
	componentDidMount() {
		this.handleLoadingStart();
	}
}

export default Main;
