import 'animate.css'
import '../css/notice'

export default class Notice {
  constructor(option) {
    this.notice = null
    this.text = null
  }
  init() {
    this.notice = document.createElement('div')
    this.text = document.createElement('div')
    this.text.id = 'notice-text'
    this.notice.id = 'notice'
    this.notice.className = 'animated none'
    this.notice.appendChild(this.text)
    document.body.appendChild(this.notice)
  }
  show(text) {
    this.text.innerText = text
    this.notice.classList.remove('none')
    this.notice.classList.add('bounceInRight')
    setTimeout(() => {
      this.notice.classList.remove('bounceInRight')
      this.notice.classList.add('fadeOutLeftBig')
      setTimeout(() => {
        this.notice.classList.add('none')
        this.notice.classList.remove('fadeOutLeftBig')        
      }, 1000);
    }, 3000);
  }
}