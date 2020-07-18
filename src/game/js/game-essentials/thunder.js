
// Inspired from : https://codepen.io/mcdorli/post/creating-lightnings-with-javascript-and-html5-canvas
function Thunder(startpoint, endpoint) {
	this.startpoint = startpoint
	this.endpoint = endpoint

	this.maxDifference = 100    // left & right deviation
	this.minSegmentHeight = 5   // loop until segment height is greater than this.
	this.roughness = 2          // deviation roughness so that, either end reach it's destination. Max roughness is found in center
}

Thunder.prototype.getCoordinates = function() {
	var segmentHeight = this.endpoint.y - this.startpoint.y
	var lightning = [this.startpoint, this.endpoint]

	var currDiff = this.maxDifference
	while (segmentHeight > this.minSegmentHeight) {
		var newSegments = []
		for (var i = 0; i < lightning.length - 1; i++) {
			var start = lightning[i]
			var end = lightning[i + 1]
			var midX = (start.x + end.x) / 2
			var newX = midX +
            (Math.random() * 2 - 1)   // generates value [-1, 1]
        * currDiff
			newSegments.push(start, {
				x: newX, y: (start.y + end.y) / 2
			})
		}

		newSegments.push(lightning.pop())
		lightning = newSegments

		currDiff /= this.roughness
		segmentHeight /= 2
	}
	return lightning
}

Thunder.prototype.draw = function(ctx) {

	ctx.strokeStyle = "#A3F5F5"

	for(let lineWidth = 0; lineWidth < 5; lineWidth++) {
		ctx.lineWidth = lineWidth
		ctx.beginPath()
		var thunder = this.getCoordinates()
		for(let index = 0; index < thunder.length; index++) {
			ctx.lineTo(thunder[index].x, thunder[index].y)
		}
		ctx.stroke()
	}


}