"use client";

import { useState } from "react";

export default function Home() {
  const [variables, setVariables] = useState([
    {
      key: "",
      value: "",
    },
  ]);

  const pasteHandle = (e, index) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    if (pastedData) {
      const arr = pastedData
        .split("\n")
        .map((text) => {
          if (/([\w]+)=(.+?)/.test(text)) {
            let [key, value] = text.split("=");
            return { key, value };
          }
        })
        .filter(Boolean);
      if (arr.length > 0) {
        setVariables((variables) => [
          ...variables.slice(0, index),
          ...arr,
          ...variables.slice(index + 1),
        ]);
      }
    }
  };

  return (
    <div className="h-[100vh] bg-black">
      <div className="container mx-auto py-4">
        <div className="grid gap-y-4">
          {variables.map((variable, index) => (
            <div key={index} className="grid grid-cols-2 gap-x-4">
              <input
                value={variable.key}
                onPaste={(e) => pasteHandle(e, index)}
                onChange={(e) => {
                  setVariables((variables) =>
                    variables.map((variable, i) => {
                      if (i === index) {
                        variable.key = e.target.value;
                      }
                      return variable;
                    })
                  );
                }}
                type="text"
                placeholder="Örn: API_URL"
                className="h-10 rounded bg-black placeholder:text-white/50 border border-white/20 text-sm px-3 text-white outline-none"
              />
              <input
                value={variable.value}
                onChange={(e) => {
                  setVariables((variables) =>
                    variables.map((variable, i) => {
                      if (i === index) {
                        variable.value = e.target.value;
                      }
                      return variable;
                    })
                  );
                }}
                type="text"
                className="h-10 rounded bg-black placeholder:text-white/50 border border-white/20 text-sm px-3 text-white outline-none"
              />
            </div>
          ))}
        </div>
        <button
          onClick={() =>
            setVariables((variables) => [...variables, { key: "", value: "" }])
          }
          className="h-10 px-4 rounded border border-blue-500 text-blue-500 flex items-center text-sm mt-4 "
        >
          Yeni Ekle
        </button>
        <pre className="bg-white/10 p-4 rounded text-white">
          {JSON.stringify(variables, null, 2)}
        </pre>
      </div>
    </div>
  );
}
