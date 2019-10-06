import React from "react";
import classNames from "classnames";

class CoverFlowItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isTransition: false
		};
	}
	getTranslateXOfScaledItem = (coverage, maxScale, deg, distance) => {
		const diff = (maxScale - 1) / deg;
		const itemScale = maxScale - diff * distance;

		const awayTranslateX =
			(distance * itemScale +
				(Math.pow(distance, 2) * diff) / 2 -
				distance) *
			100;

		const towardTranslateX =
			(distance * coverage * itemScale +
				(distance * (distance - 1) * coverage * diff) / 2) *
			100;

		return awayTranslateX - towardTranslateX;
	};
	getTransform = (index, markupIndex, markupPosition) => {
		//area of effect
		const deg = this.props.deg;
		const coverage = this.props.coverage;
		const maxScale = this.props.maxScale;
		//difference between scale of items
		const diff = (maxScale - 1) / deg;
		const distance = Math.abs(markupPosition - index);
		const itemScale = maxScale - diff * distance;
		//must place "scale" on the end of "transform"
		const itemTranslateY = this.props.isAlignEnd
			? ((itemScale - 1) / 2) * 100
			: 0;

		//beyond area of effect
		if (distance > deg) {
			const initialTranslateX = this.getTranslateXOfScaledItem(
				coverage,
				maxScale,
				deg,
				deg
			);
			const itemTranslateX = (distance - deg) * coverage * 100;
			if (index > markupIndex) {
				return (
					"translateX(" +
					(initialTranslateX - itemTranslateX).toString() +
					"%) translateY(0%) scale(1)"
				);
			} else {
				return (
					"translateX(" +
					(itemTranslateX - initialTranslateX).toString() +
					"%) translateY(0%) scale(1)"
				);
			}
		} else {
			if (index === markupIndex) {
				return (
					"translateX(0%) " +
					"translateY(" +
					(-1 * itemTranslateY).toString() +
					"%) scale(" +
					itemScale.toString() +
					")"
				);
			} else if (index > markupIndex) {
				const initialTranslateX = this.getTranslateXOfScaledItem(
					coverage,
					maxScale,
					deg,
					distance
				);
				return (
					"translateX(" +
					initialTranslateX.toString() +
					"%) translateY(" +
					(-1 * itemTranslateY).toString() +
					"%) scale(" +
					itemScale.toString() +
					")"
				);
			} else if (index < markupIndex) {
				const initialTranslateX = this.getTranslateXOfScaledItem(
					coverage,
					maxScale,
					deg,
					distance
				);
				return (
					"translateX(" +
					(-1 * initialTranslateX).toString() +
					"%) translateY(" +
					(-1 * itemTranslateY).toString() +
					"%) scale(" +
					itemScale.toString() +
					")"
				);
			}
		}
	};
	getZIndex = (index, markupIndex, listLength) => {
		const maxZIndex = listLength + 1;
		const diff = (maxZIndex - 1) / listLength;
		const distance = Math.abs(markupIndex - index);

		return maxZIndex - diff * distance;
	};
	handleTransitionEnd = event => {
		this.setState({
			isTransition: false
		});
	};
	handleImageLoad = event => {
		this.props.handleImgLoaded(this.props.index);
	};
	handleImageError = event => {
		this.props.handleImgLoaded(this.props.index);
	};
	render() {
		const classes = classNames({
			coverFlow__item: true,
			"coverFlow__item--selected": this.props.isSelected
		});
		const styles = {
			transform: this.getTransform(
				this.props.index,
				this.props.markupIndex,
				this.props.markupPosition
			),
			zIndex: this.getZIndex(
				this.props.index,
				this.props.markupIndex,
				this.props.listLength
			),
			willChange: this.state.isTransition ? "transform" : "auto"
		};
		return (
			<div
				className={classes}
				style={styles}
				onTransitionEnd={this.handleTransitionEnd}
			>
				<img
					className="coverFlow__img"
					src={this.props.link}
					onLoad={this.handleImageLoad}
					onError={this.handleImageError}
				/>
			</div>
		);
	}
	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.isPressDown) {
			return {
				isTransition: true
			};
		} else if (!nextProps.isPressDown && !nextProps.isMove) {
			return {
				isTransition: false
			};
		}
		return null;
	}
}

class CoverFlow extends React.Component {
	constructor(props) {
		super(props);
		this.scopeRef = React.createRef();
		this.itemsRef = React.createRef();
		this.state = {
			scrollLeft: 0,
			isMouseDown: false,
			isTouchStart: false,
			startX: 0,
			endX: 0,
			mouseDownScrollLeft: 0,
			touchStartScrollLeft: 0,
			imgLoaded: []
		};
		this.scrollTimer = null;
	}
	getMarkupPosition = () => {
		if (!this.itemsRef.current) return 0;
		const itemWidth =
			this.itemsRef.current.offsetWidth / this.props.imgLinks.length;
		return this.state.scrollLeft / itemWidth;
	};
	getMarkupIndex = () => {
		if (!this.itemsRef.current) return 0;
		const itemWidth =
			this.itemsRef.current.offsetWidth / this.props.imgLinks.length;
		return Math.round(this.state.scrollLeft / itemWidth);
	};
	getIsSelected = (index, markupIndex) => {
		return index === markupIndex ? true : false;
	};
	getExactScrollLeft = () => {
		const itemWidth =
			this.itemsRef.current.offsetWidth / this.props.imgLinks.length;
		return Math.round(this.state.scrollLeft / itemWidth) * itemWidth;
	};
	handleScroll = event => {
		this.updateScrollLeft(this.scopeRef.current.scrollLeft);
		if (this.state.isMouseDown) return;
		if (this.state.isTouchStart) return;
		clearTimeout(this.scrollTimer);
		this.scrollTimer = setTimeout(() => {
			//adjust scrollLeft
			this.scrollToX(this.getExactScrollLeft());
		}, 50);
	};
	handleMouseDown = event => {
		this.setState({
			isMouseDown: true,
			startX: event.pageX,
			endX: event.pageX,
			mouseDownScrollLeft: this.state.scrollLeft
		});
	};
	handleMouseMove = event => {
		if (!this.state.isMouseDown) return;
		event.preventDefault();
		const moveX = event.pageX;
		const walkX = (moveX - this.state.startX) * 1;
		const toX = this.state.mouseDownScrollLeft - walkX;

		if (toX < 0) {
			this.scrollToX(0);
			return;
		}

		const maxScrollWidth =
			this.scopeRef.current.scrollWidth -
			this.scopeRef.current.clientWidth;

		if (toX < maxScrollWidth) {
			this.scrollToX(toX);
		} else {
			this.scrollToX(maxScrollWidth);
		}
	};
	handleMouseUp = event => {
		if (!this.state.isMouseDown) return;
		this.setState({
			isMouseDown: false,
			endX: event.pageX
		});
		//ensure scrollLeft will be adjusted after mousemove->stop->mouseup
		this.scrollToX(this.getExactScrollLeft());
	};
	handleTouchStart = event => {
		this.setState({
			isTouchStart: true,
			startX: event.targetTouches[0].pageX,
			endX: event.targetTouches[0].pageX,
			touchStartScrollLeft: this.state.scrollLeft
		});
	};
	handleTouchMove = event => {
		if (!this.state.isTouchStart) return;
		event.preventDefault();
		const moveX = event.touches[0].pageX;
		const walkX = (moveX - this.state.startX) * 1;
		const toX = this.state.touchStartScrollLeft - walkX;

		if (toX < 0) {
			this.scrollToX(0);
			return;
		}

		const maxScrollWidth =
			this.scopeRef.current.scrollWidth -
			this.scopeRef.current.clientWidth;

		if (toX < maxScrollWidth) {
			this.scrollToX(toX);
		} else {
			this.scrollToX(maxScrollWidth);
		}
	};
	handleTouchEnd = event => {
		if (!this.state.isTouchStart) return;
		this.setState({
			isTouchStart: false,
			endX: event.changedTouches[0].pageX
		});
		//ensure scrollLeft will be adjusted after touchmove->stop->touchend
		this.scrollToX(this.getExactScrollLeft());
	};
	handleResize = event => {
		this.updateScrollLeft(this.scopeRef.current.scrollLeft);
		this.scrollToX(this.getExactScrollLeft());
	};
	updateScrollLeft = newScrollLeft => {
		this.setState({
			scrollLeft: newScrollLeft
		});
		const markupIndex = this.getMarkupIndex();
		this.props.handleChangeIndex(markupIndex);
	};
	scrollToX = exactScrollLeft => {
		this.scopeRef.current.scrollLeft = exactScrollLeft;
		this.updateScrollLeft(exactScrollLeft);
	};
	handleImgLoaded = index => {
		let imgLoaded;
		if (this.state.imgLoaded.length > 0) {
			imgLoaded = this.state.imgLoaded;
		} else {
			imgLoaded = new Array(this.props.imgLinks.length).fill(false);
		}
		imgLoaded[index] = true;
		this.setState({
			imgLoaded: imgLoaded
		});
		const count = imgLoaded.reduce((count, isLoaded) => {
			return !isLoaded ? count : (count += 1);
		}, 0);
		const progress = count / imgLoaded.length;
		this.props.handleProgressChange(progress);
	};
	render() {
		const coverFlowClasses = classNames({
			coverFlow: true,
			[this.props.customClassName]: true
		});
		const itemClasses = classNames({
			coverFlow__items: true,
			"coverFlow__items--alignEnd": this.props.isAlignEnd
		});
		return (
			<div
				className={coverFlowClasses}
				ref={this.scopeRef}
				onScroll={this.handleScroll}
				onMouseDown={this.handleMouseDown}
				onTouchStart={this.handleTouchStart}
			>
				<div className="coverFlow__box">
					<div className={itemClasses} ref={this.itemsRef}>
						{this.props.imgLinks.map((link, index) => {
							const listLength = this.props.imgLinks.length;
							const markupPosition = this.getMarkupPosition();
							const markupIndex = this.getMarkupIndex();
							const isSelected = this.getIsSelected(
								index,
								markupIndex
							);
							const isPressDown =
								this.state.isMouseDown ||
								this.state.isTouchStart;
							const isMove = !(
								this.state.startX === this.state.endX
							);
							return (
								<CoverFlowItem
									link={link}
									key={this.props.keys[index]}
									index={index}
									listLength={listLength}
									markupPosition={markupPosition}
									markupIndex={markupIndex}
									isSelected={isSelected}
									deg={this.props.deg}
									coverage={this.props.coverage}
									maxScale={this.props.maxScale}
									isAlignEnd={this.props.isAlignEnd}
									isPressDown={isPressDown}
									isMove={isMove}
									handleImgLoaded={this.handleImgLoaded}
								/>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
	componentDidMount() {
		window.addEventListener("resize", this.handleResize);
		document.addEventListener("mousemove", this.handleMouseMove);
		document.addEventListener("mouseup", this.handleMouseUp);
		document.addEventListener("touchmove", this.handleTouchMove, {
			passive: false
		});
		document.addEventListener("touchend", this.handleTouchEnd);
	}
	componentWillUnmount() {
		window.removeEventListener("resize", this.handleResize);
		document.removeEventListener("mousemove", this.handleMouseMove);
		document.removeEventListener("mouseup", this.handleMouseUp);
		document.removeEventListener("touchmove", this.handleTouchMove, {
			passive: false
		});
		document.removeEventListener("touchend", this.handleTouchEnd);
	}
}

export default CoverFlow;
