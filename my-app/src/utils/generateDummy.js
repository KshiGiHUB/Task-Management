export const generateDescription = () => {
    const description = [
        "This task needs to be completed soon.",
        "Please review and update the details.",
        "Work in progress. Requires follow-up.",
        "Assigned task. Pending completion.",
        "High priority task. Complete ASAP.",
        "Low priority task. Can be done later.",
        "Review the requirements and start accordingly.",
        "Discuss with the team before proceeding.",
    ]
    return description[Math.floor(Math.random() * description.length)]
}

export const generateRandomDate = () => {
    const today = new Date()
    const randomDays = Math.floor(Math.random() * 30) + 1
    const dueDate = new Date(today)
    dueDate.setDate(today.getDate + randomDays)

    return dueDate.toISOString().split("T")[0]
}