import * as node_midi from '@julusian/midi'
import { EventEmitter } from 'events'
import { MidiMessage } from './msgtypes.js'

export class Input extends EventEmitter {
	private _input
	private _smpte: number[]
	private _pendingSysex: boolean
	private _sysex: number[]
	private _inputPortNumberedNames: string[]
	public name: string

	constructor(name: string, virtual?: boolean) {
		super()
		this._input = new node_midi.Input()
		this._input.ignoreTypes(false, false, false)
		this._pendingSysex = false
		this._sysex = []
		this._smpte = []
		this.name = name
		this._inputPortNumberedNames = getInputs()

		if (virtual) {
			this._input.openVirtualPort(name)
		} else {
			const numInputs = this._input.getPortCount()
			for (let i = 0; i < numInputs; i++) {
				if (name === this._inputPortNumberedNames[i]) {
					this._input.openPort(i)
				}
			}
		}

		this._input.on('message', (deltaTime: number, bytes: number[]): void => {
			// a long sysex can be sent in multiple chunks, depending on the RtMidi buffer size

			const msg = MidiMessage.parseMessage(bytes)
			this.emit('message', msg)
			if (msg!.id == 'mtc') {
				this.parseMtc(msg!)
			}
		})
	}

	close(): void {
		this._input.closePort()
		this._input.destroy()
	}

	isPortOpen(): boolean {
		return this._input.isPortOpen()
	}

	parseMtc(data: MidiMessage): void {
		const FRAME_RATES = [24, 25, 29.97, 30]
		const byteNumber: number = data.args.type!
		let value: number = data.args.value!
		let smpteFrameRate: number

		this._smpte[byteNumber] = value

		// Check if we have 8 complete messages. If this._smpte[0] is undefined, then we started in the middle!
		if (byteNumber === 7 && typeof this._smpte[0] === 'number') {
			const bits: number[] = []
			for (let i = 3; i >= 0; i--) {
				const bit = value & (1 << i) ? 1 : 0
				bits.push(bit)
			}
			value = bits[3]
			smpteFrameRate = FRAME_RATES[(bits[1] << 1) + bits[2]]
			this._smpte[byteNumber] = value

			const smpte = this._smpte
			const smpteFormatted =
				((smpte[7] << 4) + smpte[6]).toString().padStart(2, '0') +
				':' +
				((smpte[5] << 4) + smpte[4]).toString().padStart(2, '0') +
				':' +
				((smpte[3] << 4) + smpte[2]).toString().padStart(2, '0') +
				'.' +
				((smpte[1] << 4) + smpte[0]).toString().padStart(2, '0')
			this.emit('smpte', {
				smpte: smpteFormatted,
				smpteFR: smpteFrameRate,
			})
		}
	}
}

export class Output {
	private _output
	public name: string

	constructor(name: string, virtual?: boolean) {
		this._output = new node_midi.Output()
		this.name = name
		const outputPortNumberedNames: string[] = getOutputs()

		if (virtual) {
			this._output.openVirtualPort(name)
		} else {
			const numOutputs = this._output.getPortCount()
			for (let i = 0; i < numOutputs; i++) {
				if (name === outputPortNumberedNames[i]) {
					this._output.openPort(i)
				}
			}
		}
	}

	close(): void {
		this._output.closePort()
		this._output.destroy()
	}

	isPortOpen(): boolean {
		return this._output.isPortOpen()
	}

	send(msg: MidiMessage): void {
		this._output.sendMessage(msg.bytes)
	}
}

// utilities
export function getInputs(): string[] {
	const input = new node_midi.Input()
	const inputs: string[] = []
	for (let i = 0; i < input.getPortCount(); i++) {
		let counter = 0
		const portName = input.getPortName(i)
		let numberedPortName = portName
		while (inputs.includes(numberedPortName)) {
			counter++
			numberedPortName = portName + counter
		}
		inputs.push(numberedPortName)
	}
	input.closePort()
	return inputs
}

export function getOutputs(): string[] {
	const output = new node_midi.Output()
	const outputs: string[] = []
	for (let i = 0; i < output.getPortCount(); i++) {
		let counter = 0
		const portName = output.getPortName(i)
		let numberedPortName = portName
		while (outputs.includes(numberedPortName)) {
			counter++
			numberedPortName = portName + counter
		}
		outputs.push(numberedPortName)
	}
	output.closePort()
	return outputs
}
