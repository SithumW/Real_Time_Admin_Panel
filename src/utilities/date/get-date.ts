import dayjs from "dayjs"

// Helper function to format event dates
const getDate = (startDate: string, endDate: string) => {
  const start = dayjs(startDate).format('MMM DD')
  const end = dayjs(endDate).format('MMM DD')
  
  if (start === end) {
    return start
  }
  
  return `${start} - ${end}`
}

export default getDate;