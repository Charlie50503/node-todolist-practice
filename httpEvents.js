const { errorHandle, successHandle } = require('./utils')
const { todos } = require('./state')
const { v4: uuidv4 } = require('uuid')
const post = (res, body) => {
  console.log('post')
  const title = JSON.parse(body)?.title
  if (title !== undefined) {
    const todo = {
      title: title,
      id: uuidv4(),
    }
    todos.push(todo)
    const resBody = {
      status: 'success',
      data: todos,
    }
    successHandle(res, resBody)
  } else {
    errorHandle(res)
  }
}

const deleteAll = (res, body) => {
  todos.length = 0
  const resBody = {
    status: 'success',
    data: todos,
  }
  successHandle(res, resBody)
}

const deleteTodo = (res, body, req) => {
  console.log('deleteTodo')
  const targetId = req.url.split('/').pop()
  const targetIndex = todos.findIndex((el) => el.id === targetId)
  todos.splice(targetIndex, 1)

  const resBody = {
    status: 'success',
    data: todos,
  }
  successHandle(res, resBody)
}
const editTodo = (res, body, req) => {
  console.log('editTodo')
  const targetId = req.url.split('/').pop()
  const targetIndex = todos.findIndex((el) => el.id === targetId)
  const title = JSON.parse(body)?.title
  if (title !== undefined) {
    todos[targetIndex].title = title
    const resBody = {
      status: 'success',
      data: todos,
    }
    successHandle(res, resBody)
  } else {
    errorHandle(res)
  }
}

exports.post = post
exports.deleteTodo = deleteTodo
exports.deleteAll = deleteAll
exports.editTodo = editTodo
