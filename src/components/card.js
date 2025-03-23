import { cardTemplate } from '../index.js'
import { deleteNewCard, getLike, deleteLike } from './api.js'
function createCard(data, removeCb, liked, openImg, userId) {
	const cardElement = cardTemplate
		.querySelector('.places__item')
		.cloneNode(true)

	cardElement.querySelector('.card__image').src = data.link
	cardElement.querySelector('.card__image').alt = data.name
	cardElement.querySelector('.card__title').textContent = data.name

	const deleteButton = cardElement.querySelector('.card__delete-button')

	if (data.owner._id === userId) {
		deleteButton.addEventListener('click', function () {
			removeCb(cardElement, data._id)
		})
	} else {
		deleteButton.remove()
	}

	const likeButton = cardElement.querySelector('.card__like-button')
	const likeCounter = cardElement.querySelector('.card__likes-counter')
	if (
		data.likes.some((like) => {
			like._id === userId
		})
	) {
		likeButton.classList.add('.card__like-button_is-active')
	}
	likeCounter.textContent = data.likes.length
	likeButton.addEventListener('click', function () {
		liked(likeButton, likeCounter, data._id)
	})

	const imgButton = cardElement.querySelector('.card__image')
	imgButton.addEventListener('click', function () {
		openImg(data.link, data.name)
	})
	return cardElement
}

function deleteCard(item, cardId) {
	deleteNewCard(cardId)
		.then(() => {
			item.remove()
		})
		.catch((err) => {
			console.log(`Ошибка:${err}`)
		})
}

function handleLike(buttonLike, countLike, cardId) {
	const liked = buttonLike.classList.contains('card__like-button_is-active')
	if (liked) {
		deleteLike(cardId)
			.then((data) => {
				buttonLike.classList.remove('card__like-button_is-active')
				countLike.textContent = data.likes.length
			})
			.catch((err) => {
				console.log(`Ошибка:${err}`)
			})
	} else {
		getLike(cardId)
			.then((data) => {
				buttonLike.classList.add('card__like-button_is-active')
				countLike.textContent = data.likes.length
			})
			.catch((err) => {
				console.log(`Ошибка:${err}`)
			})
	}
}

export { createCard, deleteCard, handleLike }
