import 'animate.css'
import '../css/notice'

export default class Notice {
  constructor(option) {
    this.notice = null
    this.text = null
    this.in = null
    this.out = null
  }
  init () {
    this.notice = document.createElement('div')
    this.text = document.createElement('div')
    this.text.id = 'notice-text'
    this.notice.id = 'notice'
    this.notice.className = 'none'
    this.notice.appendChild(this.text)
    document.body.appendChild(this.notice)
  }
  clear () {
    clearTimeout(this.in)
    clearTimeout(this.out)
    this.notice.classList.remove('animated')
    this.notice.classList.remove('bounceInRight')
    this.notice.classList.remove('fadeOutLeftBig')
    this.notice.classList.add('none')
  }
  show (text) {
    this.clear()
    setTimeout(() => {
      this.text.innerText = text
      this.notice.classList.remove('none')
      this.notice.classList.add('animated')
      this.notice.classList.add('bounceInRight')
      this.in = setTimeout(() => {
        this.notice.classList.remove('bounceInRight')
        this.notice.classList.add('fadeOutLeftBig')
        this.out = setTimeout(() => {
          this.notice.classList.add('none')
          this.notice.classList.remove('animated')
          this.notice.classList.remove('fadeOutLeftBig')
        }, 1000);
      }, 1000);
    }, 0);
  }
}