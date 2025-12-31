"use client";
import { Plus, Send, Search, TrendingUp, MessageSquare, Sparkles, Lightbulb, Instagram, BarChart3, Upload, RefreshCw, Settings, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";

type FilterType = 'brand' | 'size' | 'color' | 'gender';
type NavSection = 'context' | 'inspiration' ;

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

export default function FootwearTrendAnalyzer() {
  const [activeNav, setActiveNav] = useState<NavSection>('context');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMiddleOpen, setIsMiddleOpen] = useState(true);
  const router = useRouter();


  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    brand: [],
    size: [],
    color: [],
    gender: []
  });

  // Collapsible sections for filters
  const [expandedSections, setExpandedSections] = useState({
    brand: true,
    size: false,
    color: false,
    gender: false
  });

  const [customSearchTerm, setCustomSearchTerm] = useState<string>('');
  const [customSocialTopic, setCustomSocialTopic] = useState<string>('');
  const [activeStep, setActiveStep] = useState<'discover' | 'design' | 'showcase' | 'catalog' | 'tryon'>('discover');
  const [imageResults, setImageResults] = useState<any[]>([]);


const handleImageUpload = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("http://127.0.0.1:8000/similar-products", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    console.log("API Response:", data);

    setImageResults(data.results);

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

    // Mock response (replace with actual API call if needed)
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
    
    // <div className="flex h-screen bg-black text-white">
      <div className="flex flex-col h-screen bg-black">
{/* TOP HEADER */}
<div className="h-14 bg-gray-900 border-b border-gray-800 flex items-center px-6">
  <h1 className="text-lg font-semibold text-white tracking-wide">
    Agentic Trend Analyzer
  </h1>
</div>
{/* STEPPER BAR */}
{/* <div className="bg-black border-b border-gray-800 px-6 py-4"> */}
<div className="bg-black border-b border-gray-800 px-6 py-4 relative z-50 pointer-events-auto">

  <div className="flex items-center gap-10">
    
{[
  { id: "discover", label: "Discover", step: "01" },
  { id: "design", label: "Design", step: "02" },
  { id: "showcase", label: "Showcase", step: "03" },
  { id: "catalog", label: "Catalog", step: "04" },
  { id: "tryon", label: "Try-On", step: "05" },
].map((item) => (
  <button
    key={item.id}
    // onClick={() => setActiveStep(item.id as any)}
    className="flex items-center gap-3"
  >
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
      className={`text-sm font-medium ${
        activeStep === item.id ? "text-purple-400" : "text-gray-400"
      }`}
    >
      {item.label}
    </span>
  </button>
))}

  </div>
</div>

<div className="flex flex-1 overflow-hidden">

      {/* Left Sidebar - Navigation */}
      
      {/* <div
        className={`bg-black border-r border-gray-800 
              transition-all duration-300 
              ${isSidebarOpen ? 'w-32' : 'w-14'}
              flex flex-col items-center py-6 relative`}
      > */}
      {activeStep === "discover" && (
  <div
    className={`bg-black border-r border-gray-800 
    transition-all duration-300 
    ${isSidebarOpen ? 'w-32' : 'w-14'}
    flex flex-col items-center py-6 relative`}
  >

        {/* Toggle Button */}
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

        {/* <div className="mb-8">
          <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        </div> */}
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
            {isSidebarOpen && <span className="text-xs font-medium">Intelligence</span>}
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
            {isSidebarOpen && <span className="text-xs font-medium">Inspiration</span>}
          </button>


        </nav>
      </div>
      )}
      {/* Middle Panel - Dynamic Content (Filters & Tools) */}
      <div className={`${isMiddleOpen ? 'w-[22%]' : 'w-14'} bg-gradient-to-b from-gray-900 to-black border-r border-gray-800 overflow-y-auto overflow-x-hidden custom-scroll transition-all duration-300 relative`}>
        {/* Toggle Button */}
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
                    <h2 className="text-xl font-bold">Trend Intelligence</h2>
                  </div>
                  <p className="text-sm text-gray-400 mb-6"> Select filters to drive trend insights</p>

                  {/* Brand */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Brand</span>
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
                              ? 'bg-purple-600 border-purple-500'
                              : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                              }`}
                          >
                            <span className="text-xs font-medium">
                              {brand}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Size */}
                  <div className="mt-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Size (UK/India)</span>
                      <button
                        onClick={() => toggleSection('size')}
                        className="text-sm text-purple-400"
                      >
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
                              ? 'bg-purple-600 border-purple-500'
                              : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                              }`}
                          >
                            <span className="text-[11px] font-medium">{size}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Color */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Color</span>
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
                              ? 'bg-purple-600 border-purple-500'
                              : 'bg-gray-800 border-gray-700 hover:border-gray-600'
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
                      <span className="font-semibold">Gender</span>

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
                              ? 'bg-purple-600 border-purple-500'
                              : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                              }`}
                          >
                            <span className="text-xs font-medium">
                              {gender}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    className={`w-full py-2 text-xs font-medium rounded ${totalActiveFilters > 0
                      ? 'bg-purple-600 hover:bg-purple-700'
                      : 'bg-gray-700 cursor-not-allowed opacity-60'
                      }`}
                    disabled={totalActiveFilters === 0}
                  >
                    Apply {totalActiveFilters} Filter{totalActiveFilters !== 1 ? 's' : ''}
                  </button>
                </div>
              </div>
            )}

            {activeNav === 'inspiration' && (
              <div className="p-4 space-y-4">
                <h2 className="text-xl font-bold mb-4">Get Inspired</h2>
<label
  className="relative z-50 border-2 border-dashed border-gray-700 rounded-lg p-6 
             text-center cursor-pointer hover:border-gray-500 transition block"
>
  <Upload className="w-8 h-8 text-gray-500 mx-auto mb-3" />
  <p className="text-gray-300 font-semibold mb-1">
    Click to upload moodboards or sketches
  </p>
  <p className="text-[11px] text-gray-500">
    PNG · JPG · JPEG
  </p>

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

      {/* Right Panel - Always Chat (Footwear Trend Analysis) */}
      <div className="flex-1 flex flex-col bg-black">
        <div className="bg-gray-900 border-b border-gray-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">

              <div>
                {/* <h2 className="font-bold text-lg">Trend Intelligence Chat</h2> */}
                {/* <p className="text-xs text-gray-400">Ask anything about footwear trends, styles, or market insights</p> */}
                {/* RESULT GRID — MUST BE OUTSIDE INPUT */}
{imageResults.length > 0 && (
    <div className="mt-6 max-h-[65vh] overflow-y-auto pr-2 custom-scroll">

  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-1">
    {imageResults.map((item, index) => (
<div
  key={index}
  onClick={() =>
    router.push(
      `/product_design?image=${encodeURIComponent(item.image)}&title=${encodeURIComponent(item.title)}`
    )
  }
  className="cursor-pointer bg-gray-900 rounded-lg overflow-hidden border border-gray-700 hover:border-purple-500 transition"
>

        <img
          src={item.image}
          alt={item.title}
          className="w-full h-70 object-contain bg-white"
        />

        <div className="p-3">
          <p className="text-sm font-semibold text-white line-clamp-2">
            {item.title}
          </p>

          {item.price && (
            <p className="text-xs text-purple-400 mt-1">
              {item.price}
            </p>
          )}

          {item.rating && (
            <p className="text-xs text-gray-400 mt-1">
              ⭐ {item.rating}
            </p>
          )}
        </div>
      </div>
    ))}
  </div></div>
)}
              </div>
            </div>
            {totalActiveFilters > 0 && (
              <div className="bg-purple-600 px-3 py-1.5 rounded-full text-xs font-semibold">
                {totalActiveFilters} filter{totalActiveFilters !== 1 ? 's' : ''} active
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Start Analyzing Footwear Trends</h3>
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
    </div ></div>
  );
}
