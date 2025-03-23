const apiConfig = {
	baseUrl: 'https://nomoreparties.co/v1/wff-cohort-33',
	headers: {
		authorization: 'c23e9a18-3a4c-44ee-9f0a-5372cbe6869d',
		ContentType: 'application/json',
	},
}

function getResponseData(res) {
	if (!res.ok) {
		return Promise.reject(`Ошибка:${res.status}`)
	}
	return res.json()
}

function getProfileData() {
	return fetch(`${apiConfig.baseUrl}/users/me`, {
		headers: {
			authorization: apiConfig.headers.authorization,
		},
	}).then(getResponseData)
}

function getCards() {
	return fetch(`${apiConfig.baseUrl}/cards`, {
		headers: {
			authorization: apiConfig.headers.authorization,
		},
	}).then(getResponseData)
}

function saveNewProfile(name, description) {
	return fetch(`${apiConfig.baseUrl}/users/me`, {
		method: 'PATCH',
		headers: {
			authorization: apiConfig.headers.authorization,
			'Content-Type': apiConfig.headers.ContentType,
		},
		body: JSON.stringify({
			name: name,
			about: description,
		}),
	}).then(getResponseData)
}

function addNewCard(cardName, link) {
	return fetch(`${apiConfig.baseUrl}/cards`, {
		method: 'POST',
		headers: {
			authorization: apiConfig.headers.authorization,
			'Content-Type': apiConfig.headers.ContentType,
		},
		body: JSON.stringify({
			name: cardName,
			link: link,
		}),
	}).then(getResponseData)
}

function deleteNewCard(cardId) {
	return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
		method: 'DELETE',
		headers: {
			authorization: apiConfig.headers.authorization,
			'Content-Type': apiConfig.headers.ContentType,
		},
	}).then(getResponseData)
}

function getLike(cardId) {
	return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
		method: 'PUT',
		headers: {
			authorization: apiConfig.headers.authorization,
			'Content-Type': apiConfig.headers.ContentType,
		},
	}).then(getResponseData)
}

function deleteLike(cardId) {
	return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
		method: 'DELETE',
		headers: {
			authorization: apiConfig.headers.authorization,
			'Content-Type': apiConfig.headers.ContentType,
		},
	}).then(getResponseData)
}

function newAvatar(avatar) {
	return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
		method: 'PATCH',
		headers: {
			authorization: apiConfig.headers.authorization,
			'Content-Type': apiConfig.headers.ContentType,
		},
		body: JSON.stringify({
			avatar: avatar,
		}),
	}).then(getResponseData)
}

export {
	getProfileData,
	getCards,
	saveNewProfile,
	addNewCard,
	deleteNewCard,
	getLike,
	deleteLike,
	newAvatar,
}
