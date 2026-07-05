const fs = require('fs');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');

const parsePDF = (filePath) => {
    return new Promise((resolve, reject) => {
        const dataBuffer = fs.readFileSync(filePath);
        pdf(dataBuffer)
            .then((data) => resolve(data.text))
            .catch(reject);
    });
};

const parseDOCX = async (filePath) => {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
};

const parseDocument = async (filePath) => {
    const fileExtension = filePath.split('.').pop().toLowerCase();
    if (fileExtension === 'pdf') {
        return await parsePDF(filePath);
    } else if (fileExtension === 'docx' || fileExtension === 'doc') {
        return await parseDOCX(filePath);
    } else {
        throw new Error('Unsupported file type');
    }
};

module.exports = {
    parseDocument,
};