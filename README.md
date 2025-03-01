# Currency Converter App

## ν³ Overview

This is a simple **Currency Converter Web App** built using **React.js**. It allows users to convert amounts between different currencies using real-time exchange rates.

## νΊ Features

- ν΄ **Swap Currencies** β Quickly switch between the 'From' and 'To' currencies.
- β‘ **Instant Conversion** β Convert values dynamically.
- νΌ **Live Exchange Rates** β Fetches real-time currency data.
- νΎ¨ **Modern UI** β A sleek and minimal interface.

## ν» οΈ Technologies Used

- **React.js** β Frontend framework
- **Tailwind CSS** β Styling and layout
- **Custom Hooks** β To fetch and manage currency data
- **useState & useEffect** β State management

## ν³ Folder Structure

```
Currency-Converter/
βββ src/
β   βββ components/
β   β   βββ InputBox.js      # Input field component for currency values
β   βββ hooks/
β   β   βββ useCurrencyInfo.js # Custom hook to fetch exchange rates
β   βββ App.js               # Main application logic
β   βββ index.js             # Entry point
βββ public/
βββ README.md                # Project documentation
βββ package.json             # Dependencies and scripts
```

## ν³¦ Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/currency-converter.git
   cd currency-converter
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open [**http://localhost:3000/**](http://localhost:3000/) in your browser.

## ν΄§ Usage

1. Enter the amount in the **'From'** input box.
2. Select the currencies you want to convert between.
3. Click the **Convert** button to get the converted amount.
4. Use the **Swap** button to reverse currencies instantly.

## ν²‘ Future Improvements

- Add a **currency selection dropdown**.
- Implement **historical exchange rates**.
- Improve UI with animations.

## ν³ License

This project is open-source under the [MIT License](LICENSE). Feel free to contribute! νΊ


