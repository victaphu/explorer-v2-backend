export const fromHexToNumber = (s: string | number) =>
  s ? (typeof s === 'number' ? s : BigInt(s).toString()) : s
