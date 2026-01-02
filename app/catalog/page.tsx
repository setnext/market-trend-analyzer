"use client";
import { Plus, Send, ArrowLeft, Loader2 } from "lucide-react";
import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import Image from 'next/image';


function CatalogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const image = searchParams.get("image") ? decodeURIComponent(searchParams.get("image")!) : '';
  const title = searchParams.get("title")? decodeURIComponent(searchParams.get("title")!) : '';


  return (
    <div className="flex flex-col h-screen bg-black">
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
                item.id === 'catalog' ? "bg-purple-600 text-white" : "border border-gray-600 text-gray-400"
              }`}>
                {item.step}
              </div>
              <span className={`text-sm font-medium ${
                item.id === 'catalog' ? "text-purple-400" : "text-gray-400"
              }`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
       {/* Catalog Content */}
      <div className="flex-1 p-6">
        {image ? (
          <div className="bg-gray-900 rounded-lg p-4 w-fit">
            <Image
              src={image}
              alt={title || "Catalog Image"}
              width={300}
              height={300}
              className="rounded-lg object-contain"
            />
            <p className="text-white mt-2 text-center">{title}</p>
          </div>
        ) : (
          <p className="text-gray-400">No items added to catalog yet.</p>
        )}
        <button
        //   onClick={() => router.back()}
            onClick={() =>   router.push(`/showcase?image=${encodeURIComponent(image)}`)}


          className="mt-1 flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        >
          Get BOM & 2D Views
        </button>
      </div>
    </div>
  );    
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center text-white">
        Loading...
      </div>
    }>
      <CatalogContent />
    </Suspense>
  );
}