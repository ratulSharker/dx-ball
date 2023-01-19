function Bat(windowWidth, windowHeight, canvas) {

	this.widthPercentageOfWindow = 14
	this.maxPercentage = 20
	this.minPercentage = 8

	this.windowWidth = windowWidth
	this.windowHeight = windowHeight

	this.margin = 5

	var height = 20

	this.rect = {
		x : this.margin,
		y : 0,
		width: (windowWidth / 100.0) * this.widthPercentageOfWindow,
		height: height
	}
	this.canvasRect = {
		x : 0,
		y : this.windowHeight - this.margin - this.rect.height,
		width: windowWidth,
		height: this.margin + this.rect.height
	}

	this.ctx = canvas.getContext("2d", {
		alpha : false
	})
	this.ctx.canvas.width = this.canvasRect.width
	this.ctx.canvas.height = this.canvasRect.height

	this.ctx.canvas.style.left = `${this.canvasRect.x}px`
	this.ctx.canvas.style.top = `${this.canvasRect.y}px`
	this.ctx.canvas.style.position = "absolute"
}



Bat.prototype.increaseSize = function() {
	if(this.widthPercentageOfWindow < this.maxPercentage) {
		this.widthPercentageOfWindow += 2
		this.rect.width = (this.windowWidth / 100.0) * this.widthPercentageOfWindow
	}
}

Bat.prototype.decreaseSize = function() {
	if(this.widthPercentageOfWindow > this.minPercentage) {
		this.widthPercentageOfWindow -= 2
		this.rect.width = (this.windowWidth / 100.0) * this.widthPercentageOfWindow
	}
}

Bat.prototype.windowResized = function (windowWidth, windowHeight) {
	this.windowWidth = windowWidth
	this.windowHeight = windowHeight

	this.canvasRect.y = windowHeight - this.margin - this.rect.height
	this.canvasRect.width = windowWidth

	this.ctx.canvas.style.top = `${this.canvasRect.y}px`

	this.rect.width = (windowWidth / 100.0) * this.widthPercentageOfWindow
	this.repositionBatInsideWindow()
	this.draw()
}

Bat.prototype.mouseMoved = function(cursorX) {
	this.rect.x = cursorX - (this.rect.width / 2)
	this.repositionBatInsideWindow()
	this.draw()
}

Bat.prototype.repositionBatInsideWindow = function() {
	// Bat is out of the window - left side
	if(this.rect.x < this.margin) {
		this.rect.x = this.margin
	}

	// Bat is out of the window - right side
	if(this.rect.x + this.rect.width > this.windowWidth - this.margin) {
		this.rect.x = this.windowWidth - this.rect.width - this.margin
	}
}

Bat.prototype.draw = function() {
	this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)

	this.ctx.fillStyle = "#b89ae4"

	this.ctx.fillRect(
		this.rect.x,
		this.rect.y,
		this.rect.width,
		this.rect.height
	)
}

Bat.prototype.centerTop = function() {
	return {
		x : this.rect.x + (this.rect.width / 2.0),
		y : this.canvasRect.y
	}
}

Bat.prototype.relativeBatRect = function() {
	return {
		x : this.rect.x,
		y : this.canvasRect.y,
		width: this.rect.width,
		height: this.rect.height
	}
}