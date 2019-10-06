import React from "react";
import classNames from "classnames";
import Snap from "snapsvg";

class PageLoadingEffects extends React.Component {
	constructor(props) {
		super(props);
		this.effectTypes = {
			LazyStrech: {
				opening:
					"M20,15 50,30 50,30 30,30 Z;M0,0 80,0 50,30 20,45 Z;M0,0 80,0 60,45 0,60 Z;M0,0 80,0 80,60 0,60 Z",
				closing:
					"M0,0 80,0 60,45 0,60 Z;M0,0 80,0 50,30 20,45 Z;M20,15 50,30 50,30 30,30 Z;M30,30 50,30 50,30 30,30 Z",
				initialPath: "M30,30 50,30 50,30 30,30 Z",
				speed: 150
			},
			Circle: {
				opening:
					"M 40 -21.875 C 11.356078 -21.875 -11.875 1.3560784 -11.875 30 C -11.875 58.643922 11.356078 81.875 40 81.875 C 68.643922 81.875 91.875 58.643922 91.875 30 C 91.875 1.3560784 68.643922 -21.875 40 -21.875 Z",
				closing:
					"M40,30 c 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 Z",
				initialPath:
					"M40,30 c 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 0,0 Z",
				speed: 500
			},
			Spill: {
				opening:
					"M 0,0 c 0,0 63.5,-16.5 80,0 16.5,16.5 0,60 0,60 L 0,60 Z",
				closing:
					"M 0,0 c 0,0 -16.5,43.5 0,60 16.5,16.5 80,0 80,0 L 0,60 Z",
				initialPath:
					"M 0,0 c 0,0 -16.5,43.5 0,60 16.5,16.5 80,0 80,0 L 0,60 Z",
				speed: 300
			},
			FrameIt: {
				opening: "M 0,0 0,60 80,60 80,0 Z M 40,30 40,30 40,30 40,30 Z",
				closing: "M 0,0 0,60 80,60 80,0 Z M 80,0 80,60 0,60 0,0 Z",
				initialPath: "M 0,0 0,60 80,60 80,0 Z M 80,0 80,60 0,60 0,0 Z",
				speed: 500
			},
			TunnelVision: {
				opening:
					"M -18 -26.90625 L -18 86.90625 L 98 86.90625 L 98 -26.90625 L -18 -26.90625 Z M 40 29.96875 C 40.01804 29.96875 40.03125 29.98196 40.03125 30 C 40.03125 30.01804 40.01804 30.03125 40 30.03125 C 39.98196 30.03125 39.96875 30.01804 39.96875 30 C 39.96875 29.98196 39.98196 29.96875 40 29.96875 Z",
				closing:
					"M -18 -26.90625 L -18 86.90625 L 98 86.90625 L 98 -26.90625 L -18 -26.90625 Z M 40 -25.6875 C 70.750092 -25.6875 95.6875 -0.7500919 95.6875 30 C 95.6875 60.750092 70.750092 85.6875 40 85.6875 C 9.2499078 85.6875 -15.6875 60.750092 -15.6875 30 C -15.6875 -0.7500919 9.2499078 -25.6875 40 -25.6875 Z",
				initialPath:
					"M -18 -26.90625 L -18 86.90625 L 98 86.90625 L 98 -26.90625 L -18 -26.90625 Z M 40 -25.6875 C 70.750092 -25.6875 95.6875 -0.7500919 95.6875 30 C 95.6875 60.750092 70.750092 85.6875 40 85.6875 C 9.2499078 85.6875 -15.6875 60.750092 -15.6875 30 C -15.6875 -0.7500919 9.2499078 -25.6875 40 -25.6875 Z",
				speed: 600
			},
			WindscreenWiper: {
				opening: "M 40,100 150,0 -65,0 z",
				closing: "M 40,100 150,0 l 0,0 z",
				initialPath: "M 40,100 150,0 l 0,0 z",
				speed: 600
			},
			JammedBlind: {
				opening:
					"M 0,60 80,60 80,50 0,40 0,60;M 0,60 80,60 80,25 0,40 0,60;M 0,60 80,60 80,25 0,10 0,60;M 0,60 80,60 80,0 0,0 0,60",
				closing:
					"M 0,60 80,60 80,20 0,0 0,60;M 0,60 80,60 80,20 0,40 0,60;m 0,60 80,0 0,0 -80,0",
				initialPath: "m 0,60 80,0 0,0 -80,0",
				speed: 100
			},
			Parallelogram: {
				opening: "M 0,0 0,60 80,60 80,0 z M 80,0 40,30 0,60 40,30 z",
				closing: "M 0,0 0,60 80,60 80,0 Z M 80,0 80,60 0,60 0,0 Z",
				initialPath: "M 0,0 0,60 80,60 80,0 Z M 80,0 80,60 0,60 0,0 Z",
				speed: 500
			},
			Tilted: {
				opening: "M 0,0 80,-10 80,60 0,70 0,0",
				closing: "M 0,-10 80,-20 80,-10 0,0 0,-10",
				initialPath: "M 0,70 80,60 80,80 0,80 0,70",
				speed: 400
			},
			LateralSwipe: {
				opening: "M 40,-65 145,80 -65,80 40,-65",
				closing: "m 40,-65 0,0 L -65,80 40,-65",
				initialPath: "M 40,-65 145,80 40,-65",
				speed: 500
			},
			Wave: {
				opening:
					"m -5,-5 0,70 90,0 0,-70 z m 5,35 c 0,0 15,20 40,0 25,-20 40,0 40,0 l 0,0 C 80,30 65,10 40,30 15,50 0,30 0,30 z",
				closing:
					"m -5,-5 0,70 90,0 0,-70 z m 5,5 c 0,0 7.9843788,0 40,0 35,0 40,0 40,0 l 0,60 c 0,0 -3.944487,0 -40,0 -30,0 -40,0 -40,0 z",
				initialPath:
					"m -5,-5 0,70 90,0 0,-70 z m 5,5 c 0,0 7.9843788,0 40,0 35,0 40,0 40,0 l 0,60 c 0,0 -3.944487,0 -40,0 -30,0 -40,0 -40,0 z",
				speed: 500
			},
			Origami: {
				opening:
					"m -10,-10 0,80 100,0 0,-80 z m 50,-30.5 0,70.5 0,70 0,-70 z",
				closing:
					"m -10,-10 0,80 100,0 0,-80 z M 40,-40.5 120,30 40,100 -40,30 z",
				initialPath:
					"m -10,-10 0,80 100,0 0,-80 z M 40,-40.5 120,30 40,100 -40,30 z",
				speed: 500
			},
			Curtain: {
				opening: "m 40,-80 190,0 -305,290 C -100,140 0,0 40,-80 z",
				closing: "m 75,-80 155,0 0,225 C 90,85 100,30 75,-80 z",
				initialPath: "m 75,-80 155,0 0,225 C 90,85 100,30 75,-80 z",
				speed: 600
			}
		};
		this.path = null;
		this.initialPath = null;
		this.speed = 200;
		this.easing = mina.linear;
		this.svgRef = React.createRef();
		this.pathRef = React.createRef();
		this.state = {
			isLoading: false,
			isShow: false,
			isAnimating: false
		};
	}
	getSteps = stepsStr => {
		return stepsStr ? stepsStr.split(";") : "";
	};
	getStepsTotal = stepsStr => {
		return stepsStr ? stepsStr.split(";").length : 0;
	};
	animateSVG = (dir, callback) => {
		const type =
			this.props.effectType in this.effectTypes
				? this.effectTypes[this.props.effectType]
				: this.effectTypes["Lazy Stretch"];
		const openingStepsStr = type.opening;
		const openingSteps = this.getSteps(openingStepsStr);
		const openingStepsTotal = this.getStepsTotal(openingStepsStr);

		const closingStepsStr = type.closing;
		const closingSteps = this.getSteps(closingStepsStr);
		const closingStepsTotal = this.getStepsTotal(closingStepsStr);

		let pos = 0;
		let steps = dir === "out" ? closingSteps : openingSteps;
		let stepsTotal = dir === "out" ? closingStepsTotal : openingStepsTotal;
		let speed = type.speed;
		let easing = this.easing;
		let nextStep = pos => {
			if (pos > stepsTotal - 1) {
				if (callback) {
					callback();
				}
				return;
			}
			this.path.animate({ path: steps[pos] }, speed, easing, function() {
				nextStep(pos);
			});
			pos++;
		};

		nextStep(pos);
	};
	render() {
		const classes = classNames({
			"pageload-overlay": true,
			"pageload-loading": this.state.isLoading,
			show: this.state.isShow
		});
		const type =
			this.props.effectType in this.effectTypes
				? this.effectTypes[this.props.effectType]
				: this.effectTypes["Lazy Stretch"];
		return (
			<div id="loader" className={classes}>
				<svg
					ref={this.svgRef}
					xmlns="http://www.w3.org/2000/svg"
					width="100%"
					height="100%"
					viewBox="0 0 80 60"
					preserveAspectRatio="none"
				>
					<path ref={this.pathRef} d={type.initialPath} />
				</svg>
				{React.cloneElement(this.props.children, { progress: this.props.progress })}
			</div>
		);
	}
	componentDidMount() {
		let s = Snap(this.svgRef.current);
		this.path = s.select("path");
		this.initialPath = this.path.attr("d");
	}
	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.isCover && !prevState.isAnimating) {
			return {
				isAnimating: true,
				isShow: true
			};
		} else if (!nextProps.isCover && prevState.isAnimating) {
			return {
				isLoading: false
			};
		}
		return null;
	}
	//prevState is the state before getDerivedStateFromProps
	componentDidUpdate(prevProps, prevState) {
		if (this.props.isCover && !prevState.isAnimating) {
			let onEndAnimation = () => {
				this.setState({
					isLoading: true
				});
			};
			this.animateSVG("in", onEndAnimation);
		} else if (!this.props.isCover && prevState.isAnimating) {
			this.animateSVG("out", () => {
				// reset path
				this.path.attr("d", this.initialPath);
				this.setState({
					isShow: false,
					isAnimating: false
				});
			});
		}
	}
}

export default PageLoadingEffects;
