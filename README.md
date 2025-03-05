# Currency Converter App

## Overview

This is a simple **Currency Converter Web App** built using **React.js**. It allows users to convert amounts between different currencies using real-time exchange rates.

## Features

- **Swap Currencies** – Quickly switch between the 'From' and 'To' currencies.
- ⚡**Instant Conversion** – Convert values dynamically.
- **Live Exchange Rates** – Fetches real-time currency data.
- **Modern UI** – A sleek and minimal interface.

## Technologies Used

- **React.js** – Frontend framework
- **Tailwind CSS** – Styling and layout
- **Custom Hooks** – To fetch and manage currency data
- **useState & useEffect** – State management

## Folder Structure

```
Currency-Converter/
│── src/
│   ├── components/
│   │   ├── InputBox.js      # Input field component for currency values
│   ├── hooks/
│   │   ├── useCurrencyInfo.js # Custom hook to fetch exchange rates
│   ├── App.js               # Main application logic
│   ├── index.js             # Entry point
│── public/
│── README.md                # Project documentation
│── package.json             # Dependencies and scripts
```

## Installation & Setup

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

## Usage

1. Enter the amount in the **'From'** input box.
2. Select the currencies you want to convert between.
3. Click the **Convert** button to get the converted amount.
4. Use the **Swap** button to reverse currencies instantly.

## Future Improvements

- Add a **currency selection dropdown**.
- Implement **historical exchange rates**.
- Improve UI with animations.

## License

This project is open-source under the [MIT License](LICENSE). Feel free to contribute! ���


