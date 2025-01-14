// actions.ts
import type { ModuleInstance } from './main.js'
import { CompanionActionDefinition, CompanionActionDefinitions } from '@companion-module/base'
import { HandleMidiIndicators } from './variables.js'
import { MidiMessage } from './midi/msgtypes.js'
import { midiMsgTypes, createOptions } from './operations.js'

export function UpdateActions(self: ModuleInstance): void {
    self.setVariableValues({ midiOutData: false })

    const actions: CompanionActionDefinitions = {}
    for (const action of midiMsgTypes) {
        const newAction: CompanionActionDefinition = {
            name: String(action.label),
            options: createOptions([], action),
            callback: async (event, context): Promise<void> => {
                const opts = JSON.parse(JSON.stringify(event.options))
                
                if (!self.config.outPortIsVirtual && !self.midiOutput.isPortOpen()) {
                    self.log('error', `Output Port "${self.midiOutput.name}" not open!`)
                    return
                }

                if (action.id == 'sysex') {
                    var parsedSysex = await context.parseVariablesInString(opts[action.valId])
                    opts.bytes = parsedSysex.split(/[ ,]+/).map((n: string): number => parseInt(n))
                } else if (action.id == 'set_preview') {
                    opts.bytes = [0xF0, 0x41, 0x10, 0x00, 0x00, 0x00, 0x68, 0x12, 0x00, 0x12, 0x01, opts.preview - 1, 0x6D - (opts.preview - 1), 0xF7]
                } else if (action.id == 'set_program') {
                    opts.bytes = [0xF0, 0x41, 0x10, 0x00, 0x00, 0x00, 0x68, 0x12, 0x00, 0x12, 0x00, opts.program - 1, 0x6E - (opts.program - 1), 0xF7]
                } else if (action.id == 'video_output_assign') {
                    opts.bytes = [0xF0, 0x41, 0x10, 0x00, 0x00, 0x00, 0x68, 0x12, 0x00, 0x08, 0x00, opts.output, 0x78 - (opts.output >> 1), 0xF7]
                } else if (action.id == 'set_aux') {
                    opts.bytes = [0xF0, 0x41, 0x10, 0x00, 0x00, 0x00, 0x68, 0x12, 0x00, 0x12, 0x02, opts.aux - 1, 0x6C - (opts.aux - 1), 0xF7]
                } else if (action.id == 'pip1_pgm') {
                    opts.bytes = [0xF0, 0x41, 0x10, 0x00, 0x00, 0x00, 0x68, 0x12, 0x00, 0x0D, 0x00, opts.state, 0x73 - opts.state, 0xF7]
                } else if (action.id == 'pip1_source') {
                    opts.bytes = [0xF0, 0x41, 0x10, 0x00, 0x00, 0x00, 0x68, 0x12, 0x00, 0x12, 0x02, opts.source, 0x6C - opts.source, 0xF7]
                } else if (action.id == 'pip1_pos_h') {
                    opts.bytes = [0xB0, 16, opts.pos_h]
                } else if (action.id == 'pip1_pos_v') {
                    opts.bytes = [0xB0, 17, opts.pos_v]
                } else if (action.id == 'pip1_size') {
                    opts.bytes = [0xB0, 19, opts.size]
                } else if (action.id == 'pip1_zoom') {
                    opts.bytes = [0xB0, 20, opts.zoom]
                } else if (action.id == 'pip1_type') {
                    opts.bytes = [0xF0, 0x41, 0x10, 0x00, 0x00, 0x00, 0x68, 0x12, 0x00, 0x0D, 0x03, opts.type, 0x70 - opts.type, 0xF7]
                } else if (action.id == 'split_vfx_a') {
                    opts.bytes = [0xF0, 0x41, 0x10, 0x00, 0x00, 0x00, 0x68, 0x12, 0x00, 0x10, 0x00, opts.state, 0x70 - opts.state, 0xF7]
                } else if (action.id == 'split_vfx_b') {
                    opts.bytes = [0xF0, 0x41, 0x10, 0x00, 0x00, 0x00, 0x68, 0x12, 0x00, 0x11, 0x00, opts.state, 0x6F - opts.state, 0xF7]
                }

                if (opts.useVariables || opts.relValue) {
                    opts[action.valId] = Number(await context.parseVariablesInString(opts.varValue))
                    if (opts.chValue) opts.channel = Number(await context.parseVariablesInString(opts.chValue))
                    if (opts.noteValue) opts.note = Number(await context.parseVariablesInString(opts.noteValue))
                    if (opts.ccValue) opts.controller = Number(await context.parseVariablesInString(opts.ccValue))
                }

                let msg = MidiMessage.parseMessage(undefined, { id: action.id, ...opts })
                if (opts.relValue) {
                    const val = self.getFromDataStore(msg!)
                    if (val === undefined) {
                        self.log('info', 'Relative value not sent. Current value from device is needed!')
                        return
                    }
                    opts[action.valId] = val + Number(opts[action.valId] * 1)
                }

                msg = MidiMessage.parseMessage(undefined, { id: action.id, ...opts })
                self.log('debug', `Sending:  ${msg} to "${self.midiOutput.name}"`)
                self.midiOutput.send(msg!)
                HandleMidiIndicators(self, 'midiOut')
            },
        }

        if (action.id != 'sysex') {
            newAction.options.push(
                {
                    id: 'relText',
                    type: 'static-text',
                    label: '** NOTE **',
                    value: 'Relative will only work after a value has been sent from the device!',
                    isVisible: (opts) => !!opts.relValue,
                },
                {
                    id: 'relValue',
                    type: 'checkbox',
                    label: 'Relative',
                    default: false,
                }
            )
        }

        actions[action.id] = newAction

    }

    self.setActionDefinitions(actions)
}