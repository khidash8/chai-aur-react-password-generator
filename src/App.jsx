import { useCallback, useEffect, useRef, useState } from "react";

// ! ------------------------------------- App
const App = () => {
  // * ------------------------------------- hooks
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [symbolAllowed, setSymbolAllowed] = useState(true);
  const passwordRef = useRef(null);

  // * ------------------------------------ generate password
  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      str += "0123456789";
    }
    if (symbolAllowed) {
      str += "!@#$%^&*()_+{}|:<>?[]=-";
    }

    for (let i = 1; i < length; i++) {
      const randIndex = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(randIndex);
    }

    setPassword(pass);
  }, [length, numberAllowed, symbolAllowed]);

  // * ------------------------------------ run every changes / on component did mount
  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  // * ------------------------------------ copy text / password
  const handleCopyText = () => {
    const pas = window.navigator.clipboard.writeText(password);
    passwordRef.current.select();
  };

  // ! ------------------------------------- render
  return (
    <div className="h-screen w-full items-center bg-gray-300  p-10">
      <div className="flex flex-col space-y-2 rounded-lg bg-gray-500 p-4 text-center shadow-lg ">
        <h1 className="text-2xl font-bold text-white">Password Genarator</h1>
        <div className="mx-auto w-full p-2 lg:w-1/2">
          {/* password field and button */}
          <div className="my-4 flex items-center justify-between gap-1">
            <input
              id="password"
              type="text"
              placeholder="password"
              value={password}
              readOnly
              ref={passwordRef}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              onClick={handleCopyText}
              className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Copy
            </button>
          </div>

          <div className="flex w-full items-center justify-center">
            {/* length slider */}
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="8"
                max="100"
                step="1"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
              <label htmlFor="length" className="text-white">
                {length}
              </label>
            </div>

            {/* number allowed */}
            <div className="ml-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="numberAllowed"
                defaultChecked={numberAllowed}
                onChange={() => setNumberAllowed((pre) => !pre)}
              />
              <label htmlFor="numberAllowed" className="text-white">
                Number
              </label>
            </div>

            {/* symbol allowed */}
            <div className="ml-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="symbolAllowed"
                defaultChecked={symbolAllowed}
                onChange={() => setSymbolAllowed((pre) => !pre)}
              />
              <label htmlFor="symbolAllowed" className="text-white">
                Symbol
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
