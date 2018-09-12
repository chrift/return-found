const Lab = require('lab')
const Code = require('code')

const lab = exports.lab = Lab.script()

const { describe, it } = lab
const { expect } = Code

const returnFirst = require('../')

describe('Return first', () => {
  it('should take an object and return a matching value', () => {
    const expectedResultKey = 'cheese'
    const expectedResult = 'biscuits'

    const collection = {
      pine: 'apple',
      [expectedResultKey]: expectedResult
    }

    const result = returnFirst(collection, (value, key) => {
      if (key === expectedResultKey) {
        return value
      }
    })

    expect(result).to.equal(expectedResult)
  })

  it('should take an object and return a mutated string', () => {
    const expectedResultKey = 'cheese'
    const expectedResultOriginal = 'biscuits'
    const expectedResult = 'biscuits123'

    const collection = {
      pine: 'apple',
      [expectedResultKey]: expectedResultOriginal
    }

    const result = returnFirst(collection, (value, key) => {
      if (key === expectedResultKey) {
        return value + '123'
      }
    })

    expect(result).to.equal(expectedResult)
  })

  it('should take an array and return a new object', () => {
    const matchingItem = 'cheese'

    const collection = [
      matchingItem,
      'biscuits',
      'pine',
      'apple'
    ]

    const expectedResult = {
      key: 0,
      stringValue: matchingItem,
      stringLength: matchingItem.length
    }

    const result = returnFirst(collection, (value, key) => {
      if (value === matchingItem) {
        return {
          key,
          stringValue: value,
          stringLength: value.length
        }
      }
    })

    expect(result).to.equal(expectedResult)
  })

  it('should take a multivariate array and return a matching value', () => {
    const matchingItem = 'cheese'

    const collection = [
      [
        'foo',
        'bar',
        [
          matchingItem
        ]
      ],
      'biscuits',
      'pine',
      'apple'
    ]

    const expectedResult = {
      key: 0,
      stringValue: matchingItem,
      stringLength: matchingItem.length
    }

    const result = returnFirst.recursive(collection, (value, key) => {
      if (value === matchingItem) {
        return {
          key,
          stringValue: value,
          stringLength: value.length
        }
      }
    })

    expect(result).to.equal(expectedResult)
  })

  it('should take an object of objects and return a new object based on a nested value', () => {
    const matchingItem = 'cheese'

    const collection = {
      'objectValues': [
        [
          'foo',
          'bar',
          [
            matchingItem
          ]
        ],
        'biscuits',
        'pine',
        'apple'
      ]
    }

    const expectedResult = {
      key: 0,
      stringValue: matchingItem,
      stringLength: matchingItem.length
    }

    const result = returnFirst.recursive(collection, (value, key) => {
      if (value === matchingItem) {
        return {
          key,
          stringValue: value,
          stringLength: value.length
        }
      }
    })

    expect(result).to.equal(expectedResult)
  })

  // it('should take an object of objects and return a value from an asynchronous function', async () => {
  //   const matchingItem = 'cheese'
  //
  //   const collection = {
  //     'objectValues': [
  //       [
  //         'foo',
  //         'bar',
  //         [
  //           matchingItem
  //         ]
  //       ],
  //       'biscuits',
  //       'pine',
  //       'apple'
  //     ]
  //   }
  //
  //   const expectedResult = {
  //     key: 0,
  //     stringValue: matchingItem,
  //     stringLength: matchingItem.length
  //   }
  //
  //   const result = await returnFirst.async(collection, async (value, key) => {
  //     if (value === matchingItem) {
  //       return new Promise(resolve => resolve({
  //         key,
  //         stringValue: value,
  //         stringLength: value.length
  //       }))
  //     }
  //   })
  //
  //   expect(result).to.equal(expectedResult)
  // })
})
