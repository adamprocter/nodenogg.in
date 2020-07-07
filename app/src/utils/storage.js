import { unique } from '@/utils'
import pkg from '../../package.json'

const LOCALSTAGE_PREFIX = `nodenoggin_${pkg.version}`

const localStorageKey = (key) => `${LOCALSTAGE_PREFIX}__${key}`

export const get = (prop, fallback) => {
  const value = localStorage.getItem(localStorageKey(prop))
  if (value && JSON.parse(value)) {
    return JSON.parse(value)
  } else {
    return fallback
  }
}

export const set = (prop, value) => {
  localStorage.setItem(localStorageKey(prop), JSON.stringify(value))
}

export const addToArray = (prop, value) => {
  const current = get(prop)
  if (current && Array.isArray(current)) {
    set(prop, unique([...current, value]))
  } else {
    set(prop, [value])
  }
}

export const removeFromArray = (prop, value) => {
  const current = get(prop)
  if (current && Array.isArray(current)) {
    set(
      prop,
      current.filter((i) => i !== value)
    )
  }
}

export const remove = (prop) => {
  localStorage.removeItem(localStorageKey(prop))
}
