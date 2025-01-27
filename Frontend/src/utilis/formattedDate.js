const dateDifference = date => {
    const createdDate = new Date(date)
    const now = new Date()

    const differenceInMs = now - createdDate
    const seconds = Math.floor(differenceInMs / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const months = Math.floor(days / 30) // Approximate month length
    const years = Math.floor(days / 365) // Approximate year length

    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} ago`
    } else if (months > 0) {
      return `${months} month${months > 1 ? 's' : ''} ago`
    } else if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
    } else {
      return `just now`
    }
  }

  export default dateDifference