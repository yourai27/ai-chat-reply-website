import { useState } from "react";

export default function Home() {
  const [chat, setChat] = useState("");
  const [useCase, setUseCase] = useState("General");
  const [tone, setTone] = useState("Friendly");
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateReply = async () => {
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat, useCase, tone }),
    });
    const data = await res.json();
    setReplies(data.replies || []);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", fontFamily: "Arial" }}>
      <h1>AI Conversation Reply Generator</h1>

      <textarea
        rows="8"
        placeholder="Paste your chat here..."
        value={chat}
        onChange={(e) => setChat(e.target.value)}
        style={{ width: "100%", padding: 10 }}
      />

      <br /><br />

      <select onChange={(e) => setUseCase(e.target.value)}>
        <option>General</option>
        <option>Dating</option>
        <option>Professional</option>
        <option>Sales</option>
        <option>Emotional Support</option>
      </select>

      <select onChange={(e) => setTone(e.target.value)} style={{ marginLeft: 10 }}>
        <option>Friendly</option>
        <option>Professional</option>
        <option>Playful</option>
        <option>Confident</option>
        <option>Formal</option>
      </select>

      <br /><br />

      <button onClick={generateReply}>
        {loading ? "Generating..." : "Generate Reply"}
      </button>

      <ul>
        {replies.map((r, i) => (
          <li key={i} style={{ marginTop: 10 }}>{r}</li>
        ))}
      </ul>
    </div>
  );
}
