import { useState } from 'react'
import './App.css'
import flyThroughState from './state.json'

import { Canvas, useFrame } from '@react-three/fiber'
import { Gltf, ScrollControls, useScroll } from '@react-three/drei'
import { getProject, val } from '@theatre/core'

import { SheetProvider, PerspectiveCamera, useCurrentSheet } from '@theatre/r3f'
import { editable as e } from '@theatre/r3f'

function App() {
	const sheet = getProject('Fly Through', { state: flyThroughState }).sheet(
		'Scene'
	)

	return (
		<Canvas gl={{ preserveDrawingBuffer: true }}>
			<ScrollControls pages={2}>
				<SheetProvider sheet={sheet}>
					<Scene />
				</SheetProvider>
			</ScrollControls>
		</Canvas>
	)
}

function Scene() {
	const sheet = useCurrentSheet()
	const scroll = useScroll()

	useFrame(() => {
		const sequenceLength = val(sheet.sequence.pointer.length)

		sheet.sequence.position = scroll.offset * sequenceLength
	})

	const bgColor = '#84a4f4'

	return (
		<>
			<color attach="background" args={[bgColor]} />
			{/* <e.fog theatreKey="Fog" attach="fog" color={bgColor} near={-4} far={10} /> */}
			<fog attach="fog" color={bgColor} near={-4} far={12} />
			<ambientLight intensity={0.5} />
			<directionalLight position={[-5, 5, -5]} intensity={1.5} />
			<Gltf src="/environment.glb" castShadow receiveShadow />
			<PerspectiveCamera
				theatreKey="Camera"
				makeDefault
				position={[0, 0, 0]}
				fov={90}
				near={0.1}
				far={70}
			/>
		</>
	)
}

export default App
