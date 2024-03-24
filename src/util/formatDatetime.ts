export function formatDatetime(date: Date = new Date(), fsFriendly = false): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const humanReadable = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    if (fsFriendly) {
        return humanReadable.replace(/:/g, '.').replace(/ /g, '_');
    }

    return humanReadable;
}