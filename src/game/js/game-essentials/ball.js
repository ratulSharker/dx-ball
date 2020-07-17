function Ball() {

	this.radius = 14
	this.minRadius = 9
	this.maxRadius = 20

	this.centerX = this.radius
	this.centerY = this.radius

	this.initialAngleSpeedSetup()

	this.maxSpeed = 18
	this.minSpeed = 6
}

Ball.prototype.increaseSize = function () {
	if (this.radius < this.maxRadius) {
		this.radius += 2
	}
}

Ball.prototype.decreaseSize = function () {
	if (this.radius > this.minRadius) {
		this.radius -= 2
	}
}

Ball.prototype.increaseSpeed = function () {
	if (this.speed < this.maxSpeed) {
		this.speed += 2
		this.adjustNewSpeed()
	}
}

Ball.prototype.decreaseSpeed = function( ) {
	if(this.speed > this.minSpeed) {
		this.speed -= 2
		this.adjustNewSpeed()
	}
}

Ball.prototype.initialAngleSpeedSetup = function () {
	this.speed = 10
	this.angle = (Math.PI / 4)
	this.speedX = Math.cos(this.angle) * this.speed
	this.speedY = -Math.sin(this.angle) * this.speed
}

Ball.prototype.adjustNewSpeed = function () {

	var prevSpeedX = this.speedX
	var prevSpeedY = this.speedY

	this.speedX = Math.cos(this.angle) * this.speed
	this.speedY = Math.sin(this.angle) * this.speed

	// signs needed to be matched
	if((prevSpeedX * this.speedX) < 0) {
		// their signs are opposite
		this.speedX *= -1
	}

	if((prevSpeedY * this.speedY) < 0) {
		// their signs are opposite
		this.speedY *= -1
	}
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

Ball.prototype.handleCollisionWithWindowReportBottomCollision = function (wWidth, wHeight) {
	var nextCenter = this.centerAfterNextMove()

	// It can look optimized using one if, but this is more cleaner
	if (nextCenter.centerX - this.radius < 0) {
		this.flipSpeedHorizontally()
	} else if (nextCenter.centerX + this.radius > wWidth) {
		this.flipSpeedHorizontally()
	}

	// It can look optimized using one if, but this is more cleaner
	if (nextCenter.centerY - this.radius < 0) {
		this.flipSpeedVertically()
	} else if (nextCenter.centerY + this.radius > wHeight) {
		// this.flipSpeedVertically()
		return true
	}

	return false
}

Ball.prototype.handleBrickCollisionResult = function (brickCollisionResult) {
	if (brickCollisionResult) {
		if (brickCollisionResult == "top" || brickCollisionResult == "bottom") {
			this.flipSpeedVertically()
		} else if (brickCollisionResult == "left" || brickCollisionResult == "right") {
			this.flipSpeedHorizontally()
		} else {
			// it's the corner
			this.flipSpeedHorizontally()
		}
	}
}

Ball.prototype.collisionWithBat = function (batX, batWidth, batTopY) {

	var nextCenter = this.centerAfterNextMove()
	var ballBottomY = nextCenter.centerY + this.radius
	if (ballBottomY > batTopY && batX < nextCenter.centerX && nextCenter.centerX < batX + batWidth) {

		//				   BAT
		//	150 			90				30
		//  Left 		  Middle			Right

		var batRightMostRadian = 0.523599 // 30 Degree
		var batLeftMostRadian = 2.61799 // 150 Degree
		var nintyDegreeInRadian = Math.PI / 2
		var seventySixDegreeInRadian = 1.32645 // 76 Degree
		var hundredAndFourDegreeInRadian = 1.81514 // 104 Degree

		var angleDeviation = batLeftMostRadian - batRightMostRadian
		var collisionDeviation = batX + batWidth - nextCenter.centerX

		// Simple interpolation
		this.angle = batRightMostRadian + (collisionDeviation / batWidth) * angleDeviation

		// Omitting straight 90 Degree movement
		if(this.angle > seventySixDegreeInRadian && this.angle < hundredAndFourDegreeInRadian) {
			if(this.angle > nintyDegreeInRadian) {
				this.angle = hundredAndFourDegreeInRadian
			} else {
				this.angle = seventySixDegreeInRadian
			}
		}

		this.speedX = Math.cos(this.angle) * this.speed
		this.speedY = Math.sin(this.angle) * this.speed

		this.flipSpeedVertically()
	}
}

Ball.prototype.windowResized = function (wWidth, wHeight) {
	if (this.centerX - this.radius < 0) {
		this.centerX = this.radius
	}

	if (this.centerX + this.radius > wWidth) {
		this.centerX = wWidth - this.radius
	}

	if (this.centerY - this.radius < 0) {
		this.centerY = this.radius
	}

	if (this.centerY + this.radius > wHeight) {
		this.centerY = wHeight - this.radius
	}
}

Ball.prototype.draw = function (ctx) {
	ctx.fillStyle = "#FFA500"
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

// returns hit direction `top`, `bottom`, `left`, `right`, "top-left", "top-right", "bottom-left", "bottom-right"
Ball.prototype.hitDirection = function (rect) {

	const nextCenter = this.centerAfterNextMove()

	const ballLeftX = nextCenter.centerX - this.radius
	const ballRightX = nextCenter.centerX + this.radius
	const ballTopY = nextCenter.centerY - this.radius
	const ballBottomY = nextCenter.centerY + this.radius

	const rectLeftX = rect.x
	const rectRightX = rect.x + rect.width
	const rectTopY = rect.y
	const rectBottomY = rect.y + rect.height

	// top hit
	if (ballBottomY >= rectTopY && ballBottomY <= rectBottomY && ballLeftX >= rectLeftX && ballRightX <= rectRightX) {
		return "top"
	}

	// bottom hit
	if (ballTopY >= rectTopY && ballTopY <= rectBottomY && ballLeftX >= rectLeftX && ballRightX <= rectRightX) {
		return "bottom"
	}

	// left hit
	if (ballRightX >= rectLeftX && ballRightX < rectRightX && ballTopY >= rectTopY && ballBottomY <= rectBottomY) {
		return "left"
	}

	// right hit
	if (ballLeftX >= rectLeftX && ballLeftX < rectRightX && ballTopY >= rectTopY && ballBottomY <= rectBottomY) {
		return "right"
	}

	// top-left
	if (this.isInsideCircle(nextCenter.centerX, nextCenter.centerY, this.radius, rectLeftX, rectTopY)) {
		return "top-left"
	}

	// top-right
	if (this.isInsideCircle(nextCenter.centerX, nextCenter.centerY, this.radius, rectRightX, rectTopY)) {
		return "top-right"
	}

	// bottom-left
	if (this.isInsideCircle(nextCenter.centerX, nextCenter.centerY, this.radius, rectLeftX, rectBottomY)) {
		return "bottom-left"
	}

	// bottom-right
	if (this.isInsideCircle(nextCenter.centerX, nextCenter.centerY, this.radius, rectRightX, rectBottomY)) {
		return "bottom-right"
	}

	return undefined
}

Ball.prototype.isInsideCircle = function (centerX, centerY, radius, pX, pY) {
	const distance = this.distance(centerX, centerY, pX, pY)

	return distance <= radius
}

Ball.prototype.distance = function (aX, aY, bX, bY) {
	const dx = aX - bX
	const dy = aY - bY

	return Math.sqrt(dx * dx + dy * dy)
}