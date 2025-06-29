"use client"

import type React from "react"

import { useState } from "react"
import { Phone, Shield } from "lucide-react"

export const InscriptionPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("")
  const [phoneError, setPhoneError] = useState("")

  const countries = [
    { name: "Afghanistan", code: "AF", phoneCode: "93" },
    { name: "Albania", code: "AL", phoneCode: "355" },
    { name: "Algeria", code: "DZ", phoneCode: "213" },
    { name: "American Samoa", code: "AS", phoneCode: "1-684" },
    { name: "Andorra", code: "AD", phoneCode: "376" },
    { name: "Angola", code: "AO", phoneCode: "244" },
    { name: "Anguilla", code: "AI", phoneCode: "1-264" },
    { name: "Antarctica", code: "AQ", phoneCode: "672" },
    { name: "Antigua and Barbuda", code: "AG", phoneCode: "1-268" },
    { name: "Argentina", code: "AR", phoneCode: "54" },
    { name: "Armenia", code: "AM", phoneCode: "374" },
    { name: "Aruba", code: "AW", phoneCode: "297" },
    { name: "Australia", code: "AU", phoneCode: "61" },
    { name: "Austria", code: "AT", phoneCode: "43" },
    { name: "Azerbaijan", code: "AZ", phoneCode: "994" },
    { name: "Bahamas", code: "BS", phoneCode: "1-242" },
    { name: "Bahrain", code: "BH", phoneCode: "973" },
    { name: "Bangladesh", code: "BD", phoneCode: "880" },
    { name: "Barbados", code: "BB", phoneCode: "1-246" },
    { name: "Belarus", code: "BY", phoneCode: "375" },
    { name: "Belgium", code: "BE", phoneCode: "32" },
    { name: "Belize", code: "BZ", phoneCode: "501" },
    { name: "Benin", code: "BJ", phoneCode: "229" },
    { name: "Bermuda", code: "BM", phoneCode: "1-441" },
    { name: "Bhutan", code: "BT", phoneCode: "975" },
    { name: "Bolivia", code: "BO", phoneCode: "591" },
    { name: "Bosnia and Herzegovina", code: "BA", phoneCode: "387" },
    { name: "Botswana", code: "BW", phoneCode: "267" },
    { name: "Brazil", code: "BR", phoneCode: "55" },
    { name: "British Indian Ocean Territory", code: "IO", phoneCode: "246" },
    { name: "British Virgin Islands", code: "VG", phoneCode: "1-284" },
    { name: "Brunei", code: "BN", phoneCode: "673" },
    { name: "Bulgaria", code: "BG", phoneCode: "359" },
    { name: "Burkina Faso", code: "BF", phoneCode: "226" },
    { name: "Burundi", code: "BI", phoneCode: "257" },
    { name: "Cambodia", code: "KH", phoneCode: "855" },
    { name: "Cameroon", code: "CM", phoneCode: "237" },
    { name: "Canada", code: "CA", phoneCode: "1" },
    { name: "Cape Verde", code: "CV", phoneCode: "238" },
    { name: "Cayman Islands", code: "KY", phoneCode: "1-345" },
    { name: "Central African Republic", code: "CF", phoneCode: "236" },
    { name: "Chad", code: "TD", phoneCode: "235" },
    { name: "Chile", code: "CL", phoneCode: "56" },
    { name: "China", code: "CN", phoneCode: "86" },
    { name: "Christmas Island", code: "CX", phoneCode: "61" },
    { name: "Cocos Islands", code: "CC", phoneCode: "61" },
    { name: "Colombia", code: "CO", phoneCode: "57" },
    { name: "Comoros", code: "KM", phoneCode: "269" },
    { name: "Cook Islands", code: "CK", phoneCode: "682" },
    { name: "Costa Rica", code: "CR", phoneCode: "506" },
    { name: "Croatia", code: "HR", phoneCode: "385" },
    { name: "Cuba", code: "CU", phoneCode: "53" },
    { name: "Curacao", code: "CW", phoneCode: "599" },
    { name: "Cyprus", code: "CY", phoneCode: "357" },
    { name: "Czech Republic", code: "CZ", phoneCode: "420" },
    { name: "Democratic Republic of the Congo", code: "CD", phoneCode: "243" },
    { name: "Denmark", code: "DK", phoneCode: "45" },
    { name: "Djibouti", code: "DJ", phoneCode: "253" },
    { name: "Dominica", code: "DM", phoneCode: "1-767" },
    { name: "Dominican Republic", code: "DO", phoneCode: "1-809, 1-829, 1-849" },
    { name: "East Timor", code: "TL", phoneCode: "670" },
    { name: "Ecuador", code: "EC", phoneCode: "593" },
    { name: "Egypt", code: "EG", phoneCode: "20" },
    { name: "El Salvador", code: "SV", phoneCode: "503" },
    { name: "Equatorial Guinea", code: "GQ", phoneCode: "240" },
    { name: "Eritrea", code: "ER", phoneCode: "291" },
    { name: "Estonia", code: "EE", phoneCode: "372" },
    { name: "Ethiopia", code: "ET", phoneCode: "251" },
    { name: "Falkland Islands", code: "FK", phoneCode: "500" },
    { name: "Faroe Islands", code: "FO", phoneCode: "298" },
    { name: "Fiji", code: "FJ", phoneCode: "679" },
    { name: "Finland", code: "FI", phoneCode: "358" },
    { name: "France", code: "FR", phoneCode: "33" },
    { name: "French Polynesia", code: "PF", phoneCode: "689" },
    { name: "Gabon", code: "GA", phoneCode: "241" },
    { name: "Gambia", code: "GM", phoneCode: "220" },
    { name: "Georgia", code: "GE", phoneCode: "995" },
    { name: "Germany", code: "DE", phoneCode: "49" },
    { name: "Ghana", code: "GH", phoneCode: "233" },
    { name: "Gibraltar", code: "GI", phoneCode: "350" },
    { name: "Greece", code: "GR", phoneCode: "30" },
    { name: "Greenland", code: "GL", phoneCode: "299" },
    { name: "Grenada", code: "GD", phoneCode: "1-473" },
    { name: "Guam", code: "GU", phoneCode: "1-671" },
    { name: "Guatemala", code: "GT", phoneCode: "502" },
    { name: "Guernsey", code: "GG", phoneCode: "44-1481" },
    { name: "Guinea", code: "GN", phoneCode: "224" },
    { name: "Guinea-Bissau", code: "GW", phoneCode: "245" },
    { name: "Guyana", code: "GY", phoneCode: "592" },
    { name: "Haiti", code: "HT", phoneCode: "509" },
    { name: "Honduras", code: "HN", phoneCode: "504" },
    { name: "Hong Kong", code: "HK", phoneCode: "852" },
    { name: "Hungary", code: "HU", phoneCode: "36" },
    { name: "Iceland", code: "IS", phoneCode: "354" },
    { name: "India", code: "IN", phoneCode: "91" },
    { name: "Indonesia", code: "ID", phoneCode: "62" },
    { name: "Iran", code: "IR", phoneCode: "98" },
    { name: "Iraq", code: "IQ", phoneCode: "964" },
    { name: "Ireland", code: "IE", phoneCode: "353" },
    { name: "Isle of Man", code: "IM", phoneCode: "44-1624" },
    { name: "Israel", code: "IL", phoneCode: "972" },
    { name: "Italy", code: "IT", phoneCode: "39" },
    { name: "Ivory Coast", code: "CI", phoneCode: "225" },
    { name: "Jamaica", code: "JM", phoneCode: "1-876" },
    { name: "Japan", code: "JP", phoneCode: "81" },
    { name: "Jersey", code: "JE", phoneCode: "44-1534" },
    { name: "Jordan", code: "JO", phoneCode: "962" },
    { name: "Kazakhstan", code: "KZ", phoneCode: "7" },
    { name: "Kenya", code: "KE", phoneCode: "254" },
    { name: "Kiribati", code: "KI", phoneCode: "686" },
    { name: "Kosovo", code: "XK", phoneCode: "383" },
    { name: "Kuwait", code: "KW", phoneCode: "965" },
    { name: "Kyrgyzstan", code: "KG", phoneCode: "996" },
    { name: "Laos", code: "LA", phoneCode: "856" },
    { name: "Latvia", code: "LV", phoneCode: "371" },
    { name: "Lebanon", code: "LB", phoneCode: "961" },
    { name: "Lesotho", code: "LS", phoneCode: "266" },
    { name: "Liberia", code: "LR", phoneCode: "231" },
    { name: "Libya", code: "LY", phoneCode: "218" },
    { name: "Liechtenstein", code: "LI", phoneCode: "423" },
    { name: "Lithuania", code: "LT", phoneCode: "370" },
    { name: "Luxembourg", code: "LU", phoneCode: "352" },
    { name: "Macau", code: "MO", phoneCode: "853" },
    { name: "Macedonia", code: "MK", phoneCode: "389" },
    { name: "Madagascar", code: "MG", phoneCode: "261" },
    { name: "Malawi", code: "MW", phoneCode: "265" },
    { name: "Malaysia", code: "MY", phoneCode: "60" },
    { name: "Maldives", code: "MV", phoneCode: "960" },
    { name: "Mali", code: "ML", phoneCode: "223" },
    { name: "Malta", code: "MT", phoneCode: "356" },
    { name: "Marshall Islands", code: "MH", phoneCode: "692" },
    { name: "Mauritania", code: "MR", phoneCode: "222" },
    { name: "Mauritius", code: "MU", phoneCode: "230" },
    { name: "Mayotte", code: "YT", phoneCode: "262" },
    { name: "Mexico", code: "MX", phoneCode: "52" },
    { name: "Micronesia", code: "FM", phoneCode: "691" },
    { name: "Moldova", code: "MD", phoneCode: "373" },
    { name: "Monaco", code: "MC", phoneCode: "377" },
    { name: "Mongolia", code: "MN", phoneCode: "976" },
    { name: "Montenegro", code: "ME", phoneCode: "382" },
    { name: "Montserrat", code: "MS", phoneCode: "1-664" },
    { name: "Morocco", code: "MA", phoneCode: "212" },
    { name: "Mozambique", code: "MZ", phoneCode: "258" },
    { name: "Myanmar", code: "MM", phoneCode: "95" },
    { name: "Namibia", code: "NA", phoneCode: "264" },
    { name: "Nauru", code: "NR", phoneCode: "674" },
    { name: "Nepal", code: "NP", phoneCode: "977" },
    { name: "Netherlands", code: "NL", phoneCode: "31" },
    { name: "Netherlands Antilles", code: "AN", phoneCode: "599" },
    { name: "New Caledonia", code: "NC", phoneCode: "687" },
    { name: "New Zealand", code: "NZ", phoneCode: "64" },
    { name: "Nicaragua", code: "NI", phoneCode: "505" },
    { name: "Niger", code: "NE", phoneCode: "227" },
    { name: "Nigeria", code: "NG", phoneCode: "234" },
    { name: "Niue", code: "NU", phoneCode: "683" },
    { name: "North Korea", code: "KP", phoneCode: "850" },
    { name: "Northern Mariana Islands", code: "MP", phoneCode: "1-670" },
    { name: "Norway", code: "NO", phoneCode: "47" },
    { name: "Oman", code: "OM", phoneCode: "968" },
    { name: "Pakistan", code: "PK", phoneCode: "92" },
    { name: "Palau", code: "PW", phoneCode: "680" },
    { name: "Palestine", code: "PS", phoneCode: "970" },
    { name: "Panama", code: "PA", phoneCode: "507" },
    { name: "Papua New Guinea", code: "PG", phoneCode: "675" },
    { name: "Paraguay", code: "PY", phoneCode: "595" },
    { name: "Peru", code: "PE", phoneCode: "51" },
    { name: "Philippines", code: "PH", phoneCode: "63" },
    { name: "Pitcairn", code: "PN", phoneCode: "64" },
    { name: "Poland", code: "PL", phoneCode: "48" },
    { name: "Portugal", code: "PT", phoneCode: "351" },
    { name: "Puerto Rico", code: "PR", phoneCode: "1-787, 1-939" },
    { name: "Qatar", code: "QA", phoneCode: "974" },
    { name: "Republic of the Congo", code: "CG", phoneCode: "242" },
    { name: "Reunion", code: "RE", phoneCode: "262" },
    { name: "Romania", code: "RO", phoneCode: "40" },
    { name: "Russia", code: "RU", phoneCode: "7" },
    { name: "Rwanda", code: "RW", phoneCode: "250" },
    { name: "Saint Barthelemy", code: "BL", phoneCode: "590" },
    { name: "Saint Helena", code: "SH", phoneCode: "290" },
    { name: "Saint Kitts and Nevis", code: "KN", phoneCode: "1-869" },
    { name: "Saint Lucia", code: "LC", phoneCode: "1-758" },
    { name: "Saint Martin", code: "MF", phoneCode: "590" },
    { name: "Saint Pierre and Miquelon", code: "PM", phoneCode: "508" },
    { name: "Saint Vincent and the Grenadines", code: "VC", phoneCode: "1-784" },
    { name: "Samoa", code: "WS", phoneCode: "685" },
    { name: "San Marino", code: "SM", phoneCode: "378" },
    { name: "Sao Tome and Principe", code: "ST", phoneCode: "239" },
    { name: "Saudi Arabia", code: "SA", phoneCode: "966" },
    { name: "Senegal", code: "SN", phoneCode: "221" },
    { name: "Serbia", code: "RS", phoneCode: "381" },
    { name: "Seychelles", code: "SC", phoneCode: "248" },
    { name: "Sierra Leone", code: "SL", phoneCode: "232" },
    { name: "Singapore", code: "SG", phoneCode: "65" },
    { name: "Sint Maarten", code: "SX", phoneCode: "1-721" },
    { name: "Slovakia", code: "SK", phoneCode: "421" },
    { name: "Slovenia", code: "SI", phoneCode: "386" },
    { name: "Solomon Islands", code: "SB", phoneCode: "677" },
    { name: "Somalia", code: "SO", phoneCode: "252" },
    { name: "South Africa", code: "ZA", phoneCode: "27" },
    { name: "South Korea", code: "KR", phoneCode: "82" },
    { name: "South Sudan", code: "SS", phoneCode: "211" },
    { name: "Spain", code: "ES", phoneCode: "34" },
    { name: "Sri Lanka", code: "LK", phoneCode: "94" },
    { name: "Sudan", code: "SD", phoneCode: "249" },
    { name: "Suriname", code: "SR", phoneCode: "597" },
    { name: "Svalbard and Jan Mayen", code: "SJ", phoneCode: "47" },
    { name: "Swaziland", code: "SZ", phoneCode: "268" },
    { name: "Sweden", code: "SE", phoneCode: "46" },
    { name: "Switzerland", code: "CH", phoneCode: "41" },
    { name: "Syria", code: "SY", phoneCode: "963" },
    { name: "Taiwan", code: "TW", phoneCode: "886" },
    { name: "Tajikistan", code: "TJ", phoneCode: "992" },
    { name: "Tanzania", code: "TZ", phoneCode: "255" },
    { name: "Thailand", code: "TH", phoneCode: "66" },
    { name: "Togo", code: "TG", phoneCode: "228" },
    { name: "Tokelau", code: "TK", phoneCode: "690" },
    { name: "Tonga", code: "TO", phoneCode: "676" },
    { name: "Trinidad and Tobago", code: "TT", phoneCode: "1-868" },
    { name: "Tunisia", code: "TN", phoneCode: "216" },
    { name: "Turkey", code: "TR", phoneCode: "90" },
    { name: "Turkmenistan", code: "TM", phoneCode: "993" },
    { name: "Turks and Caicos Islands", code: "TC", phoneCode: "1-649" },
    { name: "Tuvalu", code: "TV", phoneCode: "688" },
    { name: "U.S. Virgin Islands", code: "VI", phoneCode: "1-340" },
    { name: "Uganda", code: "UG", phoneCode: "256" },
    { name: "Ukraine", code: "UA", phoneCode: "380" },
    { name: "United Arab Emirates", code: "AE", phoneCode: "971" },
    { name: "United Kingdom", code: "GB", phoneCode: "44" },
    { name: "United States", code: "US", phoneCode: "1" },
    { name: "Uruguay", code: "UY", phoneCode: "598" },
    { name: "Uzbekistan", code: "UZ", phoneCode: "998" },
    { name: "Vanuatu", code: "VU", phoneCode: "678" },
    { name: "Vatican", code: "VA", phoneCode: "379" },
    { name: "Venezuela", code: "VE", phoneCode: "58" },
    { name: "Vietnam", code: "VN", phoneCode: "84" },
    { name: "Wallis and Futuna", code: "WF", phoneCode: "681" },
    { name: "Western Sahara", code: "EH", phoneCode: "212" },
    { name: "Yemen", code: "YE", phoneCode: "967" },
    { name: "Zambia", code: "ZM", phoneCode: "260" },
    { name: "Zimbabwe", code: "ZW", phoneCode: "263" },
  ].sort((a, b) => a.name.localeCompare(b.name))

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "")
    if (digits.length <= 3) return digits
    if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`
  }

  const validatePhoneNumber = (value: string) => {
    const phonePattern = /^\d{3}-\d{3}-\d{4}$/
    if (!phonePattern.test(value)) {
      setPhoneError("Please enter a valid phone number in format: 123-456-7890")
      return false
    }
    setPhoneError("")
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validatePhoneNumber(phoneNumber)) {
      console.log("Country:", selectedCountry)
      console.log("Phone Number:", phoneNumber)
      alert("Phone number inscription submitted!")
    }
  }

  return (
    <div className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Inscribe Your Phone Number</h1>
            <p className="text-gray-600">
              Create a permanent inscription of your phone number on the Bitcoin timechain
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <select
                id="country"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                required
              >
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name} ({country.code}) +{country.phoneCode}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  <Phone className="h-5 w-5" />
                </span>
                <input
                  type="tel"
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => {
                    const formatted = formatPhoneNumber(e.target.value)
                    if (formatted.length <= 12) {
                      setPhoneNumber(formatted)
                      if (formatted.length === 12) validatePhoneNumber(formatted)
                      else setPhoneError("")
                    }
                  }}
                  onBlur={() => validatePhoneNumber(phoneNumber)}
                  placeholder="123-456-7890"
                  className="flex-1 p-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  required
                />
              </div>
              {phoneError && <p className="mt-2 text-sm text-red-600">{phoneError}</p>}
            </div>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Shield className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Your phone number will be permanently inscribed. Please ensure it&apos;s correct.
                  </p>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-3 px-4 rounded-lg hover:bg-yellow-600 font-medium transition-colors"
            >
              Create Inscription
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
