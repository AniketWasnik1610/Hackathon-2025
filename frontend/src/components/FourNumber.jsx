import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';

function FourNumber(props) {
  const [otp, setOtp] = useState(props.otp);

  console.log(`props.otp: ${props.index}`, props.otp);

  // Effect hook to update otp when props.otp changes
  useEffect(() => {
    setOtp(props.otp);
  }, [props.otp]);

  return (

    <div className="w-full h-screen flex items-center justify-center">

      <div className="flex flex-col items-center justify-center w-auto p-8 rounded-2xl bg-sky-3600/50 border-1 shadow-2xl shadow-indigo-500/40 border-indigo-600">
        <h2 className="text-white text-xl font-semibold mb-4"></h2>
        <OtpInput
          value={otp}
          onChange={setOtp} // Handle OTP change
          numInputs={4}
          separator={<span className="mx-2 text-white text-2xl"></span>}
          renderInput={(props) => (
            <input
              {...props}
              maxLength={1} // Restrict input to 1 digit
              className="mx-2 min-w-14 h-14 text-center text-white text-xl font-bold border-2  bg-indigo-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 shadow-md transition-all duration-200"
            />
          )}
        />
      </div>
    </div>
  );
}

export default FourNumber;
