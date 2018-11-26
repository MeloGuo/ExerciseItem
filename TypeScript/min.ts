function min (a: number, b: number): number {
  if (a < b) {
    return a
  } else {
    return b
  }
}

function add (a: number, b: number): number
function add (a: string, b: string): string
function add (a: any, b: any): any {
  return a + b
}

function selectSort (a: number[]): number[] {
  for (let i = 0; i < a.length - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < a.length; j++) {
      if (a[j] < a[minIndex]) {
        minIndex = j
      }
    }
    [a[minIndex], a[i]] = [a[i], a[minIndex]]
  }
  return a
}

enum Gender {
  Male = '男',
  Female = '女'
}

interface Person {
  gender: Gender
  age: number
}

function marry (a: Person, b: Person): [Person, Person] {
  if (a.gender !== b.gender) {
    return [a, b]
  } else {
    throw new Error('性别相同，不能结婚')
  }
}

let a = {
  gender: Gender.Female,
  age: 22
}
let b = {
  gender: Gender.Male,
  age: 30
}

const c = selectSort([4, 1, 9 ,44, 8])
const married = marry(a, b)
console.log(married)
