import { useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [IncludeUppercase, setIncludeUppercase] = useState(true);
  const [IncludeLowercase, setIncludeLowercase] = useState(true);
  const [IncludeNumbers, setIncludeNumbers] = useState(true);
  const [IncludeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charList = "";
    if (IncludeUppercase) charList += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (IncludeLowercase) charList += "abcdefghijklmnopqrstuvwxyz";
    if (IncludeNumbers) charList += "0123456789";
    if (IncludeSymbols) charList += "!@#$%^&*(){}[]";

    if (charList === "") {
      setPassword("");
      return;
    }

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      generatedPassword += charList.charAt(
        Math.floor(Math.random() * charList.length)
      );
    }
    setPassword(generatedPassword);
  };

  const isOptionSelected =
    IncludeUppercase || IncludeLowercase || IncludeNumbers || IncludeSymbols;

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="password-generator">
      <h2>Strong Password Generator</h2>
      <div className="input-group">
        <label htmlFor="num">Password Length:</label>
        <input
          type="number"
          id="num"
          value={length}
          onChange={(e) =>
            setLength(Math.max(1, parseInt(e.target.value) || 1))
          }
        />
      </div>
      <div className="checkbox-group">
        <input
          type="checkbox"
          id="upper"
          checked={IncludeUppercase}
          onChange={(e) => setIncludeUppercase(e.target.checked)}
        />
        <label htmlFor="upper">Include Uppercase</label>
      </div>
      <div className="checkbox-group">
        <input
          type="checkbox"
          id="lower"
          checked={IncludeLowercase}
          onChange={(e) => setIncludeLowercase(e.target.checked)}
        />
        <label htmlFor="lower">Include Lowercase</label>
      </div>
      <div className="checkbox-group">
        <input
          type="checkbox"
          id="number"
          checked={IncludeNumbers}
          onChange={(e) => setIncludeNumbers(e.target.checked)}
        />
        <label htmlFor="number">Include Numbers</label>
      </div>
      <div className="checkbox-group">
        <input
          type="checkbox"
          id="symbol"
          checked={IncludeSymbols}
          onChange={(e) => setIncludeSymbols(e.target.checked)}
        />
        <label htmlFor="symbol">Include Symbols</label>
      </div>
      <button
        className="generate-button"
        onClick={generatePassword}
        disabled={!isOptionSelected}
      >
        Generate Password
      </button>
      <div className="generate-password">
        <input type="text" readOnly value={password} />
        <button className="copy-btn" onClick={handleCopy}>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}

export default App;
