import { EventHandler } from '@create-figma-plugin/utilities'

export type VariableData = {
  name: string,
  type: VariableResolvedDataType,
  rawValues: Record<string, string>
  values: Record<string, any>
}

export type VariablesData = {
  name: string | null
  variables: VariableData[]
  modes: string[]
}

export interface ImportDataHandler extends EventHandler {
  name: 'IMPORT_DATA'
  handler: (data: VariablesData) => void
}