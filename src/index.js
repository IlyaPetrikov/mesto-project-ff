import './pages/index.css'
import {
	enableValidation,
	config,
	resetInput,
} from './components/validation.js'
import {
	openModal,
	closeModal,
	addPopupEventListener,
} from './components/modal.js'
import { createCard, deleteCard, handleLike } from './components/card.js'
import {
	getProfileData,
	getCards,
	saveNewProfile,
	addNewCard,
	newAvatar,
} from './components/api.js'
const cardTemplate = document.querySelector('#card-template').content
const cards = document.querySelector('.places__list')
const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')
const editPopup = document.querySelector('.popup_type_edit')
const addPopup = document.querySelector('.popup_type_new-card')
const imgPopup = document.querySelector('.popup_type_image')

const addFormElement = document.forms.newPlace
const editFormElement = document.forms.editProfile
const editPopUpName = document.querySelector('.popup__input_type_name')
const editPopUpDescription = document.querySelector(
	'.popup__input_type_description'
)
const addPopUpName = document.querySelector('.popup__input_type_card-name')
const addPopUpLink = document.querySelector('.popup__input_type_url')
const addPopupForm = document.querySelector('.popup__form_add')
const editPopupForm = document.querySelector('.popup__form_edit')
const popupButton = document.querySelector('.popup__button')
const nameInput = document.querySelector('.profile__title')
const jobInput = document.querySelector('.profile__description')

const avatarProfileButton = document.querySelector('.profile__image')
const avatarImage = document.querySelector('.profile__image')
const avatarPopup = document.querySelector('.popup_type_avatar')
const avatarSubmitButton = document.querySelector('.popup__form_avatar')
const avatarInput = document.querySelector('.popup__input_avatar')

function updateAvatar(data) {
	nameInput.textContent = data.name
	jobInput.textContent = data.about
	avatarImage.style.backgroundImage = `url(${data.avatar})`
}

function loadingRender(loading, submitButton) {
	submitButton.textContent = loading ? 'Сохранение...' : 'Сохранить'
}

function changeAvatar(evt) {
	evt.preventDefault()

	loadingRender(true, popupButton)

	newAvatar(avatarInput.value)
		.then((data) => {
			avatarProfileButton.style.backgroundImage = `url(${data.avatar})`
			closeModal(avatarPopup)
		})
		.catch((err) => {
			console.log(`Ошибка:${err}`)
		})
		.finally(() => {
			loadingRender(false, popupButton)
		})
}

function handleAddCard(evt) {
	evt.preventDefault()

	loadingRender(true, popupButton)

	addNewCard(addPopUpName.value, addPopUpLink.value)
		.then((data) => {
			addPopUpName.value = data.name
			addPopUpLink.value = data.link
			const newCard = createCard(
				data,
				deleteCard,
				handleLike,
				openImgPopup,
				data.owner._id
			)

			cards.prepend(newCard)

			closeModal(addPopup)

			addFormElement.reset()

			resetInput(addPopupForm, config)
		})
		.catch((err) => {
			console.log(`Ошибка:${err}`)
		})
		.finally(() => {
			loadingRender(false, popupButton)
		})
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

	loadingRender(true, popupButton)

	nameInput.textContent = editPopUpName.value
	jobInput.textContent = editPopUpDescription.value

	saveNewProfile(editPopUpName.value, editPopUpDescription.value)
		.then((data) => {
			editPopUpName.textContent = data.name
			editPopUpDescription.textContent = data.about
			closeModal(editPopup)
		})
		.catch((err) => {
			console.log(`Ошибка:${err}`)
		})
		.finally(() => {
			loadingRender(false, popupButton)
		})
}

editFormElement.addEventListener('submit', typeEditPopupInputs)

editButton.addEventListener('click', function () {
	openModal(editPopup)
	editPopUpName.value = nameInput.textContent
	editPopUpDescription.value = jobInput.textContent

	resetInput(editPopupForm, config)
})

avatarProfileButton.addEventListener('click', function () {
	openModal(avatarPopup)
})

addButton.addEventListener('click', function () {
	openModal(addPopup)
})

addFormElement.addEventListener('submit', handleAddCard)

avatarSubmitButton.addEventListener('submit', changeAvatar)

addPopupEventListener(editPopup)
addPopupEventListener(addPopup)
addPopupEventListener(imgPopup)
addPopupEventListener(avatarPopup)
enableValidation(config)

Promise.all([getProfileData(), getCards()])
	.then(([userData, cardData]) => {
		updateAvatar(userData)

		cardData.forEach((card) => {
			const RenderData = createCard(
				card,
				deleteCard,
				handleLike,
				openImgPopup,
				userData._id
			)
			cards.append(RenderData)
		})
	})
	.catch((err) => {
		console.log(`Ошибка:${err}`)
	})

export { cardTemplate }
