#include <stdio.h>

PrintOut (unsigned int N)
{
  if (N >= 10) {
		PrintOut(N / 10);
	}
	PrintDigit(N % 10);
}

PrintDigit (unsigned int N) {
	printf("%d", N);
}

void main () {
	PrintOut(8932);
}
