import React, { useEffect, useState } from 'react';
import axios from "axios";
import { FaHistory } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function History() {
    const [call, setCall] = useState(1);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const callHistory = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:5000/api/v1/getHistory", {  params: { call } });
            setHistory((prevHistory) => [...prevHistory, ...response.data.history]);
            console.log(response.data.history);
            console.log("data aya");
            setError(null);
        } catch (error) {
            console.error("Error in getting history:", error);
            setError("Failed to load history");
        } finally {
            setCall((prev) => prev + 1);
            setLoading(false);
        }
    };

    useEffect(() => {
        callHistory();
    }, []);

    if (loading) return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-50">
            <AiOutlineLoading3Quarters className="text-4xl text-indigo-500 animate-spin" />
        </div>
    );

    if (error) return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-50">
            <div className="p-4 bg-red-100 text-red-600 rounded-lg shadow-sm">{error}</div>
        </div>
    );

    return (
        <div className='w-full min-h-screen bg-gray-50 p-6 mt-14'>
            {loading && <div className=" flex items-center justify-center bg-gray-50">
            <AiOutlineLoading3Quarters className="text-4xl text-indigo-500 animate-spin" />
        </div>}
            <div className='max-w-4xl mx-auto'>
                <div className='flex items-center gap-3 mb-6'>
                    <FaHistory className='text-2xl text-amber-500' />
                    <h1 className='text-2xl font-semibold text-gray-800'>History</h1>
                </div>

                <div className='space-y-4'>
                    {history.length === 0 ? (
                        <div className="p-8 text-center bg-white rounded-lg shadow-sm">
                            <p className="text-gray-500">No history available</p>
                        </div>
                    ) : (
                        history.map((data, index) => (
                            <div key={index} className='bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 border border-gray-100'>
                                <div className='flex items-start justify-between'>
                                    <div className='flex-1'> 
                                        <p className='text-gray-800 whitespace-pre-wrap break-words'>{data.slice(0,4) + `  `+ data.slice(4,8) + `  `+ data.slice(8)}</p>
                                    </div>
                                    <span className='text-sm text-gray-500 ml-4'>
                                        {new Date().toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className='w-full flex items-center justify-center mt-4'>
                    <button onClick={callHistory} className='py-2 px-4 bg-amber-400 cursor-pointer rounded-md hover:bg-amber-500 transition-colors'>
                        {loading ?<AiOutlineLoading3Quarters className="text-sm text-indigo-500 animate-spin" /> :"Load more data..."}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default History;