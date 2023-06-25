import { convertHexColorToRgbColor, on, once, showUI } from '@create-figma-plugin/utilities'

import { VariablesData, CloseHandler, CreateRectanglesHandler, ImportDataHandler } from './types'

export default function () {
  once<CreateRectanglesHandler>('CREATE_RECTANGLES', function (count: number) {
    const collection = figma.variables.createVariableCollection('Sample')
    // 個人やフリープランでモードを追加しようとすると例外が発生する
    // collection.addMode('dark')
    const modeId = collection.modes[0].modeId
    const variable = figma.variables.createVariable('variable1', collection.id, "FLOAT")
    variable.setValueForMode(modeId, 1.2)
  })
  on<ImportDataHandler>('IMPORT_DATA', function (data: VariablesData) {
    console.log(data)
    const { variables, modes, name } = data
    // default yyyy-mm-dd hh:mm:ss
    const collcetionName = name || 'Imported at ' + new Date().toISOString()
    const collection = figma.variables.createVariableCollection(collcetionName)
    let modelIds: Record<string, string> = {}
    modes.forEach(mode => {
      const modeId = collection.addMode(mode)
      console.log({ modeId })
      modelIds[mode] = modeId
    })
    collection.removeMode(collection.modes[0].modeId)
    collection.modes.forEach(mode => {
      console.log(mode)
    })
    variables.forEach(variable => {
      const { name, type, rawValues, values } = variable
      const variableId = figma.variables.createVariable(name, collection.id, type)
      Object.keys(values).forEach(mode => {
        const modeId = modelIds[mode]
        // uiに記述すべき
        const value = type === 'COLOR' ? convertHexColorToRgbColor(values[mode].replace('#', '')) : values[mode]
        console.log(mode, values[mode], value)
        variableId.setValueForMode(modeId, value)
      })
    })
  });
  showUI({
    height: 420,
    width: 300
  })
}
