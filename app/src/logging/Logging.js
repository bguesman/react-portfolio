// Logging function that checks if console exists before logging,
// to prevent errors.
export function log(s) {
    if (console)
        console.log(s);
}