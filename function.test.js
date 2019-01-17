const util = require('./function')

/**
 * // unknown
console.log(toPascal('mixed_styleText'))
console.log(toCamelCase('mixed_styleText'))
console.log(toPhp('mixed_styleText'))
console.log(toConstant('mixed_styleText'))
 */

const testArr = [
  {
    origin: 'it_is_awesome',
    camel: 'itIsAwesome',
    php: 'it_is_awesome',
    constant: 'IT_IS_AWESOME',
    pascal: 'ItIsAwesome',
    kebab: 'it-is-awesome'
  },
  {
    origin: 'it',
    camel: 'it',
    php: 'it',
    constant: 'IT',
    pascal: 'It',
    kebab: 'it'
  },
  {
    origin: 'ItIsAwesome',
    camel: 'itIsAwesome',
    php: 'it_is_awesome',
    constant: 'IT_IS_AWESOME',
    pascal: 'ItIsAwesome',
    kebab: 'it-is-awesome'
  }
]
test('Test Transform', () => {
  testArr.forEach((item) => {
    expect(util.toCamelCase(item.origin)).toBe(item.camel)
    expect(util.toConstant(item.origin)).toBe(item.constant)
    expect(util.toPascal(item.origin)).toBe(item.pascal)
    expect(util.toPhp(item.origin)).toBe(item.php)
    expect(util.toKebab(item.origin)).toBe(item.kebab)
  })
})
