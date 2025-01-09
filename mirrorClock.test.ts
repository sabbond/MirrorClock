import { mirrorTime } from "./mirrorClock";

describe('mirrorTime', () => {
    it.each([
        ['midday', '12:00', '12:00'],
        ['1 minute past noon', '12:01', '11:59'],
        ['quarter past three', '03:15', '08:45']
    ])('reflects time correctly when %s', (scenario: string, time: string, reflectedTime: string) => {
        expect(mirrorTime(time)).toEqual(reflectedTime);
    })
})