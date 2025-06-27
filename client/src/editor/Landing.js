import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import axios from "axios";
import { classnames } from "../utils/general";

import useKeyPress from "../hooks/useKeyPress";
import VideoPlayer from './VideoPlayer';
import { languageOptions } from "./languageOptions";

const incode = `// put here
`;

const Landing = () => {
  const [code, setCode] = useState(incode);
  const [customInput, setCustomInput] = useState("");

  const [processing, setProcessing] = useState(null);
 
  const [language, setLanguage] = useState(languageOptions[0]);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);
  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    const options = {
      method: "POST",
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);
          
         
        }
        setProcessing(false);
        console.log("catch block...", error);
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
    
    }
  };




  return (
    
    <>
      

      
     
     
      <div class="flex flex-row space-x-2 items-start px-4 py-6">
  <div class="flex flex-col w-full h-full justify-start py-4">
    <div class="bg-gray-800 text-white px-6 py-4 rounded-lg">
        <h1 class="text-3xl font-bold mb-8">String Compression</h1>
        <div class="bg-gray-600 text-white px-6 py-4 rounded-lg  mb-4">
        <h2 class="text-2xl font-bold mb-4">Problem Description</h2>
        <p class="text-sm mb-6">Given a string of uppercase letters, write a function to compress the string such that consecutive occurrences of the same character are replaced by the character followed by the number of consecutive occurrences. If the compressed string does not save space (i.e., the compressed string is longer than or the same length as the original string), return the original string.</p>
      </div>
      <div class="bg-gray-600 text-white px-6 py-4 rounded-lg mb-4">
        <h2 class="text-2xl font-bold mb-4">Example 1:</h2>
        <p class="text-sm mb-6">Input: chars = ["a","a","b","b","c","c","c"]
        <br />Output: Return 6, and the first 6 characters of the input array should be: ["a","2","b","2","c","3"]
        <br />Explanation: The groups are "aa", "bb", and "ccc". This compresses to "a2b2c3".</p> </div>
      <div class="bg-gray-600 text-white px-6 py-4 rounded-lg mb-4"> 
        <h2 class="text-2xl font-bold mb-4">Example 2:</h2>
        <p class="text-sm mb-6">Input: chars = ["a"]
        <br />Output: Return 1, and the first character of the input array should be: ["a"]
        <br />Explanation: The only group is "a", which remains uncompressed since it's a single character.</p>  </div>
      <div class="bg-gray-600 text-white px-6 py-4 rounded-lg mb-4">
        <h2 class="text-2xl font-bold mb-4">Example 3:</h2>
        <p class="text-sm mb-6">Input: chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"]
        <br />Output: Return 4, and the first 4 characters of the input array should be: ["a","b","1","2"].
        <br />Explanation: The groups are "a" and "bbbbbbbbbbbb". This compresses to "ab12".</p>
     </div>
     
     
    </div>
    
  </div>

 
  <div className="sticky top-30 w-full h-full justify-start items-right py-20"  style={{ position: "sticky", top: "0" }}>
  <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl ">
    <CodeEditorWindow
      code={code}
      onChange={onChange}
      language={language?.value}
      theme="dark"
    />
  </div>
  <button
  onClick={handleCompile}
  disabled={!code}
  className={classnames(
    "w-full h-full mt-4 border-2 border-black z-10 rounded-md  px-4 py-2  transition duration-200 text-white bg-blue-500",
    !code ? "opacity-50" : ""
  )}
>
  {processing ? "Processing..." : "Submit"}
</button>

</div>

       
        
        
      </div>
     
    </>
  );
};
export default Landing;
