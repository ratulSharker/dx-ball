function Bat(windowWidth, windowHeight) {

	this.widthPercentageOfWindow = 10
	this.maxPercentage = 15
	this.minPercentage = 5

	this.windowWidth = windowWidth
	this.windowHeight = windowHeight

	this.margin = 5

	var height = 40

	this.rect = {
		x : this.margin,
		y : windowHeight - this.margin - height,
		width: (windowWidth / 100.0) * this.widthPercentageOfWindow,
		height: height
	}
}



// Bat.prototype.increase = function() {
// 	if(this.widthPercentageOfWindow < this.maxPercentage) {
// 		this.widthPercentageOfWindow += 1
// 	}
// }

// Bat.prototype.decrease = function() {
// 	if(this.widthPercentageOfWindow > this.minPercentage) {
// 		this.widthPercentageOfWindow -= 1
// 	}
// }

Bat.prototype.windowResized = function (windowWidth, windowHeight) {
	this.windowWidth = windowWidth
	this.windowHeight = windowHeight

	this.rect.y = windowHeight - this.margin - this.rect.height,
	this.rect.width = (windowWidth / 100.0) * this.widthPercentageOfWindow
	this.repositionBat()
}

Bat.prototype.mouseMoved = function(cursorX) {
	this.rect.x = cursorX - (this.rect.width / 2)
	this.repositionBat()
}

Bat.prototype.repositionBat = function() {
	// Bat is out of the window - left side
	if(this.rect.x < this.margin) {
		this.rect.x = this.margin
	}

	// Bat is out of the window - right side
	if(this.rect.x + this.rect.width > this.windowWidth - this.margin) {
		this.rect.x = this.windowWidth - this.rect.width - this.margin
	}
}

Bat.prototype.draw = function(ctx) {
	ctx.fillStyle = "#0000FF"

	ctx.fillRect(
		this.rect.x,
		this.rect.y,
		this.rect.width,
		this.rect.height
	)

	// console.log(this.rect)
}

Bat.prototype.centerTop = function() {
	return {
		x : this.rect.x + (this.rect.width / 2.0),
		y : this.rect.y
	}
}