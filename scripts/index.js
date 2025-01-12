// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content
// @todo: DOM узлы
const cards = document.querySelector('.places__list')
// @todo: Функция создания карточки

function createCard(data, removeCb) {
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

	return cardElement
}
// @todo: Функция удаления карточки
function deleteCard(item) {
	item.remove()
}

// @todo: Вывести карточки на страницу
function pageOn(cardsBlock) {
	const cardNode = cardsBlock.map((item) => createCard(item, deleteCard))
	cards.append(...cardNode)
}
pageOn(initialCards)
