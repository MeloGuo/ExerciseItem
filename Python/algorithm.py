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

# recursion binary search
def recursionBinarySearch(list, item):
  pass  

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

# Fibonacci
def fibonacci(parameter_list):
  pass

# Sum
def sum(list):
  if list == []:
    return 0
  return list[0] + sum(list[1:])
# test
print(sum([1, 2, 3]))

# Count
def count(list):
  if list == []:
    return 0
  return 1 + count(list[1:])
# test
print(count([1, 2, 3, 4]))

# Biggest Number
def getMax(list):
  if len(list) == 2:
    return list[0] if list[0] > list[1] else list[1]
  subMax = max(list[1:])
  return list[0] if list[0] > subMax else subMax
# test
print(getMax([1, 2, 3, 4, 5]))