/**
 * @param string
 * @returns { string | *}
 *
 */
exports.getSlugName = (string) => {
	//removendo espaços em branco
	string = string.toLowerCase().replace(/\s+/g);
	//remover acentuação
	let from = 'àáäâãèéëêẽìíïîòóöôõùúüûñç', to = 'aaaaaeeeeeiiiiooooouuuunc';

	for(let i = 0, len = from.length; i < len; i++) {
		string = string.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
	}

	//remover caracteres invalidos
	string = string.replace(new RegExp('[^a-z0-9]', 'g'), '').replace(/-+/g)

	return string;
}

/**
 * @param string
 * @returns { string | *}
 *
 */
exports.truncate = (name) => {
	return name.split(" ")
		.slice(0, 1)
		.toString()
}

exports.getHash = () => {
	return `${Math.floor(Math.random() * 4000)}`
}
