"use client";

import { useState } from "react";

const availableTags = [
  "life",
  "humor",
  "philosophy",
  "motivation",
  "love",
  "wisdom",
];

export default function PostQuotePage() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else if (selectedTags.length < 2) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError("");

    if (selectedTags.length !== 2) {
      setError("Please select exactly 2 tags.");
      return;
    }

    const res = await fetch("http://localhost:5000/api/quotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quote,
        author,
        tags: selectedTags,
      }),
    });

    if (res.ok) {
      setQuote("");
      setAuthor("");
      setSelectedTags([]);
      setSuccess(true);
    } else {
      const data = await res.json();
      setError(data.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex flex-col light-color items-center justify-center p-6">
      <h1 className="text-4xl  mb-6">Post a New Quote</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md"
      >
        <textarea
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder="Write your quote here..."
          className="p-3 border border-stone-500 bg-white/80 rounded-[3px] resize-none"
          rows={4}
          required
        />

        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          className="p-3 border  border-stone-500 bg-white/80 rounded-[3px]"
          required
        />

        <div>
          <p className="mb-1 font-medium">Select 2 tags:</p>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <button
                type="button"
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 first-letter:uppercase  border-stone-500 bg-white/80 rounded-[3px] cursor-pointer text-sm transition ${
                  selectedTags.includes(tag)
                    ? "bg-black text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className=" py-2 px-4 rounded border-[#2b2b2b] border-[1px] cursor-pointer transition"
        >
          Submit
        </button>

        {success && (
          <p className="text-[#476725]">Quote submitted successfully!</p>
        )}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
}
