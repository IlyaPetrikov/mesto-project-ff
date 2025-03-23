const handleEscKeyUp = (e) => {
	if (e.key === 'Escape') {
		const popup = document.querySelector('.popup_is-opened')
		closeModal(popup)
	}
}

const openModal = (modal) => {
	modal.classList.add('popup_is-opened')
	document.addEventListener('keydown', handleEscKeyUp)
}

const closeModal = (modal) => {
	modal.classList.remove('popup_is-opened')
	document.removeEventListener('keydown', handleEscKeyUp)
}

const addPopupEventListener = (elementOfPopup) => {
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

export { openModal, closeModal, addPopupEventListener }
