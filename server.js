const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { Client } = require('@notionhq/client');
const tesseract = require('tesseract.js');
const PDFDocument = require('pdfkit');
<<<<<<< HEAD
const WebSocket = require('ws');
const http = require('http');
require('dotenv').config();

// Create HTTP server
const server = http.createServer(app);

// Initialize WebSocket server
const wss = new WebSocket.Server({ server });

// WebSocket connection handler
wss.on('connection', (ws) => {
    console.log('New WebSocket connection');
    
    ws.on('message', (message) => {
        // Handle incoming messages
        console.log('Received:', message);
        
        // Broadcast to all connected clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
    
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Real-time notification system
const notifyClients = (type, data) => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type, data }));
        }
    });
};

=======
require('dotenv').config();

>>>>>>> 4c7bd23a480803b914367abbdfa6b801dcf51b59
// Configure Notion client
const notion = new Client({ auth: process.env.NOTION_API_KEY });

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Service Request Schema
const serviceRequestSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    serviceType: { type: String, required: true },
    details: { type: String, required: true },
    status: { type: String, default: 'pending' },
    dpiDocument: {
        path: String,
        extractedData: {
            name: String,
            dpiNumber: String,
            birthDate: Date
        }
    },
    notionPageId: String,
    pdfPath: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const ServiceRequest = mongoose.model('ServiceRequest', serviceRequestSchema);

// Authentication Middleware
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.userId });
        
        if (!user) {
            throw new Error();
        }
        
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

// Routes
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        const hashedPassword = await bcrypt.hash(password, 8);
        
        const user = new User({
            name,
            email,
            password: hashedPassword,
            phone
        });
        
        await user.save();
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid login credentials');
        }
        
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.send({ user, token });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.post('/api/service-requests', auth, upload.single('dpiDocument'), async (req, res) => {
    try {
        // Process uploaded DPI document with OCR
        const { data } = await tesseract.recognize(req.file.path, 'spa');
        
        // Extract relevant information from OCR result
        const extractedData = await processOCRData(data);
        
        // Generate PDF
        const pdfPath = await generatePDF(extractedData, req.body.serviceType);
        
        // Create service request
        const serviceRequest = new ServiceRequest({
            ...req.body,
            userId: req.user._id,
            dpiDocument: {
                path: req.file.path,
                extractedData
            },
            pdfPath
        });
        
        // Save to Notion
        const notionPage = await createNotionPage(serviceRequest);
        serviceRequest.notionPageId = notionPage.id;
        
        await serviceRequest.save();
        
        // Send notification
        await sendNotification(req.user, serviceRequest);
        
<<<<<<< HEAD
        // Notify all connected clients about the new service request
        notifyClients('newServiceRequest', {
            id: serviceRequest._id,
            type: serviceRequest.serviceType,
            status: serviceRequest.status,
            createdAt: serviceRequest.createdAt
        });
        
=======
>>>>>>> 4c7bd23a480803b914367abbdfa6b801dcf51b59
        res.status(201).send(serviceRequest);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/api/service-requests', auth, async (req, res) => {
    try {
        const serviceRequests = await ServiceRequest.find({ userId: req.user._id })
            .sort({ createdAt: -1 });
        res.send(serviceRequests);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Admin routes
app.get('/api/admin/service-requests', auth, async (req, res) => {
    try {
        // Add admin check here
        const serviceRequests = await ServiceRequest.find()
            .populate('userId')
            .sort({ createdAt: -1 });
        res.send(serviceRequests);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.patch('/api/admin/service-requests/:id', auth, async (req, res) => {
    try {
        const serviceRequest = await ServiceRequest.findById(req.params.id);
        if (!serviceRequest) {
            return res.status(404).send();
        }
        
        // Update status
        serviceRequest.status = req.body.status;
        serviceRequest.updatedAt = new Date();
        
        // Update Notion
        await updateNotionPage(serviceRequest);
        
        // Send notification about status update
        await sendNotification(await User.findById(serviceRequest.userId), serviceRequest);
        
        await serviceRequest.save();
        res.send(serviceRequest);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Helper functions
async function processOCRData(data) {
    // Implement OCR data processing logic
    return {
        name: '', // Extract name from OCR data
        dpiNumber: '', // Extract DPI number from OCR data
        birthDate: null // Extract birth date from OCR data
    };
}

async function generatePDF(data, serviceType) {
    const doc = new PDFDocument();
    const pdfPath = `./uploads/${Date.now()}-document.pdf`;
    doc.pipe(fs.createWriteStream(pdfPath));
    
    // Add content to PDF
    doc.fontSize(16).text('Solicitud de Trámite', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Tipo de Servicio: ${serviceType}`);
    doc.text(`Nombre: ${data.name}`);
    doc.text(`DPI: ${data.dpiNumber}`);
    doc.text(`Fecha de Nacimiento: ${data.birthDate}`);
    
    doc.end();
    return pdfPath;
}

async function createNotionPage(serviceRequest) {
    return await notion.pages.create({
        parent: { database_id: process.env.NOTION_DATABASE_ID },
        properties: {
            'Nombre': { title: [{ text: { content: serviceRequest.dpiDocument.extractedData.name } }] },
            'DPI': { rich_text: [{ text: { content: serviceRequest.dpiDocument.extractedData.dpiNumber } }] },
            'Tipo de Servicio': { select: { name: serviceRequest.serviceType } },
            'Estado': { select: { name: serviceRequest.status } },
            'Fecha': { date: { start: serviceRequest.createdAt.toISOString() } }
        }
    });
}

async function updateNotionPage(serviceRequest) {
    if (serviceRequest.notionPageId) {
        await notion.pages.update({
            page_id: serviceRequest.notionPageId,
            properties: {
                'Estado': { select: { name: serviceRequest.status } },
                'Última Actualización': { date: { start: serviceRequest.updatedAt.toISOString() } }
            }
        });
    }
}

async function sendNotification(user, serviceRequest) {
    // TODO: Implement email/WhatsApp notification
    console.log(`Notification sent to ${user.email} for service request ${serviceRequest._id}`);
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});