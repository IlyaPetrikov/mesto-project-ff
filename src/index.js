import './pages/index.css'
import { initialCards } from './scripts/cards.js'
import {
	openModal,
	closeModal,
	addPopupEventListener,
} from './components/modal.js'
import { createCard, deleteCard, handleLike } from './components/card.js'
const cardTemplate = document.querySelector('#card-template').content
const cards = document.querySelector('.places__list')
const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')
const editPopup = document.querySelector('.popup_type_edit')
const addPopup = document.querySelector('.popup_type_new-card')
const imgPopup = document.querySelector('.popup_type_image')
const nameInput = document.querySelector('.profile__title')
const jobInput = document.querySelector('.profile__description')
const addFormElement = document.forms.newPlace
const editFormElement = document.forms.editProfile
const editPopUpName = document.querySelector('.popup__input_type_name')
const editPopUpDescription = document.querySelector(
	'.popup__input_type_description'
)

function pageOn(cardsBlock) {
	const cardsNode = cardsBlock.map((item) =>
		createCard(item, deleteCard, handleLike, openImgPopup)
	)
	cards.append(...cardsNode)
}

function handleAddCard(evt) {
	evt.preventDefault()
	const addPopUpName = document.querySelector('.popup__input_type_card-name')

	const addPopUpLink = document.querySelector('.popup__input_type_url')

	const newData = { name: addPopUpName.value, link: addPopUpLink.value }

	const newCard = createCard(newData, deleteCard, handleLike, openImgPopup)

	cards.prepend(newCard)

	closeModal(addPopup)

	addFormElement.reset()
}

function openImgPopup(ImageLink, ImageName) {
	const cardImagePopup = document.querySelector('.popup__image')
	const popupImageTitle = document.querySelector('.popup__caption')

	cardImagePopup.src = ImageLink
	cardImagePopup.alt = ImageName
	popupImageTitle.textContent = ImageName

	openModal(imgPopup)
}

function typeEditPopupInputs(evt) {
	evt.preventDefault()
	const editPopUpName = editPopup.querySelector('.popup__input_type_name')
	const editPopUpDescription = editPopup.querySelector(
		'.popup__input_type_description'
	)
	nameInput.textContent = editPopUpName.value
	jobInput.textContent = editPopUpDescription.value
	closeModal(editPopup)
}

editFormElement.addEventListener('submit', typeEditPopupInputs)

editButton.addEventListener('click', function () {
	openModal(editPopup)
	editPopUpName.value = nameInput.textContent
	editPopUpDescription.value = jobInput.textContent
})
addButton.addEventListener('click', function () {
	openModal(addPopup)
})
addFormElement.addEventListener('submit', handleAddCard)
addPopupEventListener(editPopup)
addPopupEventListener(addPopup)
addPopupEventListener(imgPopup)
pageOn(initialCards)
export {
	cardTemplate,
	cards,
	editPopup,
	editButton,
	addButton,
	addPopup,
	imgPopup,
	nameInput,
	jobInput,
	addFormElement,
	editFormElement,
	editPopUpName,
	editPopUpDescription,
}
