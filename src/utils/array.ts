/**
 * **Fisher-Yates Shuffle**: Shuffle the input array (keep the original array)
 *
 * BigO: ⌛(n), 🌍(n)
 * @param array Input array want to be shuffled
 * @returns shuffledArray
 */
export function shuffleArrayImmutable<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }
  return shuffled;
}

/**
 * **Fisher-Yates Shuffle**: Shuffle the input array (modify the original array)
 *
 * BigO: ⌛(n), 🌍(1)
 * @param array Input array want to be shuffled
 */
export function shuffleArray<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
}

/**
 * Convert a list to a map with alphabet as key
 *
 * BigO: ⌛(n), 🌍(n)
 * @param listToMap Input array need to be converted
 */
export function mapToAlphabetKeys<T>(listToMap: T[]): Map<string, T> {
  const alphabetMap = new Map<string, T>();
  listToMap.forEach((value, index) => {
    const key = String.fromCharCode(65 + index); // ASCII code for 'A' is 65xx
    alphabetMap.set(key, value);
  });

  return alphabetMap;
}
