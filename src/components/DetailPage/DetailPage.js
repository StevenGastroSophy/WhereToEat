import React from "react";
import { Link } from "react-router-dom";
import CoverFlow from "../Base/CoverFlow/CoverFlow.js";
import DetailData from "../Data/DetailData.js";

class DetailPage extends React.Component {
	constructor(props) {
		super(props);
		this.initData = {
			resID: "",
			resCover: "",
			resName: "",
			address: "",
			bh: "",
			phone: "",
			gmap: "",
			dishes: [
				{
					dishID: "",
					dishCover: "",
					dishName: "",
					price: "",
					currency: ""
				}
			]
		};
		this.state = {
			markupIndex: 0,
			detailData: this.initData,
			isDataComplete: false,
			progress: 0
		};
	}
	getData = (id) => {
		const data =
			id in DetailData
				? DetailData[id]
				: this.initData;
		//get restaurant data
		this.setState({
			detailData: data,
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
	handleProgressChange = (progress) => {
		this.setState({
			progress: progress
		});
		this.props.handleProgressChange(progress);
	};
	render() {
		const links = this.state.detailData.dishes.map(data => {
			return `https://www.dropbox.com/s/${data.dishCover}?raw=1`;
		});
		const keys = this.state.detailData.dishes.map(data => {
			return data.dishID;
		});
		const headerBgLink = `https://www.dropbox.com/s/${
			this.state.detailData.resCover
		}?raw=1`;
		const gmap = `https://maps.google.com/maps?${
			this.state.detailData.gmap
		}&ie=UTF8&iwloc=&output=embed`;
		const markupIndex = this.state.markupIndex;
		const headerStyles = {
			backgroundImage: `url(${headerBgLink})`
		};
		return (
			<div className="content">
				<div className="header" style={headerStyles}>
					<Link
						to={{
							pathname: "/"
						}}
					>
						<div className="goBack" onClick={this.goBack} />
					</Link>
					<div className="resName">
						{this.state.detailData.resName}
					</div>
				</div>
				<div className="details">
					<div className="details__bh">
						{this.state.detailData.bh}
					</div>
					<div className="details__address">
						{this.state.detailData.address}
					</div>
					<div className="details__phone">
						{this.state.detailData.phone}
					</div>
					<div className="details__map">
						<iframe
							width="100%"
							height="100%"
							frameBorder="0"
							scrolling="no"
							marginHeight="0"
							marginWidth="0"
							src={gmap}
							allowFullScreen
						/>
					</div>
				</div>
				<CoverFlow
					imgLinks={links}
					keys={keys}
					handleChangeIndex={this.handleCurrentIndex}
					deg={4}
					coverage={8 / 9}
					maxScale={2}
					isAlignEnd={true}
					customClassName={"coverFlow--detailPage"}
					handleProgressChange={this.handleProgressChange}
				/>
				<div className="dish">
					<div className="dish__name">
						{this.state.detailData.dishes[markupIndex].dishName}
					</div>
					<div className="dish__price">
						{this.state.detailData.dishes[markupIndex].price}
					</div>
				</div>
			</div>
		);
	}
	componentDidMount() {
		this.setVh();
		window.addEventListener("resize", this.setVh);
		const id = this.props.match.params.id
			? this.props.match.params.id
			: "0";
		this.getData(id);
	}
	componentDidUpdate(prevProps, prevState) {
		if (this.props.isCover
			&& this.state.progress === 1
			&& this.state.isDataComplete
			) {
			if (this.props.match.params.id === this.state.detailData.resID) {
				this.props.handleLoadingComplete();
			} else {
				this.getData(
					this.props.match.params.id,
					this.props.handleLoadingComplete
				);
			}
		}
	}
	componentWillUnmount() {
		window.removeEventListener("resize", this.setVh);
	}
}

export default DetailPage;
