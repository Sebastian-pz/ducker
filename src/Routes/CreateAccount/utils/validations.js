// email: '',
// fullname: '',
// nickname: '',
// password: ''

export function noSpecialCharacters(string) {
  const validation = [...string.matchAll(/[A-Za-z0-9]/g)]
  if (validation.length < string.length) return false
  return true
}

export function noBanWords(wordToCompare) {
  const banWords = [' ', 'admin', 'ducker', 'staff', 'moderator']

  banWords.forEach(word => {
    if (wordToCompare.toLowerCase().includes(word)) {
      return false
    }
  })

  return true
}

export function isValidEmail(email) {
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  if (email.match(validRegex)) return true
  return false
}

export function isValidFullname(fullname) {
  if (fullname.split(' ').length <= 1) return false
  if (noBanWords(fullname)) return false
  return true
}

export function isValidPassword(password) {
  if (password.length < 6) return false
  if (!noSpecialCharacters(password)) return false
}

export function isValidNickname(nickname) {
  // Comprobar si existe en la base de datos
  if (nickname.length <= 1) return false
  if (!noSpecialCharacters(nickname)) return false
}
