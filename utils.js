const headers = {
  'Access-Control-Allow-Headers':
    'Content-Type, Authorization, Content-Length, X-Requested-With',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
  'Content-Type': 'application/json',
}
const data = {
  status: false,
  message: '程式出錯',
}

const errorHandle = (res) => {
  res.writeHead(404, headers)
  res.write(JSON.stringify(data))
  res.end()
}

const successHandle = (res, body) => {
  res.writeHead(200, headers)
  res.write(JSON.stringify(body))
  res.end()
}

const reqTryCatch = (res, body, fn, req) => {
  try {
    console.log('reqTryCatch')
    fn(res, body, req)
  } catch (error) {
    errorHandle(res)
  }
}

exports.errorHandle = errorHandle
exports.successHandle = successHandle
exports.reqTryCatch = reqTryCatch
