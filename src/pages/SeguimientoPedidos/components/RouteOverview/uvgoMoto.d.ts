import type * as THREE from "three"

export interface UVGoMotoColors {
  body?: string
  shirt?: string
  box?: string
}

export interface UVGoMoto {
  object: THREE.Group
  setPosition: (x: number, z: number, y?: number) => UVGoMoto
  /** Rumbo en radianes: 0 = mirando hacia +X, gira contra reloj sobre Y */
  setHeading: (rad: number) => UVGoMoto
  /** Inclinación lateral en radianes, + = hacia la derecha */
  setLean: (rad: number) => UVGoMoto
  setScale: (s: number) => UVGoMoto
  setVisible: (v: boolean) => UVGoMoto
  setColors: (c: UVGoMotoColors) => UVGoMoto
  dispose: () => void
}

export function create(
  T: typeof THREE,
  opts?: { bodyColor?: string; shirtColor?: string; boxColor?: string; castShadow?: boolean },
): UVGoMoto

export function createEnvironment(T: typeof THREE, renderer: THREE.WebGLRenderer): THREE.Texture
