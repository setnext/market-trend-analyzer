"use client";
import { Plus, Send, ArrowLeft, Loader2 } from "lucide-react";
import React, {useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import Image from 'next/image';

export default function ShowCaseContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const image = searchParams.get("image") ? decodeURIComponent(searchParams.get("image")!) : '';
  const title = searchParams.get("title")? decodeURIComponent(searchParams.get("title")!) : ''; 
  const formData = new FormData();

interface ShowcaseResult {
  top_view?: string;
  side_view?: string;
    image?: string;
  description?: string;
  bom_details?: {
    product_name?: string;
    components: {
      name: string;
      material: string;
      finish?: string;
      quantity: number;
    }[];
  };
}



useEffect(() => {
  if (!image) return;

  const fetchImage = async () => {
    try {
      setLoading(true);

      const imgRes = await fetch(image);
      const blob = await imgRes.blob();

      const formData = new FormData();
      formData.append("file", blob, "input.png");

      const response = await fetch("http://127.0.0.1:8000/bom-orthographic-view", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch orthographic image");
      }

      const data = await response.json();

      setResult({
        top_view: `data:image/png;base64,${data.top_view}`,
        side_view: `data:image/png;base64,${data.side_view}`,
        bom_details: data.bom_details

      });

      // ✅ IMPORTANT: read as BLOB, not JSON
      // const imageBlob = await response.blob();
      // const imageUrl = URL.createObjectURL(imageBlob);

      // setResult({ image: imageUrl });

    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchImage();
}, [image]);


const [result, setResult] = useState<ShowcaseResult | null>(null);
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex flex-col min-h-screen  bg-black">
      <div className="h-14 bg-gray-900 border-b border-gray-800 flex items-center px-6">
        <h1 className="text-lg font-semibold text-white tracking-wide">
          Agentic Trend Analyzer
        </h1>
      </div>
            <div className="bg-black border-b border-gray-800 px-6 py-4">
        <div className="flex items-center gap-10">
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
        </div>
      </div>
    {/* Content */}
      <div className="p-6 flex-1">
        {loading && (
          <p className="text-gray-400">Analyzing image...</p>
        )}
<div className="p-6 flex-1">
  {loading && (
    <p className="text-gray-400">Analyzing image...</p>
  )}

  {!loading && result && (
  <div className="space-y-10">
        <div className="flex flex-col items-center bg-white rounded-lg p-4 w-full md:w-[45%]">
      <img
        src={image}
        alt="Actual Image"
        className="max-h-[250px] object-contain mb-3"
      />
      <h3 className="text-black text-lg font-semibold">Top View</h3>
    </div>
<div className="flex flex-wrap gap-6 justify-center mt-6">

  {/* TOP VIEW */}
      {result.top_view && (
        <div className="bg-white rounded-lg p-4 w-full md:w-[45%]">
          <img
            src={result.top_view}
            alt="Top View"
            className="max-h-[280px] object-contain mx-auto"
          />
          <p className="text-center font-semibold mt-2">Top View</p>
        </div>
      )}

  {/* SIDE VIEW */}
      {result.side_view && (
        <div className="bg-white rounded-lg p-4 w-full md:w-[45%]">
          <img
            src={result.side_view}
            alt="Side View"
            className="max-h-[280px] object-contain mx-auto"
          />
          <p className="text-center font-semibold mt-2">Side View</p>
        </div>
      )}
    </div>


    {/* BOM SECTION */}
    {result.bom_details && (
      <div className="bg-gray-900 rounded-xl p-6 mt-8">
        <h2 className="text-xl font-semibold text-white mb-4">
          Bill of Materials
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-700 text-sm">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Component</th>
                <th className="px-4 py-2 text-left">Material</th>
                <th className="px-4 py-2 text-left">Finish</th>
                <th className="px-4 py-2 text-center">Qty</th>
              </tr>
            </thead>
            <tbody>
              {result.bom_details.components.map((item, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-700 hover:bg-gray-800  text-white"
                >
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.material}</td>
                  <td className="px-4 py-2">{item.finish}</td>
                  <td className="px-4 py-2 text-center">{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}
  </div>
)}
  </div>
 
</div>

        {/* {!loading && result && (
          <div className="space-y-6">
            <Image
              src={image!}
              alt="Selected"
              width={300}
              height={300}
              unoptimized
              className="rounded-lg"
            />

            <div className="bg-gray-900 p-4 rounded-lg text-white">
              <h3 className="text-lg font-semibold mb-2">Analysis Result</h3>
              <pre className="text-sm whitespace-pre-wrap">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </div>
        )} */}
      </div>

  )
}