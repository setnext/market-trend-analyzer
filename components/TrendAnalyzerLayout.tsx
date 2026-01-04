"use client";
import { Plus, Send, Search, TrendingUp, MessageSquare, Sparkles, Lightbulb, Instagram, BarChart3, Upload, RefreshCw, Settings, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from 'react';
import { COUNTRIES } from "../data/countries";
import { useRouter, useSearchParams } from "next/navigation";
type FilterType = 'brand' | 'size' | 'color' | 'gender';
type NavSection = 'context' | 'inspiration';
type CategoryType = 'slippers' | 'shoes' | 'sandals' | 'sports';

interface FilterOptions {
  brand: string[];
  size: string[];
  color: string[];
  gender: string[];
}

interface SelectedFilters {
  brand: string[];
  size: string[];
  color: string[];
  gender: string[];
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface TrendKeyword {
  id: string;
  label: string;
}

interface ProductResult {
  id?: string;
  title?: string;
  name?: string;
  image?: string;
  image_url?: string;
  price?: string | number;
  original_price?: number;
  discount?: number;
  rating?: string | number;
  reviews?: string | number;
  store?: string;
  brand?: string;
  gender?: string;
  colour?: string;
  size?: string;
  url?: string;
  product_url?: string;
  is_trending?: boolean;
  in_stock?: boolean;
}

export default function FootwearTrendAnalyzer() {
  const [activeNav, setActiveNav] = useState<NavSection>('context');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMiddleOpen, setIsMiddleOpen] = useState(true);
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [loading, setLoading] = useState(false);
  const WEBSITES = ["flipkart", "amazon", "myntra", "reliancedigital"];
  const [website, setWebsite] = useState<string>(WEBSITES[0]);
  const isValidWebsite = WEBSITES.includes(website);
  

  const [country, setCountry] = useState<string>("IN");


  const [error, setError] = useState<string | null>(null);
  type ResultSource = "TREND" | "UPLOAD" | null;
  const [resultSource, setResultSource] = useState<ResultSource>(null);


  const [rightPanelMode, setRightPanelMode] =
    useState<"EMPTY" | "IMAGE_RESULTS" | "CHAT">("EMPTY");

  const router = useRouter();

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    brand: [],
    size: [],
    color: [],
    gender: []
  });

  const [expandedSections, setExpandedSections] = useState({
    brand: false,
    size: false,
    price: true,
    color: false,
    gender: false,
    category: false
  });

  const [priceRange, setPriceRange] = useState({
    min: 49,
    max: 9999
  });

  const minPrice = 49;
  const maxPrice = 9999;

  const [activeStep, setActiveStep] = useState<'discover' | 'design' | 'showcase' | 'catalog' | 'tryon'>('discover');
  const [imageResults, setImageResults] = useState<ProductResult[]>([]);

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:8000/similar-products", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setImageResults(data.results || []);
      setResultSource("UPLOAD");
      setRightPanelMode("IMAGE_RESULTS");
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };

  const toggleFilterOption = (filterName: FilterType, option: string): void => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterName]: prev[filterName].includes(option)
        ? prev[filterName].filter(item => item !== option)
        : [...prev[filterName], option]
    }));
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const filterOptions: FilterOptions = {
    brand: ['Nike', 'Campus', 'ASIAN', 'PUMA', 'BRUTON', 'Bata', 'SPARX', 'Adidas', 'Reebok', 'New Balance', 'Asics'],
    size: ['3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11'],
    color: ['Black', 'White', 'Blue', 'Red', 'Green', 'Grey', 'Yellow', 'Brown', 'Navy', 'Beige'],
    gender: ['Men', 'Women', 'Unisex', 'Boys', 'Girls']
  };

  const handleApplyFilters = async () => {
    setLoading(true);
    setError(null);
    setImageResults([]);
    setRightPanelMode("EMPTY");
    setResultSource("TREND");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          website,   // ✅ dynamic
          filters: {
            ...selectedFilters,
            category,
          },
          price_range: priceRange,
        }),

      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error || "Backend error");
        return;
      }

      setImageResults(data.products || []);
      setRightPanelMode("IMAGE_RESULTS");
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };



  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    setRightPanelMode("CHAT");

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "AI agent is processing your request with applied filters...",
          sender: "bot",
          timestamp: new Date()
        }
      ]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const totalActiveFilters =
    Object.values(selectedFilters).flat().length +
    (category ? 1 : 0);


  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* TOP HEADER */}
      <div className="h-14 bg-gray-900 border-b border-gray-800 flex items-center px-6">
        <h1 className="text-lg font-semibold text-white tracking-wide">
          Agentic Trend Analyzer
        </h1>
      </div>

      {/* STEPPER BAR */}
      <div className="bg-black border-b border-gray-800 px-6 py-4">
        <div className="flex items-center gap-10">
          {[
            { id: "discover", label: "Discover", step: "01" },
            { id: "design", label: "Design", step: "02" },
            { id: "showcase", label: "Showcase", step: "03" },
            { id: "catalog", label: "Catalog", step: "04" },
            { id: "tryon", label: "Try-On", step: "05" },
          ].map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                  ${activeStep === item.id
                    ? "bg-purple-600 text-white"
                    : "border border-gray-600 text-gray-400"
                  }`}
              >
                {item.step}
              </div>
              <span
                className={`text-sm font-medium ${activeStep === item.id ? "text-purple-400" : "text-gray-400"}`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        {activeStep === "discover" && (
          <div
            className={`bg-black border-r border-gray-800 transition-all duration-300 
              ${isSidebarOpen ? 'w-32' : 'w-14'} flex flex-col items-center py-6 relative`}
          >
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="absolute -right-3 top-6 bg-gray-800 hover:bg-gray-700 rounded-full p-1 border border-gray-700 transition z-10"
            >
              {isSidebarOpen ? (
                <ChevronLeft className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
            </button>

            <nav className="flex flex-col items-center gap-6 mt-4">
              <button
                onClick={() => setActiveNav('context')}
                title="Intelligence"
                className={`flex flex-col items-center gap-2 px-4 py-3 rounded-lg transition-all ${activeNav === 'context'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
              >
                <Search className="w-6 h-6" />
                {isSidebarOpen && <span className="text-xs font-medium whitespace-nowrap">Intelligence</span>}
              </button>
              <button
                onClick={() => setActiveNav('inspiration')}
                title="Inspiration"
                className={`flex flex-col items-center gap-2 px-4 py-3 rounded-lg transition-all ${activeNav === 'inspiration'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
              >
                <Lightbulb className="w-6 h-6" />
                {isSidebarOpen && <span className="text-xs font-medium whitespace-nowrap">Inspiration</span>}
              </button>
            </nav>
          </div>
        )}

        {/* Middle Panel */}
        <div className={`${isMiddleOpen ? 'w-[22%]' : 'w-14'} bg-gradient-to-b from-gray-900 to-black border-r border-gray-800 overflow-y-auto transition-all duration-300 relative`}>
          <button
            onClick={() => setIsMiddleOpen(!isMiddleOpen)}
            className="absolute -right-3 top-6 bg-gray-800 hover:bg-gray-700 rounded-full p-1 border border-gray-700 transition z-10"
          >
            {isMiddleOpen ? (
              <ChevronLeft className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
          </button>

          {isMiddleOpen ? (
            <>
              {activeNav === 'context' && (
                <div className="p-4 space-y-5">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Search className="w-5 h-5 text-purple-400" />
                      <h2 className="text-xl font-bold text-white">Trend Intelligence</h2>
                    </div>
                    <p className="text-sm text-gray-300 mb-6">Select filters to drive trend insights</p>

                    {/* Country Selector */}
                    <div className="mb-4">
                      <label className="font-semibold text-white">
                        Country
                      </label>

                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
                      >
                        {COUNTRIES.map(c => (
                          <option key={c.code} value={c.code}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>



                    {/* Website Input */}
                    <div className="mb-4">
                      <label className="font-semibold text-white">
                        Website
                      </label>

                      <input
                        type="text"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value.toLowerCase())}
                        placeholder="flipkart / amazon / myntra"
                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
                      />

                      <p className="text-[11px] text-gray-500 mt-1">
                        Supported: flipkart, amazon, myntra, reliancedigital
                      </p>
                    </div>


                    {/* Brand */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-white">Brand</span>
                        <button onClick={() => toggleSection('brand')} className="text-sm text-purple-400">
                          {expandedSections.brand ? 'Collapse' : 'Expand'}
                        </button>
                      </div>
                      {expandedSections.brand && (
                        <div className="grid grid-cols-2 gap-3">
                          {filterOptions.brand.map(brand => (
                            <button
                              key={brand}
                              onClick={() => toggleFilterOption('brand', brand)}
                              className={`h-10 rounded-md border transition-all flex items-center justify-center ${selectedFilters.brand.includes(brand)
                                ? 'bg-purple-600 border-purple-500 text-white'
                                : 'bg-gray-800 border-gray-700 hover:border-gray-600 text-gray-200'
                                }`}
                            >
                              <span className="text-xs font-medium">{brand}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Size */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-white">Size (UK/India)</span>
                        <button onClick={() => toggleSection('size')} className="text-sm text-purple-400">
                          {expandedSections.size ? 'Collapse' : 'Expand'}
                        </button>
                      </div>
                      {expandedSections.size && (
                        <div className="grid grid-cols-6 gap-1 mt-2">
                          {filterOptions.size.map(size => (
                            <button
                              key={size}
                              onClick={() => toggleFilterOption('size', size)}
                              className={`h-8 w-8 rounded-md border transition-all flex items-center justify-center ${selectedFilters.size.includes(size)
                                ? 'bg-purple-600 border-purple-500 text-white'
                                : 'bg-gray-800 border-gray-700 hover:border-gray-600 text-gray-200'
                                }`}
                            >
                              <span className="text-[11px] font-medium">{size}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Price Range */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-white">Price</span>
                        <button onClick={() => toggleSection('price')} className="text-sm text-purple-400">
                          {expandedSections.price ? 'Collapse' : 'Expand'}
                        </button>
                      </div>
                      {expandedSections.price && (
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-gray-300">₹{priceRange.min}</span>
                            <span className="text-sm text-gray-300">₹{priceRange.max.toLocaleString()}</span>
                          </div>
                          <div className="relative h-2">
                            <div className="absolute w-full h-2 bg-gray-700 rounded-full"></div>
                            <div
                              className="absolute h-2 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 rounded-full"
                              style={{
                                left: `${((priceRange.min - minPrice) / (maxPrice - minPrice)) * 100}%`,
                                right: `${100 - ((priceRange.max - minPrice) / (maxPrice - minPrice)) * 100}%`
                              }}
                            ></div>
                            <input
                              type="range"
                              min={minPrice}
                              max={maxPrice}
                              value={priceRange.min}
                              onChange={(e) => {
                                const value = Math.min(Number(e.target.value), priceRange.max - 100);
                                setPriceRange(prev => ({ ...prev, min: value }));
                              }}
                              className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-600 [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:cursor-pointer"
                            />
                            <input
                              type="range"
                              min={minPrice}
                              max={maxPrice}
                              value={priceRange.max}
                              onChange={(e) => {
                                const value = Math.max(Number(e.target.value), priceRange.min + 100);
                                setPriceRange(prev => ({ ...prev, max: value }));
                              }}
                              className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-600 [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-purple-200 [&::-webkit-slider-thumb]:cursor-pointer"
                            />
                          </div>
                          <button
                            onClick={() => setPriceRange({ min: minPrice, max: maxPrice })}
                            className="text-xs text-purple-400 hover:text-purple-300 mt-3"
                          >
                            Reset price range
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Color */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-white">Color</span>
                        <button onClick={() => toggleSection('color')} className="text-sm text-purple-400">
                          {expandedSections.color ? 'Collapse' : 'Expand'}
                        </button>
                      </div>
                      {expandedSections.color && (
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          {filterOptions.color.map(color => (
                            <button
                              key={color}
                              onClick={() => toggleFilterOption('color', color)}
                              className={`h-10 rounded-lg border-2 transition-all flex items-center justify-center ${selectedFilters.color.includes(color)
                                ? 'bg-purple-600 border-purple-500 text-white'
                                : 'bg-gray-800 border-gray-700 hover:border-gray-600 text-gray-200'
                                }`}
                            >
                              <span className="text-xs font-medium">{color}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Gender */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-white">Gender</span>
                        <button onClick={() => toggleSection('gender')} className="text-sm text-purple-400">
                          {expandedSections.gender ? 'Collapse' : 'Expand'}
                        </button>
                      </div>
                      {expandedSections.gender && (
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {filterOptions.gender.map(gender => (
                            <button
                              key={gender}
                              onClick={() => toggleFilterOption('gender', gender)}
                              className={`h-10 rounded-md border transition-all flex items-center justify-center ${selectedFilters.gender.includes(gender)
                                ? 'bg-purple-600 border-purple-500 text-white'
                                : 'bg-gray-800 border-gray-700 hover:border-gray-600 text-gray-200'
                                }`}
                            >
                              <span className="text-xs font-medium">{gender}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Category */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-white">Category</span>
                        <button onClick={() => toggleSection('category')} className="text-sm text-purple-400">
                          {expandedSections.category ? 'Collapse' : 'Expand'}
                        </button>
                      </div>
                      {expandedSections.category && (
                        <div className="grid grid-cols-2 gap-2">
                          {['slippers', 'shoes', 'sandals', 'sports'].map(cat => (
                            <button
                              key={cat}
                              onClick={() => setCategory(cat as CategoryType)}
                              className={`h-10 rounded-md border transition-all ${category === cat
                                ? 'bg-purple-600 border-purple-500 text-white'
                                : 'bg-gray-800 border-gray-700 hover:border-gray-600 text-gray-200'
                                }`}
                            >
                              <span className="text-xs font-medium capitalize">{cat}</span>
                            </button>
                          ))}
                        </div>
                      )}

                    </div>

                    <button
                      onClick={handleApplyFilters}
                      disabled={totalActiveFilters === 0 || !isValidWebsite}
                      className={`w-full py-2 text-xs font-medium rounded ${totalActiveFilters > 0 && isValidWebsite
                        ? 'bg-purple-600 hover:bg-purple-700 text-white'
                        : 'bg-gray-700 cursor-not-allowed opacity-60 text-gray-400'
                        }`}
                    >
                      Apply {totalActiveFilters} Filter{totalActiveFilters !== 1 ? 's' : ''}
                    </button>

                  </div>
                </div>
              )}

              {activeNav === 'inspiration' && (
                <div className="p-4 space-y-4">
                  <h2 className="text-xl font-bold text-white mb-4">Get Inspired</h2>
                  {/* Country Selector */}
                  <div className="mb-4">
                    <label className="font-semibold text-white">
                      Country
                    </label>

                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
                    >
                      {COUNTRIES.map(c => (
                        <option key={c.code} value={c.code}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Upload UI */}
                  <label className="relative z-50 border-2 border-dashed border-gray-700 rounded-lg p-6 text-center cursor-pointer hover:border-gray-500 transition block">
                    <Upload className="w-8 h-8 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-300 font-semibold mb-1">
                      Click to upload moodboards or sketches
                    </p>
                    <p className="text-[11px] text-gray-500">PNG · JPG · JPEG</p>
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleImageUpload(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center pt-6 gap-6">
              <Search className="w-6 h-6 text-gray-500" />
            </div>
          )}
        </div>




        {/* Right Panel */}
        <div className="flex-1 flex flex-col bg-black">
          <div className="bg-gray-900 border-b border-gray-800 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* EMPTY ON PURPOSE — imageResults moved below */}
              </div>
              {resultSource === "TREND" && totalActiveFilters > 0 && (
                <div className="bg-purple-600 px-3 py-1.5 rounded-full text-xs font-semibold text-white">
                  {totalActiveFilters} filter{totalActiveFilters !== 1 ? "s" : ""} active
                </div>
              )}

            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">

            {/* LOADING STATE */}
            {loading && (
              <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-10 h-10 border-4 border-purple-600/30 border-t-purple-600 rounded-full animate-spin"></div>
                  <p className="text-sm text-gray-400">
                    Analyzing products with applied filters...
                  </p>
                </div>
              </div>
            )}



            {/* IMAGE UPLOAD RESULTS */}
            {rightPanelMode === "IMAGE_RESULTS" && imageResults.length > 0 && (
              <div className="mt-6 mb-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {imageResults.map((item, index) => (
                    <div
                      key={index}
                      onClick={() =>
                        router.push(
                          `/productDesign?image=${encodeURIComponent(item.image || item.image_url || "")}&title=${encodeURIComponent(item.title || item.name || "Selected Product")}`
                        )
                      }
                      className="cursor-pointer bg-gray-900 rounded-lg overflow-hidden border border-gray-700 hover:border-purple-500 transition"
                    >
                      <img
                        src={
                          item.image || item.image_url
                            ? `http://127.0.0.1:8000/api/image-proxy?url=${encodeURIComponent(
                              item.image ?? item.image_url ?? ""
                            )}`
                            : ""
                        }
                        alt={item.title || item.name}
                        className="w-full h-48 object-contain bg-white"
                      />



                      <div className="p-3">
                        <p className="text-sm font-semibold text-white line-clamp-2">
                          {item.title || item.name}
                        </p>

                        {item.price && (
                          <p className="text-xs text-purple-400 mt-1">
                            ₹{item.price.toLocaleString()}
                          </p>
                        )}

                        {item.rating && (
                          <p className="text-xs text-gray-400 mt-1">⭐ {item.rating}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* EMPTY STATE */}
            {!loading && rightPanelMode === "EMPTY" && messages.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-300 mb-2">
                    Start Analyzing Footwear Trends
                  </h3>
                  <p className="text-gray-400">
                    Apply filters on the left and ask questions about styles, brands, or emerging trends.
                  </p>
                </div>
              </div>
            )}


            {/* CHAT */}
            {rightPanelMode === "CHAT" && messages.length > 0 && (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                  >
                    <div
                      className={`max-w-2xl px-5 py-3 rounded-2xl ${message.sender === "user"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-800 text-white border border-gray-700"
                        }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className="text-xs mt-1 text-gray-400">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}