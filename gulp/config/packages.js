import { tailwind } from '../tasks/tailwind.js'

export default {
  tailwind: {
    enable: false,
    tasks: {
      html: tailwind,
      style: tailwind,
      js: tailwind,
    }
  }
}