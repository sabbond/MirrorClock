import { mirrorTime, mirrorTime2 } from "./mirrorClock";

const testData = [
    ['midday', '12:00', '12:00'],
    ['1 minute past noon', '12:01', '11:59'],
    ['half past twelve', '12:30', '11:30'],
    ['quarter to one', '12:45', '11:15'],
    ['a minute to one', '12:59', '11:01'],
    ["one o'clock", '01:00', '11:00'],
    ['quarter past three', '03:15', '08:45'],
    ['twenty past five', '05:20', '06:40'],
    ['four twenty nine', '04:29', '07:31'],
    ['quarter to six', '05:45', '06:15'],
    ['a minute to six', '05:59', '06:01'],
    ["six o'clock", '06:00', '06:00'],
    ["one minute past six", '06:01', '05:59'],
    ['ten to eleven', '10:50', '01:10'],
    ['ten to noon', '11:50', '12:10'],
    ['a minute to noon', '11:59', '12:01']
];

describe.each([
    ['mirrorTime', mirrorTime],
    ['mirrorTime2', mirrorTime2]
])('%s', (scenario, method) => {
    it.each(testData)('reflects time correctly when %s', (scenario: string, time: string, reflectedTime: string) => {
        expect(method(time)).toEqual(reflectedTime);
    })
    it('returns the correct error message when no time supplied', () => {
        expect(method('')).toEqual('invalid input');
    })
    it('returns the correct error message when bad length string supplied', () => {
        expect(method('this is not a time string')).toEqual('invalid input');
    })
    it.each(['34:00', 'AB:CD', '13:00', '12:61', '12:-1', '01:99'])('returns the correct error message when time is %s', (input: string) => {
        expect(method(input)).toEqual('invalid time');
    })
})