import { usePlane } from '@react-three/cannon'
import { ThreeEvent } from '@react-three/fiber'

import { Position, useStore } from '../hooks/useStore'
import { groundTexture } from '../images/textures'

export const Ground = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.5, 0],
  }))
  const [addCube] = useStore((state) => [state.addCube])

  const handleGroundClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()

    const target = Object.values(e.point).map((val) =>
      Math.ceil(val),
    ) as Position

    addCube(target)
  }

  return (
    // TODO: Fix type
    <mesh ref={ref as any} onClick={handleGroundClick}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" map={groundTexture} />
    </mesh>
  )
}
