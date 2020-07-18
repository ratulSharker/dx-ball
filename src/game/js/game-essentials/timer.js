function Timer(expirationInSeconds) {
	this.expirationInSeconds = expirationInSeconds
	this.counter = 0
	var self = this
	this.timerId = setInterval(function () {
		self.handler()
	}, 1000)
	this.callback = {

	}
}


Timer.prototype.handler = function () {
	if (this.counter == this.expirationInSeconds) {
		clearInterval(this.timerId)
		if (this.callback["end"]) {
			this.callback["end"]()
		}
	} else {
		this.counter++
		if (this.callback["update"]) {
			this.callback["update"]()
		}
	}
}


Timer.prototype.passedSeconds = function () {
	return this.counter
}

Timer.prototype.remainingSeconds = function () {
	return this.expirationInSeconds - this.counter
}

Timer.prototype.on = function (event, callback) {
	this.callback[event] = callback
}

Timer.prototype.stop = function () {
	clearInterval(this.timerId)
}