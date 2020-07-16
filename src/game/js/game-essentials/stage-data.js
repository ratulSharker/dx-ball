/* eslint-disable no-unused-vars */

// Stage datas is array of each stage information.
//  It is 20 x 20 grid.
// `1` represent it will take one hit to diminish (colored GREEN)
// `2` represent it will take two hit to diminish (colored BLUE)
// `3` represent it will take three hit to diminish (colored RED)
var stageDatas = [{
	col: 20,
	row: 10,
	gap: {
		vertical : 2,
		horizontal : 2
	},
	brickHeight: 40,
	colorByType: {
		1 : "#00FF00",
		2 : "#0000FF",
		3 : "#FF0000"
	},
	data: [
		[1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1],
		[2, 2, 0, 2, 2, 0, 2, 2, 0, 2, 2, 0, 2, 2, 0, 2, 2, 2, 2, 2],
		[3, 3, 0, 3, 3, 0, 3, 3, 0, 1, 3, 0, 3, 3, 0, 3, 3, 3, 3, 3],
		[1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1],
		[2, 2, 0, 2, 2, 0, 2, 2, 0, 2, 2, 0, 2, 2, 0, 2, 2, 2, 2, 2],

		[1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1],
		[2, 2, 0, 2, 2, 0, 2, 2, 0, 2, 2, 0, 2, 2, 0, 2, 2, 2, 2, 2],
		[3, 3, 0, 3, 3, 0, 3, 3, 0, 3, 3, 0, 3, 3, 0, 3, 3, 3, 3, 3],
		[1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1],
		[2, 2, 0, 2, 2, 0, 2, 2, 0, 2, 2, 0, 2, 2, 0, 2, 2, 0, 2, 2],
	]
}

]

/* eslint-enable no-unused-vars */