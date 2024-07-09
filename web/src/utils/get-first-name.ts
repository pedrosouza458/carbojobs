export function getFirstName(name: string) {
  if (typeof name !== 'string') {
      return '';
  }
  const firstWord = name.split(' ')[0];
  return firstWord;
}