import device from 'current-device'

if(device.mobile()) {
  window.open("m.html","_self");
} else {
  window.open("desk.html","_self");
}