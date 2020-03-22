export default (path, method) => {
    const URL = "http://api.brainers.xyz:80" + path;
    fetch(URL, {
            method: method
        })
        .then(response => response.json())
}