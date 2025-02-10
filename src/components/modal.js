import {
	addPopup,
	editPopup,
	imgPopup,
	nameInput,
	editPopUpName,
	jobInput,
	editPopUpDescription,
} from '../index.js'

const handleEscKeyUp = (e) => {
	if (e.key === 'Escape') {
		const popup = document.querySelector('.popup_is-opened')
		closeModal(popup)
	}
}

const openModal = (modal) => {
	modal.classList.add('popup_is-opened')
	document.addEventListener('keydown', handleEscKeyUp)
	editPopUpName.value = nameInput.textContent
	editPopUpDescription.value = jobInput.textContent
}

const closeModal = (modal) => {
	modal.classList.remove('popup_is-opened')
	document.removeEventListener('keydown', handleEscKeyUp)
}

const handleEventListener = (elementOfPopup) => {
	const closeButton = elementOfPopup.querySelector('.popup__close')
	closeButton.addEventListener('click', () => {
		closeModal(elementOfPopup)
	})
	elementOfPopup.addEventListener('mousedown', (event) => {
		if (event.target.classList.contains('popup')) {
			closeModal(elementOfPopup)
		}
	})
}

function openImgPopup(ImageLink, ImageName) {
	const CardImagePopup = document.querySelector('.popup__image')
	const popupImageTitle = document.querySelector('.popup__caption')

	CardImagePopup.src = ImageLink
	CardImagePopup.alt = ImageName
	popupImageTitle.textContent = ImageName

	openModal(imgPopup)
}

function handleFormSubmit(evt) {
	evt.preventDefault()
	const editPopUpName = editPopup.querySelector('.popup__input_type_name')
	const editPopUpDescription = editPopup.querySelector(
		'.popup__input_type_description'
	)
	nameInput.textContent = editPopUpName.value
	jobInput.textContent = editPopUpDescription.value
	closeModal(editPopup)
}
export {
	openModal,
	openImgPopup,
	closeModal,
	addPopup,
	handleFormSubmit,
	handleEventListener,
}
