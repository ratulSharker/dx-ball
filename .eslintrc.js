module.exports = {
	"env": {
		"browser": true,
		"commonjs": true,
		"es6": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:require-path-exists/recommended",
		"plugin:promise/recommended"
	],
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
	},
	"plugins": [
		"require-path-exists",
		"promise"
	],
	"parserOptions": {
		"ecmaVersion": 2018
	},
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"never"
		],
		"prefer-const": ["error", {
			"destructuring": "any",
			"ignoreReadBeforeAssign": false
		}],
		"object-curly-newline": ["error", {
			"ObjectExpression": "always",
			"ObjectPattern": {
				"multiline": true
			},
			"ImportDeclaration": "never",
			"ExportDeclaration": {
				"multiline": true,
				"minProperties": 3
			}
		}],
		"no-new": "error",
		"no-trailing-spaces": "error",
		"require-atomic-updates": "off"
	}
}