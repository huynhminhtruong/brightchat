var fs = require('fs')
var done = false
var rs = fs.createReadStream('./file_1')
var ws = fs.createWriteStream('./file_2')
var crypto = require('crypto')
var randomKey = require('random-key')
var random = require('randomstring')
var count = 0
var randomString = Math.random().toString(36).substring(7)

rs.setEncoding('utf-8')

function fsMethods() {
	for(var i = 0; i < 2; i++){
		fs.readFile('./file_1', function(error, data){
			count++
			console.log(count + ' ' + i)
		})
	}
}

function createRandomString() {
	//hex is 247390 times will meet again
	return crypto.randomBytes(Math.ceil(7))
			.toString('base64').slice(0, 5).toUpperCase()

	//Use randomstring node module
	return random.generate({
		length: 5,
		charset: 'alphanumeric',
		capitalization: 'uppercase'
	})
}

function greeting() {
	console.log('Hello world')
}

function createUUID() {

}

function methods() {
	return {
		fsMethods: fsMethods,
		createRandomString: createRandomString
	}
}

// exports.fsMethods = fsMethods()
// exports.greeting = greeting()

module.exports = function() {
	//Return a function type
	return {
		fsMethods: fsMethods,
		greeting: greeting,
		createRandomString: createRandomString
	}
}

// module.exports = function() {
// 	//Return a function type
// 	return methods()
// }

// //Return a object type because method function return a object
//module.exports = methods()