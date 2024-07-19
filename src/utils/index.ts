type SortFunction<T> = (t1: T, t2: T) => number

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const reverseSort = <T>(sorter: SortFunction<T>): SortFunction<T> => {
  return (t1: T, t2: T): number => {
    return sorter(t1, t2) * -1
  }
}
