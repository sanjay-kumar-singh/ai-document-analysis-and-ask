const { parseDocument } = require('../utils/parser');
const OllamaService = require('../services/ollamaService');
const config = require('../config');

class DocumentController {
    constructor() {
        this.ollamaService = new OllamaService(config.OLLAMA_API_URL);
    }

    async uploadDocument(req, res) {
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'Please choose a PDF or DOCX file.' });
        }

        try {
            const content = await parseDocument(req.file.path);
            req.app.locals.documentContent = content;

            return res.json({
                success: true,
                message: 'Document uploaded successfully',
                fileName: req.file.originalname,
                contentLength: content.length,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, error: 'Error uploading document', detail: error.message });
        }
    }

    async askQuestion(req, res) {
        const { question = '' } = req.body;
        const content = req.app.locals.documentContent || '';

        if (!question.trim()) {
            return res.status(400).json({ success: false, error: 'Please provide a question.' });
        }

        if (!content) {
            return res.status(400).json({ success: false, error: 'Please upload a document first.' });
        }
        console.log('Received question:', question);
        console.log('Document content length:', content);

        try {
            const response = await this.ollamaService.askQuestion(question, content);
            return res.json({ success: true, answer: response.answer || 'No answer returned.' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, error: 'Error processing question', detail: error.message });
        }
    }
}

module.exports = DocumentController;