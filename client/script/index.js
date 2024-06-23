const user = { id: '', userName: '' }

class FormLogin {
  chatContainer = null
  loginContainer = null
  formLogin = null
  inputField = null

  constructor(loginContainer, chatContainer, formLogin, inputField) {
    this.loginContainer = loginContainer
    this.formLogin = formLogin
    this.inputField = inputField
    this.chatContainer = chatContainer
  }

  addEvents() {
    this.formLogin.addEventListener("submit", this.onSubmit.bind(this))
  }

  onSubmit(e) {
    e.preventDefault()
    const userName = (inputField.value).trim()

    user.userName = userName
    this.loginContainer.style.display = "none"
    this.chatContainer.style.display = "flex"

    chat.connect()
    chat.setEvents()
  }
}

class Chat {
  urlServerWs = null
  ws = null

  constructor(urlServerWs) {
    this.urlServerWs = urlServerWs
  }

  connect() {
    this.ws = new WebSocket(urlServerWs)
    this.ws.onopen = ((event) => {
      console.log("Conexão aberta com o servidor")
    })

    this.ws.onmessage = (event) => this.processMessage(event)
  }

  setEvents() {
    const sendButton = document.getElementById('sendButton')
    const messageInput = document.getElementById('messageInput')
    const chatMessages = document.getElementById('chatMessages')
    sendButton.addEventListener('click', () => {
      const message = (messageInput.value).trim()

      chat.sendMessage("message", message)
    })
  }

  sendMessage(type, text) {
    if (!this.ws.OPEN) return console.log("A conexão deve ser iniciada!")

    const msg = {
      userName: user.userName,
      type: type,
      text: String(text),
      id: crypto.randomUUID(),
      date: Date.now(),
    }

    const strMsg = JSON.stringify(msg)
    this.ws.send(strMsg)
  }

  processMessage(event) {
    const message = JSON.parse(event.data)
    const messageElement = document.createElement('div')
    messageElement.classList.add('message')
    messageElement.textContent = `${message.userName} - ${message.text}`
    chatMessages.appendChild(messageElement)
    messageInput.value = ''
    chatMessages.scrollTop = chatMessages.scrollHeight
  }
}

const loginContainer = document.querySelector('.form-container')
const formLogin = document.querySelector('.simple-form')
const inputField = document.querySelector('#inputField')

const chatContainer = document.querySelector('.chat-container')

const port = 3000
const urlServerWs = `ws://localhost:${port}`
const chat = new Chat(urlServerWs)

const login = new FormLogin(loginContainer, chatContainer, formLogin, inputField)
login.addEvents()

