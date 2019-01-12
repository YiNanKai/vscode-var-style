/**
 * 返回字符串打散后的小写字符数组
 * @param {string} text 
 * @return {Array}
 */
function getTextArray (text) {
	const style = getStyle(text)
	if(style === 'php') {
		return text.split('_')
	} else if(style === 'camel') {
		return text.replace(/([A-Z])/g, '_$1').toLowerCase().split('_')
	} else if(style === 'pascal') {
		return text.replace(/([A-Z])/g, '_$1').toLowerCase().split('_').slice(1)
	} else if(style === 'constant') {
		return text.split('_').map((item) => item.toLowerCase())
	} else {
		return [text]
	}
	
}
function getStyle (text) {
	if(isCamel(text)) {
		return 'camel'
	} else if(isPascal(text)) {
		return 'pascal'
	} else if(isPhp(text)) {
		return 'php'
	} else if(isConstant(text)) {
		return 'constant'
	} else {
		return 'unknown'
	}
}
function isCamel(text) {
  return text[0] === text[0].toLowerCase() && text !== text.toLowerCase()
}

function isPascal(text){
  return text[0] === text[0].toUpperCase() && !text.includes('_')
}

function isPhp (text) {
  return text[0] === text[0].toLowerCase() && text.includes('_')
}

function isConstant(text) {
  return text[0] === text[0].toUpperCase() && text.includes('_')
}
/**
 * 转为驼峰式命名 textStyle
 * @param {string} text 
 */
function toCamelCase (text) {
	if(isCamel(text)) {
		return text
	} else {
		return getTextArray(text).map((item, i) => {
			if(i>0){
				item = item[0].toUpperCase() + item.substr(1)
				return item
			} else {
				return item
			}
		}).join('')
	}

}

/**
 * 转为帕斯卡命名  TextStyle
 * @param {string} text 
 */
function toPascal (text) {
  if(isPascal(text)) {
		return text
	} else {
		return getTextArray(text).map((item, i) => {
			item = item[0].toUpperCase() + item.substr(1)
			return item
		}).join('')
	}
}

/**
 * 转为php风格命名  text_style
 * @param {string} text 
 */
function toPhp (text) {
	if(isPhp(text)) {
		return text
	} else {
		return getTextArray(text).join('_')
	}
}

/**
 * 转为常量式命名 TEXT_STYLE
 * @param {string} text 
 */
function toConstant (text) {
	if(isConstant(text)) {
		return text
	} else {
		return getTextArray(text).join('_').toUpperCase()
	}
}
// console.log(toCamelCase('it_is_awesome'))

console.log(toPascal('it_is_awesome'))
console.log(toCamelCase('it_is_awesome'))
console.log(toPhp('it_is_awesome'))
console.log(toConstant('it_is_awesome'))


console.log(toPascal('it'))
console.log(toCamelCase('it'))
console.log(toPhp('it'))
console.log(toConstant('it'))

console.log(toPascal('ItIsAwesome'))
console.log(toCamelCase('ItIsAwesome'))
console.log(toPhp('ItIsAwesome'))
console.log(toConstant('ItIsAwesome'))

console.log(toPascal('IT_IS_AWESOME'))
console.log(toCamelCase('IT_IS_AWESOME'))
console.log(toPhp('IT_IS_AWESOME'))
console.log(toConstant('IT_IS_AWESOME'))

// unknown
console.log(toPascal('mixed_styleText'))
console.log(toCamelCase('mixed_styleText'))
console.log(toPhp('mixed_styleText'))
console.log(toConstant('mixed_styleText'))
