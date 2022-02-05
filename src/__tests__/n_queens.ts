function nQueens(n: number): [number, number][] {
  function areAttacking(n1: number, i1: number, n2: number, i2: number): Boolean {
    if (n1 === n2)
      return true
    return Math.abs(n2 - n1) === Math.abs(i2 - i1)
  }

  function isAttack(queens: number[]): Boolean {
    return queens.some((q1, i1) => queens.some ((q2, i2) => i1 !== i2 && areAttacking(q1, i1, q2, i2)))
  }

  function placeQueens(queens: number[], c: number = 0): number[] | undefined {
    const n = queens.length
    for (let i = 0; i < n; i++) {
      queens[c] = i
      if (c === n - 1) {
        if (!isAttack(queens))
          return queens
      } else {
        const placedQueens = placeQueens(queens, c + 1)
        if (placedQueens !== undefined) {
          return placedQueens
        }
      }
    }
    return undefined
  }

  const placedQueens = placeQueens([...Array(n).fill(0)])
  if (placedQueens !== undefined) {
    return placedQueens.map((n: number, i: number) => [i, n] as [number, number])
  } else {
    throw Error("There may be a solution")
  }
}

describe("8 queens", () => {
  it("does attack one another", () => {
    const expected = [[0, 0], [1, 4], [2, 7], [3, 5], [4, 2], [5, 6], [6, 1], [7, 3]]

    expect(nQueens(8)).toEqual(expected)
  })
})
