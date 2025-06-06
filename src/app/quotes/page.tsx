"use client";

import { useEffect, useState } from "react";

type Quote = {
  id: number;
  quote: string;
  vote: number;
  author: string;
  tags?: string[];
};

const availableTags = [
  "life",
  "humor",
  "philosophy",
  "motivation",
  "love",
  "wisdom",
];
export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalQuotes, setTotalQuotes] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const quotesPerPage = 10;

  useEffect(() => {
    const fetchQuotes = async () => {
      const res = await fetch(
        `http://localhost:5000/api/quotes?page=${currentPage}&limit=${quotesPerPage}`
      );
      const data = await res.json();
      setQuotes(data.quotes);
      setTotalQuotes(data.total);
    };

    fetchQuotes();
  }, [currentPage]);

  // Filter quotes by selected tags (if any)
  const filteredQuotes = selectedTags.length
    ? quotes.filter((quote) =>
        quote.tags?.some((tag) => selectedTags.includes(tag))
      )
    : quotes;

  const totalPages = Math.ceil(totalQuotes / quotesPerPage);

  // Tag toggle handler
  const toggleTag = (tag: string) => {
    setCurrentPage(1); // reset page on filter change
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Vote handler
  const voteForQuote = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:5000/api/quotes/${id}`, {
        method: "POST",
      });

      if (!res.ok) {
        const errData = await res.json();
        alert(errData.message || "Error voting for quote");
        return;
      }

      const updatedQuote: Quote = await res.json();

      // Update quotes state with new vote count
      setQuotes((prevQuotes) =>
        prevQuotes.map((q) => (q.id === id ? updatedQuote : q))
      );
    } catch (error) {
      console.error("Vote failed:", error);
      alert("Failed to vote, please try again later.");
    }
  };

  return (
    <div className="min-h-screen p-10 light-color">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Quotes</h1>
        <p>Page {currentPage}</p>
      </div>

      {/* Tag filters */}
      <div className="mb-6 flex flex-wrap gap-3">
        {availableTags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`px-3 py-1 rounded-[2px] first-letter:uppercase cursor-pointer border ${
              selectedTags.includes(tag)
                ? "bg-stone-800 text-white border-[#2b2b2b]"
                : "bg-white text-[#2b2b2b] border-transparent"
            }`}
          >
            {tag}
          </button>
        ))}
        {selectedTags.length > 0 && (
          <button
            onClick={() => setSelectedTags([])}
            className="px-3 py-1 rounded-[2px] border bg-red-900 cursor-pointer text-white ml-2"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Quotes list */}
      <div className="space-y-6">
        {filteredQuotes.length === 0 ? (
          <p>No quotes match your selected tags.</p>
        ) : (
          filteredQuotes.map((q) => (
            <div
              key={q.id}
              className="border-b pb-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4"
            >
              <div>
                <p className="text-lg">"{q.quote}"</p>
                <p className="text-sm text-gray-600">— {q.author}</p>
                {q.tags && (
                  <div className="flex gap-2 mt-1">
                    {q.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs bg-white/60 px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-sm mt-1">Votes: {q.vote}</p>
              </div>
              <button
                onClick={() => voteForQuote(q.id)}
                className="px-4 py-2 transition border-[1px] border-[#2b2b2b] cursor-pointer"
              >
                Vote
              </button>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div className="mt-8 flex gap-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 bg-gray-100 rounded-[2px] cursor-pointer disabled:opacity-50"
        >
          Previous
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-100 cursor-pointer rounded-[2px] disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
