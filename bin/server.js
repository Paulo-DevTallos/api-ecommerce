const app = require("../src/app");
const http = require("http");
const { httpStatusCode, throwNewError } = require("../config/error-tratament");

const port = process.env.PORT;

// creating server
const server = http.createServer(app);

server.listen(port, () =>
	console.log(`Server running on http://localhost:${port}`)
);
server.on("error", onError);

// Event listener for HTTP server error
function onError(error) {
	if (error.syscall !== "listen") {
		throw new Error(
			error,
			httpStatusCode.INTERNAL_SERVER_ERROR,
			throwNewError.SEVERAL_INTERAL_SERVER_ERROR.message
		);
	}
}
