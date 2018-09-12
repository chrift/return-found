const lodashSome = require('lodash.some')

// const asyncSome = require('async.someLimit')

/**
 *
 * @param {Array|Object} collection
 * @param {Function} predicate
 * @returns {*} returns the response from predicate - undefined if no match found
 */
function returnFirst (collection, predicate) {
  let response

  lodashSome(collection, (value, key) => {
    const outcome = predicate(value, key)

    if (outcome) {
      response = outcome

      return true
    }
  })

  return response
}

returnFirst.recursive = function (collection, predicate) {
  return this(collection, (value, key) => {
    const outcome = predicate(value, key)

    if (outcome) {
      return outcome
    }

    if (value && typeof value === 'object') {
      return this.recursive(value, predicate)
    }
  })
}

// returnFirst.async = async function (collection, limit, predicate) {
//   let response
//
//   if (!predicate && typeof limit === 'function') {
//     predicate = limit
//     limit = null
//   }
//
//   asyncSome(collection, limit, async (value, key) => {
//     const outcome = await predicate(value, key)
//
//     if (outcome) {
//       response = outcome
//
//       return true
//     }
//   })
//
//   return response
// }

module.exports = returnFirst
