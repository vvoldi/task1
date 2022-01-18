export const controller = async (url, method = "GET", obj) => {
    let options = {
        method: method,
    };

    if (obj) {
        options.body = JSON.stringify(obj);
        options.headers = {
            "Content-Type": "application/json",
        };
    }

    let request = await fetch(url, options),
        response = await request.ok ? request.json() : {};
        
    return response;
}