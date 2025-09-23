# Contributing to Ayurleaf

Thank you for showing interest in contributing to **Ayurleaf**!  
We welcome contributions of all kinds whether it's fixing bugs, adding new features, improving documentation, or helping with testing.  

Please take a moment to review this guide to make the contribution process smooth and effective.

---

## 🛠️ How to Contribute

### 1. Fork the Repository
- Click on the **Fork** button at the top-right of this repository to create your own copy.

### 2. Clone Your Fork
```bash
git clone https://github.com/<your-username>/Aurleaf.git
cd Aurleaf
```
### 3. Set Up the Project

Frontend
```bash
cd Frontend
npm install
npm run dev
```
Backend
```bash
cd backend
npm install
npm start
```
```bash
Make sure you configure your environment variables in a .env file inside the backend folder:

PORT=3000
MONGODB_URI=your_mongodb_connection_url
```
### 4. Create a New Branch

Before making changes, create a branch:
```bash
git checkout -b feature/your-feature-name
```
 ### 5. Make Your Changes

Add your feature, fix a bug, or improve documentation.

Ensure your code follows the project’s coding standards.

### 6. Commit Your Changes

Write clear and descriptive commit messages:
```bash
git add .
git commit -m "Add: implemented location-based search filter"
```
### 7. Push Your Branch
```bash
git push origin feature/your-feature-name
```
### 8. Create a Pull Request (PR)
```bash
Go to the original repository on GitHub.

Click on Pull Request → New Pull Request.

Select your branch and submit the PR with a clear description of the changes.
```
## 💡 Contribution Guidelines

Write clean, maintainable, and well-documented code.

Use meaningful commit messages (e.g., "Fix: booking system bug" instead of "fixed stuff").

Test your code before submitting a PR.

Keep PRs small and focused — one feature/fix per PR.

Update relevant documentation if your changes affect usage.

## 🌟  Areas You Can Contribute

Frontend: UI improvements, responsiveness, new components.

Backend: APIs, database integrations, authentication.

AI Features: Enhancing chatbot, improving personalized health assistance.

Documentation: Improving README, adding examples, or clarifying setup steps.

Bug Fixes: Identifying and resolving issues.

## 🧑‍🤝‍🧑 Code of Conduct

Please be respectful and professional in all interactions.
We follow a Code of Conduct to maintain a welcoming and inclusive environment for everyone.

## 🙌 Need Help?

If you face any issues while contributing:

Check the existing Issues
.

Open a new issue if your problem is not listed.

You can also start a discussion or reach out via the repository.

## 💖 A Big Thank You

Every contribution big or small is valuable and appreciated.
By contributing to Ayurleaf, you’re helping build a platform that makes Ayurvedic healthcare more accessible to everyone. 🌿
