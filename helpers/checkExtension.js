const checkExtation = (fileName) => {
    const EXTENTIONS = ['txt', 'css', 'json', 'js', 'yaml', 'html'];
    const splitedFileName = fileName.split('.');
    const fileExtantion = splitedFileName[splitedFileName.length - 1];
    const result = EXTENTIONS.some((el) => el === fileExtantion);
    console.log({ result, fileExtantion });
    return { result, fileExtantion };
};

module.exports = { checkExtation };
