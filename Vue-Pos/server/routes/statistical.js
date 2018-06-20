const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check.js').checkLogin
const StatisticalModel = require('../models/statistical')



module.exports = router