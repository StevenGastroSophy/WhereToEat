import React from "react";
import { Link } from "react-router-dom";
import CoverFlow from "../Base/CoverFlow/CoverFlow.js";
import CollectionData from "../Data/CollectionData.js";

class CollectionPage extends React.Component {
	constructor(props) {
		super(props);
		this.initData = [
			{
				resID: "",
				popCover: "",
				resName: "",
				location: "",
				nearby: ""
			}
		];
		this.state = {
			markupIndex: 0,
			collectionData: this.initData,
			isDataComplete: false,
			progress: 0
		};
	}
	getData = () => {
		const data = CollectionData;
		//get collection data
		this.setState({
			collectionData: data,
			isDataComplete: true
		});
	};
	handleCurrentIndex = index => {
		this.setState({
			markupIndex: index
		});
	};
	setVh = () => {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty("--vh", `${vh}px`);
	};
	handleProgressChange = progress => {
		this.setState({
			progress: progress
		});
		this.props.handleProgressChange(progress);
	};
	render() {
		const links = this.state.collectionData.map(data => {
			return `https://www.dropbox.com/s/${data.popCover}?raw=1`;
		});
		const keys = this.state.collectionData.map(data => {
			return data.resID;
		});
		const markupIndex = this.state.markupIndex;
		return (
			<div className="content">
				<CoverFlow
					imgLinks={links}
					keys={keys}
					handleChangeIndex={this.handleCurrentIndex}
					deg={4}
					coverage={8 / 9}
					maxScale={2}
					isAlignEnd={false}
					customClassName={"coverFlow--collectionPage"}
					handleProgressChange={this.handleProgressChange}
				/>
				<div className="info">
					<div className="info__itemWrapper">
						<div className="info__resName">
							{this.state.collectionData[markupIndex].resName}
						</div>
					</div>
					<div className="info__itemWrapper">
						<Link
							to={{
								pathname: `/details/${
									this.state.collectionData[markupIndex].resID
								}`
							}}
						>
							<div className="info__details">Details</div>
						</Link>
					</div>
					<div className="info__itemWrapper">
						<div className="info__location">
							{this.state.collectionData[markupIndex].location}
						</div>
					</div>
					<div className="info__itemWrapper">
						<div className="info__nearby">
							{this.state.collectionData[markupIndex].nearby}
						</div>
					</div>
				</div>
			</div>
		);
	}
	componentDidMount() {
		this.setVh();
		window.addEventListener("resize", this.setVh);
		this.getData();
	}
	componentDidUpdate(prevProps, prevState) {
		if (
			this.props.isCover &&
			this.state.progress === 1 &&
			this.state.isDataComplete
		) {
			this.props.handleLoadingComplete();
		}
	}
	componentWillUnmount() {
		window.removeEventListener("resize", this.setVh);
	}
}

export default CollectionPage;
