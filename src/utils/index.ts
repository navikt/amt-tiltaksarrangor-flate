type SortFunction<T> = (t1: T, t2: T) => number

export const reverseSort = <T>(sorter: SortFunction<T>): SortFunction<T> => {
  return (t1: T, t2: T): number => {
    return sorter(t1, t2) * -1
  }
}
