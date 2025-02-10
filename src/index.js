import './pages/index.css'
import { initialCards } from './scripts/cards.js'
import { pageOn, handleAddCard } from './components/card.js'
import {
	openModal,
	handleFormSubmit,
	handleEventListener,
} from './components/modal.js'
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

editFormElement.addEventListener('submit', handleFormSubmit)

editButton.addEventListener('click', function () {
	openModal(editPopup)
})
addButton.addEventListener('click', function () {
	openModal(addPopup)
})
addFormElement.addEventListener('submit', handleAddCard)
handleEventListener(editPopup)
handleEventListener(addPopup)
handleEventListener(imgPopup)
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
