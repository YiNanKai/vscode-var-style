// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
// import { toCamelCase, toConstant, toPascal, toPhp } from './function'
const util = require('./function')
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
        allSelections.forEach(selection => {
          const text = editor.document.getText(selection)
          editBuilder.replace(selection, util.toCamelCase(text))
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
        allSelections.forEach(selection => {
          const text = editor.document.getText(selection)
          editBuilder.replace(selection, util.toPhp(text))
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
        allSelections.forEach(selection => {
          const text = editor.document.getText(selection)
          editBuilder.replace(selection, util.toConstant(text))
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
        allSelections.forEach(selection => {
          const text = editor.document.getText(selection)
          editBuilder.replace(selection, util.toPascal(text))
        })
      })
    }
  )
  let disposable5 = vscode.commands.registerCommand(
    'extension.kebabStyle',
    function() {
      const editor = vscode.window.activeTextEditor

      const allSelections = editor.selections

      editor.edit(editBuilder => {
        allSelections.forEach(selection => {
          const text = editor.document.getText(selection)
          editBuilder.replace(selection, util.toKebab(text))
        })
      })
    }
  )

  context.subscriptions.push(disposable1)
  context.subscriptions.push(disposable2)
  context.subscriptions.push(disposable3)
  context.subscriptions.push(disposable4)
  context.subscriptions.push(disposable5)
}

exports.activate = activate

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate
}
