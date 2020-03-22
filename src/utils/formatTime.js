export default (date) => {
    const hours = date.getHours();
    const min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const day = new Intl.DateTimeFormat('en-GB').format(date);
    return hours + ':' + min + ' ' + day;
}