/* eslint-disable no-unused-vars */
function getPowerTypes() {
	return {
		increaseLife: 1,
		decreaseLife: 2,
		increaseBatSize: 3,
		decreaseBatSize: 4,
		increaseBallSize: 5,
		decreaseBallSize: 6,
		speedUpBall: 7,
		slowDownBall: 8
	}
}


function roundRobinPowerProvider() {
	var powers = getPowerTypes()
	var nextPower = powers.increaseLife
	var totalPowerCount = Object.keys(powers).length

	return function() {
		var curPowerToReturn = nextPower
		nextPower = (nextPower + 1)
		if(nextPower > totalPowerCount) {
			nextPower = 1
		}
		return curPowerToReturn
	}

}
/* eslint-enable no-unused-vars */

function Power(powerType, initialSpeedX, initialSpeedY, curX, curY) {
	this.powerType = powerType

	this.speedX = initialSpeedX
	this.speedY = initialSpeedY

	this.rect = {
		x: curX,
		y: curY,
		width: 45,
		height: 45
	}
}

Power.prototype.move = function () {
	this.rect.x += this.speedX
	this.rect.y += this.speedY
}

Power.prototype.nextOrigin = function() {
	return {
		x : this.rect.x + this.speedX,
		y : this.rect.y + this.speedY
	}
}

Power.prototype.flipSpeedVertically = function () {
	this.speedY *= -1
}

Power.prototype.flipSpeedHorizontally = function () {
	this.speedX *= -1
}

Power.prototype.originAfterNextMove = function () {
	return {
		x: this.rect.x + this.speedX,
		y: this.rect.y + this.speedY
	}
}

Power.prototype.handleCollisionWithWindowReportBottomCollision = function (wWidth, wHeight) {
	var nextOrigin = this.originAfterNextMove()


	// It can look optimized using one if, but this is more cleaner
	if (nextOrigin.x < 0) {
		this.flipSpeedHorizontally()
	} else if (nextOrigin.x + this.rect.width > wWidth) {
		this.flipSpeedHorizontally()
	}

	// It can look optimized using one if, but this is more cleaner
	if (nextOrigin.y < 0) {
		this.flipSpeedVertically()
	} else if (nextOrigin.y + this.rect.height > wHeight) {
		return true
	}

	return false
}

Power.prototype.windowResized = function (wWidth, wHeight) {
	if(this.rect.x < 0) {
		this.rect.x = 0
	}

	if(this.rect.x + this.rect.width > wWidth) {
		this.rect.x = wWidth - this.rect.width
	}

	if(this.rect.y < 0) {
		this.rect.y = 0
	}

	if(this.rect.y + this.rect.height > wHeight) {
		this.rect.y = wHeight - this.rect.height
	}
}

Power.prototype.reportBatCollision = function (batX, batWidth, batTopY) {

	var nextOrigin = this.nextOrigin()
	var powerBottomY = nextOrigin.y + this.rect.height
	if(powerBottomY > batTopY && batX < nextOrigin.x && nextOrigin.x < batX + batWidth) {
		return true
	}

	return false
}

Power.prototype.draw = function(ctx) {
	var gameOverImage = document.getElementById(`power_img_${this.powerType}`)

	ctx.drawImage(gameOverImage, this.rect.x, this.rect.y, this.rect.width, this.rect.height)
}