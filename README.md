# Roland V-8HD Companion Module

## Overview

This Bitfocus Companion module allows you to control the Roland V-8HD video mixer via MIDI commands. It provides a comprehensive set of actions, feedbacks, and presets to manage various functions of the V-8HD, including setting previews, programs, video outputs, PiP settings, and more.

## Features

- **Set Previews**: Control which video source is displayed in the preview monitors.
- **Set Programs**: Recall saved programs on the V-8HD.
- **Video Output Assignment**: Assign video outputs to program or auxiliary outputs.
- **PiP Settings**: Configure Picture-in-Picture (PiP) settings, including position, size, and zoom.
- **Split VFX Control**: Enable or disable split VFX effects.
- **Customizable Actions and Feedbacks**: Define custom actions and feedbacks to suit your workflow.
- **Presets**: Predefined button presets for quick access to common functions.

## Installation

1. **Download the Module**:
   - Clone this repository or download the ZIP file.

2. **Install Dependencies**:
   - Navigate to the module directory and run:
     ```sh
     npm install
     ```
   - Alternatively, using Yarn:
     ```sh
     yarn install
     ```

3. **Build the Module**:
   - Run the build script to compile the TypeScript code:
     ```sh
     npm run build
     ```
   - Or with Yarn:
     ```sh
     yarn build
     ```

4. **Install in Companion**:
   - Open Bitfocus Companion.
   - Go to `Settings` > `Modules`.
   - Click `Add New Module`.
   - Choose `Local Module` and select the `dist` folder of this module.

## Configuration

1. **Select MIDI Ports**:
   - In the module configuration, select the appropriate MIDI input and output ports for your Roland V-8HD.

2. **Timestamp with Action Recorder**:
   - Enable the `Use Timestamp with Action Recorder` option if you want to include delays in recorded actions.

## Actions

- **Set Preview**: Set the preview monitor to display a specific video source.
- **Set Program**: Recall a saved program on the V-8HD.
- **Video Output Assign**: Assign video outputs to program or auxiliary outputs.
- **Set Aux**: Set the auxiliary output to a specific video source.
- **PiP 1 PGM**: Enable or disable PiP on the primary output.
- **PiP 1 Source**: Set the source for PiP.
- **PiP 1 Pos H**: Set the horizontal position of PiP.
- **PiP 1 Pos V**: Set the vertical position of PiP.
- **PiP 1 Size**: Set the size of PiP.
- **PiP 1 Zoom**: Set the zoom level of PiP.
- **PiP 1 Type**: Set the type of PiP (e.g., PinP, Black Key).
- **Split VFX A**: Enable or disable Split VFX A.
- **Split VFX B**: Enable or disable Split VFX B.

## Feedbacks

- **MIDI Message Incoming?**: Indicates when a MIDI message is received.
- **MIDI Message Outgoing?**: Indicates when a MIDI message is sent.
- **Custom Feedbacks**: Define custom feedbacks based on MIDI messages.

## Presets

- **MIDI Message In Indicator**: Button to indicate incoming MIDI messages.
- **MIDI Message Out Indicator**: Button to indicate outgoing MIDI messages.
- **Set Preview 1**: Button to set preview 1.
- **Set Program 1**: Button to recall program 1.
- **More Presets**: Additional presets for other common functions.

## Usage

1. **Add Buttons**:
   - Go to `Pages` and add buttons to control the V-8HD.
   - Use the actions and presets provided by the module.

2. **Configure Actions**:
   - Right-click on a button and select `Configure Action`.
   - Choose the desired action from the list.

3. **Configure Feedbacks**:
   - Right-click on a button and select `Configure Feedback`.
   - Choose the desired feedback from the list.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests to improve the module.

---

Enjoy controlling your Roland V-8HD with Bitfocus Companion!