function Stage(windowWidth, windowHeight, stageData) {

	this.margin = {
		top: 50,
		left: 10,
		right: 10,
		bottom: 0
	}

	this.windowWidth = windowWidth
	this.windowHeight = windowHeight
	this.stageData = stageData
}

Stage.prototype.windowResized = function (windowWidth, windowHeight) {
	this.windowWidth = windowWidth
	this.windowHeight = windowHeight
}

Stage.prototype.draw = function (ctx) {

	const availableWidth = this.windowWidth - this.margin.left - this.margin.right
	const brickWidth = (availableWidth / this.stageData.col) - this.stageData.gap.horizontal

	let curX = this.margin.left
	let curY = this.margin.top

	for (let row = 0; row < this.stageData.row; row++) {
		for (let col = 0; col < this.stageData.col; col++) {
			const brickValue = this.stageData.data[row][col]

			if (brickValue > 0) {
				ctx.fillStyle = this.stageData.colorByType[brickValue]
				ctx.fillRect(curX, curY, brickWidth, this.stageData.brickHeight)
			}


			curX += brickWidth + this.stageData.gap.horizontal
		}
		curX = this.margin.left
		curY += this.stageData.brickHeight + this.stageData.gap.vertical
	}
}

// It will return next ball hit direction
// "top", "bottom", "left", "right", "top-left", "top-right", "bottom-left", "bottom-right"
Stage.prototype.handleBallCollisionWithBrick = function (ball) {


	// ball is within stage rectangle, now check for each brick to have collision with ball or not
	const availableWidth = this.windowWidth - this.margin.left - this.margin.right
	const brickWidth = (availableWidth / this.stageData.col) - this.stageData.gap.horizontal

	let curX = this.margin.left
	let curY = this.margin.top

	for (let row = 0; row < this.stageData.row; row++) {
		for (let col = 0; col < this.stageData.col; col++) {
			const brickValue = this.stageData.data[row][col]

			if (brickValue > 0) {
				const collide = ball.hitDirection({
					x: curX,
					y: curY,
					width: brickWidth,
					height: this.stageData.brickHeight
				})

				if (collide) {
					// decrease brick value by one
					this.stageData.data[row][col] = brickValue - 1
					return collide
				}
			}

			curX += brickWidth + this.stageData.gap.horizontal
		}
		curX = this.margin.left
		curY += this.stageData.brickHeight + this.stageData.gap.vertical
	}

	return undefined
}