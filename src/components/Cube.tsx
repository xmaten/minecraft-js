import { useBox } from '@react-three/cannon'
import { ThreeEvent } from '@react-three/fiber'
import { useState } from 'react'
import { Position, Texture, useStore } from '../hooks/useStore'

import * as textures from '../images/textures'

type Props = {
  position: Position
  texture: Texture
}

export const Cube = ({ position, texture }: Props) => {
  const [isHovered, setIsHovered] = useState(false)
  const [ref] = useBox(() => ({
    type: 'Static',
    position,
  }))
  const [addCube, removeCube] = useStore((state) => [
    state.addCube,
    state.removeCube,
  ])

  const activeTexture = textures[`${texture}Texture`]

  const cubeClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()

    const clickedFace = Math.floor((e.faceIndex || 0) / 2)

    if (!ref.current?.position) {
      return
    }

    const { x, y, z } = ref.current?.position

    // TODO: Fix type
    if ((e as any).altKey) {
      removeCube([x, y, z])
      return
    } else if (clickedFace === 0) {
      addCube([x + 1, y, z])
      return
    } else if (clickedFace === 1) {
      addCube([x - 1, y, z])
      return
    } else if (clickedFace === 2) {
      addCube([x, y + 1, z])
      return
    } else if (clickedFace === 3) {
      addCube([x, y - 1, z])
      return
    } else if (clickedFace === 4) {
      addCube([x, y, z + 1])
      return
    } else if (clickedFace === 5) {
      addCube([x, y, z - 1])
      return
    }
  }

  return (
    // TODO: Fix type
    <mesh
      ref={ref as any}
      onClick={cubeClick}
      onPointerMove={(e) => {
        e.stopPropagation()
        setIsHovered(true)
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setIsHovered(false)
      }}
    >
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial
        color={isHovered ? 'gray' : 'white'}
        attach="material"
        transparent={true}
        opacity={texture === 'glass' ? 0.7 : 1}
        map={activeTexture}
      />
    </mesh>
  )
}
