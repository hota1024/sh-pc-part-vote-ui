/**
 * chunk array.
 *
 * @param array array.
 * @param size size.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const chunk = <T extends any[]>(array: T, size: number): T[] => {
  return array.reduce(
    (c, _, i) => (i % size ? c : [...c, array.slice(i, i + size)]),
    [] as T[][]
  )
}
