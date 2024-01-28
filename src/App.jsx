import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";


function App() {
  const [tweetLink, setTweetLink] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

    

function formatNumber(number, decimalPlaces) {

  const parsedNumber = parseFloat(number);
    
    // Check if the parsedNumber is a valid number
    if (isNaN(parsedNumber)) {
        return "Invalid number";
    }

    // Use toFixed to limit the decimal places
    const formattedNumber = parsedNumber.toFixed(decimalPlaces);

    return formattedNumber;
}



  


  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast.promise(
      fetch(`http://localhost:8000/analyse?tweetLink=${encodeURIComponent(tweetLink)}`)
        .then((res) => res.json())
        .then((data) => {

          setResponse(data.result.results);
          console.log('Response:', data.result.results[0]);
          setLoading(false);
          return 'Analysis complete!';
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
          throw new Error('Analysis failed. Please try again.');
        }),
      {
        loading: 'Analyzing Tweet...',
        success: (message) => message,
        error: (error) => error.message,
      }
    );
  };

  return (


  <div className="relative overflow-hidden">
    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
      <div className="text-center">
        <h1 className="text-4xl sm:text-6xl mt-8 font-bold text-gray-800 ">
        Unlocking Sentiments: Analyzing the Emotional Pulse of Tweets 
        </h1>
        <p className="mt-3 text-gray-600 ">
        Discover What Tweets are Saying with Simple Sentiment Analysis
        </p>
        <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">
          {/* Form */}
          <Toaster/>
          <form>
            <div className="relative z-10 flex space-x-3 p-3 bg-white border-2 rounded-lg shadow-lg shadow-gray-100   ">
              <div className="flex-[1_0_0%]">
                <label
                  htmlFor="hs-search-article-1"
                  className="block text-sm text-gray-700 font-medium "
                >
                  <span className="sr-only">Paste Tweet Link Here</span>
                </label>
                <input
              type="text"
              name="hs-search-article-1"
              id="hs-search-article-1"
              className="py-2.5 px-4 block w-full border-transparent rounded-lg focus:border-blue-500 focus:ring-blue-500"
              placeholder="Paste Tweet Link Here"
              value={tweetLink}
              onChange={(e) => setTweetLink(e.target.value)}
            />
              </div>
              <div className="flex-[0_0_auto]">
                <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                onClick={handleClick}
              
                >
                 Analyze
                </button>
              </div>
            </div>
          </form>
          {/* End Form */}
          {/* SVG Element */}
          <div className="hidden md:block absolute top-0 end-0 -translate-y-12 translate-x-20">
            <svg
              className="w-16 h-auto text-orange-500"
              width={121}
              height={135}
              viewBox="0 0 121 135"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
                stroke="currentColor"
                strokeWidth={10}
                strokeLinecap="round"
              />
              <path
                d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
                stroke="currentColor"
                strokeWidth={10}
                strokeLinecap="round"
              />
              <path
                d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
                stroke="currentColor"
                strokeWidth={10}
                strokeLinecap="round"
              />
            </svg>
          </div>
          {/* End SVG Element */}
          {/* SVG Element */}
          <div className="hidden md:block absolute bottom-0 start-0 translate-y-10 -translate-x-32">
            <svg
              className="w-40 h-auto text-cyan-500"
              width={347}
              height={188}
              viewBox="0 0 347 188"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426"
                stroke="currentColor"
                strokeWidth={7}
                strokeLinecap="round"
              />
            </svg>
          </div>
          {/* End SVG Element */}
        </div>


        <div className=" px-6 mx-auto max-w-[600px] w-[80%] py-2 mt-12">

{response && (  
<>

  <h3 className="text-xl font-bold text-gray-800 mb-2">Tweet Analysis</h3>

<div className="grid grid-cols-3 mb-4">


  <div className="shadow-md border-4 p-1 border-green-500 mx-2 rounded-md ">
    <p className="font-bold">Positive</p>
    <p>{formatNumber(response[2].score, 4)}</p>
  </div>

  <div className="shadow-md border-4 p-1 border-orange-500 mx-2  rounded-md ">
  <p className="font-bold">Neutral</p>
  <p>{formatNumber(response[1].score, 4)}</p>
  </div>

  <div className="shadow-md border-4 p-1 border-red-500 mx-2  rounded-md ">
  <p className="font-bold">Negative</p>
  <p>{formatNumber(response[0].score, 4)}</p>
  </div>
  </div>
  </>
)}

        </div>
   
      </div>
    </div>
  </div>

  )
}

export default App
