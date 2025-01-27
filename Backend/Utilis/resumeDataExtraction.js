export const parseSkills = skillsRaw => {
  return skillsRaw
    ?.split('\n') // Split by newlines
    .filter(
      skill =>
        !skill.startsWith('2022/') &&
        !skill.startsWith('The') &&
        !skill.startsWith(':')
    ) // Exclude invalid lines
    .map(skill => skill.trim()) // Trim whitespace
    .filter(skill => skill.length > 0) // Exclude empty lines
}

// Function to parse education
export const parseEducation = educationRaw => {
  const lines = educationRaw.split('\n') // Split the data by newline
  const educationEntries = []
  let entry = []

  // Group lines related to each education block
  for (const line of lines) {
    if (line.trim().match(/^\d{4}\/\d{2}.*–.*$/)) {
      // New education entry starts
      if (entry.length > 0) {
        educationEntries.push(entry)
        entry = []
      }
    }
    entry.push(line.trim())
  }

  // Add the last entry if not already added
  if (entry.length > 0) {
    educationEntries.push(entry)
  }

  // Map grouped entries to structured data
  return educationEntries
    .map(entry => {
      if (entry.length >= 4) {
        return {
          startEndDate: entry[0],
          location: entry[1],
          degree: entry[2],
          institution: entry[3]
        }
      }
      return null // Ignore incomplete entries
    })
    .filter(e => e !== null) // Remove null values
}

export const parseExperience = experienceRaw => {
  const lines = experienceRaw.split('\n') // Split the data by newline
  const experienceEntries = []
  let entry = []

  // Group lines related to each experience block
  for (const line of lines) {
    if (line.trim().match(/^\d{4}\/\d{2}.*–.*$/)) {
      // New experience entry starts
      if (entry.length > 0) {
        experienceEntries.push(entry)
        entry = []
      }
    }
    entry.push(line.trim())
  }

  // Add the last entry if not already added
  if (entry.length > 0) {
    experienceEntries.push(entry)
  }

  // Map grouped entries to structured data
  return experienceEntries
    .map(entry => {
      if (entry.length >= 4) {
        return {
          startEndDate: entry[0],
          location: entry[1],
          position: entry[2],
          company: entry[3],
          project: entry.length > 4 ? entry.slice(4).join(' ') : '' // Combine additional details if present
        }
      }
      return null // Ignore incomplete entries
    })
    .filter(e => e !== null) // Remove null values
}
