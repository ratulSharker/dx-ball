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


// Music setting will use these.
Sound.prototype.storeMusicVolume = function(volume) {
	localStorage.setItem("music_volume", volume)
}

Sound.prototype.getMusicVolume = function() {
	return localStorage.getItem("music_volume") || 0.8
}

Sound.prototype.storeSFXVolume = function(volume) {
	localStorage.setItem("sfx_volume", volume)
}

Sound.prototype.getSFXVolume = function() {
	return localStorage.getItem("sfx_volume") || 0.3
}