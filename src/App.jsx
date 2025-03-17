import InputBox from "./Component/InputBox";
import useCurrencyInfo from "./Hooks/useCurrencyInfo";
import { useEffect, useState } from "react";


function App(){

  const[amount, setAmount] = useState("")
  const[from, setFrom] = useState("usd")
  const[to, setTo] = useState("inr")
  const[convertedAmmount, setConvertedAmmount] = useState("")
  const[loading, setLoading] = useState(false)
  const[lastEdited, setLastEdited] = useState("from") //If we initialized lastEdited with from: lastEdited would store "usd", not "from".
  //lastEdited should store which field the user last changed ("from" or "to"), not the currency itself. 
  const currencyInfo = useCurrencyInfo(from) //This will acess the value we pass in from
  const options = Object.keys(currencyInfo)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(()=>{
    const saveMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(saveMode)
  }, [])

  const toggelFunction = () => {
    setDarkMode((prevValue)=> {
        const newMode = !prevValue
        localStorage.setItem("darkMode", !prevValue)
        return newMode
      })
  }

const swap = () => {
  setFrom(to);
  setTo(from);
  setAmount(convertedAmmount);
  setConvertedAmmount(amount);
  setLastEdited(lastEdited === "from" ? "to" : "from");
};


const convert = () => {
  if (!currencyInfo[to]){ 
    alert("Currency data not available. Please try again later.")
    return; //currencyInfo is fetched from an API, so it may not be available immediately.
  // If a user tries to convert before the data is ready, currencyInfo[to] will be undefined, causing an error.
  }
  if (lastEdited === "from") {
    setConvertedAmmount((amount * currencyInfo[to]).toFixed(2)); // ✅ Updates only when clicked
  } else {  //IF lastEdited == "from"
    setAmount((convertedAmmount / currencyInfo[to]).toFixed(2));
  }
};

//   useEffect(() => {
//     if (!currencyInfo[to] || isNaN(amount) || amount === ""){
//       setConvertedAmmount(0)
//       return;
//     } 
//     if (currencyInfo && currencyInfo[to]) {
//       if (lastEdited === "from" && !isNaN(amount) && amount !== "") {
//           setConvertedAmmount(amount * currencyInfo[to]);
//       } else if (lastEdited === "to" && !isNaN(convertedAmmount) && convertedAmmount !== "") {
//           setAmount(convertedAmmount / currencyInfo[to]);
//       }
//   }
// }, [amount, convertedAmmount, currencyInfo, to, from, lastEdited]);


  const loadingButton = async () => {
  setLoading(true)
  await new Promise((resolve) => setTimeout(resolve, 200))
    convert()
    setLoading(false)
  }

    return ( 
    <div
    className="w-full h-screen relative flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
    style={{
        backgroundImage: darkMode ? `url("https://images.pexels.com/photos/1421903/pexels-photo-1421903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")` :`url("https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")` 
    }}>

<div className = "p-5 flex absolute top-4 right-4 justify-end backdrop-blur-md rounded-lg shadow-lg"
style={{
  backgroundColor: darkMode ? "rgb(51 51 51 / 0.5)" : "rgb(255 255 255 / 0.3)",
  color: darkMode ? "#fff" : "#000",
  border: "1px solid rgba(0, 0, 0, 0.2)",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",

}}
>

<button
onClick={toggelFunction}
className="px-4 py-2 text-white font-semibold rounded-md transition-all duration-300"
style={{
  backgroundColor : darkMode ? "#333" : "#007bff"
}}
>
{darkMode ? "Light Mode 🌞" : "Dark Mode 🌜"}
</button>

</div>

    <div className="w-full">
        <div className="w-full max-w-md mx-auto rounded-lg px-8 py-6 backdrop-blur-sm"
        style={{
          backgroundColor: darkMode ? "rgb(51 51 51 / 0.5)" : "rgb(255 255 255 / 0.3)" ,
          border: darkMode ? "none" : "1px solid gray"
        }}
        >
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    convert()
                   
                }}
            >
                <div className="w-full mb-1 font-semibold">
                  

{/* ✔ "From" input gets amount
✔ "To" input gets convertedAmmount
✔ Updates lastEdited to track the last modified input */}

                    <InputBox
                        label="From"
                        amount = {amount} //"From" input gets amount
                        currencyOptions = {options}
                        onCurrencyChange={(currency) => setFrom(currency)}
                        selectCurrency={from}
                        onAmountChange={(amount) => 
                          {
                          setAmount(amount);
                          setLastEdited("from");
                        }}
                    />
                </div>
                <div className="relative w-full h-0.5">
                    <button
                        type="button"
                        className="absolute left-1/2 font-semibold -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-teal-500 text-white px-2 py-0.5 hover:bg-blue-500"
                        style={{
                          backgroundColor : darkMode ? "#333" : "#007bff"
                        }}
                        onClick={swap}

                    >
                        swap
                    </button>
                </div>
                <div className="w-full mt-1 mb-4 font-semibold">
                    <InputBox
                        label="To"
                        amount = {convertedAmmount} //"To" input gets convertedAmmount
                        currencyOptions = {options}
                        onCurrencyChange={(currency) => {
                          setTo(currency)
                          setLastEdited("to")
                        }}
                        selectCurrency={to}
                        // amountDisable = {false}
                        onAmountChange={(amount) => {
                          setConvertedAmmount(amount); // ✅ Allow manual input
                          setLastEdited("to");
                        }}
                      />
                </div>
                <button 
                type="submit"
                className="w-full text-white font-semibold px-4 py-3 rounded-lg hover:bg-blue-500"
                style={{
                  backgroundColor : 
                  (darkMode ? "#222" : "#0056b3") 
                }}


                onClick={loadingButton}
                disabled = {loading}
                >
                
                    {loading ? "Converting..." : `Convert ${from.toUpperCase()} To ${to.toUpperCase()}`}
                </button>
            </form>
        </div>
    </div>
</div>
);
  }


export default App