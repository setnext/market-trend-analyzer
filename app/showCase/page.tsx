"use client";
import { Plus, Send, ArrowLeft, Loader2 } from "lucide-react";
import React, {useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import Image from 'next/image';

export default function ShowCaseContent() {
  const router = useRouter();
  // const searchParams = useSearchParams();
  // const image = searchParams.get("image") ? decodeURIComponent(searchParams.get("image")!) : '';
  // const title = searchParams.get("title")? decodeURIComponent(searchParams.get("title")!) : ''; 

interface ShowcaseResult {
  description?: string;
  components?: {
    name: string;
    material: string;
    quantity: number;
  }[];
  image_url?: string;
}



  // useEffect(() => {
  //   if (!image) return;

  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);

  //       const response = await fetch("http://127.0.0.1:8000/showcase", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ image }),
  //       });

  //       const data = await response.json();
  //       setResult(data);
  //     } catch (err) {
  //       console.error("Showcase API error:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [image]);
// const [result, setResult] = useState<ShowcaseResult | null>(null);
//   const [loading, setLoading] = useState(false);
  return (
    <div className="flex flex-col h-screen bg-black">
      <div className="h-14 bg-gray-900 border-b border-gray-800 flex items-center px-6">
        <h1 className="text-lg font-semibold text-white tracking-wide">
          Agentic Trend Analyzer
        </h1>
      </div>
            <div className="bg-black border-b border-gray-800 px-6 py-4">
        {/* <div className="flex items-center gap-10">
          {[
            { id: "discover", label: "Discover", step: "01" },
            { id: "design", label: "Design", step: "02" },
            { id: "catalog", label: "Catalog", step: "03" },
            { id: "showcase", label: "Showcase", step: "04" },
            { id: "tryon", label: "Try-On", step: "05" },
          ].map((item) => (
            <button key={item.id} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                item.id === 'showcase' ? "bg-purple-600 text-white" : "border border-gray-600 text-gray-400"
              }`}>
                {item.step}
              </div>
              <span className={`text-sm font-medium ${
                item.id === 'showcase' ? "text-purple-400" : "text-gray-400"
              }`}>
                {item.label}
              </span>
            </button>
          ))}
        </div> */}
      </div>
    {/* Content */}
      {/* <div className="p-6 flex-1">
        {loading && (
          <p className="text-gray-400">Analyzing image...</p>
        )}

        {!loading && result && (
          <div className="space-y-6">
            <Image
              src={image!}
              alt="Selected"
              width={300}
              height={300}
              className="rounded-lg"
            />

            <div className="bg-gray-900 p-4 rounded-lg text-white">
              <h3 className="text-lg font-semibold mb-2">Analysis Result</h3>
              <pre className="text-sm whitespace-pre-wrap">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div> */}
      </div>
  )
}