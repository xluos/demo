import './index.css'

const $ = e => document.querySelector(e)

$('.reload').addEventListener('click', () => $('iframe').contentWindow.location.reload(true))
