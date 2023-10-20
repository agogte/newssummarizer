import React, { useState } from 'react'
import { options } from '../api'

const Card = () => {

    const [input, setInput] = useState('')
    const [clicked, setClicked] = useState(false)
    const [result, setResult] = useState('')

    // const linkinput = `${}`
    const url = "https://easy-text-ml.p.rapidapi.com/summarize/html/link?link="+encodeURIComponent(input)+"&max_sentences=5";
    

    const handleGetYourLink = async (link) => {
        try {
            const response = await fetch(url, options);
            const result = await response.text();
            const cleanresult = result.replace(/[^a-zA-Z0-9\-. ]/gm, '');
            console.log(cleanresult);
            setResult(cleanresult)
        } catch (error) {
            console.error(error);
        }

    }

    return (
        <>
            {!clicked && (<div className="px-6 py-4 max-w-sm overflow-hidden shadow-xl flex items-center flex-col rounded-lg bg-orange-100 w-screen">
                <label className="block text-gray-700 text-base font-bold mb-2">Enter news article link:</label>
                <input className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="long_url" type="string" placeholder="https://www.news.com/article/" value={input} onInput={e => setInput(e.target.value)} />
                <div className='flex justify-center'>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 mt-6 px-4 rounded-full" onClick={async () => {
                        // setLink(await fetchShortId())
                        setClicked(true)
                        handleGetYourLink(input)
                    }}>
                        Summarize!
                    </button>
                </div>
            </div>
            )}
            {clicked && (
                <div className="px-6 py-4 max-w-sm overflow-hidden shadow-xl flex items-center flex-col rounded-lg bg-orange-100 w-screen">
                    <p className='font-bold text-lg'>Article Summary:</p>
                    <p>
                        {result}
                    </p>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 mt-6 px-4 rounded-full" onClick={() => {
                        setClicked(false)
                        setInput('')
                        setResult('')
                    }}>
                        Go back
                    </button>
                </div>
            )}


        </>
    )
}

export default Card