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