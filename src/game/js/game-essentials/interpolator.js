/* eslint-disable no-unused-vars */

function interpolate(referenceLowValue, referenceHighValue, inputLowValue, inputHighValue, referenceValue) {
	return ((referenceValue / (referenceHighValue - referenceLowValue)) * (inputHighValue - inputLowValue)) + inputLowValue
}

/* eslint-enable no-unused-vars */