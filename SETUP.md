# SETUP.md

## How to Run the Development Server

Follow these instructions to set up and run the development server for the DoubleDate project.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 14.x or later. You can download it from [Node.js Official Site](https://nodejs.org/).
- **Git**: Version 2.0 or later. Check [Git Official Site](https://git-scm.com/) for installation instructions.

### Installation Steps

1. **Clone the Repository**  
   Open your terminal and run:
   ```bash
   git clone https://github.com/your-username/DoubleDate-3.0.git
   cd DoubleDate-3.0
   ```

2. **Install Dependencies**  
   Once you are in the repository directory, run:
   ```bash
   npm install
   ```
   This command will install all necessary dependencies defined in the `package.json` file.

3. **Run the Development Server**  
   After the dependencies are installed, you can start the development server with:
   ```bash
   npm start
   ```
   This command typically runs the app on `http://localhost:3000`, but check your package.json scripts to confirm.

### Accessing the Application

You can access the application by navigating to the following URL in your browser:

```
http://localhost:3000
```

### Troubleshooting

- If you encounter any issues, ensure that Node.js and npm are correctly installed by running:
```bash
node -v
npm -v
```
- Ensure there are no errors in the terminal after running `npm install` and `npm start`.

### Additional Information

- For more details, refer to the documentation in the repository or contact the project maintainers.

Happy coding!