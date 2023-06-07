import React, { useState } from "react";

export const ExplainCode = () => {
  const [value, setValue] = useState("");
  const [explanation, setExplanation] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleCallOpenAIAPI = async () => {
    setLoading(true);
    fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: "Explain this code: " + value,
        temperature: 0,
        max_tokens: 150,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ['"""'],
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("fetching failed");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.choices[0].text);
        setExplanation(data.choices[0].text);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  console.log(error);
  console.log(error.message);

  return (
    <div className="container">
      <h1>Explain code</h1>
      <textarea
        placeholder="Put your code here"
        cols={50}
        rows={20}
        onChange={handleChange}
      />
      <button onClick={handleCallOpenAIAPI} disabled={value === ""}>
        Explain
      </button>
      {loading ? <p>Loading ... </p> : null}
      {error ? <p>error</p> : null}
      <p>{explanation}</p>
    </div>
  );
};
