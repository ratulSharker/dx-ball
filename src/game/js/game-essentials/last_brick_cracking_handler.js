/* global Timer interpolate */

function LastBrickCrackingHandler( timeout, soundMgr ) {

	// timer setup
	this.timer = new Timer(timeout)
	var self = this
	this.timer.on("end", function() {
		self.handleTimerEnd()
	})
	this.timer.on("update", function() {
		self.handleTimerUpdate()
	})

	// sound setup
	this.soundMgr = soundMgr
	this.crackingAudioId = "electric_zap_2"
	this.baseVolume = 0.1
	this.soundMgr.playInLoop(this.crackingAudioId, this.baseVolume)

	this.callbacks = {

	}
}


LastBrickCrackingHandler.prototype.handleStagePassed = function() {
	if(this.timer) {
		this.timer.stop()
		this.timer = undefined
	}
	this.soundMgr.stop(this.crackingAudioId)
}


LastBrickCrackingHandler.prototype.handleTimerEnd = function() {
	this.timer = undefined
	this.soundMgr.stop(this.crackingAudioId)
	if(this.callbacks["end"]) {
		this.callbacks["end"]()
	}
}

LastBrickCrackingHandler.prototype.handleTimerUpdate = function() {
	var newVolume = interpolate(0, 30, this.baseVolume, 1.0, this.timer.passedSeconds())
	console.log(newVolume)
	this.soundMgr.volume(this.crackingAudioId, newVolume)
}


LastBrickCrackingHandler.prototype.on = function(event, callback) {
	this.callbacks[event] = callback
}

LastBrickCrackingHandler.prototype.remainingSeconds = function() {
	return this.timer.remainingSeconds()
}