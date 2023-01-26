module.exports = {
	httpStatusCode: {
		OK: 200,
		CREATED: 201,
		SUCCESS_NO_CONTENT: 204,
		BAD_REQUEST: 400,
		UNAUTHORIZED: 401,
		FORBIDEN: 403,
		NOT_FOUND: 404,
		CONFLICT: 409,
		UNPROCESSABLE_ENTITY: 422,
		INTRNAL_SERVER_ERROR: 500,
		BAD_GATEWAY: 502,
	},
	throwNewError: {
		//requests
		REQUEST_FAILED: {
			code: 400,
			message: "Falha de consulta",
		},
		RESOURCE_NOT_FOUND: {
			code: 404,
			message: "Nenhum registro encontrado!",
		},
		DUPLICATED_UNIQUE_KEY: {
			code: 409,
			message: "Conflito de chave única duplicada",
		},
		EXISTANT_REGISTER: {
			code: 409,
			message: "Registro já existente",
		},
		DUPLICATED_EMAIL: {
			code: 409,
			message: "E-mail já cadastrado!",
		},
		//server error
		SEVERAL_INTERAL_SERVER_ERROR: {
			code: 500,
			message: "Critical server error",
		},
		ACCESS_DENIED: {
			code: 401,
			message: "Accesso negado",
		},
		INVALID_TOKEN: {
			code: 401,
			message: "Token invalido",
		},
	},
	successStatus: {
		SUCCESS_OPERATION: {
			code: 200,
			message: "Operação realizada com sucesso!",
		},
		FREE_ACCESS: {
			code: 200,
			message: "Acesso liberado",
		},
		CREATED: {
			code: 201,
			message: "registro criado com sucesso!",
		},
		UPDATED_RESOURCE: {
			code: 204,
			message: "registro atualizado com sucesso!",
		},
		REMOVED_RESOURCE: {
			code: 204,
			message: "registro removido com sucesso!",
		},
	},
}
