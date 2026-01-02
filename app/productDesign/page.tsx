"use client";
import {Plus,Send,ArrowLeft,Loader2,Download,Heart} from "lucide-react";
import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import Image from 'next/image';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  editedImage?: string;
}

function ProductDesignContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
const productImage = searchParams.get('image') ? decodeURIComponent(searchParams.get('image')!) : '';
  const productTitle = searchParams.get('title') ? decodeURIComponent(searchParams.get('title')!) : '';
const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentEditedImage, setCurrentEditedImage] =useState<string>(productImage);
  const [hasBeenEdited, setHasBeenEdited] = useState(false);
  const [replaceImage, setReplaceImage] = useState<File | null>(null);
  const [size] = useState<string>("7");

  // 🔹 ADDED – FAVORITES & CATALOG VIEW
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeView, setActiveView] =useState<"design" | "catalog">("design");

  // 🔹 ADDED – DOWNLOAD HANDLER
  const handleDownloadImage = async () => {
    if (!currentEditedImage) return;
    try {
      const res = await fetch(currentEditedImage);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `design-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Download failed", e);
    }
  };

  // Initialize messages
  React.useEffect(() => {
    if (productTitle && productImage && messages.length === 0) {
      setMessages([
        {
          id: Date.now(),
          text: `I can help you modify "${productTitle}".`,
          sender: 'bot',
          timestamp: new Date(),
          editedImage: productImage
        }
      ]);
    }
  }, [productTitle, productImage, messages.length]);

  const handleImageEdit = async (prompt: string) => {
    if (!currentEditedImage) return;
    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append("image_url", currentEditedImage);
      formData.append("prompt", prompt);
      formData.append("size", size);
      if (replaceImage) {
        formData.append("replace_image", replaceImage);
      }

      const response = await fetch(
        "http://127.0.0.1:8000/image/replace",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      const editedImageUrl =
        `http://127.0.0.1:8000${result.views.edited}`;

      const botMessage: Message = {
        id: Date.now() + 1,
        text: `Modified: "${prompt}".`,
        sender: "bot",
        timestamp: new Date(),
        editedImage: editedImageUrl,
      };

      setMessages(prev => [...prev, botMessage]);
      setCurrentEditedImage(editedImageUrl);
      setHasBeenEdited(true);
      setReplaceImage(null);
      setIsFavorite(false); // 🔹 reset on new design

    } catch (err) {
      console.error("Edit failed:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    const prompt = inputValue;
    setInputValue("");
    await handleImageEdit(prompt);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isProcessing) {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black">

      {/* HEADER */}
      <div className="h-14 bg-gray-900 border-b border-gray-800 flex items-center px-6">
        <h1 className="text-lg font-semibold text-white tracking-wide">
          Agentic Trend Analyzer
        </h1>
      </div>

      {/* STEPPER NAV */}
      <div className="bg-black border-b border-gray-800 px-6 py-4">
        <div className="flex items-center gap-10">
          {[
            { id: "discover", label: "Discover", step: "01" },
            { id: "design", label: "Design", step: "02" },
            { id: "catalog", label: "Catalog", step: "03" },
            { id: "showcase", label: "Showcase", step: "04" },
            { id: "tryon", label: "Try-On", step: "05" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === "catalog") setActiveView("catalog");
                if (item.id === "design") setActiveView("design");
              }}
              className="flex items-center gap-3"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  item.id === activeView
                    ? "bg-purple-600 text-white"
                    : "border border-gray-600 text-gray-400"
                }`}
              >
                {item.step}
              </div>
              <span
                className={`text-sm font-medium ${
                  item.id === activeView
                    ? "text-purple-400"
                    : "text-gray-400"
                }`}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">

        {/* LEFT PANEL */}
        <div className="w-[35%] bg-gradient-to-b from-gray-900 to-black border-r border-gray-800 p-6 flex flex-col">

          <h2 className="text-xl font-bold text-white mb-2">
            {activeView === "catalog"
              ? "Favorite Designs"
              : hasBeenEdited
                ? "Generated Design"
                : "Current Design"}
          </h2>

          <p className="text-sm text-gray-400 mb-3">
            {productTitle}
          </p>

          {/* DESIGN VIEW */}
          {activeView === "design" && currentEditedImage && (
            <div className="relative flex-1 flex items-center justify-center bg-white rounded-lg overflow-hidden">

              {/* FAVORITE + DOWNLOAD */}
              <div className="absolute top-3 right-3 z-10 flex gap-2">
                <button
                  onClick={() => {
                    setIsFavorite(prev => !prev);
                    setFavorites(prev =>
                      prev.includes(currentEditedImage)
                        ? prev.filter(i => i !== currentEditedImage)
                        : [...prev, currentEditedImage]
                    );
                  }}
                  className="p-2 bg-black/60 rounded-full"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isFavorite
                        ? "text-green-500 fill-green-500"
                        : "text-white"
                    }`}
                  />
                </button>

                <button
                  onClick={handleDownloadImage}
                  className="p-2 bg-black/60 rounded-full"
                >
                  <Download className="w-5 h-5 text-white" />
                </button>
              </div>

              <Image
                src={currentEditedImage}
                alt={productTitle}
                width={500}
                height={500}
                className="max-w-full max-h-full object-contain"
                unoptimized
              />
            </div>
          )}

          {/* CATALOG VIEW */}
          {activeView === "catalog" && (
            <div className="grid grid-cols-2 gap-4 overflow-y-auto">
              {favorites.length === 0 ? (
                <p className="text-gray-400 text-sm">
                  No favorite designs yet.
                </p>
              ) : (
                favorites.map((img, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-purple-500"
                    onClick={() => {
                      setCurrentEditedImage(img);
                      setActiveView("design");
                      setIsFavorite(true);
                    }}
                  >
                    <Image
                      src={img}
                      alt="Favorite"
                      width={300}
                      height={300}
                      unoptimized
                    />
                  </div>
                ))
              )}
            </div>
          )}

 {activeView === "design" && (
  <div className="mt-4">
    <button
      onClick={() =>
        router.push(
          `/catalog?image=${encodeURIComponent(currentEditedImage)}&title=${encodeURIComponent(productTitle)}`
        )
      }
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
    >
      Add to Catalogue
    </button>
  </div>
)}

        </div>

        {/* CHAT PANEL – FULLY PRESERVED */}
        <div className="flex-1 flex flex-col bg-black text-white">
          <div className="bg-gray-900 border-b border-gray-800 px-6 py-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Discovery</span>
            </button>
            <h2 className="font-bold text-lg">AI Design Modification</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user'
                      ? 'justify-end'
                      : 'justify-start'
                  }`}
                >
                  <div className="max-w-2xl px-5 py-3 rounded-2xl bg-gray-800 border border-gray-700">
                    <p className="text-sm">{message.text}</p>

                    {message.editedImage && (
                      <Image
                        src={message.editedImage}
                        alt="Design preview"
                        width={400}
                        height={400}
                        className="mt-4 rounded-lg border border-gray-600 cursor-pointer"
                        onClick={() =>
                          setCurrentEditedImage(message.editedImage!)
                        }
                        unoptimized
                      />
                    )}

                    <p className="text-xs mt-2 text-gray-500">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {isProcessing && (
                <div className="flex justify-start">
                  <div className="px-5 py-3 rounded-2xl bg-gray-800 border border-gray-700">
                    <div className="flex items-center gap-3">
                      <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
                      <p className="text-sm text-gray-300">
                        Generating design modifications...
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* INPUT BAR */}
          <div className="bg-gray-900 border-t border-gray-800 px-6 py-4">
            <div className="flex items-center gap-3 bg-gray-800 border border-gray-700 rounded-full px-4 py-3">
              <label className="cursor-pointer p-1 hover:bg-gray-700 rounded-full transition">
                <Plus className="w-5 h-5 text-gray-400" />
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setReplaceImage(e.target.files[0]);
                    }
                  }}
                />
              </label>

              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe the changes you want..."
                className="flex-1 outline-none bg-transparent text-white placeholder-gray-500 text-sm"
                disabled={isProcessing}
              />

              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isProcessing}
                className="p-2 rounded-full bg-purple-600 hover:bg-purple-700 transition disabled:opacity-50"
              >
                {isProcessing
                  ? <Loader2 className="w-4 h-4 animate-spin" />
                  : <Send className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <div className="h-14 bg-gray-900 border-b border-gray-800 flex items-center px-6">
        <div className="h-6 w-48 bg-gray-800 rounded animate-pulse"></div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
          <p className="text-gray-400">Loading product...</p>
        </div>
      </div>
    </div>
  );
}

export default function ProductDesign() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ProductDesignContent />
    </Suspense>
  );
}
