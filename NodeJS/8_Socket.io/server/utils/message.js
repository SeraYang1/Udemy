var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT")
  }
}

module.exports = {generateMessage}
