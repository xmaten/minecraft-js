import { useEffect, useMemo, useState } from 'react'
import { useKeyboard } from '../hooks/useKeyboard'
import { Texture, useStore } from '../hooks/useStore'
import { dirtImg, glassImg, grassImg, woodImg, logImg } from '../images/images'

const images = {
  dirt: dirtImg,
  grass: grassImg,
  glass: glassImg,
  wood: woodImg,
  log: logImg,
}

export const TextureSelector = () => {
  const [visible, setVisible] = useState(false)
  const [activeTexture, setTexture] = useStore((state) => [
    state.texture,
    state.setTexture,
  ])
  const { dirt, glass, grass, log, wood } = useKeyboard()

  const textures = useMemo(
    () => ({
      dirt,
      glass,
      grass,
      log,
      wood,
    }),
    [dirt, glass, grass, log, wood],
  )

  useEffect(() => {
    const pressedTexture = Object.entries(textures).find(([k, v]) => v)

    if (pressedTexture) {
      setTexture(pressedTexture[0] as Texture)
    }
  }, [dirt, glass, grass, log, wood, setTexture, textures])

  useEffect(() => {
    const visiblityTimeout = setTimeout(() => {
      setVisible(false)
    }, 2000)

    setVisible(true)

    return () => {
      clearTimeout(visiblityTimeout)
    }
  }, [activeTexture])

  return visible ? (
    <div className="absolute bottom-centered texture-select">
      {Object.entries(images).map((tex, key) => (
        <img
          src={tex[1]}
          key={key}
          alt=""
          className={`${tex[0] === activeTexture ? 'active' : ''}`}
        />
      ))}
    </div>
  ) : null
}
