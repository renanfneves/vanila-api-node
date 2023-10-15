import { Readable } from 'node:stream'
import axios from 'axios'

class OneToHundredStream extends Readable {
  index = 1

  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 5) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))

        this.push(buf)
      }
    }, 1000)
  }
}

axios.post('http://localhost:3334', new OneToHundredStream()).then(response => {
  console.log(response.data)
})