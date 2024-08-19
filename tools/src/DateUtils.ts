
export function formatDate(dateString: string): string {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    // Add the ordinal suffix to the day
    const day = date.getDate();
    const dayWithSuffix = `${day}${getOrdinalSuffix(day)}`;

    // Replace the day in the formatted string with the day with suffix
    return formattedDate.replace(day.toString(), dayWithSuffix);
}

export function getOrdinalSuffix(day: number): string {
    if (day > 3 && day < 21) return 'th'; // All days between 4 and 20 have "th"
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}
