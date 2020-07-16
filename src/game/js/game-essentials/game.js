/* global Bat Ball */

function Game(windowWidth, windowHeight, canvas) {
	this.windowWidth = windowWidth
	this.windowHeight = windowHeight

	this.ctx = canvas.getContext("2d")
	this.ctx.canvas.width = windowWidth
	this.ctx.canvas.height = windowHeight


	this.state = {
		waiting: "WAITING",
		running: "RUNNING"
	}
	this.curState = this.state.waiting


	// bat setup
	this.bat = new Bat(windowWidth, windowHeight)
	this.bat.windowResized(windowWidth, windowHeight)

	// ball setup
	this.balls = []
	this.balls.push(new Ball())

}

Game.prototype.windowResized = function (windowWidth, windowHeight) {
	this.windowWidth = windowWidth
	this.windowHeight = windowHeight

	this.ctx.canvas.width = windowWidth
	this.ctx.canvas.height = windowHeight

	this.bat.windowResized(windowWidth, windowHeight)

	for (var index = 0; index < this.balls.length; index++) {
		this.balls[index].windowResized(windowWidth, windowHeight)
	}
}

Game.prototype.mouseMoved = function (cursorX) {

	this.bat.mouseMoved(cursorX)
}

Game.prototype.startGame = function () {
	this.curState = this.state.running
}

Game.prototype.draw = function () {

	this.operateBallBasedOnState()

	this.ctx.clearRect(0, 0, this.windowWidth, this.windowHeight)
	this.bat.draw(this.ctx)

	for (var index = 0; index < this.balls.length; index++) {
		this.balls[index].draw(this.ctx)
	}
}

Game.prototype.operateBallBasedOnState = function () {
	if (this.curState == this.state.waiting) {
		// Ball will stick to the bat
		var batTopCenter = this.bat.centerTop()
		for (var index = 0; index < this.balls.length; index++) {
			this.balls[index].stickBottom(batTopCenter.x, batTopCenter.y)
		}
	} else {
		// Ball will be moving in each frame
		for (index = 0; index < this.balls.length; index++) {

			// window collision
			var bottomCollided = this.balls[index].handleCollisionWithWindowReportBottomCollision(this.windowWidth, this.windowHeight)
			if(bottomCollided) {
				this.curState = this.state.waiting
			}

			// bat collision
			this.balls[index].collisionWithBat(this.bat.rect.x, this.bat.rect.width, this.bat.rect.y)

			this.balls[index].move()
		}
	}
}