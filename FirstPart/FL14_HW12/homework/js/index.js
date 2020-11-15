function visitLink(path) {
	let visitLinkObject = getItem('visitLink') || {}
	let pageVisit = visitLinkObject[path] || 0
	visitLinkObject[path] = ++pageVisit
	setItem('visitLink', visitLinkObject)
}


function viewResults() {
	let contentContainer = document.getElementById('content')
	let messageContainer = document.getElementById('messageContainer')
	if (messageContainer) {
		contentContainer.removeChild(messageContainer)
	}
	messageContainer = document.createElement('div')
	messageContainer.id = 'messageContainer'
	let message
	let visitLinkObject = getItem('visitLink')
	window.localStorage.clear()
	if (visitLinkObject) {
		message = document.createElement('ul')
		let arrayVisitedLinks = Object.entries(visitLinkObject)
		arrayVisitedLinks.forEach(([key, value]) => {
			let messageListItem = document.createElement('li')
			messageListItem.textContent = `You visited ${key} ${value} time(s)`
			message.appendChild(messageListItem)
		});
	}
	else {
		message = document.createElement('p')
		message.textContent = 'No pages were visited'
	}
	messageContainer.appendChild(message)
	contentContainer.appendChild(messageContainer)
}


function getItem(key) {
	if (window.localStorage.getItem(key) === null) {
		return null
	}
	return JSON.parse(window.localStorage.getItem(key))

}
function setItem(key, value) {
	window.localStorage.setItem(key, JSON.stringify(value))
}