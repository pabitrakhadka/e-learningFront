import NepaliDate from 'nepali-date-converter';

const NepaliDateConverter = (date) => {
    // Parse the input date and adjust for Nepali time
    const localDate = new Date(date);

    // Convert the JavaScript Date object to Nepali date
    const nepaliDate = new NepaliDate(localDate);

    // Return the formatted Nepali date in the desired format
    return nepaliDate.format('YYYY MMMM DD') + ' गते';  // Expected: २०८२ फागुन १४ गते
};

export default NepaliDateConverter;
