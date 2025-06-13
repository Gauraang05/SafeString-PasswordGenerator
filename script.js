document.addEventListener('DOMContentLoaded', (event) => {
    // Function to generate a random password
    function generatePassword(length, options) {
        const alpha = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*_-+=';
        let chars = '';
        let password = '';

        if (options.includeAlphabets) {
            chars += options.includeUppercase ? alpha + alpha.toUpperCase() : alpha;
        }
        if (options.includeNumbers) chars += numbers;
        if (options.includeSpecialChars) chars += symbols;

        if (chars.length === 0) return '';

        // Ensuring no duplicate characters if the option is unchecked
        while (password.length < length) {
            let char = chars[Math.floor(Math.random() * chars.length)];
            if (options.excludeDuplicates && password.includes(char)) continue;
            password += char;
        }

        return password;
    }

    // Function to calculate the entropy of the password
    function calculateEntropy(password) {
        const uniqueChars = new Set(password).size;
        const entropy = Math.log2(Math.pow(uniqueChars, password.length)).toFixed(2);

        return entropy;
    }

    // Function to update the entropy display
    function updateEntropyDisplay(entropy) {
        const entropyField = document.getElementById('entropyValue');
        entropyField.value = entropy;
        // Update the label for password strength
        let strengthLabel = 'Weak';
        if (entropy < 25) strengthLabel = 'Easy';
        else if (entropy >= 25 && entropy <= 50) strengthLabel = 'Medium';
        else if (entropy > 50) strengthLabel = 'Strong';

        entropyField.nextElementSibling.textContent = `Strength: ${strengthLabel}`;
    }

    // Function to copy the password to the clipboard
    function copyToClipboard() {
        const passwordField = document.getElementById('password');
        passwordField.select();
        document.execCommand('copy');
    }

    // Event listener for the generate button
    const generateButton = document.getElementById('generateButton');
    generateButton.addEventListener('click', () => {
        const length = document.getElementById('passwordLength').value;
        const passwordOptions = {
            includeAlphabets: document.getElementById('includeAlphabets').checked,
            includeSpecialChars: document.getElementById('includeSpecialChars').checked,
            includeNumbers: document.getElementById('includeNumbers').checked,
            includeUppercase: document.getElementById('includeUppercase').checked,
            includeLowercase: document.getElementById('includeLowercase').checked,
            excludeDuplicates: document.getElementById('excludeDuplicates').checked
        };

        const password = generatePassword(length, passwordOptions);
        document.getElementById('password').value = password;
        const entropy = calculateEntropy(password);
        updateEntropyDisplay(entropy);
    });

    // Initial password generation on page load
    generateButton.click();

    // Attach the copy to clipboard function to the copy button
    document.getElementById('copyButton').addEventListener('click', copyToClipboard);
});