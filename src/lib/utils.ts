export function cn(...inputs: (string | undefined | null | false | { [key: string]: boolean })[]) {
  return inputs.filter(Boolean).join(' ')
}
