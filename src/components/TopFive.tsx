"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Quote = {
  id: number;
  quote: string;
  vote: number;
  author: string;
  tags: string[];
};

const TopFive = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://python-flask-api-1-fih1.onrender.com/api/quotes")
      .then((res) => res.json())
      .then((data) => {
        const topFive = data.quotes
          .sort((a: Quote, b: Quote) => b.vote - a.vote)
          .slice(0, 5);
        setQuotes(topFive);
      })
      .catch(() => toast("Failed to fetch top quotes"))
      .finally(() => setLoading(false));
  }, []);

  const voteForQuote = (id: number) => {
    fetch(`http://localhost:5000/api/quotes/${id}`, {
      method: "POST",
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            toast(data.message || "Already voted");
            throw new Error(data.message);
          });
        }
        return res.json();
      })
      .then((updated: Quote) => {
        setQuotes((prev) =>
          prev
            .map((q) => (q.id === id ? updated : q))
            .sort((a, b) => b.vote - a.vote)
            .slice(0, 5)
        );
      })
      .catch((err) => console.error(err));
  };

  const Skeleton = () => (
    <div className="animate-pulse flex gap-x-5 space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-[20px] w-[20px]  bg-stone-800 rounded-full" />
      ))}
    </div>
  );

  return (
    <div
      id="top-five"
      className="w-full left-0 max-w-4xl light-color mt-16 p-8"
    >
      <h1 className="text-5xl mb-4 font-semibold">Top Five Quotes</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-xl">
        Discover the most voted quotes from our collection. Vote for your
        favorites.
      </p>

      <div className="">
        <div className="space-y-6">
          {loading ? (
            <Skeleton />
          ) : (
            quotes.map((q) => (
              <div
                key={q.id}
                className="bg-white/50 p-3 pb-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4"
              >
                <div>
                  <p className="text-lg">&quot;{q.quote}&quot;</p>
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
      </div>
    </div>
  );
};

export default TopFive;
