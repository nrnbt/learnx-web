export const replaceAllSlash = (input: string): string => {
  return input.replace(/\\054/g, ',').replace(/\\/g, '') ?? ''
}

export const replaceSlash = (input: string): string => {
  return input.replace(/\\054/g, ',') ?? ''
}
