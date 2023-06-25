import {
  Button,
  Columns,
  Container,
  Muted,
  render,
  Text,
  Textbox,
  TextboxMultiline,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useCallback, useMemo, useState } from 'preact/hooks'
import Papa from 'papaparse'
import '!./styles.css'

import { VariablesData, VariableData, ImportDataHandler } from './types'

const initialInput = `,light, dark
colors/background, #FFFFFF, #020817
colors/foreground, #020817, #F8FAFC
`

const table2data = (table: string[][]) => {
  let modes: string[] = []
  let variables = []
  for (let i = 0; i < table.length; i++) {
    const row = table[i]
    if (i === 0) {
      modes = row.slice(1)
    } else {
      const variable: VariableData = {
        name: row[0],
        type: 'STRING',
        rawValues: {},
        values: {}
      }
      for (let j = 1; j < row.length; j++) {
        const mode = modes[j - 1]
        const value = row[j]
        variable.rawValues[mode] = value
        if (typeof value === 'string' && value.startsWith('#')) {
          variable.type = 'COLOR'
        } else if (typeof value === 'number') {
          variable.type = 'FLOAT'
        }
        // ここでtypeの判断、valuesにパースしたものを入れる
        variable.values[mode] = value
      }
      variables.push(variable)
    }
  }
  return { modes, variables }
}

function Plugin() {
  const [input, setInput] = useState(initialInput)
  const { parsed, data } = useMemo(() => {
    const result = Papa.parse(input, {
      skipEmptyLines: true,
      dynamicTyping: true,
      transform(value, field) {
        return value.trim()
      },
    })
    const name = (result.data as string[][])[0][0]
    const data = {
      name,
      ...table2data(result.data as any),
    }
    return { parsed: result, data }
  }, [input])
  const handleButtonClick = () => {
    emit<ImportDataHandler>('IMPORT_DATA', data)
  }
  return (
    <Container space="medium">
      <VerticalSpace space="small" />
      <TextboxMultiline value={input} onChange={(e) => setInput(e.currentTarget.value)} rows={8} variant='border' />
      {/* {JSON.stringify(parsed.data)} */}
      <VerticalSpace space="medium" />
      <Text>
        <Muted>Preview</Muted>
      </Text>
      <VerticalSpace space="extraSmall" />
      <table>
        <thead>
          <tr>
            <th><Text>Name</Text></th>
            {
              data.modes.map((mode) => {
                return <th><Text>{mode}</Text></th>
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            data.variables.map((variable) => {
              // console.log(variable.values)
              return <tr>
                <td>{variable.type} {variable.name}</td>
                {
                  Object.keys(variable.values).map((mode) => {
                    const value = variable.values[mode]
                    return <td>{value}</td>
                  })
                }
              </tr>
            })
          }
        </tbody>

      </table>
      <VerticalSpace space="extraLarge" />
      <Columns space="extraSmall">
        <Button fullWidth onClick={handleButtonClick}>
          {data.name ? `Import as ${data.name}` : 'Import'}
        </Button>
      </Columns>
      <VerticalSpace space="small" />
    </Container>
  )
}

export default render(Plugin)
