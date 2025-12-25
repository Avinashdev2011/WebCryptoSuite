# 🔐 WebCryptoSuite V14.0

![Status](https://img.shields.io/badge/Status-Online-0aff0a?style=for-the-badge)
![Security](https://img.shields.io/badge/Security-Client--Side-00f0ff?style=for-the-badge)
![UI](https://img.shields.io/badge/Theme-Cyberpunk-ff0099?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-bd00ff?style=for-the-badge)

> **Advanced Client-Side Cryptography & Analysis Tools.**
>
> Identify hashes, encrypt data with military-grade algorithms, test password strength, and generate RSA keys—all wrapped in a high-fidelity, animated Cyberpunk interface.

---

## ⚡ Overview

**WebCryptoSuite** is a zero-knowledge, browser-based cryptography toolkit. Unlike other online tools that send your data to a server to be processed (posing a security risk), WebCryptoSuite performs all calculations **locally in your browser** using JavaScript.

**No data ever leaves your device.**

The interface is designed with a "Hacker/Sci-Fi" aesthetic, featuring:
* CRT Scanline overlays.
* Holographic Glassmorphism.
* Data Breach Particle Cursor.
* Glitch Typography.

---

## 🛠 System Modules (Features)

### 1. 🔍 Algorithm Identifier
Paste any unknown string, hash, or key. The heuristic engine analyzes length, character sets, and prefixes to identify the likely algorithm.
* **Detects:** MD5, SHA-1/256/512, Bcrypt, RSA PEM Keys, Hex, Base64.
* **Output:** Confidence level, bit length, and security notes.

### 2. #️⃣ Hash Generator & Verifier
Create one-way fingerprints of text data. Includes a built-in comparison tool to verify integrity.
* **Algorithms:** SHA-1, SHA-224, SHA-256, SHA-384, SHA-512, SHA-3 (Keccak), RIPEMD-160, MD5.
* **Features:** Instant generation, case-insensitive comparison logic.

### 3. 🛡️ Password Vault
Test password hashing using industry-standard protocols.
* **Algorithm:** **Bcrypt** (Salted & Key Stretched).
* **Functions:** Generate secure hash (Register simulation), Verify password against hash (Login simulation).

### 4. 🔐 Symmetric Encryption
Encrypt text using a shared secret key.
* **Block Ciphers:** AES (Advanced Encryption Standard), DES, TripleDES.
* **Stream Ciphers:** Rabbit, RC4, RC4Drop.
* **Features:** Full encrypt/decrypt cycle with validation checking.

### 5. 🔑 Asymmetric Encryption (RSA)
Public-key cryptography suite.
* **Keygen:** Generate 1024-bit RSA Public/Private key pairs locally.
* **Encrypt:** Use Public Key to lock messages.
* **Decrypt:** Use Private Key to unlock messages.

---

## 🎨 UI/UX Features

* **Data Breach Cursor:** A custom cursor that leaves a trail of falling Hexadecimal code and symbols.
* **Reactive Dropdowns:** Smart cursor switching ensures native OS usability on select menus.
* **Holographic UI:** Glass panels with scanning light beams.
* **Neon Feedback:** Input fields and buttons glow upon interaction.
* **Copy Utilities:** Integrated holographic copy buttons for all output fields.

---

## 🚀 Installation & Usage

Since this is a client-side static application, **no server setup or Node.js build is required.**

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/yourusername/WebCryptoSuite.git](https://github.com/yourusername/WebCryptoSuite.git)
    ```
2.  **Run the App:**
    Simply double-click `index.html` to open it in your web browser.

    *Alternatively, use a live server extension in VS Code for the best experience.*

---

## 📚 Tech Stack

* **Core:** HTML5, CSS3 (Custom Variables & Keyframes), Vanilla JavaScript (ES6+).
* **Styling:** Custom CSS + TailwindCSS (CDN for utility classes).
* **Icons:** FontAwesome 6.4.
* **Crypto Engines:**
    * `Crypto-JS` (Hashing & Symmetric).
    * `Bcrypt.js` (Password Hashing).
    * `JSEncrypt` (RSA Keygen & Asymmetric).

---

## ⚠️ Security Disclaimer

While **WebCryptoSuite** uses industry-standard libraries (`CryptoJS`, `JSEncrypt`), it is a client-side web application.
1.  **Zero-Knowledge:** No data is sent to any server. It runs entirely in your browser's memory.
2.  **Use Case:** Ideal for educational purposes, quick hashing, checking integrity, or generating non-critical keys.
3.  **Warning:** For high-stakes production security (e.g., banking, government secrets), always use offline, air-gapped, or backend-audited solutions.

---

## 👨‍💻 Author

**Engineered By:** Harshawardhan Kale
* **Version:** 14.0 // FINAL_FIX
* **Theme:** Cyberpunk / Sci-Fi Interface
