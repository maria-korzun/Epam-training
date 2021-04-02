
const $list = $(".list");
const $addInput = $("#add-input");
const $add = $("#add-submit");
const $search = $("#search-submit");
const $searchInput = $("#search-input");



const todos = [
  {
    text: "Buy milk",
    done: false,
    id: 0
  },
  {
    text: "Play with dog",
    done: true,
    id: 1
  }
];
(function ($) {

  $.fn.renderList = function () {
    let todos = getTasksFromLocalStorage()
    this.empty()

    todos.forEach(task => {

      let title = $("<span/>")
      if (task.done) { title.addClass("done") }
      title.addClass("item-text").text(`${task.text}`).click(function () {
        let todoList = getTasksFromLocalStorage()
        let todoElement = todoList.find(element => element.id === task.id)
        if (todoElement.done) {
          todoElement.done = false
          $(this).removeClass('done')
        } else {
          todoElement.done = true
          $(this).addClass('done')
        }
        updateLocalStorage(todoList)
      })

      let removeButton = $("<button/>")
      removeButton.addClass("item-remove").text('Remove').click(function () {
        let todosList = getTasksFromLocalStorage()
        todosList.splice(todosList.findIndex(element => element.id === task.id), 1)
        updateLocalStorage(todosList)
        $(this).parent().remove()
      })

      let listToDo = $("<li/>")
      listToDo.addClass("item").append(title).append(removeButton)

      this.append(listToDo)
    });
    return this
  }

}(jQuery));


function checkLocalStorage() {
  if (!window.localStorage.getItem('todos')) { updateLocalStorage(todos) }
}

function updateLocalStorage(todo) {
  window.localStorage.setItem('todos', JSON.stringify(todo))
}

function getTasksFromLocalStorage() {
  return JSON.parse(window.localStorage.getItem('todos'))
}


checkLocalStorage()
$list.renderList()

$add.click(function (event) {
  event.preventDefault()
  let todosList = getTasksFromLocalStorage()
  let newToDo = {}
  newToDo.text = $addInput.val()
  newToDo.done = false
  newToDo.id = todosList[todosList.length - 1].id + 1
  todosList.push(newToDo)
  updateLocalStorage(todosList)
  $list.renderList()
  $addInput.val('')
})

$search.click(function (event) {
  event.preventDefault()
  let searchedTodoText = $searchInput.val()
  let element = $(`span:contains(${searchedTodoText})`)
  let offset = element.offset().top
  $("html").scrollTop(offset)
  let parent = element.parent()
  parent.addClass('search-bg-color')
  setTimeout(() => { parent.removeClass('search-bg-color') }, 1500)
  $searchInput.val('')
})

