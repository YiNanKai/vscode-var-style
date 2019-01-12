// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode')

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "var-style" is now active!')

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable1 = vscode.commands.registerCommand(
    'extension.camelStyle',
    function() {
			const editor = vscode.window.activeTextEditor
			
      // const selection = editor.selection
      // get all the selections
      const allSelections = editor.selections
			
			editor.edit(editBuilder => {
        allSelections.forEach((selection) => {
          const text = editor.document.getText(selection)
          editBuilder.replace(selection, toCamelCase(text));
        })
				
			})

    }
  )

  let disposable2 = vscode.commands.registerCommand(
    'extension.phpStyle',
    function() {
			const editor = vscode.window.activeTextEditor
			
			const allSelections = editor.selections
			
			editor.edit(editBuilder => {
        allSelections.forEach((selection) => {
          const text = editor.document.getText(selection)
          editBuilder.replace(selection, toPhp(text));
        })
				
			})

    }
  )

  let disposable3 = vscode.commands.registerCommand(
    'extension.constantStyle',
    function() {
			const editor = vscode.window.activeTextEditor
			
			const allSelections = editor.selections
			
			editor.edit(editBuilder => {
        allSelections.forEach((selection) => {
          const text = editor.document.getText(selection)
          editBuilder.replace(selection, toConstant(text));
        })
				
			})

    }
  )

  let disposable4 = vscode.commands.registerCommand(
    'extension.pascalStyle',
    function() {
			const editor = vscode.window.activeTextEditor
			
			const allSelections = editor.selections
			
			editor.edit(editBuilder => {
        allSelections.forEach((selection) => {
          const text = editor.document.getText(selection)
          editBuilder.replace(selection, toPascal(text));
        })
				
			})

    }
  )

  context.subscriptions.push(disposable1)
  context.subscriptions.push(disposable2)
  context.subscriptions.push(disposable3)
  context.subscriptions.push(disposable4)
}
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

exports.activate = activate

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate
}
