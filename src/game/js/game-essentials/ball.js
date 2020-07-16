function Ball() {
	this.radius = 10
	this.centerX = this.radius
	this.centerY = this.radius

	this.speedX = -12
	this.speedY = -12

	this.maxSpeed = 10
	this.minSpeed = 6
}


Ball.prototype.move = function () {
	this.centerX += this.speedX
	this.centerY += this.speedY
}

Ball.prototype.flipSpeedVertically = function () {
	this.speedY *= -1
}

Ball.prototype.flipSpeedHorizontally = function () {
	this.speedX *= -1
}

Ball.prototype.centerAfterNextMove = function () {
	return {
		centerX: this.centerX + this.speedX,
		centerY: this.centerY + this.speedY
	}
}

Ball.prototype.stickBottom = function (posX, posY) {
	this.centerX = posX
	this.centerY = posY - this.radius
}

Ball.prototype.handleCollisionWithWindowReportBottomCollision = function(wWidth, wHeight) {
	var nextCenter = this.centerAfterNextMove()

	// I can look optimized using one if, but this is more cleaner
	if(nextCenter.centerX - this.radius < 0) {
		this.flipSpeedHorizontally()
	} else if(nextCenter.centerX + this.radius > wWidth) {
		this.flipSpeedHorizontally()
	}

	// I can look optimized using one if, but this is more cleaner
	if(nextCenter.centerY - this.radius < 0) {
		this.flipSpeedVertically()
	} else if(nextCenter.centerY + this.radius > wHeight) {
		this.flipSpeedVertically()
		return true
	}

	return false
}

Ball.prototype.collisionWithBat = function (batX, batWidth, batTopY) {

	var nextCenter = this.centerAfterNextMove()
	var ballBottomY = nextCenter.centerY + this.radius
	if(ballBottomY > batTopY && batX < nextCenter.centerX && nextCenter.centerX < batX + batWidth) {
		this.flipSpeedVertically()
	}
}

Ball.prototype.windowResized = function (wWidth, wHeight) {
	if(this.centerX - this.radius < 0) {
		this.centerX = this.radius
	}

	if(this.centerX + this.radius > wWidth) {
		this.centerX = wWidth - this.radius
	}

	if(this.centerY - this.radius < 0) {
		this.centerY = this.radius
	}

	if(this.centerY + this.radius > wHeight) {
		this.centerY = wHeight - this.radius
	}
}

Ball.prototype.draw = function (ctx) {
	ctx.fillStyle = "#00FF00"
	ctx.beginPath()
	ctx.arc(
		this.centerX,
		this.centerY,
		this.radius,
		0,
		2 * Math.PI
	)
	ctx.closePath()
	ctx.fill()
}