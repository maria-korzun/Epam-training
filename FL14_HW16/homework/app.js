const root = document.getElementById('root');
root.className = 'root_container'
let navigation = document.createElement('div')
navigation.className = 'navigation'
let contentView = document.createElement('div')
contentView.className = 'content_view'
root.appendChild(navigation)
root.appendChild(contentView)
let timeOfMessage = 200


window.onload = () => {
    updateNavigation()
    urlParse()
}

window.onpopstate = () => {
    updateNavigation()
    urlParse()
}

function urlParse() {
    let hash = window.location.hash.slice(1)
    if (hash === 'add') {
        addBook()
        return
    }

    if (hash === 'preview' || hash === 'edit') {
        let param = window.location.search.slice(1).split('&')
        let paramFormat = /^id=\d+$/
        let paramNameLength = 3
        if (param.length === 1 && paramFormat.test(param[0])) {
            param = param[0].slice(paramNameLength, param[0].length)
            let bookList = JSON.parse(window.localStorage.getItem('books'))
            let bookObject = bookList.find(element => {
                return parseInt(param) === element.id
            });
            if (bookObject) {
                switch (hash) {
                    case 'preview': {
                        previewBook(bookObject.id)
                        return
                    }
                    case 'edit': {
                        editBook(bookObject.id)
                        return
                    }
                    default: break
                }
            }
        }
    }
    toHomePage()
}

function toHomePage() {
    clearContainer(contentView)
}

function clearContainer(container) {
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild)
    }
}

function updateNavigation() {
    clearContainer(navigation)
    let bookList = getAllStorageBooks()
    bookList = bookList.map(element => {
        return [element.name, element.id]
    })
    bookList.forEach(element => {
        let bookName = document.createElement('span')
        bookName.textContent = element[0]
        bookName.onclick = () => {
            let url = `index.html?id=${element[1]}#preview`
            pushStateToHistory(url)
            urlParse()
        }
        let editButton = document.createElement('button')
        editButton.textContent = 'Edit'
        editButton.onclick = () => {
            let url = `index.html?id=${element[1]}#edit`
            pushStateToHistory(url)
            urlParse()
        }
        let bookNameEditButtonContainer = document.createElement('div')
        bookNameEditButtonContainer.appendChild(bookName)
        bookNameEditButtonContainer.appendChild(editButton)
        navigation.appendChild(bookNameEditButtonContainer)
    })
    let addButton = document.createElement('button')
    addButton.textContent = 'Add'
    addButton.onclick = () => {
        let url = `index.html#add`
        pushStateToHistory(url)
        urlParse()
    }
    navigation.appendChild(addButton)
}


function pushStateToHistory(url) {
    let state = {}
    let title = ''
    window.history.pushState(state, title, url)
}

function getStorageBookObject(id) {
    let bookList = JSON.parse(window.localStorage.getItem('books'))
    let book = bookList.find(element => {
        return element.id === id
    })
    return book
}

function getAllStorageBooks() {
    return JSON.parse(window.localStorage.getItem('books'))
}

function previewBook(id) {
    clearContainer(contentView)
    let book = getStorageBookObject(id)
    let bookName = document.createElement('h2')
    bookName.textContent = `${book.name}`
    let bookAuthor = document.createElement('p')
    bookAuthor.textContent = `${book.author}`
    let bookImage = document.createElement('img')
    bookImage.setAttribute('src', `${book.image}`)
    let bookPlot = document.createElement('p')
    bookPlot.textContent = `${book.plot}`
    contentView.appendChild(bookName)
    contentView.appendChild(bookAuthor)
    contentView.appendChild(bookImage)
    contentView.appendChild(bookPlot)
}

function createBookForm(action) {
    let form = document.createElement('form')
    form.id = 'form'
    let inputDataArray = [
        { input: {}, label: 'Name', id: 'name' },
        { input: {}, label: 'Author', id: 'author' },
        { input: {}, label: 'Image', id: 'image' },
        { input: {}, label: 'Plot', id: 'plot' }
    ]
    inputDataArray = inputDataArray.map((inputdataObject) => {
        inputdataObject.input = document.createElement('input')
        inputdataObject.input.setAttribute('type', 'text')
        inputdataObject.input.required = true
        inputdataObject.input.id = action + '_' + inputdataObject.id
        let textLabel = inputdataObject.label
        inputdataObject.label = document.createElement('label')
        inputdataObject.label.setAttribute('for', inputdataObject.input.id)
        inputdataObject.label.textContent = textLabel
        let inputLabelContainer = document.createElement('div')
        inputLabelContainer.appendChild(inputdataObject.label)
        inputLabelContainer.appendChild(inputdataObject.input)
        form.appendChild(inputLabelContainer)
        return inputdataObject
    })
    let saveButton = document.createElement('button')
    saveButton.type = 'submit'
    saveButton.textContent = 'Save'
    saveButton.setAttribute('form', 'form')

    let cancelButton = document.createElement('button')
    cancelButton.type = 'button'
    cancelButton.textContent = 'Cancel'
    cancelButton.onclick = () => {
        let modalWindowDiscardChanges = document.createElement('div')
        modalWindowDiscardChanges.className = 'modal_window'
        modalWindowDiscardChanges.id = 'modal_discard_window'

        let modalWindowDiscardChangesYes = document.createElement('button')
        modalWindowDiscardChangesYes.textContent = 'YES'

        modalWindowDiscardChangesYes.onclick = () => {
            window.history.back()
            modalWindowDiscardChanges.remove()
        }

        let modalWindowDiscardChangesNo = document.createElement('button')
        modalWindowDiscardChangesNo.textContent = 'NO'

        modalWindowDiscardChangesNo.onclick = () => {
            modalWindowDiscardChanges.remove()
        }

        modalWindowDiscardChanges.appendChild(modalWindowDiscardChangesYes)
        modalWindowDiscardChanges.appendChild(modalWindowDiscardChangesNo)
        contentView.appendChild(modalWindowDiscardChanges)
    }

    form.appendChild(saveButton)
    form.appendChild(cancelButton)
    return { form: form, inputDataArray: inputDataArray }
}


function updateLocalStorage(booksObject) {
    window.localStorage.setItem('books', JSON.stringify(booksObject))
}


function editBook(id) {
    clearContainer(contentView)
    let book = getStorageBookObject(id)
    let formObject = createBookForm('edit')
    let form = formObject.form
    let inputDataArray = formObject.inputDataArray

    inputDataArray.forEach((inputdataObject) => {
        inputdataObject.input.value = book[`${inputdataObject.id}`]
    })
    form.onsubmit = (e) => {
        e.preventDefault()
        let booksArray = getAllStorageBooks()
        let book = booksArray.find(book => {
            return book.id === id
        })

        inputDataArray.forEach(element => {
            book[element.id] = element.input.value
        })
        updateLocalStorage(booksArray)
        let url = `index.html?id=${id}#preview`
        pushStateToHistory(url)
        setTimeout(() => {
            alert('Book successfully updated')
        }, timeOfMessage)
        updateNavigation()
        urlParse()
    }
    contentView.appendChild(form)
}

function addBook() {
    clearContainer(contentView)
    let formObject = createBookForm('add')
    let form = formObject.form
    let inputDataArray = formObject.inputDataArray

    form.onsubmit = (e) => {
        e.preventDefault()
        let booksArray = getAllStorageBooks()
        let idOfNewBook = booksArray[booksArray.length - 1].id + 1
        let newBookObject = { id: idOfNewBook }
        inputDataArray.forEach(element => {
            newBookObject[element.id] = element.input.value
        })
        booksArray.push(newBookObject)
        updateLocalStorage(booksArray)

        let url = `index.html?id=${newBookObject.id}#preview`
        pushStateToHistory(url)
        setTimeout(() => {
            alert('Book successfully added')
        }, timeOfMessage)
        updateNavigation()
        urlParse()
    }
    contentView.appendChild(form)
}

