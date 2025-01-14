// operations.ts
import type { SomeCompanionActionInputField, SomeCompanionFeedbackInputField } from '@companion-module/base'

interface midiMsgType {
    id: string
    label: string
    desc: string
    valId: string
    valLabel: string
    valMin: number
    valMax: number
    valDefault: number
}

export const midiMsgTypes: midiMsgType[] = [
    // Existing MIDI message types
    { id: 'noteoff', label: 'Note Off', desc: 'Note Off Message', valId: 'velocity', valLabel: 'Velocity', valMin: 0, valMax: 127, valDefault: 0 },
    { id: 'noteon', label: 'Note On', desc: 'Note On Message', valId: 'velocity', valLabel: 'Velocity', valMin: 0, valMax: 127, valDefault: 127 },
    { id: 'cc', label: 'CC', desc: 'Control Change Message', valId: 'value', valLabel: 'Value', valMin: 0, valMax: 127, valDefault: 0 },
    { id: 'program', label: 'Program Change', desc: 'Program Change Message', valId: 'program', valLabel: 'Program Number', valMin: 1, valMax: 128, valDefault: 1 },
    { id: 'pitch', label: 'Pitch Wheel', desc: 'Pitch Wheel Message', valId: 'value', valLabel: 'Value', valMin: 0, valMax: 16383, valDefault: 8192 },
    { id: 'sysex', label: 'SysEx', desc: 'System Exclusive Message', valId: 'bytes', valLabel: 'SysEx Bytes', valMin: 0, valMax: 127, valDefault: 0 },

    // Roland V-8HD Specific MIDI Commands
    { id: 'set_preview', label: 'Set Preview', desc: 'Set Preview 1-8', valId: 'preview', valLabel: 'Preview Number', valMin: 1, valMax: 8, valDefault: 1 },
    { id: 'set_program', label: 'Set Program', desc: 'Set Program 1-8', valId: 'program', valLabel: 'Program Number', valMin: 1, valMax: 8, valDefault: 1 },
    { id: 'video_output_assign', label: 'Video Output Assign', desc: 'Assign Video Output', valId: 'output', valLabel: 'Output Type', valMin: 0, valMax: 2, valDefault: 0 },
    { id: 'set_aux', label: 'Set Aux', desc: 'Set Aux 1-8', valId: 'aux', valLabel: 'Aux Number', valMin: 1, valMax: 8, valDefault: 1 },
    { id: 'pip1_pgm', label: 'PiP 1 PGM', desc: 'PiP 1 Program', valId: 'state', valLabel: 'State', valMin: 0, valMax: 1, valDefault: 0 },
    { id: 'pip1_source', label: 'PiP 1 Source', desc: 'PiP 1 Source', valId: 'source', valLabel: 'Source Number', valMin: 0, valMax: 7, valDefault: 0 },
    { id: 'pip1_pos_h', label: 'PiP 1 Pos H', desc: 'PiP 1 Horizontal Position', valId: 'pos_h', valLabel: 'Horizontal Position', valMin: 10, valMax: 100, valDefault: 55 },
    { id: 'pip1_pos_v', label: 'PiP 1 Pos V', desc: 'PiP 1 Vertical Position', valId: 'pos_v', valLabel: 'Vertical Position', valMin: 10, valMax: 100, valDefault: 55 },
    { id: 'pip1_size', label: 'PiP 1 Size', desc: 'PiP 1 Size', valId: 'size', valLabel: 'Size', valMin: 10, valMax: 100, valDefault: 50 },
    { id: 'pip1_zoom', label: 'PiP 1 Zoom', desc: 'PiP 1 Zoom', valId: 'zoom', valLabel: 'Zoom', valMin: 10, valMax: 100, valDefault: 100 },
    { id: 'pip1_type', label: 'PiP 1 Type', desc: 'PiP 1 Type', valId: 'type', valLabel: 'Type', valMin: 0, valMax: 2, valDefault: 0 },
    { id: 'split_vfx_a', label: 'Split VFX A', desc: 'Split VFX A', valId: 'state', valLabel: 'State', valMin: 0, valMax: 1, valDefault: 0 },
    { id: 'split_vfx_b', label: 'Split VFX B', desc: 'Split VFX B', valId: 'state', valLabel: 'State', valMin: 0, valMax: 1, valDefault: 0 },
]

export function createOptions(newOpts: SomeCompanionActionInputField[] | SomeCompanionFeedbackInputField[], midiOp: midiMsgType): SomeCompanionActionInputField[] | SomeCompanionFeedbackInputField[] {
    if (['noteoff', 'noteon', 'cc', 'program', 'pitch'].includes(midiOp.id)) {
        newOpts.push(
            {
                id: 'channel',
                type: 'number',
                label: 'Channel',
                default: 1,
                min: 1,
                max: 16,
                isVisible: (opts) => !opts.useVariables
            },
            {	
                id: 'chValue',
                type: 'textinput',
                label: 'Channel',
                default: '1',
                useVariables: true,
                isVisible: (opts) => {
                    if (!opts.chValue) opts.chValue = opts.channel
                    return !!opts.useVariables
                }
            }
        )
    }
    if (['noteoff', 'noteon'].includes(midiOp.id)) {
        newOpts.push(
            {
                id: 'note',
                type: 'number',
                label: 'Note Number',
                default: 60,
                min: 0,
                max: 127,
                isVisible: (opts) => !opts.useVariables
            },
            {	
                id: 'noteValue',
                type: 'textinput',
                label: 'Note Number',
                default: '60',
                useVariables: true,
                isVisible: (opts) => {
                    if (!opts.noteValue) opts.noteValue = opts.note
                    return !!opts.useVariables
                }
            }
        )
    }
    if (midiOp.id == 'cc') {
        newOpts.push(
            {
                id: 'controller',
                type: 'number',
                label: 'Controller',
                default: 127,
                min: 0,
                max: 127,
                isVisible: (opts) => !opts.useVariables
            },
            {	
                id: 'ccValue',
                type: 'textinput',
                label: 'Controller',
                default: '127',
                useVariables: true,
                isVisible: (opts) => {
                    if (!opts.ccValue) opts.ccValue = opts.controller
                    return !!opts.useVariables
                }
            }
        )
    }
    if (midiOp.id != 'sysex') {
        newOpts.push(
            {
                id: midiOp.valId,
                type: 'number',
                label: midiOp.valLabel,
                default: midiOp.valDefault,
                min: midiOp.valMin,
                max: midiOp.valMax,
                isVisible: (opts) => !opts.useVariables && !opts.relValue,
            },
            {
                id: 'varValue',
                type: 'textinput',
                label: midiOp.valLabel,
                default: String(midiOp.valDefault),
                useVariables: true,
                isVisible: (opts, data) => {
                    return (!!opts.useVariables || !!opts.relValue) && !opts.createVar 
                },
                required: true,
            },
            {
                id: 'useVariables',
                type: 'checkbox',
                label: 'Use Variables',
                default: false,
            }
        )
    } else {
        newOpts.push(
            {
                id: 'bytes',
                type: 'textinput',
                label: midiOp.valLabel,
                tooltip:
                    'Enter a string of decimal or hex digits, with spaces or commas between. MUST start with 0xF0 or 240 and end with 0xF7 or 247',
                default: '',
                useVariables: true,
            }
        )
    }

    return newOpts
}