class Util {
    static formatDate(timestamp) {
        const now = new Date();
        const date = new Date(timestamp);
        const secondsAgo = Math.floor((now - date) / 1000);

        // 1. Less than a minute
        if (secondsAgo < 60) {
            return 'Just now';
        }

        // 2. Less than an hour (Minutes)
        const minutesAgo = Math.floor(secondsAgo / 60);
        if (minutesAgo < 60) {
            return `${minutesAgo}m`;
        }

        // 3. Less than 24 hours (Hours)
        const hoursAgo = Math.floor(minutesAgo / 60);
        if (hoursAgo < 24) {
            return `${hoursAgo}h`;
        }

        // 4. Less than 7 days (Days)
        const daysAgo = Math.floor(hoursAgo / 24);
        if (daysAgo < 7) {
            return `${daysAgo}d`;
        }

        // 5. Older than 7 days -> Show absolute date
        const options = { month: 'short', day: 'numeric' };

        // Include year if the post is from a different year
        if (date.getFullYear() !== now.getFullYear()) {
            options.year = 'numeric';
        }

        return date.toLocaleDateString('en-US', options);
    }
}

export default Util;