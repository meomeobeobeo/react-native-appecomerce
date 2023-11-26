export const timeOutApiCall = ({ apiPromise, timeoutMs }) => {
    // Create a timeout promise
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error('API call time out.'))
        }, timeoutMs)
    })

    // Race between the api promise and the timeout promise
    return Promise.race([apiPromise, timeoutPromise])
}
