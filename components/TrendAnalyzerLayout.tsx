"use client";
import { Plus, Send, Search, TrendingUp, MessageSquare, Sparkles, Lightbulb, Instagram, BarChart3, Upload, RefreshCw, Settings, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from 'react';
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
  const [category, setCategory] = useState<CategoryType>('shoes');
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [resultData, setResultData] = useState<ProductResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rightPanelItems, setRightPanelItems] = useState<ProductResult[]>([]);
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
    gender: false
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
      const results = data.results || [];

      setImageResults(data.results || []);
      setRightPanelItems(results);  
      
    } catch (error) {
      console.error("Upload failed", error);
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
    setIsResultOpen(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          website: "flipkart",
          filters: {
            ...selectedFilters,
            category,
          },
          price_range: {
            min: priceRange.min,
            max: priceRange.max,
          },
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || "Failed to fetch products");
      }

      const data = await response.json();
      const products = data.products || [];
      setResultData(data.products || []);
      setRightPanelItems(products);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setResultData([]);
    } finally {
      setLoading(false);
    }
  };



  const closeResultModal = () => {
    setIsResultOpen(false);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

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

  const trendingKeywords: TrendKeyword[] = [
    { id: '1', label: 'Chunky Sneakers' },
    { id: '2', label: 'Sustainable Footwear' },
    { id: '3', label: 'Platform Shoes' },
    { id: '4', label: 'Minimalist Sneakers' },
    { id: '5', label: 'Retro Runners' },
    { id: '6', label: 'Mary Janes' },
    { id: '7', label: 'Athletic Sandals' },
    { id: '8', label: 'Ballet Flats Revival' },
    { id: '9', label: 'Clogs Comeback' }
  ];

  const socialMediaTopics: TrendKeyword[] = [
    { id: '1', label: 'Adidas Samba' },
    { id: '2', label: 'New Balance 550' },
    { id: '3', label: 'Onitsuka Tiger' },
    { id: '4', label: 'Mesh Ballet Flats' },
    { id: '5', label: 'Chunky Loafers' },
    { id: '6', label: 'Sporty Sandals' }
  ];

  const totalActiveFilters = Object.values(selectedFilters).flat().length;

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
                      </div>
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
                    </div>

                    <button
                      onClick={handleApplyFilters}
                      disabled={totalActiveFilters === 0}
                      className={`w-full py-2 text-xs font-medium rounded ${totalActiveFilters > 0
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
              {totalActiveFilters > 0 && (
                <div className="bg-purple-600 px-3 py-1.5 rounded-full text-xs font-semibold text-white">
                  {totalActiveFilters} filter{totalActiveFilters !== 1 ? 's' : ''} active
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {/* IMAGE UPLOAD RESULTS — NOW CORRECTLY PLACED IN MAIN CONTENT AREA */}
            {imageResults.length > 0 && (
              <div className="mt-6 mb-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {imageResults.map((item, index) => (
                    <div
                      key={index}
                      onClick={() =>
                    router.push(
                      `/productDesign?image=${encodeURIComponent(item.image || '')}&title=${encodeURIComponent(item.title || '')}`
                    )
                  }
                                      className="cursor-pointer bg-gray-900 rounded-lg overflow-hidden border border-gray-700 hover:border-purple-500 transition"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-contain bg-white"
                      />
                      <div className="p-3">
                        <p className="text-sm font-semibold text-white line-clamp-2">
                          {item.title}
                        </p>
                        {item.price && (
                          <p className="text-xs text-purple-400 mt-1">{item.price}</p>
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

            {/* CHAT MESSAGES OR EMPTY STATE */}
            {messages.length === 0 && imageResults.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-300 mb-2">Start Analyzing Footwear Trends</h3>
                  <p className="text-gray-400">Apply filters on the left and ask questions about styles, brands, or emerging trends.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-2xl px-5 py-3 rounded-2xl ${message.sender === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-800 text-white border border-gray-700'
                      }`}>
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-purple-200' : 'text-gray-500'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-gray-900 border-t border-gray-800 px-6 py-4">
            <div className="flex items-center gap-3 bg-gray-800 border border-gray-700 rounded-full px-4 py-3">
              <button className="p-1 hover:bg-gray-700 rounded-full transition">
                <Plus className="w-5 h-5 text-gray-400" />
              </button>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about footwear trends, brands, or styles..."
                className="flex-1 outline-none bg-transparent text-white placeholder-gray-500 text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="p-2 rounded-full bg-purple-600 hover:bg-purple-700 transition disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* PRODUCT RESULTS MODAL */}
        {isResultOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-7xl max-h-[90vh] bg-gradient-to-b from-gray-900 to-black rounded-2xl shadow-2xl border border-gray-800 overflow-hidden flex flex-col">

              {/* Header */}
              <div className="bg-gradient-to-r from-purple-900/50 to-violet-900/50 px-6 py-4 border-b border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">
                      Amazon – {category.toUpperCase()} Results
                    </h3>
                    <p className="text-xs text-gray-400">
                      {!loading && Array.isArray(resultData) && resultData.length > 0
                        ? `${resultData.length} products found`
                        : 'Loading products...'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closeResultModal}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 custom-scroll">
                {/* Loading State */}
                {loading && (
                  <div className="flex flex-col items-center justify-center py-20">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-purple-600/30 border-t-purple-600 rounded-full animate-spin"></div>
                      <BarChart3 className="w-6 h-6 text-purple-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <p className="text-sm text-gray-400 mt-4">
                      Analyzing Amazon products...
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      This may take a few moments
                    </p>
                  </div>
                )}

                {/* Error State */}
                {!loading && error && (
                  <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                      <span className="text-3xl">⚠️</span>
                    </div>
                    <p className="text-red-400 font-semibold mb-2">Failed to fetch products</p>
                    <p className="text-sm text-gray-500">{error}</p>
                    <button
                      onClick={handleApplyFilters}
                      className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium"
                    >
                      Try Again
                    </button>
                  </div>
                )}

                {/* Results Grid */}
                {!loading && !error && Array.isArray(resultData) && resultData.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {resultData.map((item, index) => (
                      <div
                        key={item.id || index}
                        className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/10 group"
                      >
                        {/* Image Container */}
                        <div className="relative bg-white/5 p-4 h-48 flex items-center justify-center">
                          {item.is_trending && (
                            <div className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              TRENDING
                            </div>
                          )}
                          {!item.in_stock && (
                            <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                              OUT OF STOCK
                            </div>
                          )}
                          {item.image_url ? (
                            <img
                              src={item.image_url}
                              alt={item.name || 'Product'}
                              className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                console.error('Image failed to load:', item.image_url);
                                e.currentTarget.style.display = 'none';
                                const parent = e.currentTarget.parentElement;
                                if (parent) {
                                  parent.innerHTML += '<div class="flex flex-col items-center justify-center h-full"><div class="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center mb-2"><svg class="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div><p class="text-xs text-gray-500">Image not available</p></div>';
                                }
                              }}
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center h-full">
                              <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center mb-2">
                                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                              </div>
                              <p className="text-xs text-gray-500">No image</p>
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="p-4">
                          <p className="text-sm font-semibold text-white line-clamp-2 mb-2 min-h-[40px]">
                            {item.name || 'Product Name'}
                          </p>

                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-medium text-gray-400 bg-gray-700 px-2 py-0.5 rounded">
                              {item.brand || 'Brand'}
                            </span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-400 capitalize">
                              {item.gender || 'N/A'}
                            </span>
                          </div>

                          {/* Price */}
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className="text-lg font-bold text-purple-400">
                              ₹{typeof item.price === 'number' || typeof item.price === 'string'
                                ? Number(item.price || 0).toLocaleString()
                                : '0'}
                            </span>

                            {item.original_price != null &&
                              item.price != null &&
                              Number(item.original_price) > Number(item.price) && (
                                <>
                                  <span className="text-xs line-through text-gray-500">
                                    ₹{Number(item.original_price).toLocaleString()}
                                  </span>

                                  {item.discount != null && item.discount > 0 && (
                                    <span className="text-xs font-semibold text-green-400">
                                      {Math.round(item.discount)}% OFF
                                    </span>
                                  )}
                                </>
                              )}
                          </div>
                          {/* Rating */}
                          {item.rating && (
                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex items-center gap-1 bg-green-900/30 px-2 py-0.5 rounded">
                                <span className="text-xs font-bold text-green-400">
                                  ⭐ {item.rating}
                                </span>
                              </div>
                              <span className="text-xs text-gray-500">
                                ({item.reviews?.toLocaleString() || 0} reviews)
                              </span>
                            </div>
                          )}

                          {/* Attributes */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {item.colour && (
                              <span className="text-[11px] bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                                🎨 {item.colour}
                              </span>
                            )}
                            {item.size && (
                              <span className="text-[11px] bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                                📏 Size {item.size}
                              </span>
                            )}
                          </div>

                          {/* View Button */}
                          <a
                            href={item.product_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-center text-sm font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-2.5 transition-colors"
                          >
                            View on flipkart
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Empty State */}
                {!loading && !error && Array.isArray(resultData) && resultData.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                      <Search className="w-8 h-8 text-gray-600" />
                    </div>
                    <p className="text-gray-400 font-semibold mb-2">No products found</p>
                    <p className="text-sm text-gray-500">Try adjusting your filters</p>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}