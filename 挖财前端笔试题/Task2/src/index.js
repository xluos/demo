import './css/index.css'
import $ from 'jquery'
import 'cropper'
import 'cropper/dist/cropper.css'
import img from './images/bg.jpg'

var $downloadBtn = $('#download')
const $image = $('#image')
$image.attr('src',img)

function setDownloadFile() {
  $image.cropper('getCroppedCanvas',{
    width: 100,
    height: 100,
    color: '#ffffff'
  }).toBlob((e)=>{
    $downloadBtn.attr('href',URL.createObjectURL(e))
  })
}
$image.on({
  cropend: function (e) {
    setDownloadFile()
  }
}).cropper({
    aspectRatio: 1 / 1,
    preview: '#imgview',
    viewMode: 1
});
