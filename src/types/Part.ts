import { ModelBase } from './ModelBase'

/**
 * PartType type.
 */
export type PartType =
  | 'cpu'
  | 'motherboard'
  | 'cpuCooler'
  | 'pcCase'
  | 'pcCooler'
  | 'gpu'
  | 'rom'
  | 'ram'
  | 'powerSupply'

export const PartTypes = [
  'cpu',
  'motherboard',
  'cpuCooler',
  'pcCase',
  'pcCooler',
  'gpu',
  'rom',
  'ram',
  'powerSupply',
]

/**
 * Part type.
 */
export type Part = ModelBase & {
  type: PartType
  name: string
  votes: number
}
