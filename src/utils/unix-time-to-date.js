const useUnixToDate = (unixtime, format) => {
    const timestamp = unixtime * 1000;
    const date = new Date(timestamp);

    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : (date.getMonth() + 1);
    const year = date.getFullYear();

    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

    switch(format) {
        case 'toDate':
            return `${day}.${month}.${year}`;
        case 'toDateTime':
            return `${day}.${month}.${year}  ${hours}:${minutes}`;
        case 'toTime':
            return `${hours}:${minutes}`;
        default:
            return `${day}.${month}.${year}`;
    }
}

export default useUnixToDate;