"use client";
import { Plus, Send, MessageSquare, Sparkles, Zap } from "lucide-react";
import React, { useState } from 'react';
import { Search, ChevronRight, ChevronLeft, BarChart3, TrendingUp, FileText, Settings } from 'lucide-react';

// Define types
type FilterType = 'brand' | 'size' | 'color' | 'gender';
type NavSection = 'analytics' | 'trendz' | 'agentchat' | 'reports' | 'settings';

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

interface ExpandedFilters {
  brand: boolean;
  size: boolean;
  color: boolean;
  gender: boolean;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ImageResult {
  id: string;
  imageUrl: string;
  title?: string;
}

export default function TrendAnalyzerLayout() {
  const [dashboardOpen, setDashboardOpen] = useState<boolean>(true);
  const [filterOpen, setFilterOpen] = useState<boolean>(true);
  const [expandedFilters, setExpandedFilters] = useState<ExpandedFilters>({
    brand: false,
    size: false,
    color: false,
    gender: false
  });

  const [activeNav, setActiveNav] = useState<NavSection>('analytics');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<ImageResult | null>(null);

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    brand: [],
    size: [],
    color: [],
    gender: []
  });

  const [results, setResults] = useState<ImageResult[]>([]);
  const [loadingResults, setLoadingResults] = useState(false);

  const toggleFilterExpand = (filterName: FilterType): void => {
    setExpandedFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const toggleFilterOption = (filterName: FilterType, option: string): void => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterName]: prev[filterName].includes(option)
        ? prev[filterName].filter(item => item !== option)
        : [...prev[filterName], option]
    }));
  };

  const filterOptions: FilterOptions = {
    brand: ['Nike', 'Campus', 'ASIAN', 'PUMA', 'BRUTON', 'Bata', 'SPARX', 'Adidas', 'Reebok', 'New Balance', 'Asics'],
    size: ['3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '13.5', '14', '15', '15.5'],
    color: ['Black', 'White', 'Blue', 'Red', 'Green', 'Grey', 'Yellow', 'Brown', 'Navy', 'Beige'],
    gender: ['Men', 'Women', 'Unisex', 'Boys', 'Girls']
  };

  const clearAllFilters = (): void => {
    setSelectedFilters({
      brand: [],
      size: [],
      color: [],
      gender: []
    });
  };

  const handleImageClick = (image: ImageResult) => {
    console.log("Image clicked:", image);
    setSelectedImage(image);      // remember which image
    setActiveNav("agentchat");    // switch to Agent Chat
  };


  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    console.log("💬 Chat payload being sent:", {
      message: userMessage.text,
      filters: selectedFilters,
      imageId: selectedImage?.id
    });

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.text,
          filters: selectedFilters,
          imageId: selectedImage?.id || null
        })
      });

      const data = await res.json();

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          text: data.reply,
          sender: "bot",
          timestamp: new Date()
        }
      ]);

    } catch (err) {
      console.warn("Chat API not ready");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const totalActiveFilters = Object.values(selectedFilters).flat().length;

  const getNavIcon = (section: NavSection) => {
    switch (section) {
      case 'analytics': return <BarChart3 className="w-5 h-5" />;
      case 'trendz': return <TrendingUp className="w-5 h-5" />;
      case 'agentchat': return <MessageSquare className="w-5 h-5" />;
      case 'reports': return <FileText className="w-5 h-5" />;
      case 'settings': return <Settings className="w-5 h-5" />;
    }
  };

  const handleApplyFilters = async () => {
    console.log("Applying Filters:", selectedFilters);
    console.log("Total Active Filters:", totalActiveFilters);
    if (totalActiveFilters === 0) return;

    setLoadingResults(true);

    try {
      const res = await fetch("http://localhost:5000/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedFilters)
      });

      const data = await res.json();
      setResults(data.results);

    } catch (err) {
      console.warn("Search API not ready");
    } finally {
      setLoadingResults(false);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-violet-50">
      {/* Left Sidebar - Navigation */}
      <div className={`bg-gradient-to-b from-purple-800 via-purple-900 to-violet-950 text-white flex flex-col shadow-2xl transition-all duration-300 ${dashboardOpen ? 'w-72' : 'w-16'}`}>
        {dashboardOpen ? (
          <>
            <div className="p-6 border-b border-purple-700/30 bg-gradient-to-r from-purple-800/50 to-violet-800/50 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-6 h-6 text-amber-300" />
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-100 to-amber-200 bg-clip-text text-transparent">
                      TrendBot
                    </h1>
                  </div>
                </div>
                <button
                  onClick={() => setDashboardOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition duration-200"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
            </div>

            <nav className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-2">
                <button
                  onClick={() => setActiveNav('analytics')}
                  className={`w-full px-4 py-3 flex items-center gap-3 rounded-xl transition-all duration-200 ${activeNav === 'analytics'
                    ? 'bg-white/20 shadow-lg backdrop-blur-sm border border-white/30'
                    : 'hover:bg-white/10'
                    }`}
                >
                  {getNavIcon('analytics')}
                  <span className="font-semibold">Analytics</span>
                  {activeNav === 'analytics' && (
                    <Zap className="w-4 h-4 ml-auto text-amber-300" />
                  )}
                </button>

                <button
                  onClick={() => setActiveNav('trendz')}
                  className={`w-full px-4 py-3 flex items-center gap-3 rounded-xl transition-all duration-200 ${activeNav === 'trendz'
                    ? 'bg-white/20 shadow-lg backdrop-blur-sm border border-white/30'
                    : 'hover:bg-white/10'
                    }`}
                >
                  {getNavIcon('trendz')}
                  <span className="font-semibold">Social Trendz</span>
                  {activeNav === 'trendz' && (
                    <Zap className="w-4 h-4 ml-auto text-amber-300" />
                  )}
                </button>

                <button
                  onClick={() => setActiveNav('agentchat')}
                  className={`w-full px-4 py-3 flex items-center gap-3 rounded-xl transition-all duration-200 ${activeNav === 'agentchat'
                    ? 'bg-white/20 shadow-lg backdrop-blur-sm border border-white/30'
                    : 'hover:bg-white/10'
                    }`}
                >
                  {getNavIcon('agentchat')}
                  <span className="font-semibold">Agent Chat</span>
                  {activeNav === 'agentchat' && (
                    <Zap className="w-4 h-4 ml-auto text-amber-300" />
                  )}
                </button>

                <button
                  onClick={() => setActiveNav('reports')}
                  className={`w-full px-4 py-3 flex items-center gap-3 rounded-xl transition-all duration-200 ${activeNav === 'reports'
                    ? 'bg-white/20 shadow-lg backdrop-blur-sm border border-white/30'
                    : 'hover:bg-white/10'
                    }`}
                >
                  {getNavIcon('reports')}
                  <span className="font-semibold">Reports</span>
                  {activeNav === 'reports' && (
                    <Zap className="w-4 h-4 ml-auto text-amber-300" />
                  )}
                </button>

                <button
                  onClick={() => setActiveNav('settings')}
                  className={`w-full px-4 py-3 flex items-center gap-3 rounded-xl transition-all duration-200 ${activeNav === 'settings'
                    ? 'bg-white/20 shadow-lg backdrop-blur-sm border border-white/30'
                    : 'hover:bg-white/10'
                    }`}
                >
                  {getNavIcon('settings')}
                  <span className="font-semibold">Settings</span>
                  {activeNav === 'settings' && (
                    <Zap className="w-4 h-4 ml-auto text-amber-300" />
                  )}
                </button>
              </div>
            </nav>
          </>
        ) : (
          <>
            <div className="p-4 border-b border-purple-700/30 bg-gradient-to-r from-purple-800/50 to-violet-800/50 backdrop-blur-sm flex justify-center">
              <button
                onClick={() => setDashboardOpen(true)}
                className="p-2 hover:bg-white/10 rounded-lg transition duration-200"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 p-2 overflow-y-auto flex flex-col items-center gap-4 pt-4">
              <button
                onClick={() => {
                  setDashboardOpen(true);
                  setActiveNav('analytics');
                }}
                className={`p-3 rounded-xl transition duration-200 ${activeNav === 'analytics'
                  ? 'bg-white/20 shadow-lg backdrop-blur-sm border border-white/30'
                  : 'hover:bg-white/10'
                  }`}
                title="Analytics"
              >
                {getNavIcon('analytics')}
              </button>

              <button
                onClick={() => {
                  setDashboardOpen(true);
                  setActiveNav('trendz');
                }}
                className={`p-3 rounded-xl transition duration-200 ${activeNav === 'trendz'
                  ? 'bg-white/20 shadow-lg backdrop-blur-sm border border-white/30'
                  : 'hover:bg-white/10'
                  }`}
                title="Social Trendz"
              >
                {getNavIcon('trendz')}
              </button>

              <button
                onClick={() => {
                  setDashboardOpen(true);
                  setActiveNav('agentchat');
                }}
                className={`p-3 rounded-xl transition duration-200 ${activeNav === 'agentchat'
                  ? 'bg-white/20 shadow-lg backdrop-blur-sm border border-white/30'
                  : 'hover:bg-white/10'
                  }`}
                title="Agent Chat"
              >
                {getNavIcon('agentchat')}
              </button>

              <button
                onClick={() => {
                  setDashboardOpen(true);
                  setActiveNav('reports');
                }}
                className={`p-3 rounded-xl transition duration-200 ${activeNav === 'reports'
                  ? 'bg-white/20 shadow-lg backdrop-blur-sm border border-white/30'
                  : 'hover:bg-white/10'
                  }`}
                title="Reports"
              >
                {getNavIcon('reports')}
              </button>

              <button
                onClick={() => {
                  setDashboardOpen(true);
                  setActiveNav('settings');
                }}
                className={`p-3 rounded-xl transition duration-200 ${activeNav === 'settings'
                  ? 'bg-white/20 shadow-lg backdrop-blur-sm border border-white/30'
                  : 'hover:bg-white/10'
                  }`}
                title="Settings"
              >
                {getNavIcon('settings')}
              </button>
            </nav>

            <div className="p-4 border-t border-purple-700/30 bg-gradient-to-r from-purple-800/30 to-violet-800/30 backdrop-blur-sm flex justify-center">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center font-bold text-purple-900 shadow-lg cursor-pointer ring-2 ring-white/30 hover:ring-white/50 transition"
                onClick={() => setDashboardOpen(true)}
                title="Admin User">
                N
              </div>
            </div>
          </>
        )}
      </div>

      {/* Filter Sidebar */}
      <div className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col shadow-lg ${filterOpen ? 'w-80' : 'w-16'}`}>
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-purple-50 to-violet-50">
          {filterOpen && (
            <>
              <div>
                <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                  <Search className="w-5 h-5 text-purple-600" />
                  Filters
                </h2>
                <p className="text-xs text-gray-500">Refine your search</p>
              </div>
              {totalActiveFilters > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 font-semibold px-3 py-1.5 rounded-full transition shadow-sm"
                >
                  Clear ({totalActiveFilters})
                </button>
              )}
            </>
          )}
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className={`p-2 hover:bg-gray-100 rounded-lg transition ${!filterOpen ? 'mx-auto' : ''}`}
          >
            {filterOpen ? <ChevronLeft className="w-5 h-5 text-gray-600" /> : <ChevronRight className="w-5 h-5 text-gray-600" />}
          </button>
        </div>

        {filterOpen && (
          <>
            <div className="flex-1 overflow-y-auto">
              <div className="border-b border-gray-100">
                <button
                  onClick={() => toggleFilterExpand('brand')}
                  className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 transition group"
                >
                  <span className="font-semibold text-sm text-gray-800 group-hover:text-purple-700">Brands</span>
                  <ChevronRight className={`w-4 h-4 text-gray-500 transition-transform ${expandedFilters.brand ? 'rotate-90' : ''}`} />
                </button>
                {expandedFilters.brand && (
                  <div className="px-4 pb-4 space-y-2 max-h-64 overflow-y-auto bg-gray-50/50">
                    {filterOptions.brand.map(brand => (
                      <label key={brand} className="flex items-center space-x-2 cursor-pointer hover:text-purple-700 transition group py-1">
                        <input
                          type="checkbox"
                          checked={selectedFilters.brand.includes(brand)}
                          onChange={() => toggleFilterOption('brand', brand)}
                          className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500 focus:ring-2"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-purple-700">{brand}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-b border-gray-100">
                <button
                  onClick={() => toggleFilterExpand('size')}
                  className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 transition group"
                >
                  <span className="font-semibold text-sm text-gray-800 group-hover:text-purple-700">Size (UK/India)</span>
                  <ChevronRight className={`w-4 h-4 text-gray-500 transition-transform ${expandedFilters.size ? 'rotate-90' : ''}`} />
                </button>
                {expandedFilters.size && (
                  <div className="px-4 pb-4 max-h-64 overflow-y-auto bg-gray-50/50">
                    <div className="grid grid-cols-4 gap-2">
                      {filterOptions.size.map(size => (
                        <button
                          key={size}
                          onClick={() => toggleFilterOption('size', size)}
                          className={`px-3 py-2 text-sm border-2 rounded-lg font-medium transition-all ${selectedFilters.size.includes(size)
                            ? 'bg-gradient-to-br from-purple-600 to-violet-700 text-white border-purple-700 shadow-md transform scale-105'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-purple-500 hover:bg-purple-50'
                            }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="border-b border-gray-100">
                <button
                  onClick={() => toggleFilterExpand('color')}
                  className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 transition group"
                >
                  <span className="font-semibold text-sm text-gray-800 group-hover:text-purple-700">Color</span>
                  <ChevronRight className={`w-4 h-4 text-gray-500 transition-transform ${expandedFilters.color ? 'rotate-90' : ''}`} />
                </button>
                {expandedFilters.color && (
                  <div className="px-4 pb-4 space-y-2 max-h-64 overflow-y-auto bg-gray-50/50">
                    {filterOptions.color.map(color => (
                      <label key={color} className="flex items-center space-x-2 cursor-pointer hover:text-purple-700 transition group py-1">
                        <input
                          type="checkbox"
                          checked={selectedFilters.color.includes(color)}
                          onChange={() => toggleFilterOption('color', color)}
                          className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500 focus:ring-2"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-purple-700">{color}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-b border-gray-100">
                <button
                  onClick={() => toggleFilterExpand('gender')}
                  className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 transition group"
                >
                  <span className="font-semibold text-sm text-gray-800 group-hover:text-purple-700">Gender</span>
                  <ChevronRight className={`w-4 h-4 text-gray-500 transition-transform ${expandedFilters.gender ? 'rotate-90' : ''}`} />
                </button>
                {expandedFilters.gender && (
                  <div className="px-4 pb-4 space-y-2 bg-gray-50/50">
                    {filterOptions.gender.map(gender => (
                      <label key={gender} className="flex items-center space-x-2 cursor-pointer hover:text-purple-700 transition group py-1">
                        <input
                          type="checkbox"
                          checked={selectedFilters.gender.includes(gender)}
                          onChange={() => toggleFilterOption('gender', gender)}
                          className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500 focus:ring-2"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-purple-700">{gender}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 bg-white">
              <button
                onClick={handleApplyFilters}
                disabled={totalActiveFilters === 0}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white font-semibold py-2 rounded-lg transition"
              >
                Go
              </button>
            </div>
          </>
        )}
      </div>

      {/* Main Content Area - Chat */}
      <div className="flex-1 flex flex-col bg-gradient-to-br from-slate-50 via-purple-50 to-violet-50">
        <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-violet-700 rounded-full flex items-center justify-center shadow-md">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-gray-800">Trend Analysis Chat</h2>
                <p className="text-xs text-gray-500">Ask me anything about footwear trends</p>
              </div>
            </div>
            {totalActiveFilters > 0 && (
              <div className="bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full text-xs font-semibold">
                {totalActiveFilters} filters active
              </div>
            )}
          </div>
        </div>

        {/* Image Results Section */}
        {results.length > 0 && activeNav !== "agentchat" && (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Results</h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {results.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleImageClick(item)}
                  className="cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transition p-2"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title || "result"}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  {item.title && (
                    <p className="text-sm mt-2 text-gray-700">{item.title}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}


        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-2xl px-5 py-3 rounded-2xl shadow-sm ${message.sender === 'user'
                  ? 'bg-gradient-to-r from-purple-600 to-violet-700 text-white'
                  : 'bg-white text-gray-800 border border-gray-200'
                  }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-purple-200' : 'text-gray-400'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 bg-white border border-gray-300 rounded-full px-4 py-3 focus-within:border-gray-400 transition-all shadow-sm">
              <button className="p-1 hover:bg-gray-100 rounded-full transition">
                <Plus className="w-5 h-5 text-gray-500" />
              </button>

              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about trends, analytics, or specific products..."
                className="flex-1 outline-none bg-transparent text-gray-800 placeholder-gray-400 text-sm"
              />

              <button
                onClick={handleSendMessage}
                className="p-2 rounded-full bg-purple-600 hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={inputValue.trim() === ''}
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
            <p className="text-xs text-gray-400 text-center mt-2">
              Press Enter to send • Shift + Enter for new line
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}