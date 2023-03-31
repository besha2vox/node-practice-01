const express = require('express');
const { createFile, getFiles, getFile } = require('./files');

const router = express.Router();

router.get('/', getFiles);

router.get('/:fileName', getFile);

router.post('/', createFile);

module.exports = router;
