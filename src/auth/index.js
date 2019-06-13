const User = require('../models/user')

authenticate = (username, currentToken) => {
  return new Promise(resolve => {
    User.findOne({ username }).then(result => {
      try {
        const { token } = result
        if (token === currentToken && token != '') {
          resolve(true)
        } else {
          resolve(false)
        }
      } catch {
        resolve(false)
      }
    })
  })
}

module.exports = authenticate
