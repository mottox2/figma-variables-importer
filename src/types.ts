import { EventHandler } from '@create-figma-plugin/utilities'

export type VariableData = {
  name: string,
  type: VariableResolvedDataType,
  rawValues: Record<string, string>
  values: Record<string, any>
}

export type VariablesData = {
  variables: VariableData[]
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
