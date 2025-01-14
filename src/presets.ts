// presets.ts
import { channel } from 'diagnostics_channel'
import type { ModuleInstance } from './main.js'
import { combineRgb } from '@companion-module/base'

export function UpdatePresets(self: ModuleInstance): void {
    self.setPresetDefinitions({
        midi_in: {
            type: 'button', // This must be 'button' for now
            category: 'Indicators', // This groups presets into categories in the ui. Try to create logical groups to help users find presets
            name: `MIDI Message In Indicator`, // A name for the preset. Shown to the user when they hover over it
            style: {
                text: `MIDI IN`, // You can use variables from your module here
                size: 'auto',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 0),
            },
            steps: [],
            feedbacks: [
                {
                    feedbackId: 'midiIn',
                    options: {},
                    style: {
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(0, 255, 0),
                    },
                },
            ],
        },
        midi_out: {
            type: 'button',
            category: 'Indicators',
            name: `MIDI Message Out Indicator`,
            style: {
                text: `MIDI OUT`,
                size: 'auto',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 0),
            },
            steps: [],
            feedbacks: [
                {
                    feedbackId: 'midiOut',
                    options: {},
                    style: {
                        color: combineRgb(255, 255, 255),
                        bgcolor: combineRgb(0, 255, 0),
                    },
                },
            ],
        },
        set_preview_1: {
            type: 'button',
            category: 'Roland V-8HD',
            name: `Set Preview 1`,
            style: {
                text: `Preview 1`,
                size: 'auto',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 0),
            },
            steps: [
                {
					down: [
                        {
                            actionId: 'set_preview',
                            options: {
                                preview: 1,
                            },
                        },
                    ],
					up: [],
                },
            ],
            feedbacks: [],
        },
        set_program_1: {
            type: 'button',
            category: 'Roland V-8HD',
            name: `Set Program 1`,
            style: {
                text: `Program 1`,
                size: 'auto',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 0),
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'set_program',
                            options: {
                                program: 1,
                            },
                        },
                    ],
					up: [],
                },
            ],
            feedbacks: [],
        },
        set_preset_1: {
            type: 'button',
            category: 'Roland V-8HD',
            name: `Call Preset 1`,
            style: {
                text: `Preset 1`,
                size: 'auto',
                color: combineRgb(255, 255, 255),
                bgcolor: combineRgb(0, 0, 0),
            },
            steps: [
                {
                    down: [
                        {
                            actionId: 'program',
                            options: {
                                channel: 1,
                                program: 1,
                            },
                        },
                    ],
					up: [],
                },
            ],
            feedbacks: [],
        },
        // Add more presets as needed
    })
}