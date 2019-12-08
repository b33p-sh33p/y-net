class KahootBot {
	constructor(gamePin, name) {
		this.gamePin = gamePin
		this.name = name
		this.id = 1
		this.joined = false
	}

	setSessionToken(token) {
		this.sessionToken = token
	}

	sendConnectPacket() {
		this.id += 1
		let connectPayload = {
			"id": ""+this.id,
			"channel": "/meta/connect",
			"connectionType": "websocket",
			"advice": {
				"timeout": 0
			},
			"clientId": this.clientId
		}

		this.socket.send(JSON.stringify(connectPayload))
	}

	sendControllerPacket() {
		this.id += 1
		let controllerPayload = {
			"id": ""+this.id,
			"channel": "/service/controller",
			"data": {
				"type": "login",
				"gameid": this.gamePin,
				"host": "kahoot.it",
				"name": this.name
			},
			"clientId": this.clientId
		}

		this.socket.send(JSON.stringify(controllerPayload))
	}

	setup() {
		let handshakePayload = {
			"id": ""+this.id,
			"version": "1.0",
			"minimumVersion": "1.0",
			"channel": "/meta/handshake",
			"supportConnectionType": ["websocket"],
			"advice": {
				"timeout": 60000,
				"interval": 0
			}
		}

		try {
			this.socket = new WebSocket("wss://kahoot.it/cometd/"+this.gamePin+"/"+this.sessionToken)
		} catch (err) {
			console.log(err)
			this.start()
		}

		this.socket.onopen = e => {
			this.socket.send(JSON.stringify(handshakePayload))
		}

		this.socket.onmessage = event => {
			let jsonData = JSON.parse(event.data)

			if (jsonData[0]["channel"] == "/meta/handshake") {
				console.log("Handshake response recieved")
				if (jsonData[0]["successful"]) {
					this.clientId = jsonData[0]["clientId"]
					console.log("Handshake successful")
					this.sendConnectPacket()
				} else {
					console.log("Failed")
				}
			} else if (jsonData[0]["channel"] == "/meta/connect") {
				if (this.joined) {
					this.sendConnectPacket()
				} else {
					console.log("Connect response recieved")
					console.log(jsonData)
					if (jsonData[0]["successful"]) {
						this.sendControllerPacket()
					} else {
						console.log("Failed")
						console.log(jsonData)
					}
				}
			} else if (jsonData[0]["channel"] == "/service/controller") {
				if (jsonData[0]["successful"]) {
					console.log("Controller payload success!!")
					this.joined = true
					this.sendConnectPacket()
				} else if (jsonData[0]["data"]["type"] == "loginResponse") {
					console.log("Recieved game informations")
				} else {
					console.log("Controller payload failed")
					console.log(jsonData)
				}
			}
		}

		this.socket.onclose = function(event) {
			if (event.wasClean) {
				console.log("Connection closed cleanly")
			} else {
				console.log("Connection died :(")
			}
		}

		this.socket.onerror = event => {
			this.socket.close(1000, "Connection error")
			console.log("Error -> will attempt to generate a new session token")

		}
	}

	start() {
		fetch("/createSessionToken", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body: "pin="+this.gamePin
		})
		.then(res => {
			res.json()
			.then(data => {
				this.setSessionToken(data["tokens"][0])
				this.setup()
			})
		})
	}
}

function beginFlood() {
	let gamePin = document.getElementById("pin").value;
	let name = document.getElementById("name").value;
	let amount = document.getElementById("amount").value;
	let bots = []
	let tokens = []

	for (let i=0; i<amount; i++) {
		bots[i] = new KahootBot(gamePin, name+i)
	}

	for (let i=0; i<amount; i++) {
		bots[i].start()
	}

	return false;
}
