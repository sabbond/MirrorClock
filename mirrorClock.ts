const timeFormatRegex = /^(1[0-2]|0?[1-9]):([0-5]?[0-9])$/;
export function mirrorTime(time: string): string {

    if (!time || time.length != 5) return "invalid input";
    if (!timeFormatRegex.test(time)) return "invalid time";
    // we know it's in the right format, get the hours and minutes
    var hours = +time.split(':')[0];
    var minutes = +time.split(':')[1];
    hours = reflectHours(hours, minutes);
    minutes = reflectMinutes(minutes);
    return `${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}`
}

function reflectHours(hours: number, minutes: number): number {
    var reflected = 6 + (6 - hours);
    if (minutes !== 0) { reflected-- };
    return reflected < 1 ?  12 + reflected : reflected;
}
function reflectMinutes(minutes: number): number {
    return 30 + (30 - minutes) === 60 ? 0 : 30 + (30 - minutes);
}