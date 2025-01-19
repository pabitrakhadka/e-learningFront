const timeAgo = (inputDate) => {
    const date = new Date(inputDate); // Ensure input is converted to a Date object
    if (isNaN(date.getTime())) {
        throw new Error("Invalid date input");
    }

    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000); // Difference in seconds



    if (diffInSeconds < 60) {
        return `${diffInSeconds} second${diffInSeconds > 1 ? "s" : ""} ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays <= 6) {
        return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    }

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) {
        return `${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""} ago`;
    }

    return `on ${date.toLocaleDateString()}`;
};

export { timeAgo };
