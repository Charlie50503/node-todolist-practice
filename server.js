const http = require('http')
const { todos } = require('./state')
const { editTodo, deleteTodo, deleteAll, post } = require('./httpEvents')
const { errorHandle, successHandle, reqTryCatch } = require('./utils')

const headers = {
  'Access-Control-Allow-Headers':
    'Content-Type, Authorization, Content-Length, X-Requested-With',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
  'Content-Type': 'application/json',
}

const requestListener = (req, res) => {
  let body = ''
  //必須要加
  req.on('data', (chuck) => {
    console.log('data')
    body += chuck
  })

  if (req.url === '/todos' && req.method === 'GET') {
    req.on('end', () => {
      const resBody = {
        status: 'success',
        data: todos,
      }
      successHandle(res, resBody)
    })
  } else if (req.url === '/todos' && req.method === 'POST') {
    req.on('end', () => {
      console.log('end')
      reqTryCatch(res, body, post)
    })
  } else if (req.url.startsWith('/todos/') && req.method === 'PATCH') {
    req.on('end', () => {
      reqTryCatch(res, body, editTodo, req)
    })
  } else if (req.url === '/todos' && req.method === 'DELETE') {
    req.on('end', () => {
      reqTryCatch(res, body, deleteAll)
    })
  } else if (req.url.startsWith('/todos/') && req.method === 'DELETE') {
    console.log('delete one')
    req.on('end', () => {
      reqTryCatch(res, body, deleteTodo, req)
    })
  } else if (req.url === '/todos' && req.method === 'OPTIONS') {
    res.writeHead(200, headers)
    res.end()
  } else {
    errorHandle(res)
  }
}

// console.log = function () {}

http.createServer(requestListener).listen(3005)
