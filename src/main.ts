import { once, showUI } from '@create-figma-plugin/utilities'

import { CloseHandler, CreateRectanglesHandler } from './types'

export default function () {
  once<CreateRectanglesHandler>('CREATE_RECTANGLES', function (count: number) {
    const collection = figma.variables.createVariableCollection('Sample')
    // 個人やフリープランでモードを追加しようとすると例外が発生する
    // collection.addMode('dark')
    const modeId = collection.modes[0].modeId
    const variable = figma.variables.createVariable('variable1', collection.id, "FLOAT")
    variable.setValueForMode(modeId, 1.2)
  })
  once<CloseHandler>('CLOSE', function () {
    figma.closePlugin()
  })
  showUI({
    height: 420,
    width: 260
  })
}
