export function formatNumberWithCommas(numberAsString) {
    let numbericValue = parseInt(numberAsString, 10)
    return numbericValue.toLocaleString('en-US')
}
