/* global Bat Ball stageDatas Stage Power Timer*/

function Game(windowWidth, windowHeight, canvas) {
	this.windowWidth = windowWidth
	this.windowHeight = windowHeight

	this.ctx = canvas.getContext("2d")
	this.ctx.canvas.width = windowWidth
	this.ctx.canvas.height = windowHeight


	this.state = {
		waiting: "WAITING",
		running: "RUNNING",
		no_more_life: "NO_MORE_LIFE",
		no_more_stages: "NO_MORE_STAGES"
	}
	this.curState = this.state.waiting

	this.powerTypes = {
		increaseLife: 1,
		decreaseLife: 2,
		increaseBatSize: 3,
		decreaseBatSize: 4,
		increaseBallSize: 5,
		decreaseBallSize: 6,
		speedUpBall: 7,
		slowDownBall: 8
	}

	this.callbacks = {

	}

	this.lifeCount = 3

	// bat setup
	this.bat = new Bat(windowWidth, windowHeight)
	this.bat.windowResized(windowWidth, windowHeight)

	// ball setup
	this.balls = []
	this.balls.push(new Ball())

	// power setup
	this.currentPower = undefined
	this.powerProvider = this.roundRobinPowerProvider()

	// stage setup
	this.currentStage = 0
	this.stage = new Stage(windowWidth, windowHeight, stageDatas[this.currentStage])
	var self = this
	this.stage.on("end", function () {
		self.moveToNextStage()
	})
	this.lastBrickTimer = undefined
	this.stage.on("last_brick", function() {
		self.startLastBrickTimer()
	})
}

Game.prototype.windowResized = function (windowWidth, windowHeight) {

	// keep reference
	this.windowWidth = windowWidth
	this.windowHeight = windowHeight

	// canvas update
	this.ctx.canvas.width = windowWidth
	this.ctx.canvas.height = windowHeight

	// bat update
	this.bat.windowResized(windowWidth, windowHeight)

	// ball update
	for (var index = 0; index < this.balls.length; index++) {
		this.balls[index].windowResized(windowWidth, windowHeight)
	}

	// power update
	if(this.currentPower) {
		this.currentPower.windowResized()
	}

	// stage update
	this.stage.windowResized(windowWidth, windowHeight)
}

Game.prototype.mouseMoved = function (cursorX) {

	this.bat.mouseMoved(cursorX)
}

Game.prototype.startGame = function () {
	this.curState = this.state.running
}

Game.prototype.operateBall = function () {
	if (this.curState == this.state.waiting) {
		// Ball will stick to the bat
		var batTopCenter = this.bat.centerTop()
		for (var index = 0; index < this.balls.length; index++) {
			this.balls[index].stickBottomToPoint(batTopCenter.x, batTopCenter.y)
		}
	} else {
		// Ball will be moving in each frame
		for (index = 0; index < this.balls.length; index++) {

			// window collision
			var bottomCollided = this.balls[index].handleCollisionWithWindowReportBottomCollision(this.windowWidth, this.windowHeight)
			if (bottomCollided) {
				this.ballDroppedToBottom()
			}

			// bat collision
			this.balls[index].handleCollisionWithBat(this.bat.rect.x, this.bat.rect.width, this.bat.rect.y)

			// stage collision
			const brickCollisionResult = this.stage.handleBrickCollisionWithBallAndReportCollision(this.balls[index])
			if (brickCollisionResult) {
				this.handlePowerGeneration(this.balls[index])
			}
			this.balls[index].handleBrickCollisionResult(brickCollisionResult)

			// move ball
			this.balls[index].move()
		}
	}
}

Game.prototype.operatePower = function () {
	if (this.curState == this.state.running && this.currentPower) {

		var collide = this.currentPower.doesCollideWithBat(this.bat.rect.x, this.bat.rect.width, this.bat.rect.y)

		if (collide) {
			// Apply the power
			// Remove the power
			this.applyPower(this.currentPower.powerType)
			this.currentPower = undefined
		} else {
			var doesCollideWithWindowBottom = this.currentPower.handleCollisionWithWindowReportBottomCollision(this.windowWidth, this.windowHeight)

			if (doesCollideWithWindowBottom) {
				this.currentPower = undefined
			} else {
				this.currentPower.move()
			}
		}
	}
}

Game.prototype.applyPower = function (powerType) {
	switch (powerType) {
	case this.powerTypes.increaseLife: {
		this.increaseLife()
	}
		break
	case this.powerTypes.decreaseLife: {
		this.decreaseLife()
	}
		break
	case this.powerTypes.increaseBatSize: {
		this.bat.increaseSize()
	}
		break
	case this.powerTypes.decreaseBatSize: {
		this.bat.decreaseSize()
	}
		break
	case this.powerTypes.increaseBallSize: {
		for(let index = 0; index < this.balls.length; index++) {
			this.balls[index].increaseSize()
		}
	}
		break
	case this.powerTypes.decreaseBallSize: {
		for(let index = 0; index < this.balls.length; index++) {
			this.balls[index].decreaseSize()
		}
	}
		break
	case this.powerTypes.speedUpBall: {
		for(let index = 0; index < this.balls.length; index++) {
			this.balls[index].increaseSpeed()
		}
	}
		break
	case this.powerTypes.slowDownBall: {
		for(let index = 0; index < this.balls.length; index++) {
			this.balls[index].decreaseSpeed()
		}
	}
		break
	}
}

Game.prototype.moveToNextStage = function () {

	this.currentPower = undefined

	if(this.lastBrickTimer) {
		this.lastBrickTimer.stop()
		this.lastBrickTimer = undefined
	}

	if (this.currentStage < stageDatas.length - 1) {
		this.currentStage++
		this.curState = this.state.waiting
		this.stage.setNewStageData(stageDatas[this.currentStage])
	} else {
		this.curState = this.state.no_more_stages
		if (this.callbacks["all_stage_finished"]) {
			this.callbacks["all_stage_finished"](this.stage.score)
		}
	}
}

Game.prototype.startLastBrickTimer = function () {
	if(this.lastBrickTimer) {
		// already present, no need to start
		return
	}

	this.lastBrickTimer = new Timer(59)
	var self = this
	this.lastBrickTimer.on("end", function() {
		self.lastBrickTimer = undefined
		self.moveToNextStage()
	})
}

Game.prototype.roundRobinPowerProvider = function() {
	var nextPower = this.powerTypes.increaseLife
	var totalPowerCount = Object.keys(this.powerTypes).length

	return function() {
		var curPowerToReturn = nextPower
		nextPower = (nextPower + 1)
		if(nextPower > totalPowerCount) {
			nextPower = 1
		}
		return curPowerToReturn
	}

}

// Give appropriate name
Game.prototype.ballDroppedToBottom = function () {
	this.currentPower = undefined
	this.curState = this.state.waiting
	this.lifeCount--

	// Reset ball angles
	for(let index = 0; index < this.balls.length; index++) {
		this.balls[index].initialAngleSpeedSetup()
	}

	if (this.lifeCount == 0) {
		this.curState = this.state.no_more_life
		if (this.callbacks["no_more_life"]) {
			this.callbacks["no_more_life"](this.stage.score)
		}
	}
}

Game.prototype.handlePowerGeneration = function (ball) {
	// Current scheme is generating power in each ball collision with brick,
	// in case there is no power. Powers will appear in round robin fashion
	if (!this.currentPower) {

		this.currentPower = new Power(this.powerProvider(), ball.speedX, ball.speedY, ball.centerX, ball.centerY)
	}
}

Game.prototype.on = function (event, callback) {
	this.callbacks[event] = callback
}

Game.prototype.draw = function () {

	// clear screen
	this.ctx.clearRect(0, 0, this.windowWidth, this.windowHeight)

	if (this.curState == this.state.no_more_stages || this.curState == this.state.no_more_life) {
		this.drawGameOver()
		this.drawScore()
		this.drawStageName()
	} else {
		this.drawLife()
		this.drawScore()
		this.drawStageName()

		// Ball movement, collision reporting and handling
		this.operateBall()

		// Power movement, collision reporting and handling
		this.operatePower()


		// ball drawing
		this.bat.draw(this.ctx)

		// stage drawing
		this.stage.draw(this.ctx)

		// power drawing
		if (this.currentPower) {
			this.currentPower.draw(this.ctx)
		}

		// ball drawing
		for (var index = 0; index < this.balls.length; index++) {
			this.balls[index].draw(this.ctx)
		}

		// last brick remaining time
		this.drawLastBrickRemainingTime()
	}
}

Game.prototype.drawLife = function () {
	var heartImage = document.getElementById("heart_image")

	var margin = 10
	var width = 40
	var height = 40

	var curX = this.windowWidth - margin - width

	for (var index = 0; index < this.lifeCount; index++) {
		this.ctx.drawImage(heartImage, curX, margin, width, height)
		curX -= (margin + width)
	}
}

Game.prototype.drawScore = function () {
	var margin = 10

	this.ctx.fillStyle = "#FFFFFF"
	this.ctx.font = "30px Comic Sans MS"
	this.ctx.textBaseline = "top"
	this.ctx.textAlign = "left"
	this.ctx.fillText(`Score : ${this.stage.score}`, margin, margin)
}

Game.prototype.drawStageName = function () {

	var margin = 10

	this.ctx.fillStyle = "#FFFFFF"
	this.ctx.font = "30px Comic Sans MS"
	this.ctx.textBaseline = "top"
	this.ctx.textAlign = "center"
	this.ctx.fillText(stageDatas[this.currentStage].name, this.windowWidth / 2, margin)
}

Game.prototype.drawGameOver = function () {
	var gameOverImage = document.getElementById("game_over_image")

	var imageX = (this.windowWidth - gameOverImage.width) / 2

	this.ctx.drawImage(gameOverImage, imageX, 50)
}

Game.prototype.drawLastBrickRemainingTime = function() {
	if(this.lastBrickTimer) {
		this.ctx.fillStyle = "#FF0000"
		this.ctx.font = "40px Comic Sans MS"
		this.ctx.textBaseline = "center"
		this.ctx.textAlign = "center"
		this.ctx.fillText(`${this.lastBrickTimer.remainingSeconds()}`, this.windowWidth / 2, this.windowHeight / 2)
	}
}

Game.prototype.increaseLife = function () {
	var maxLife = 5	// So far it's here, no one other required it. If required place it in a suitable place
	if(this.lifeCount < maxLife) {
		this.lifeCount++
	}
}

Game.prototype.decreaseLife = function () {
	this.ballDroppedToBottom()
}