const data = [
  {
    'folder': true,
    'title': 'Grow',
    'children': [
      {
        'title': 'logo.png'
      },
      {
        'folder': true,
        'title': 'English',
        'children': [
          {
            'title': 'Present_Perfect.txt'
          }
        ]
      }
    ]
  },
  {
    'folder': true,
    'title': 'Soft',
    'children': [
      {
        'folder': true,
        'title': 'NVIDIA',
        'children': null
      },
      {
        'title': 'nvm-setup.exe'
      },
      {
        'title': 'node.exe'
      }
    ]
  },
  {
    'folder': true,
    'title': 'Doc',
    'children': [
      {
        'title': 'project_info.txt'
      }
    ]
  },
  {
    'title': 'credentials.txt'
  }
];

let dataCopy = data.slice()


class Folder {
  constructor(jsObject, domObject, children = []) {
    this.domObject = domObject
    this.jsObject = jsObject
    this.children = children
  }
}

class MyFile {
  constructor(jsfile, domObject) {
    this.jsObject = jsfile
    this.domObject = domObject
  }
}

let currentTarget
let initialKey = []
const rootNode = document.getElementById('root');
let children = createFolderStructure(dataCopy, initialKey)
rootNode.appendChild(children.childrenContainer)
let rootFolder = new Folder(dataCopy, rootNode, children.childrenArray)

console.log(rootFolder)

let customContextMenu = document.createElement('div')
let renameButton = document.createElement('button')
renameButton.className = 'custom_context_menu_button'
renameButton.textContent = 'Rename'
renameButton.onclick = () => {
  let title = currentTarget.getElementsByTagName('input')[0]
  title.removeAttribute("disabled")
  title.setAttribute('outline', 'initial')
  if (title.value.match(/.*\..*/)) {
    title.focus()
    title.setSelectionRange(0, title.value.search(/\./))
  }else {
    title.select()
  }

}
let deleteButton = document.createElement('button')
deleteButton.className = 'custom_context_menu_button'
deleteButton.textContent = 'Delete item'
deleteButton.onclick = () => {
  let key = currentTarget.id.split('_')
  remove(key, dataCopy)
  updateStructure()
}

customContextMenu.appendChild(renameButton)
customContextMenu.appendChild(deleteButton)

document.body.appendChild(customContextMenu)
customContextMenu.className = 'custom_context_menu'
customContextMenu.style.display = 'none'
customContextMenu.style.position = 'absolute'

for (let i = 0; i < customContextMenu.children.length; i++) {
  customContextMenu.children[i].disabled = true
}



window.oncontextmenu = (e) => {
  e.preventDefault()
  customContextMenu.style.left = `${e.pageX}px`
  customContextMenu.style.top = `${e.pageY}px`
  customContextMenu.style.display = 'block'
}
window.onclick = (e) => {
  if (e.target !== customContextMenu) {
    customContextMenu.style.display = 'none'
  }

  let titleCollection = document.getElementsByClassName('title')
  if (e.target !== renameButton || e.target !== customContextMenu) {
    for (let i = 0; i < titleCollection.length; i++) {
      titleCollection[i].setAttribute('disabled', 'disabled')
    }

  }
}


function createFolderStructure(arrayOfChildren, key) {
  let count = 0
  let newChildrenArray = arrayOfChildren.map(jsObject => {
    let keyLoop = key.slice()
    keyLoop.push(`${count++}`)
    if (jsObject.folder) {
      let folder = createFolfer(jsObject, keyLoop)
      return folder
    }else {
      let domObject = createDomElements(false, jsObject.title, keyLoop)
      let file = new MyFile(jsObject, domObject)
      return file
    }

  })
  let childrenContainer = document.createElement('div')
  newChildrenArray.forEach(element => {
    childrenContainer.appendChild(element.domObject)
    let iconTitle = element.domObject.firstChild
    if (element.jsObject.folder) {
      iconTitle.onclick = () => {
        iconTitle.nextSibling.classList.toggle("display_none");

      }
    }

    iconTitle.oncontextmenu = (e) => {
      for (let i = 0; i < customContextMenu.children.length; i++) {
        customContextMenu.children[i].disabled = false
      }
      let element = e.target
      while (!element.id) {
        element = element.parentElement
      }
      currentTarget = element
      return false
    }
  })
  return { childrenContainer: childrenContainer, childrenArray: newChildrenArray }
}
function updateStructure() {
  while (rootNode.hasChildNodes()) {
    rootNode.removeChild(rootNode.firstChild);
  }
  children = createFolderStructure(dataCopy, initialKey)
  rootNode.appendChild(children.childrenContainer)
  rootFolder = new Folder(dataCopy, rootNode, initialKey, children.childrenArray)
}

function remove(key, array) {
  if (key.length === 1) {
    array.splice(key[0], 1)
    return
  }
  array = array[key[0]].children
  key = key.slice(1)
  return remove(key, array)
}


function createDomElements(folder, titleText, key) {
  let keyLoopString = key.join('_')
  let title = document.createElement('input')
  title.setAttribute('value', `${titleText}`)
  title.setAttribute("disabled", "disabled");
  let icon = document.createElement('span')
  icon.classList = 'material-icons icon'
  title.className = 'title'
  icon.textContent = folder ? 'folder' : 'insert_drive_file'
  let iconTitleContainer = document.createElement('div')
  iconTitleContainer.appendChild(icon)
  iconTitleContainer.appendChild(title)
  iconTitleContainer.className = 'icon_title_container'
  iconTitleContainer.id = keyLoopString
  let describtion = document.createElement('div')
  describtion.className = 'container_element'
  describtion.appendChild(iconTitleContainer)

  return describtion
}


function createFolfer(jsObject, keyLoop) {
  let folder
  let domObject = createDomElements(true, jsObject.title, keyLoop)
  if (jsObject.children === null || jsObject.children.length === 0) {
    folder = new Folder(jsObject, domObject)
    let emptyDiv = document.createElement('div')
    emptyDiv.textContent = 'Folder is empty'
    domObject.appendChild(emptyDiv)
  }else {
    let children = createFolderStructure(jsObject.children, keyLoop)
    let childrenArray = children.childrenArray
    let childrenContainer = children.childrenContainer
    domObject.appendChild(childrenContainer)
    folder = new Folder(jsObject, domObject, childrenArray)
  }
  return folder
}