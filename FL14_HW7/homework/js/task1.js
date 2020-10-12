const maxPercentage = 100;
const precision = 2;
function task1() {
    const allBatteries = parseFloat(prompt('Please enter amount of batteries'))

    if (!verify(allBatteries)) {
        alert('Invalid input data')
        return
    }
    const percentOfDefectiveBatteries = parseFloat(prompt('Please enter amount of defective batteries'))
    if (!verify(percentOfDefectiveBatteries) || percentOfDefectiveBatteries > maxPercentage) {
        alert('Invalid input data')
        return
    }
    const defectiveBatteries = allBatteries * percentOfDefectiveBatteries / maxPercentage
    const workingBatteries = allBatteries - defectiveBatteries
    let message = `Amount of batteries: ${allBatteries.toFixed(precision)}\n`
    message += `Defective rate: ${percentOfDefectiveBatteries.toFixed(precision)}%\n`
    message += `Amount of defective batteries: ${defectiveBatteries.toFixed(precision)}\n`
    message += `Amount of working batteries: ${workingBatteries.toFixed(precision)}`
    alert(message)
}
function verify(prompt) {
    return !prompt.isNaN && prompt >= 0
}
