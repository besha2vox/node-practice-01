const fs = require('fs').promises;
const path = require('path');
const chalk = require('chalk');
const { dataValidator } = require('./helpers/dataValidator');
const { checkExtation } = require('./helpers/checkExtension');

const log = console.log;

const getFiles = async (req, res, next) => {
    const pathDir = path.join(__dirname, 'files');
    try {
        const dirFiles = await fs.readdir(pathDir);
        if (!dirFiles.length) {
            res.status(404).json({ message: 'No files' });
            return;
        }
        res.status(200).json({ dirFiles });
    } catch (error) {
        next(error);
    }
};

const createFile = async (req, res, next) => {
    const result = dataValidator(req.body);
    const { error } = result;
    if (error) {
        const message = `Please specify ${error.details[0].context.key}`;
        res.status(400).json({ message });
        return;
    }

    const { result: isContains, fileExtantion } = checkExtation(
        req.body.fileName
    );
    if (!isContains) {
        const message = `This app doesn't support files with ${fileExtantion} extantions`;
        res.status(400).json({ message });
        return;
    }

    try {
        console.log(path.join(__dirname, 'files', req.body.fileName));
        await fs.writeFile(
            path.join(__dirname, 'files', req.body.fileName),
            req.body.content
        );
        res.status(201).json({
            message: 'File was successfully created',
        });
    } catch (error) {
        next(error);
    }
};

const getFile = async (req, res, next) => {
    const { fileName } = req.params;

    try {
        const pathDir = path.join(__dirname, 'files');
        const dir = await fs.readdir(pathDir);
        const isContains = dir.includes(fileName);

        if (!isContains) {
            res.status(404).json({
                message: `File with name ${fileName} not found`,
            });
            return;
        }

        const file = await fs.readFile(
            path.join(__dirname, 'files', fileName),
            'utf-8'
        );

        const fileNameSplited = fileName.split('.');
        fileNameSplited.splice(fileNameSplited.length - 1, 1);
        const name = fileNameSplited.join('');
        const extention = fileNameSplited[fileNameSplited.length - 1];

        const stats = await fs.stat(path.join(__dirname, 'files', fileName));
        const size = stats.size;
        const uploadData = stats.birthtime.toString();
        res.status(200).json({
            fileName: name,
            extention,
            content: file,
            size,
            uploadData,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { createFile, getFiles, getFile };
