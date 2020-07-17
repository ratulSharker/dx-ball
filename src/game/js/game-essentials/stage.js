function Stage(windowWidth, windowHeight, stageData) {
	this.margin = {
		top: 55,
		left: 10,
		right: 10,
		bottom: 0
	}

	this.windowWidth = windowWidth
	this.windowHeight = windowHeight
	this.stageData = stageData
	this.callbacks = {

	}

	this.score = 0
}

Stage.prototype.windowResized = function (windowWidth, windowHeight) {
	this.windowWidth = windowWidth
	this.windowHeight = windowHeight
}

Stage.prototype.draw = function (ctx) {

	const self = this
	var brickCount = 0
	this.traverseBricks(function (brickValue, x, y, width, height) {
		if (brickValue > 0) {
			brickCount++
			ctx.fillStyle = self.stageData.colorByType[brickValue]
			ctx.fillRect(x, y, width, height)
		}
	})

	if(brickCount == 0 && this.callbacks["end"]) {
		this.callbacks["end"]()
	} else if(brickCount == 1 && this.callbacks["last_brick"]) {
		this.callbacks["last_brick"]()
	}
}

// It will return next ball hit direction
// "top", "bottom", "left", "right"
Stage.prototype.handleBrickCollisionWithBallAndReportCollision = function (ball) {

	// ball is within stage rectangle, now check for each brick to have collision with ball or not
	var self = this
	var collideResult = undefined
	this.traverseBricks(function(brickValue, x, y, width, height, row, col) {
		if (brickValue > 0) {
			const collide = ball.calculateHitDirectionWithRect({
				x: x,
				y: y,
				width: width,
				height: height
			})

			if (collide) {
				// decrease brick value by one
				self.score++
				self.stageData.data[row][col] = brickValue - 1
				collideResult = collide
				return true
			}
		}
	})

	return collideResult
}

Stage.prototype.traverseBricks = function (callback) {
	const availableWidth = this.windowWidth - this.margin.left - this.margin.right
	const brickWidth = (availableWidth / this.stageData.col) - this.stageData.gap.horizontal

	let curX = this.margin.left
	let curY = this.margin.top

	for (let row = 0; row < this.stageData.row; row++) {
		for (let col = 0; col < this.stageData.col; col++) {
			const brickValue = this.stageData.data[row][col]
			var stopIterating = callback(brickValue, curX, curY, brickWidth, this.stageData.brickHeight, row, col)

			if(stopIterating) {
				return
			}

			curX += brickWidth + this.stageData.gap.horizontal
		}
		curX = this.margin.left
		curY += this.stageData.brickHeight + this.stageData.gap.vertical
	}
}

Stage.prototype.setNewStageData = function(stageData) {
	this.stageData = stageData
}

Stage.prototype.on = function (event, callback) {
	this.callbacks[event] = callback
}