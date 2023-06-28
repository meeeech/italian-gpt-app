import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default function Home() {
  const [GPTFeedback, setGPTFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [english, setEnglish] = useState("");
  const [italian, setItalian] = useState("");

  const submitToGPT = async () => {
    setLoading(true);
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `English: "${english}" Italian: "${italian}" Correct this translation and explain.`,
        },
      ],
    });
    setLoading(false);
    setGPTFeedback(response.data.choices[0].message.content);
  };

  return (
    <>
      <div className="container">
        <h4>Write a sentence in English, then translate it to Italian.</h4>
        <div className="form">
          <label htmlFor="english">English Sentence</label>
          <textarea
            name="english"
            value={english}
            onChange={(e) => setEnglish(e.target.value)}
          ></textarea>
          <label htmlFor="italian">Italian Sentence</label>
          <textarea
            name="english"
            value={italian}
            onChange={(e) => setItalian(e.target.value)}
          ></textarea>
          <button onClick={() => submitToGPT()}>Submit</button>
        </div>
        <div className="feedback">
          <h4>GPT Feedback:</h4>
          <div>{loading ? "loading..." : GPTFeedback}</div>
        </div>
      </div>
    </>
  );
}
