# binary search
def binarySearch(list, item):
  low = 0
  high = len(list) - 1

  while low <= high:
    mid = (low + high) // 2
    guess = list[mid]

    if guess == item:
      return mid
    if guess < item:
      low = mid + 1
    else:
      high = mid - 1
  return None

# test
print(binarySearch([1, 3, 5, 7, 9], 3))
print(binarySearch([1, 3, 5, 7, 9], 111))

# selection sort
def selectionSort(arr):
  def findSmallest(arr):
    smallest = arr[0]
    smallestIndex = 0
    for i in range(1, len(arr)):
      if arr[i] < smallest:
        smallest = arr[i]
        smallestIndex = i
    return smallestIndex

  newArr = []
  for i in range(len(arr)):
    smallest = findSmallest(arr)
    newArr.append(arr.pop(smallest))
  return newArr

# test
print(selectionSort([5, 3, 7, 1]))