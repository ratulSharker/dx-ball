/* eslint-disable no-unused-vars */

// Stage datas is array of each stage information.
//  It is 20 x 20 grid.
// `1` represent it will take one hit to diminish (colored GREEN)
// `2` represent it will take two hit to diminish (colored BLUE)
// `3` represent it will take three hit to diminish (colored RED)
var stageDatas = [
	{
		name : "Java (1)",
		col: 15,
		row: 8,
		gap: {
			vertical: 2,
			horizontal: 2
		},
		brickHeight: 40,
		colorByType: {
			1: "#01a900",
			2: "#00a8d5",
			3: "#770000"
		},
		data: [
			[0, 0, 2, 0, 0, 3, 0, 0, 1, 0, 1, 0, 0, 2, 0],
			[0, 0, 2, 0, 3, 0, 3, 0, 1, 0, 1, 0, 2, 0, 2],
			[0, 0, 2, 0, 3, 0, 3, 0, 1, 0, 1, 0, 2, 0, 2],
			[0, 0, 2, 0, 3, 3, 3, 0, 1, 0, 1, 0, 2, 2, 2],
			[0, 0, 2, 0, 3, 0, 3, 0, 1, 0, 1, 0, 2, 0, 2],
			[0, 0, 2, 0, 3, 0, 3, 0, 1, 0, 1, 0, 2, 0, 2],
			[2, 0, 2, 0, 3, 0, 3, 0, 1, 0, 1, 0, 2, 0, 2],
			[0, 2, 2, 0, 3, 0, 3, 0, 0, 1, 0, 0, 2, 0, 2],
		]
	},
	{
		name: "C++ (2)",
		col: 10,
		row: 9,
		gap: {
			vertical: 2,
			horizontal: 2
		},
		brickHeight: 40,
		colorByType: {
			1: "#01a900",
			2: "#00a8d5",
			3: "#770000"
		},
		data: [
			[0, 0, 3, 3, 0, 0, 0, 0, 0, 0],
			[0, 3, 3, 0, 0, 0, 0, 0, 0, 0],
			[0, 3, 3, 0, 0, 1, 0, 0, 2, 0],
			[3, 3, 0, 0, 0, 1, 0, 0, 2, 0],
			[3, 3, 0, 0, 1, 1, 1, 2, 2, 2],
			[3, 3, 0, 0, 0, 1, 0, 0, 2, 0],
			[0, 3, 3, 0, 0, 1, 0, 0, 2, 0],
			[0, 3, 3, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 3, 3, 0, 0, 0, 0, 0, 0],
		]
	},
]

/* eslint-enable no-unused-vars */