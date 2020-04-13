import { isClient } from '@/experimental/utils/helpers'

export const width = isClient ? window.innerWidth : 1000

export const height = isClient ? window.innerHeight : 1000
