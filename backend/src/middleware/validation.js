// Simple validation helpers
const validateEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
};

const validatePassword = (password) => {
    // At least 6 characters
    return password && password.length >= 6;
};

const validateRegister = (req, res, next) => {
    const { name, email, password } = req.body;

    const errors = [];

    if (!name || name.trim().length === 0) {
        errors.push('Name is required');
    }

    if (!email || !validateEmail(email)) {
        errors.push('Valid email is required');
    }

    if (!validatePassword(password)) {
        errors.push('Password must be at least 6 characters');
    }

    if (errors.length > 0) {
        return res.status(400).json({ message: 'Validation failed', errors });
    }

    next();
};

const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    next();
};

const validateTask = (req, res, next) => {
    const { title, status } = req.body;

    const errors = [];

    if (!title || title.trim().length === 0) {
        errors.push('Task title is required');
    }

    if (status && !['todo', 'in-progress', 'done'].includes(status)) {
        errors.push('Invalid status value');
    }

    if (errors.length > 0) {
        return res.status(400).json({ message: 'Validation failed', errors });
    }

    next();
};

module.exports = { validateRegister, validateLogin, validateTask };

