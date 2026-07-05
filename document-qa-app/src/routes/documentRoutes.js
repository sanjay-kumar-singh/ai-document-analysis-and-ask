const DocumentController = require('../controllers/documentController');
const upload = require('../middleware/uploadMiddleware');

const setDocumentRoutes = (app) => {
    const documentController = new DocumentController();

    app.post('/upload', upload.single('file'), documentController.uploadDocument.bind(documentController));
    app.post('/ask', documentController.askQuestion.bind(documentController));
};

module.exports = setDocumentRoutes;