import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get('/', async (req, res) => {
  res.send({ status: 'success' })
})

app.get('/generate/:type', async (req, res) => {
  const { type } = req.params
  const { number } = req.query
  let data

  if (isNaN(Number(number))) {
    return res.status(400).send({ status: 'fail', data: '' })
  }

  const generateTriangle = (number) => {
    number = number.toString().split('')
    let string = ''
    let temp = number.map(v => {
      string += '0'
      return `${v}${string}`
    })

    return temp
  }

  const generateGanjil = (number) => {
    number = parseInt(number)
    let temp = []
    for (let i = 0; i <= number; i++) {
      if (i % 2 == 1) temp.push(i)
    }
    return temp
  }

  const generatePrima = (number) => {
    number = parseInt(number)
    let temp = []

    const isPrime = (num) => {
      if (num < 2) return false
      if (num == 2 || num == 3) return true
      for (let i = 2; i < num; i++) {
        if (num % i === 0) return false
      }
      return true
    }

    for (let i = 0; i <= number; i++) {
      if (isPrime(i)) temp.push(i)
    }
    return temp
  }

  if (type === 'triangle') {
    data = generateTriangle(number)
  } else if (type === 'ganjil') {
    data = generateGanjil(number)
  } else if (type === 'prima') {
    data = generatePrima(number)
  }

  res.send({ status: 'success', data: data })
})

app.listen(5000, '0.0.0.0', () =>
  console.log(`Server started`)
);
