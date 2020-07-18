function Sound() {


}

Sound.prototype.getAudioById = function(audioId) {
	return document.getElementById(audioId)
}

Sound.prototype.play = function (audioId, volume = 1.0) {
	var audio = this.getAudioById(audioId)
	console.log(audioId)
	audio.volume = volume
	audio.play()
	return audio
}


Sound.prototype.playInLoop = function(audioId) {
	var audio = this.play(audioId)
	audio.loop = true
	return audio
}


Sound.prototype.stop = function(audioId) {
	var audio = this.getAudioById(audioId)
	audio.pause()
	audio.currentTime = 0
	this.audio
}


Sound.prototype.playBallHitBat = function() {
	this.play("ball_bat_hit", 0.3)
}

Sound.prototype.stopBallHitBat = function() {
	this.stop("ball_bat_hit")
}

Sound.prototype.playBallBounce = function() {
	this.play("ball_bounce", 0.3)
}

Sound.prototype.stopBallBounce = function() {
	this.stop("ball_bounce")
}