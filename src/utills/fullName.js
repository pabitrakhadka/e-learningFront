export const fullName = (firstName, lastName) => {
    return `${firstName} ${lastName}`;
}
export const capitalName = (name) => {
    return name
        .split(' ') // Split the string into words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
        .join(' '); // Join the words back into a single string
};


export const getIconName = (str) => {
    if (!str || typeof str !== 'string') {
        return 'A';
    }
    return str.trim().charAt(0).toUpperCase();
};
