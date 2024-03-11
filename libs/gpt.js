import { ChatGPTAPI } from 'chatgpt'

async function example() {
  const api = new ChatGPTAPI({
    apiKey: ''
  })

  const res = await api.sendMessage('Hello chatgpt!,balas saya dalam bahasa indonesia')
  console.log(res.text)
}
example()