import { nanoid } from "nanoid";
import create, { StoreApi, UseBoundStore } from "zustand";

export type Position = [number, number, number]

export type Texture = 'dirt' | 'grass' | 'glass' | 'wood' | 'log'

const WORLD_SAVE_KEY = 'cubes'

type Cube = {
    key: string,
    pos: Position,
    texture: Texture
}

type State = {
    texture: Texture 
    cubes: Cube[]
    addCube: (pos: Position) => void
    removeCube: (pos: Position) => void
    setTexture: (texture: Texture) => void
    saveWorld: () => void
    resetWorld: () => void
}

const getLocalStorage = (key: string) => {
    const item = window.localStorage.getItem(key)

    if (item) {
        return JSON.parse(item)
    }

    return null
}

const setLocalStorage = (key: string, value: any) => {
    window.localStorage.setItem(key, JSON.stringify(value))
}

export const useStore: UseBoundStore<StoreApi<State>> = create((set) => ({
    texture: 'dirt',
    cubes: getLocalStorage(WORLD_SAVE_KEY) || [],
    addCube: (position: Position) => {
        set((prev) => ({
            cubes: [
                ...prev.cubes, 
                {
                    key: nanoid(), 
                    pos: position, 
                    texture: prev.texture
                }
            ]
        }))
    },
    removeCube: (position: Position) => {
        set((prev) => ({
            cubes: prev.cubes.filter(cube => {
                const [x, y, z] = cube.pos
                
                return x !== position[0] || y !== position[1] || z !== position[2]
            })
        })) 
    },
    setTexture: (texture: Texture) => {
        set(() => ({
            texture
        }))
    },
    saveWorld: () => {
        set((prev) => {
            setLocalStorage(WORLD_SAVE_KEY, prev.cubes)
            
            return prev
        })
    },
    resetWorld: () => {
        set(() => ({
            cubes: []
        }))

        setLocalStorage(WORLD_SAVE_KEY, [])
    },
}))