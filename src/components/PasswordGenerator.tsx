import React, { useState } from 'react'
import { Check, Copy, RefreshCw } from 'lucide-react'

const PasswordGenerator = () => {
  const [passwordLength, setPasswordLength] = useState(12)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)

  const generatePassword = () => {
    let characterSet = ''
    if (includeUppercase) characterSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (includeLowercase) characterSet += 'abcdefghijklmnopqrstuvwxyz'
    if (includeNumbers) characterSet += '0123456789'
    if (includeSymbols) characterSet += '!@#$%^&*()'

    if (characterSet === '') {
      alert('Please select at least one character type.')
      return
    }

    let newPassword = ''
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characterSet.length)
      newPassword += characterSet[randomIndex]
    }

    setPassword(newPassword)
    setCopied(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Password Generator
      </h2>
      <div className="mb-4">
        <label
          htmlFor="passwordLength"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Password Length: {passwordLength}
        </label>
        <input
          type="range"
          id="passwordLength"
          min="6"
          max="30"
          value={passwordLength}
          onChange={(e) => setPasswordLength(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
            checked={includeUppercase}
            onChange={() => setIncludeUppercase(!includeUppercase)}
          />
          <span className="ml-2 text-gray-700 text-sm">Include Uppercase</span>
        </label>
      </div>

      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
            checked={includeLowercase}
            onChange={() => setIncludeLowercase(!includeLowercase)}
          />
          <span className="ml-2 text-gray-700 text-sm">Include Lowercase</span>
        </label>
      </div>

      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
          />
          <span className="ml-2 text-gray-700 text-sm">Include Numbers</span>
        </label>
      </div>

      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
          />
          <span className="ml-2 text-gray-700 text-sm">Include Symbols</span>
        </label>
      </div>

      <div className="mb-4 relative">
        <input
          type="text"
          value={password}
          readOnly
          className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-500"
        />
        {password && (
          <button
            onClick={copyToClipboard}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {copied ? <Check size={20} /> : <Copy size={20} />}
          </button>
        )}
      </div>

      <button
        onClick={generatePassword}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
      >
        <RefreshCw size={20} className="inline-block mr-2" />
        Generate Password
      </button>
    </div>
  )
}

export default PasswordGenerator
