export function deepEquals(a, b) {
  if (a === b) return true

  const arrA = Array.isArray(a)
  const arrB = Array.isArray(b)
  let i

  if (arrA && arrB) {
    if (a.length !== b.length) return false
    for (i = 0; i < a.length; i++) if (!deepEquals(a[i], b[i])) return false
    return true
  }

  if (arrA !== arrB) return false

  if (a && b && typeof a === 'object' && typeof b === 'object') {
    const keys = Object.keys(a)
    if (keys.length !== Object.keys(b).length) return false

    const dateA = a instanceof Date
    const dateB = b instanceof Date
    if (dateA && dateB) return a.getTime() === b.getTime()
    if (dateA !== dateB) return false

    const regexpA = a instanceof RegExp
    const regexpB = b instanceof RegExp
    if (regexpA && regexpB) return a.toString() === b.toString()
    if (regexpA !== regexpB) return false

    for (i = 0; i < keys.length; i++) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false

    for (i = 0; i < keys.length; i++) if (!deepEquals(a[keys[i]], b[keys[i]])) return false

    return true
  }

  return false
}

export function isJson(str) {
  try {
    if (JSON.parse(str)) return true
  } catch (e) {
    return false
  }
}

export const isObject = (thing) => typeof thing === 'object'

export const isString = (thing) => typeof thing === 'string'

class Hdrs {
  constructor(headers = {}) {
    this.headers = headers
  }

  append(name, value) {
    this.headers = { ...this.headers, name: value }
  }

  delete(name) {
    delete this.headers[name]
  }

  get(name) {
    return this.headers[name]
  }

  set(obj = {}) {
    this.headers = obj
  }
}

export { TinyUri } from '@savvagent/tiny-uri'
