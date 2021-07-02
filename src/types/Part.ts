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

const partTypeToTextMap: Record<PartType, string> = {
  cpu: 'CPU',
  motherboard: 'マザーボード',
  cpuCooler: 'CPUファン',
  pcCase: 'PCケース',
  pcCooler: 'PCケースファン',
  gpu: 'GPU',
  rom: 'ストレージ/ROM',
  ram: 'メモリ/RAM',
  powerSupply: '電源',
}

/**
 * returns part type text.
 *
 * @param type type.
 */
export const partTypeToText = (type: PartType): string => {
  return partTypeToTextMap[type]
}
