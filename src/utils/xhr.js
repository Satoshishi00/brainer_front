export default (path, method) => {
    const URL = "http://127.0.0.1:8000" + path;
    fetch(URL, {
            method: method
        })
        .then(response => response.json())
}