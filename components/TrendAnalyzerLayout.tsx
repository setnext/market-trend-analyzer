// "use client";
// import { Plus, Send, ChevronDown, Rocket } from "lucide-react";
// import React, { useState } from 'react';
// import { Search, ChevronRight, ChevronLeft, BarChart3, TrendingUp, FileText, Settings } from 'lucide-react';

// // Define types
// type FilterType = 'brand' | 'age' | 'size' | 'color' | 'gender';
// type NavSection = 'analytics' | 'trendz' | 'reports' | 'settings';

// interface FilterOptions {
//   brand: string[];
//   age: string[];
//   size: string[];
//   color: string[];
//   gender: string[];
// }

// interface SelectedFilters {
//   brand: string[];
//   age: string[];
//   size: string[];
//   color: string[];
//   gender: string[];
// }

// interface ExpandedFilters {
//   brand: boolean;
//   age: boolean;
//   size: boolean;
//   color: boolean;
//   gender: boolean;
// }

// export default function TrendAnalyzerLayout() {
//   const [dashboardOpen, setDashboardOpen] = useState<boolean>(true);
//   const [filterOpen, setFilterOpen] = useState<boolean>(true);
//   const [expandedFilters, setExpandedFilters] = useState<ExpandedFilters>({
//     brand: false,
//     age: false,
//     size: false,
//     color: false,
//     gender: false
//   });

//   const [activeNav, setActiveNav] = useState<NavSection>('analytics');
  
//   const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
//     brand: [],
//     age: [],
//     size: [],
//     color: [],
//     gender: []
//   });

//   const filterOptions: FilterOptions = {
//     brand: ['Nike', 'Campus', 'ASIAN', 'PUMA', 'BRUTON', 'Bata', 'SPARX', 'Adidas', 'Reebok', 'New Balance', 'Asics'],
//     age: ['Kids (5-12)', 'Teens (13-17)', 'Adults (18-40)', 'Seniors (40+)'],
//     size: ['3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '13.5', '14', '15', '15.5'],
//     color: ['Black', 'White', 'Blue', 'Red', 'Green', 'Grey', 'Yellow', 'Brown', 'Navy', 'Beige'],
//     gender: ['Men', 'Women', 'Unisex', 'Boys', 'Girls']
//   };

//   const toggleFilterExpand = (filterName: FilterType): void => {
//     setExpandedFilters(prev => ({
//       ...prev,
//       [filterName]: !prev[filterName]
//     }));
//   };

//   const toggleFilterOption = (filterName: FilterType, option: string): void => {
//     setSelectedFilters(prev => ({
//       ...prev,
//       [filterName]: prev[filterName].includes(option)
//         ? prev[filterName].filter(item => item !== option)
//         : [...prev[filterName], option]
//     }));
//   };

//   const clearAllFilters = (): void => {
//     setSelectedFilters({
//       brand: [],
//       age: [],
//       size: [],
//       color: [],
//       gender: []
//     });
//   };

//   const totalActiveFilters = Object.values(selectedFilters).flat().length;

//   const getNavIcon = (section: NavSection) => {
//     switch(section) {
//       case 'analytics': return <BarChart3 className="w-5 h-5" />;
//       case 'trendz': return <TrendingUp className="w-5 h-5" />;
//       case 'reports': return <FileText className="w-5 h-5" />;
//       case 'settings': return <Settings className="w-5 h-5" />;
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gradient-to-br from-blue-50 to-amber-50">
//       {/* Left Sidebar - Navigation */}
//       <div className={`bg-gradient-to-b from-blue-600 to-blue-800 text-white flex flex-col shadow-2xl transition-all duration-300 ${dashboardOpen ? 'w-72' : 'w-16'}`}>
//         {dashboardOpen ? (
//           <>
//             <div className="p-6 border-b border-blue-500 bg-blue-700">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
//                     Dashboard
//                   </h1>
//                   <p className="text-blue-200 text-sm mt-1">Analytics & Insights</p>
//                 </div>
//                 <button
//                   onClick={() => setDashboardOpen(false)}
//                   className="p-2 hover:bg-blue-600 rounded-lg transition"
//                 >
//                   <ChevronLeft className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
        
//         <nav className="flex-1 p-4 overflow-y-auto">
//           <div className="space-y-2">
//             {/* Analytics */}
//             <button
//               onClick={() => setActiveNav('analytics')}
//               className={`w-full px-4 py-3 flex items-center gap-3 rounded-lg transition-all ${
//                 activeNav === 'analytics' ? 'bg-blue-600' : 'hover:bg-blue-600/50'
//               }`}
//             >
//               {getNavIcon('analytics')}
//               <span className="font-semibold">Analytics</span>
//             </button>

//             {/* Social Trendz */}
//             <button
//               onClick={() => setActiveNav('trendz')}
//               className={`w-full px-4 py-3 flex items-center gap-3 rounded-lg transition-all ${
//                 activeNav === 'trendz' ? 'bg-blue-600' : 'hover:bg-blue-600/50'
//               }`}
//             >
//               {getNavIcon('trendz')}
//               <span className="font-semibold">Social Trendz</span>
//             </button>

//             {/* Reports */}
//             <button
//               onClick={() => setActiveNav('reports')}
//               className={`w-full px-4 py-3 flex items-center gap-3 rounded-lg transition-all ${
//                 activeNav === 'reports' ? 'bg-blue-600' : 'hover:bg-blue-600/50'
//               }`}
//             >
//               {getNavIcon('reports')}
//               <span className="font-semibold">Reports</span>
//             </button>

//             {/* Settings */}
//             <button
//               onClick={() => setActiveNav('settings')}
//               className={`w-full px-4 py-3 flex items-center gap-3 rounded-lg transition-all ${
//                 activeNav === 'settings' ? 'bg-blue-600' : 'hover:bg-blue-600/50'
//               }`}
//             >
//               {getNavIcon('settings')}
//               <span className="font-semibold">Settings</span>
//             </button>
//           </div>
//         </nav>

//         <div className="p-4 border-t border-blue-500 bg-blue-700">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center font-bold text-blue-900 shadow-lg">
//               N
//             </div>
//             <div>
//               <p className="font-semibold text-sm">Admin User</p>
//               <p className="text-xs text-blue-200">admin@example.com</p>
//             </div>
//           </div>
//         </div>
//       </>
//         ) : (
//           <>
//             {/* Collapsed Dashboard View */}
//             <div className="p-4 border-b border-blue-500 bg-blue-700 flex justify-center">
//               <button
//                 onClick={() => setDashboardOpen(true)}
//                 className="p-2 hover:bg-blue-600 rounded-lg transition"
//               >
//                 <ChevronRight className="w-5 h-5" />
//               </button>
//             </div>
            
//             <nav className="flex-1 p-2 overflow-y-auto flex flex-col items-center gap-4 pt-4">
//               <button
//                 onClick={() => {
//                   setDashboardOpen(true);
//                   setActiveNav('analytics');
//                 }}
//                 className={`p-3 rounded-lg transition ${activeNav === 'analytics' ? 'bg-blue-600' : 'hover:bg-blue-600/50'}`}
//                 title="Analytics"
//               >
//                 {getNavIcon('analytics')}
//               </button>
              
//               <button
//                 onClick={() => {
//                   setDashboardOpen(true);
//                   setActiveNav('trendz');
//                 }}
//                 className={`p-3 rounded-lg transition ${activeNav === 'trendz' ? 'bg-blue-600' : 'hover:bg-blue-600/50'}`}
//                 title="Social Trendz"
//               >
//                 {getNavIcon('trendz')}
//               </button>
              
//               <button
//                 onClick={() => {
//                   setDashboardOpen(true);
//                   setActiveNav('reports');
//                 }}
//                 className={`p-3 rounded-lg transition ${activeNav === 'reports' ? 'bg-blue-600' : 'hover:bg-blue-600/50'}`}
//                 title="Reports"
//               >
//                 {getNavIcon('reports')}
//               </button>
              
//               <button
//                 onClick={() => {
//                   setDashboardOpen(true);
//                   setActiveNav('settings');
//                 }}
//                 className={`p-3 rounded-lg transition ${activeNav === 'settings' ? 'bg-blue-600' : 'hover:bg-blue-600/50'}`}
//                 title="Settings"
//               >
//                 {getNavIcon('settings')}
//               </button>
//             </nav>

//             <div className="p-4 border-t border-blue-500 bg-blue-700 flex justify-center">
//               <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center font-bold text-blue-900 shadow-lg cursor-pointer"
//                    onClick={() => setDashboardOpen(true)}
//                    title="Admin User">
//                 N
//               </div>
//             </div>
//           </>
//         )}
//       </div>

//       {/* Filter Sidebar */}
//       <div className={`bg-white border-r-2 border-blue-100 transition-all duration-300 flex flex-col shadow-xl ${filterOpen ? 'w-80' : 'w-16'}`}>
//         {/* Toggle Button */}
//         <div className="p-4 border-b-2 border-blue-100 flex items-center justify-between bg-gradient-to-r from-blue-50 to-white">
//           {filterOpen && (
//             <>
//               <div>
//                 <h2 className="font-bold text-lg text-blue-900">Filters</h2>
//                 <p className="text-xs text-blue-600">Refine your search</p>
//               </div>
//               {totalActiveFilters > 0 && (
//                 <button
//                   onClick={clearAllFilters}
//                   className="text-xs text-amber-600 hover:text-amber-700 font-semibold bg-amber-50 px-3 py-1 rounded-full transition"
//                 >
//                   Clear all
//                 </button>
//               )}
//             </>
//           )}
//           <button
//             onClick={() => setFilterOpen(!filterOpen)}
//             className={`p-2 hover:bg-blue-100 rounded-lg transition ${!filterOpen ? 'mx-auto' : ''}`}
//           >
//             {filterOpen ? <ChevronLeft className="w-5 h-5 text-blue-600" /> : <ChevronRight className="w-5 h-5 text-blue-600" />}
//           </button>
//         </div>

//         {/* Filters Content */}
//         {filterOpen && (
//           <div className="flex-1 overflow-y-auto">
//             {/* Brand Filter */}
//             <div className="border-b border-blue-100">
//               <button
//                 onClick={() => toggleFilterExpand('brand')}
//                 className="w-full px-4 py-4 flex items-center justify-between hover:bg-blue-50 transition group"
//               >
//                 <span className="font-semibold text-sm text-blue-900 group-hover:text-blue-700">Brands</span>
//                 <ChevronRight className={`w-4 h-4 text-blue-600 transition-transform ${expandedFilters.brand ? 'rotate-90' : ''}`} />
//               </button>
//               {expandedFilters.brand && (
//                 <div className="px-4 pb-4 space-y-2 max-h-64 overflow-y-auto bg-blue-50/50">
//                   {filterOptions.brand.map(brand => (
//                     <label key={brand} className="flex items-center space-x-2 cursor-pointer hover:text-blue-700 transition group">
//                       <input
//                         type="checkbox"
//                         checked={selectedFilters.brand.includes(brand)}
//                         onChange={() => toggleFilterOption('brand', brand)}
//                         className="w-4 h-4 text-blue-600 rounded border-blue-300 focus:ring-blue-500 focus:ring-2"
//                       />
//                       <span className="text-sm text-gray-700 group-hover:text-blue-700">{brand}</span>
//                     </label>
//                   ))}
//                 </div>
//               )}
//             </div>


//             {/* Size Filter */}
//             <div className="border-b border-blue-100">
//               <button
//                 onClick={() => toggleFilterExpand('size')}
//                 className="w-full px-4 py-4 flex items-center justify-between hover:bg-blue-50 transition group"
//               >
//                 <span className="font-semibold text-sm text-blue-900 group-hover:text-blue-700">Size (UK/India)</span>
//                 <ChevronRight className={`w-4 h-4 text-blue-600 transition-transform ${expandedFilters.size ? 'rotate-90' : ''}`} />
//               </button>
//               {expandedFilters.size && (
//                 <div className="px-4 pb-4 max-h-64 overflow-y-auto bg-blue-50/50">
//                   <div className="grid grid-cols-4 gap-2">
//                     {filterOptions.size.map(size => (
//                       <button
//                         key={size}
//                         onClick={() => toggleFilterOption('size', size)}
//                         className={`px-3 py-2 text-sm border-2 rounded-lg font-medium transition-all ${
//                           selectedFilters.size.includes(size)
//                             ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white border-blue-700 shadow-md transform scale-105'
//                             : 'bg-white text-gray-700 border-blue-200 hover:border-blue-500 hover:bg-blue-50'
//                         }`}
//                       >
//                         {size}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Color Filter */}
//             <div className="border-b border-blue-100">
//               <button
//                 onClick={() => toggleFilterExpand('color')}
//                 className="w-full px-4 py-4 flex items-center justify-between hover:bg-blue-50 transition group"
//               >
//                 <span className="font-semibold text-sm text-blue-900 group-hover:text-blue-700">Color</span>
//                 <ChevronRight className={`w-4 h-4 text-blue-600 transition-transform ${expandedFilters.color ? 'rotate-90' : ''}`} />
//               </button>
//               {expandedFilters.color && (
//                 <div className="px-4 pb-4 space-y-2 max-h-64 overflow-y-auto bg-blue-50/50">
//                   {filterOptions.color.map(color => (
//                     <label key={color} className="flex items-center space-x-2 cursor-pointer hover:text-blue-700 transition group">
//                       <input
//                         type="checkbox"
//                         checked={selectedFilters.color.includes(color)}
//                         onChange={() => toggleFilterOption('color', color)}
//                         className="w-4 h-4 text-blue-600 rounded border-blue-300 focus:ring-blue-500 focus:ring-2"
//                       />
//                       <span className="text-sm text-gray-700 group-hover:text-blue-700">{color}</span>
//                     </label>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Gender Filter */}
//             <div className="border-b border-blue-100">
//               <button
//                 onClick={() => toggleFilterExpand('gender')}
//                 className="w-full px-4 py-4 flex items-center justify-between hover:bg-blue-50 transition group"
//               >
//                 <span className="font-semibold text-sm text-blue-900 group-hover:text-blue-700">Gender</span>
//                 <ChevronRight className={`w-4 h-4 text-blue-600 transition-transform ${expandedFilters.gender ? 'rotate-90' : ''}`} />
//               </button>
//               {expandedFilters.gender && (
//                 <div className="px-4 pb-4 space-y-2 bg-blue-50/50">
//                   {filterOptions.gender.map(gender => (
//                     <label key={gender} className="flex items-center space-x-2 cursor-pointer hover:text-blue-700 transition group">
//                       <input
//                         type="checkbox"
//                         checked={selectedFilters.gender.includes(gender)}
//                         onChange={() => toggleFilterOption('gender', gender)}
//                         className="w-4 h-4 text-blue-600 rounded border-blue-300 focus:ring-blue-500 focus:ring-2"
//                       />
//                       <span className="text-sm text-gray-700 group-hover:text-blue-700">{gender}</span>
//                     </label>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Main Content Area */}
// <div className="flex-1 relative bg-gradient-to-br from-blue-50 to-amber-50 pb-24">

//   {/* Chat Input Bar */}
//   <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
//     <div className="max-w-2xl mx-auto px-4 py-3">
//       <div className="flex items-center gap-3 bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm">

//         {/* Plus */}
//         <button className="p-2 rounded-full hover:bg-gray-100 transition">
//           <Plus className="w-5 h-5 text-gray-600" />
//         </button>

//         {/* Input */}
//         <input
//           type="text"
//           placeholder="Type a message..."
//           className="flex-1 outline-none text-gray-700 placeholder-gray-400 text-sm"
//         />

//         {/* Send */}
//         <button className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition">
//           <Send className="w-4 h-4 text-white" />
//         </button>

//       </div>
//     </div>
//   </div>
// </div>


//     </div>
//   );
// }



"use client";
import { Plus, Send, ChevronDown, Rocket, MessageSquare, Sparkles, Zap } from "lucide-react";
import React, { useState } from 'react';
import { Search, ChevronRight, ChevronLeft, BarChart3, TrendingUp, FileText, Settings } from 'lucide-react';

// Define types
type FilterType = 'brand' | 'age' | 'size' | 'color' | 'gender';
type NavSection = 'analytics' | 'trendz' | 'reports' | 'settings';

interface FilterOptions {
  brand: string[];
  age: string[];
  size: string[];
  color: string[];
  gender: string[];
}

interface SelectedFilters {
  brand: string[];
  age: string[];
  size: string[];
  color: string[];
  gender: string[];
}

interface ExpandedFilters {
  brand: boolean;
  age: boolean;
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

export default function TrendAnalyzerLayout() {
  const [dashboardOpen, setDashboardOpen] = useState<boolean>(true);
  const [filterOpen, setFilterOpen] = useState<boolean>(true);
  const [expandedFilters, setExpandedFilters] = useState<ExpandedFilters>({
    brand: false,
    age: false,
    size: false,
    color: false,
    gender: false
  });

  const [activeNav, setActiveNav] = useState<NavSection>('analytics');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your Trend Analyzer Assistant. How can I help you analyze footwear trends today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState<string>('');
  
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    brand: [],
    age: [],
    size: [],
    color: [],
    gender: []
  });

  const filterOptions: FilterOptions = {
    brand: ['Nike', 'Campus', 'ASIAN', 'PUMA', 'BRUTON', 'Bata', 'SPARX', 'Adidas', 'Reebok', 'New Balance', 'Asics'],
    age: ['Kids (5-12)', 'Teens (13-17)', 'Adults (18-40)', 'Seniors (40+)'],
    size: ['3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '13.5', '14', '15', '15.5'],
    color: ['Black', 'White', 'Blue', 'Red', 'Green', 'Grey', 'Yellow', 'Brown', 'Navy', 'Beige'],
    gender: ['Men', 'Women', 'Unisex', 'Boys', 'Girls']
  };

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

  const clearAllFilters = (): void => {
    setSelectedFilters({
      brand: [],
      age: [],
      size: [],
      color: [],
      gender: []
    });
  };

  const handleSendMessage = (): void => {
    if (inputValue.trim() === '') return;
    
    const newMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: "I've received your query. Let me analyze the trends based on your filters...",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const totalActiveFilters = Object.values(selectedFilters).flat().length;

  const getNavIcon = (section: NavSection) => {
    switch(section) {
      case 'analytics': return <BarChart3 className="w-5 h-5" />;
      case 'trendz': return <TrendingUp className="w-5 h-5" />;
      case 'reports': return <FileText className="w-5 h-5" />;
      case 'settings': return <Settings className="w-5 h-5" />;
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
            {/* Analytics */}
            <button
              onClick={() => setActiveNav('analytics')}
              className={`w-full px-4 py-3 flex items-center gap-3 rounded-xl transition-all duration-200 ${
                activeNav === 'analytics' 
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

            {/* Social Trendz */}
            <button
              onClick={() => setActiveNav('trendz')}
              className={`w-full px-4 py-3 flex items-center gap-3 rounded-xl transition-all duration-200 ${
                activeNav === 'trendz' 
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

            {/* Reports */}
            <button
              onClick={() => setActiveNav('reports')}
              className={`w-full px-4 py-3 flex items-center gap-3 rounded-xl transition-all duration-200 ${
                activeNav === 'reports' 
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

            {/* Settings */}
            <button
              onClick={() => setActiveNav('settings')}
              className={`w-full px-4 py-3 flex items-center gap-3 rounded-xl transition-all duration-200 ${
                activeNav === 'settings' 
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

        <div className="p-4 border-t border-purple-700/30 bg-gradient-to-r from-purple-800/30 to-violet-800/30 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center font-bold text-purple-900 shadow-lg ring-2 ring-white/30">
              N
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">Admin User</p>
              <p className="text-xs text-purple-200 truncate">admin@example.com</p>
            </div>
          </div>
        </div>
      </>
        ) : (
          <>
            {/* Collapsed Dashboard View */}
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
                className={`p-3 rounded-xl transition duration-200 ${
                  activeNav === 'analytics' 
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
                className={`p-3 rounded-xl transition duration-200 ${
                  activeNav === 'trendz' 
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
                  setActiveNav('reports');
                }}
                className={`p-3 rounded-xl transition duration-200 ${
                  activeNav === 'reports' 
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
                className={`p-3 rounded-xl transition duration-200 ${
                  activeNav === 'settings' 
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
        {/* Toggle Button */}
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

        {/* Filters Content */}
        {filterOpen && (
          <div className="flex-1 overflow-y-auto">
            {/* Brand Filter */}
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

            {/* Size Filter */}
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
                        className={`px-3 py-2 text-sm border-2 rounded-lg font-medium transition-all ${
                          selectedFilters.size.includes(size)
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

            {/* Color Filter */}
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

            {/* Gender Filter */}
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
        )}
      </div>

      {/* Main Content Area - Chat */}
      <div className="flex-1 flex flex-col bg-gradient-to-br from-slate-50 via-purple-50 to-violet-50">
        {/* Chat Header */}
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

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-2xl px-5 py-3 rounded-2xl shadow-sm ${
                  message.sender === 'user'
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

        {/* Chat Input Bar */}
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