import { EventHandler } from '@create-figma-plugin/utilities'

export type VariablesData = {
  variables: {
    name: string,
    type: VariableResolvedDataType,
    rawValues: Record<string, string>
    values: Record<string, any>
  }[]
  modes: string[]
}

export interface CreateRectanglesHandler extends EventHandler {
  name: 'CREATE_RECTANGLES'
  handler: (count: number) => void
}

export interface CloseHandler extends EventHandler {
  name: 'CLOSE'
  handler: () => void
}
