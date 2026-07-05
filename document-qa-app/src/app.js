const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const documentRoutes = require('./routes/documentRoutes');

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Vary', 'Origin');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    return next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Set up routes
documentRoutes(app);

const startServer = (port) => {
    const server = app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });

    server.on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
            console.warn(`Port ${port} is busy. Trying ${port + 1}...`);
            return startServer(port + 1);
        }

        console.error(error);
        process.exit(1);
    });
};

startServer(PORT);