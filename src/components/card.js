import { cardTemplate } from '../index.js'

function createCard(data, removeCb, like, openImg) {
	const cardElement = cardTemplate
		.querySelector('.places__item')
		.cloneNode(true)

	cardElement.querySelector('.card__image').src = data.link
	cardElement.querySelector('.card__image').alt = data.name
	cardElement.querySelector('.card__title').textContent = data.name

	const deleteButton = cardElement.querySelector('.card__delete-button')

	deleteButton.addEventListener('click', function () {
		removeCb(cardElement)
	})
	const likeButton = cardElement.querySelector('.card__like-button')
	likeButton.addEventListener('click', function () {
		like(likeButton)
	})
	const imgButton = cardElement.querySelector('.card__image')
	imgButton.addEventListener('click', function () {
		openImg(data.link, data.name)
	})
	return cardElement
}

function deleteCard(item) {
	item.remove()
}

function handleLike(item) {
	item.classList.toggle('card__like-button_is-active')
}

export { createCard, deleteCard, handleLike }
