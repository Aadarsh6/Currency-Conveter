import InputBox from "./Component/InputBox";
import useCurrencyInfo from "./Hooks/useCurrencyInfo";
import { useState } from "react";


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
    className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
    style={{
        backgroundImage: `url("https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
    }}
>
    <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg px-8 py-6 backdrop-blur-sm bg-white/30">
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
                className="w-full bg-blue-600 text-white font-semibold px-4 py-3 rounded-lg hover:bg-blue-500"
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