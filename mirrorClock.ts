const timeFormatRegex = /^(1[0-2]|0?[1-9]):([0-5]?[0-9])$/;
const halfTotalMinutes = 60 * 6;
// first cut of function
// it works but it's funky and it isn't obvious how it works....
export function mirrorTime(time: string): string {
    var invalid = invalidInput(time);
    if (invalid) return invalid;
    // we know it's in the right format, get the hours and minutes
    var [hours, minutes] = extractTimeVariables(time);
    hours = reflectHours(hours, minutes);
    minutes = reflectMinutes(minutes);
    return `${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}`
}

// calculate hours value, different when minutes == 0
// if hours is 12 then reflected can be 0 or -1
// so add to 12 when < 1 to get 12 or 11 in response
function reflectHours(hours: number, minutes: number): number {
    var reflected = 6 + (6 - hours);
    if (minutes !== 0) { reflected-- };
    return reflected < 1 ? 12 + reflected : reflected;
}
// this is much simpler than the hours calculation as it's ok to return 0
function reflectMinutes(minutes: number): number {
    return (30 + (30 - minutes)) % 60;
}

// calculate based on total minutes since noon then format as a time
export function mirrorTime2(time: string): string {
    var invalid = invalidInput(time);
    if (invalid) return invalid;
    var [hours, minutes] = extractTimeVariables(time);
    var minutesSinceNoon = ((hours % 12) * 60) + minutes;
    // reflect time by calculating difference from 6 o'clock and inverting
    var reflectedTotalMinutes = halfTotalMinutes + (halfTotalMinutes - minutesSinceNoon);
    // now format total minutes back to a time
    return timeStringFromTotalMinutes(reflectedTotalMinutes);
}

function invalidInput(time: string): string | undefined {
    if (time.length != 5) return "invalid input";
    if (!timeFormatRegex.test(time)) return "invalid time";
}

function extractTimeVariables(time: string): number[] {
    var [hourString, minuteString] = time.split(':');
    return [+hourString, +minuteString];
}

function timeStringFromTotalMinutes(totalMinutes: number): string {
    var hours = Math.floor(totalMinutes / 60);
    // we say 12 o'clock not 0 o'clock!
    hours = hours ? hours : 12;
    var minutes = totalMinutes % 60;
    // simple format with leading 0 method
    return `${('0' + hours).slice(-2)}:${('0' + (minutes)).slice(-2)}`
}