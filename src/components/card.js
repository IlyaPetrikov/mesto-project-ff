import { openImgPopup, closeModal, addPopup } from '../components/modal'
import { cardTemplate, cards } from '../index.js'

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

function pageOn(cardsBlock) {
	const cardNode = cardsBlock.map((item) =>
		createCard(item, deleteCard, handleLike, openImgPopup)
	)
	cards.append(...cardNode)
}

function handleLike(item) {
	item.classList.toggle('card__like-button_is-active')
}

function handleAddCard(evt) {
	evt.preventDefault()
	const addPopUpName = document.querySelector('.popup__input_type_card-name')

	const addPopUpLink = document.querySelector('.popup__input_type_url')

	const newData = { name: addPopUpName.value, link: addPopUpLink.value }

	const newCard = createCard(newData, deleteCard, handleLike, openImgPopup)

	cards.prepend(newCard)

	closeModal(addPopup)

	addPopUpName.value = ''
	addPopUpLink.value = ''
}

export { createCard, deleteCard, pageOn, handleAddCard, handleLike }
