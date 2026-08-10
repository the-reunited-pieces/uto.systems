export function ordinal(number: number): string {
    if (number < 0) return `-${ordinal(-number)}`;
    if (number % 100 >= 10 && number % 100 <= 20) return `${number}th`;
    if (number % 10 === 1) return `${number}st`;
    if (number % 10 === 2) return `${number}nd`;
    if (number % 10 === 3) return `${number}rd`;
    return `${number}th`;
}
