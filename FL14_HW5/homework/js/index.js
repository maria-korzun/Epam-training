let users

function initialRenderUsers() {
    let allUsersContainer = document.getElementById('container')

    users.forEach(user => {

        let usercontainer = document.createElement('div')
        usercontainer.className = 'user_conntainer'
        usercontainer.id = user.id
        usercontainer.style.margin = '50px'

        renderUserContainer(usercontainer, user)

        allUsersContainer.appendChild(usercontainer)

    })
}

window.onload = getUsers

function getUsers() {

    performRequest('GET', '/users').then(body => {
        users = body
        initialRenderUsers()
    }).catch(error => {
        alert(error)
    })
}

function createEditableContainerElement(usercontainer, content, labelText, userClass) {

    let editableField = document.createElement('div')
    editableField.contentEditable = 'false'
    editableField.className = userClass
    editableField.textContent = content
    let editableFieldLabel = document.createElement('div')
    editableFieldLabel.className = 'label'
    editableFieldLabel.textContent = labelText

    let line = document.createElement('div')

    line.appendChild(editableFieldLabel)
    line.appendChild(editableField)

    usercontainer.appendChild(line)

    return editableField
}

function renderUserContainer(usercontainer, user) {

    while (usercontainer.hasChildNodes()) {
        usercontainer.firstChild.remove()
    }

    let userName = createEditableContainerElement(usercontainer, user.name, 'Name: ', 'user_name_input')
    userName.onclick = () => {
        getUserPostsAndComments(usercontainer, user)
    }

    let nickname = createEditableContainerElement(usercontainer, user.username, 'User Name: ', 'nickname_input')
    let email = createEditableContainerElement(usercontainer, user.email, 'Email: ', 'email_input')
    let phone = createEditableContainerElement(usercontainer, user.phone, 'Phone: ', 'phone_input')

    let address = document.createElement('p')
    address.textContent = `Address: ${user.address.city} ${user.address.street} ${user.address.suite}`
    usercontainer.appendChild(address)

    let company = document.createElement('p')
    company.textContent = `Company: ${user.company.name}`
    usercontainer.appendChild(company)

    let website = document.createElement('p')
    website.textContent = `Company: ${user.website}`
    usercontainer.appendChild(website)

    let editButton = document.createElement('button')
    editButton.textContent = 'Edit'
    editButton.onclick = () => {
        if (userName.contentEditable === 'false') {
            userName.onclick = null
            userName.contentEditable = 'true'
            nickname.contentEditable = 'true'
            email.contentEditable = 'true'
            phone.contentEditable = 'true'
        } else {
            editUser(usercontainer, user)
        }
    }
    usercontainer.appendChild(editButton)

    let deleteButton = document.createElement('button')
    deleteButton.textContent = 'Delete'
    deleteButton.onclick = () => {
        deleteUser(usercontainer, user)
    }
    usercontainer.appendChild(deleteButton)
}

function editUser(usercontainer, editUser) {
    let newUserName = usercontainer.getElementsByClassName('user_name_input')[0].textContent
    let newNickname = usercontainer.getElementsByClassName('nickname_input')[0].textContent
    let newEmail = usercontainer.getElementsByClassName('email_input')[0].textContent
    let newPhone = usercontainer.getElementsByClassName('phone_input')[0].textContent

    editUser.name = newUserName
    editUser.username = newNickname
    editUser.email = newEmail
    editUser.phone = newPhone

    performRequest('PUT', `/users/${editUser.id}`, editUser).then(user => {
        let userIndex = users.indexOf(editUser)
        users[userIndex] = user
        renderUserContainer(usercontainer, user)

    }).catch(error => {
        alert(error)
    })
}

function deleteUser(usercontainer, deletedUser) {

    performRequest('DELETE', `/users/${deletedUser.id}`, deletedUser).then(() => {
        let userIndex = users.indexOf(deletedUser)
        users.splice(userIndex, 1)
        usercontainer.remove()
    }).catch(error => {
        alert(error)
    })

}


function getUserPostsAndComments(usercontainer, user) {
    let allPosts = null
    let allComments = null
    performRequest('GET', '/posts').then(posts => {
        allPosts = posts
        if (allComments) {
            renderPostsandComments(allComments, allPosts, usercontainer, user)
        }
    }).catch(error => {
        alert(error)
    })

    performRequest('GET', '/comments').then(comments => {
        allComments = comments
        if (allPosts) {
            renderPostsandComments(allComments, allPosts, usercontainer, user)
        }
    }).catch(error => {
        alert(error)
    })
}

function renderPostsandComments(allComments, allPosts, usercontainer, user) {
    let userPosts = allPosts.filter(post => post.userId === user.id)
    userPosts.forEach(userPost => {
        let postAndCommentsContainer = document.createElement('div')
        postAndCommentsContainer.className = 'post_comments_container'
        let postContainer = document.createElement('div')
        postContainer.className = 'post'
        let postTitle = document.createElement('p')
        postTitle.textContent = userPost.title
        let postBody = document.createElement('p')
        postBody.textContent = userPost.body
        postContainer.appendChild(postTitle)
        postContainer.appendChild(postBody)
        postAndCommentsContainer.appendChild(postContainer)

        let postComments = allComments.filter(comment => comment.postId === userPost.userId)
        postComments.forEach(comment => {
            let commentContainer = document.createElement('div')
            commentContainer.className = 'comment'

            let commentName = document.createElement('p')
            commentName.textContent = comment.name
            let commentEmail = document.createElement('p')
            commentEmail.textContent = comment.email
            let commentBody = document.createElement('p')
            commentBody.textContent = comment.body

            commentContainer.appendChild(commentName)
            commentContainer.appendChild(commentEmail)
            commentContainer.appendChild(commentBody)


            postAndCommentsContainer.appendChild(commentContainer)

        })
        usercontainer.appendChild(postAndCommentsContainer)
    })
}

function performRequest(method, path, body = null) {

    let spinner = document.createElement('div')
    spinner.className = 'spinner'
    spinner.animate({
        transform: ['rotate(0deg)', 'rotate(360deg)']
    }, {
        duration: 2000,
        iterations: Infinity,
        easing: 'linear'
    })
    document.getElementsByTagName('body')[0].appendChild(spinner)

    const server = new URL('https://jsonplaceholder.typicode.com/')
    server.pathname = path
    let fetchOption = {
        method: method
    }
    if (method === 'PUT' || method === 'DELETE') {
        fetchOption.headers = {
            'Content-type': 'application/json; charset=UTF-8'
        }
        fetchOption.body = JSON.stringify(body)
    }

    return fetch(server.href, fetchOption
    ).then(response => {
        spinner.remove()
        return response.json()
    }).catch(error => {
        spinner.remove()
        alert(error)
    })
}