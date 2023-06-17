module.exports = {
	httpStatusCode: {
		OK: 200,
		CREATED: 201,
		NO_CONTENT: 204,
		BAD_REQUEST: 400,
		UNAUTHORIZED: 401,
		FORBIDEN: 403,
		NOT_FOUND: 404,
		CONFLICT: 409,
		UNPROCESSABLE_ENTITY: 422,
		INTERNAL_SERVER_ERROR: 500,
		BAD_GATEWAY: 502,
	},
	throwNewError: {
		//resources verification
		IVALID_ID: {
			message: "Id invalido",
		},
		INVALID_STATUS: {
			message: "Informe corretamente um status",
		},
		//requests
		REQUEST_FAILED: {
			message: "Falha de consulta",
		},
		RESOURCE_NOT_FOUND: {
			message: "Nenhum registro encontrado!",
		},
		ROUTE_NOT_FOUND: {
			message: "Rota não encontrada",
		},
		DUPLICATED_UNIQUE_KEY: {
			message: "Conflito de chave única duplicada",
		},
		EXISTANT_REGISTER: {
			message: "Registro já existente",
		},
		DUPLICATED_EMAIL: {
			message: "E-mail já cadastrado!",
		},
		//forms field
		EMPTY_FIELD_NAME: {
			message: "Campo de Nome está vazio!",
		},
		ANY_ENTITY_EMPTY: {
			message: "Preencha os campos corretamente",
		},
		EMPTY_FIELDS_FOR_UPDATE: {
			message: "Preencha os campos para atualização",
		},
		EMPTY_FIELD_EMAIL: {
			message: "Campo de e-mail está vazio!",
		},
		EMPTY_FIELD_PASSWORD: {
			message: "Campo de senha está vazio!",
		},
		//form login field
		EMPTY_FIELD_EMAIL_LOGIN: {
			message: "Campo de e-mail vazio",
		},
		EMPTY_FIELD_PASSWORD_LOGIN: {
			message: "Campo de senha vazio",
		},
		ENTITY_FIELDS_EMPTY: {
			message: "Nenhum dado identificado",
		},
		ENTITY_NOT_FOUND: {
			message: "Usuário não encontrado",
		},
		INVALID_PASSWORD: {
			message: "Dados incorretos",
		},
		//server error
		INTERNAL_SERVER_ERROR: {
			message: "Critical server error",
		},
		ACCESS_DENIED: {
			message: "Accesso negado",
		},
		INVALID_TOKEN: {
			message: "Token invalido",
		},
	},
	successStatus: {
		SUCCESS_OPERATION: {
			message: "Operação realizada com sucesso!",
		},
		FREE_ACCESS: {
			message: "Acesso liberado",
		},
		CREATED: {
			message: "registro criado com sucesso!",
		},
		UPDATED_RESOURCE: {
			message: "registro atualizado com sucesso!",
		},
		REMOVED_RESOURCE: {
			message: "registro removido com sucesso!",
		},
	},
};
