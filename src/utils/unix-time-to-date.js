const useUnixToDate = (unixtime) => {
    const date = new Date(unixtime * 1000);

    const getCurrentDate = () => {
        const now = new Date();
        const today = `${toPretty(now.getDate())}.${toPretty(now.getMonth() + 1)}`
        const yesterday = `${toPretty(now.getDate() - 1)}.${toPretty(now.getMonth() + 1)}`
        return {today, yesterday}
    }

    const toPretty = (date) => {
        if (date < 10) return `0${date}`
        return date
    }

    const {today,yesterday} = getCurrentDate();
    
    const day = toPretty(date.getDate());
    const month = toPretty(date.getMonth() + 1);
    const year = date.getFullYear();
    
    const hours = toPretty(date.getHours())
    const minutes = toPretty(date.getMinutes())
    
    if (`${day}.${month}` === today) {
        return `today ${hours}:${minutes}`
    } else if (`${day}.${month}` === yesterday) {
        return `yesterday ${hours}:${minutes}`
    } else return `${day}.${month} ${hours}:${minutes}`
}

export default useUnixToDate;