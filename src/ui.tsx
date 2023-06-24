import {
  Button,
  Columns,
  Container,
  Muted,
  render,
  Text,
  TextboxNumeric,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useCallback, useState } from 'preact/hooks'

import { CloseHandler, CreateRectanglesHandler, VariablesData } from './types'

const data: VariablesData = {
  variables: [
    {
      name: 'color-primary',
      type: 'COLOR',
      rawValues: {
        mode1: '#fff',
        mode2: '#000'
      },
      values: {
        mode1: '#fff',
        mode2: '#000'
      }
    }
  ],
  modes: ['mode1', 'mode2']
}

function Plugin() {
  const handleCreateRectanglesButtonClick = useCallback(
    () => {
      emit<CreateRectanglesHandler>('CREATE_RECTANGLES', 1)
    }
    , [])
  const handleCloseButtonClick = useCallback(function () {
    emit<CloseHandler>('CLOSE')
  }, [])
  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Text>
        <Muted>Preview</Muted>
      </Text>
      <VerticalSpace space="small" />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            {
              data.modes.map((mode) => {
                return <th>{mode}</th>
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            data.variables.map((variable) => {
              console.log(variable.values)
              return <tr>
                <td>{variable.name}</td>
                {
                  Object.keys(variable.values).map((mode) => {
                    const value = variable.values[mode]
                    return <td>
                      {value}
                      {/* <TextboxNumeric
                        value={variable.rawValues[mode]}
                        onChange={function (value) {
                          variable.rawValues[mode] = value
                        }}
                      /> */}
                    </td>
                  })
                }
              </tr>
            })
          }
        </tbody>

      </table>
      <VerticalSpace space="extraLarge" />
      <Columns space="extraSmall">
        <Button fullWidth onClick={handleCreateRectanglesButtonClick}>
          Create
        </Button>
        <Button fullWidth onClick={handleCloseButtonClick} secondary>
          Close
        </Button>
      </Columns>
      <VerticalSpace space="small" />
    </Container>
  )
}

export default render(Plugin)
