"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mail_1 = __importDefault(require("@sendgrid/mail"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
// Setup SendGrid
mail_1.default.setApiKey(process.env.SENDGRID_API_KEY || '');
const senderEmail = process.env.SENDER_EMAIL || 'no-reply@yourdomain.com';
// Health check route
app.get('/test', (req, res) => {
    res.json({
        message: 'API test successful',
        timestamp: new Date().toISOString(),
    });
});
// Monday email
app.post('/email/monday', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const msg = {
        to: 'jacksonbishop2@gmail.com', // Replace for testing
        from: senderEmail,
        subject: 'What are your top 3 priorities this week?',
        text: 'Please reply with your top 3 predicted priorities for this week.',
    };
    try {
        yield mail_1.default.send(msg);
        res.status(200).json({ message: 'Monday email sent' });
    }
    catch (err) {
        const error = err;
        console.error('SendGrid error:', ((_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.body) || error);
        res.status(500).json({ error: 'Failed to send Monday email' });
    }
}));
// Friday email
app.post('/email/friday', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const msg = {
        to: 'jacksonbishop2@gmail.com', // Replace for testing
        from: senderEmail,
        subject: 'What were your top 3 priorities this week?',
        text: 'Please reply with your actual top 3 priorities from this week.',
    };
    try {
        yield mail_1.default.send(msg);
        res.status(200).json({ message: 'Friday email sent' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to send Friday email' });
    }
}));
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
