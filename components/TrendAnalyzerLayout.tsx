"use client";
import { Plus, Send, ChevronDown, Rocket } from "lucide-react";
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
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-amber-50">
      {/* Left Sidebar - Navigation */}
      <div className={`bg-gradient-to-b from-blue-600 to-blue-800 text-white flex flex-col shadow-2xl transition-all duration-300 ${dashboardOpen ? 'w-72' : 'w-16'}`}>
        {dashboardOpen ? (
          <>
            <div className="p-6 border-b border-blue-500 bg-blue-700">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
                    Dashboard
                  </h1>
                  <p className="text-blue-200 text-sm mt-1">Analytics & Insights</p>
                </div>
                <button
                  onClick={() => setDashboardOpen(false)}
                  className="p-2 hover:bg-blue-600 rounded-lg transition"
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
              className={`w-full px-4 py-3 flex items-center gap-3 rounded-lg transition-all ${
                activeNav === 'analytics' ? 'bg-blue-600' : 'hover:bg-blue-600/50'
              }`}
            >
              {getNavIcon('analytics')}
              <span className="font-semibold">Analytics</span>
            </button>

            {/* Social Trendz */}
            <button
              onClick={() => setActiveNav('trendz')}
              className={`w-full px-4 py-3 flex items-center gap-3 rounded-lg transition-all ${
                activeNav === 'trendz' ? 'bg-blue-600' : 'hover:bg-blue-600/50'
              }`}
            >
              {getNavIcon('trendz')}
              <span className="font-semibold">Social Trendz</span>
            </button>

            {/* Reports */}
            <button
              onClick={() => setActiveNav('reports')}
              className={`w-full px-4 py-3 flex items-center gap-3 rounded-lg transition-all ${
                activeNav === 'reports' ? 'bg-blue-600' : 'hover:bg-blue-600/50'
              }`}
            >
              {getNavIcon('reports')}
              <span className="font-semibold">Reports</span>
            </button>

            {/* Settings */}
            <button
              onClick={() => setActiveNav('settings')}
              className={`w-full px-4 py-3 flex items-center gap-3 rounded-lg transition-all ${
                activeNav === 'settings' ? 'bg-blue-600' : 'hover:bg-blue-600/50'
              }`}
            >
              {getNavIcon('settings')}
              <span className="font-semibold">Settings</span>
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-blue-500 bg-blue-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center font-bold text-blue-900 shadow-lg">
              N
            </div>
            <div>
              <p className="font-semibold text-sm">Admin User</p>
              <p className="text-xs text-blue-200">admin@example.com</p>
            </div>
          </div>
        </div>
      </>
        ) : (
          <>
            {/* Collapsed Dashboard View */}
            <div className="p-4 border-b border-blue-500 bg-blue-700 flex justify-center">
              <button
                onClick={() => setDashboardOpen(true)}
                className="p-2 hover:bg-blue-600 rounded-lg transition"
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
                className={`p-3 rounded-lg transition ${activeNav === 'analytics' ? 'bg-blue-600' : 'hover:bg-blue-600/50'}`}
                title="Analytics"
              >
                {getNavIcon('analytics')}
              </button>
              
              <button
                onClick={() => {
                  setDashboardOpen(true);
                  setActiveNav('trendz');
                }}
                className={`p-3 rounded-lg transition ${activeNav === 'trendz' ? 'bg-blue-600' : 'hover:bg-blue-600/50'}`}
                title="Social Trendz"
              >
                {getNavIcon('trendz')}
              </button>
              
              <button
                onClick={() => {
                  setDashboardOpen(true);
                  setActiveNav('reports');
                }}
                className={`p-3 rounded-lg transition ${activeNav === 'reports' ? 'bg-blue-600' : 'hover:bg-blue-600/50'}`}
                title="Reports"
              >
                {getNavIcon('reports')}
              </button>
              
              <button
                onClick={() => {
                  setDashboardOpen(true);
                  setActiveNav('settings');
                }}
                className={`p-3 rounded-lg transition ${activeNav === 'settings' ? 'bg-blue-600' : 'hover:bg-blue-600/50'}`}
                title="Settings"
              >
                {getNavIcon('settings')}
              </button>
            </nav>

            <div className="p-4 border-t border-blue-500 bg-blue-700 flex justify-center">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center font-bold text-blue-900 shadow-lg cursor-pointer"
                   onClick={() => setDashboardOpen(true)}
                   title="Admin User">
                N
              </div>
            </div>
          </>
        )}
      </div>

      {/* Filter Sidebar */}
      <div className={`bg-white border-r-2 border-blue-100 transition-all duration-300 flex flex-col shadow-xl ${filterOpen ? 'w-80' : 'w-16'}`}>
        {/* Toggle Button */}
        <div className="p-4 border-b-2 border-blue-100 flex items-center justify-between bg-gradient-to-r from-blue-50 to-white">
          {filterOpen && (
            <>
              <div>
                <h2 className="font-bold text-lg text-blue-900">Filters</h2>
                <p className="text-xs text-blue-600">Refine your search</p>
              </div>
              {totalActiveFilters > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-amber-600 hover:text-amber-700 font-semibold bg-amber-50 px-3 py-1 rounded-full transition"
                >
                  Clear all
                </button>
              )}
            </>
          )}
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className={`p-2 hover:bg-blue-100 rounded-lg transition ${!filterOpen ? 'mx-auto' : ''}`}
          >
            {filterOpen ? <ChevronLeft className="w-5 h-5 text-blue-600" /> : <ChevronRight className="w-5 h-5 text-blue-600" />}
          </button>
        </div>

        {/* Filters Content */}
        {filterOpen && (
          <div className="flex-1 overflow-y-auto">
            {/* Brand Filter */}
            <div className="border-b border-blue-100">
              <button
                onClick={() => toggleFilterExpand('brand')}
                className="w-full px-4 py-4 flex items-center justify-between hover:bg-blue-50 transition group"
              >
                <span className="font-semibold text-sm text-blue-900 group-hover:text-blue-700">Brands</span>
                <ChevronRight className={`w-4 h-4 text-blue-600 transition-transform ${expandedFilters.brand ? 'rotate-90' : ''}`} />
              </button>
              {expandedFilters.brand && (
                <div className="px-4 pb-4 space-y-2 max-h-64 overflow-y-auto bg-blue-50/50">
                  {filterOptions.brand.map(brand => (
                    <label key={brand} className="flex items-center space-x-2 cursor-pointer hover:text-blue-700 transition group">
                      <input
                        type="checkbox"
                        checked={selectedFilters.brand.includes(brand)}
                        onChange={() => toggleFilterOption('brand', brand)}
                        className="w-4 h-4 text-blue-600 rounded border-blue-300 focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-blue-700">{brand}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>


            {/* Size Filter */}
            <div className="border-b border-blue-100">
              <button
                onClick={() => toggleFilterExpand('size')}
                className="w-full px-4 py-4 flex items-center justify-between hover:bg-blue-50 transition group"
              >
                <span className="font-semibold text-sm text-blue-900 group-hover:text-blue-700">Size (UK/India)</span>
                <ChevronRight className={`w-4 h-4 text-blue-600 transition-transform ${expandedFilters.size ? 'rotate-90' : ''}`} />
              </button>
              {expandedFilters.size && (
                <div className="px-4 pb-4 max-h-64 overflow-y-auto bg-blue-50/50">
                  <div className="grid grid-cols-4 gap-2">
                    {filterOptions.size.map(size => (
                      <button
                        key={size}
                        onClick={() => toggleFilterOption('size', size)}
                        className={`px-3 py-2 text-sm border-2 rounded-lg font-medium transition-all ${
                          selectedFilters.size.includes(size)
                            ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white border-blue-700 shadow-md transform scale-105'
                            : 'bg-white text-gray-700 border-blue-200 hover:border-blue-500 hover:bg-blue-50'
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
            <div className="border-b border-blue-100">
              <button
                onClick={() => toggleFilterExpand('color')}
                className="w-full px-4 py-4 flex items-center justify-between hover:bg-blue-50 transition group"
              >
                <span className="font-semibold text-sm text-blue-900 group-hover:text-blue-700">Color</span>
                <ChevronRight className={`w-4 h-4 text-blue-600 transition-transform ${expandedFilters.color ? 'rotate-90' : ''}`} />
              </button>
              {expandedFilters.color && (
                <div className="px-4 pb-4 space-y-2 max-h-64 overflow-y-auto bg-blue-50/50">
                  {filterOptions.color.map(color => (
                    <label key={color} className="flex items-center space-x-2 cursor-pointer hover:text-blue-700 transition group">
                      <input
                        type="checkbox"
                        checked={selectedFilters.color.includes(color)}
                        onChange={() => toggleFilterOption('color', color)}
                        className="w-4 h-4 text-blue-600 rounded border-blue-300 focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-blue-700">{color}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Gender Filter */}
            <div className="border-b border-blue-100">
              <button
                onClick={() => toggleFilterExpand('gender')}
                className="w-full px-4 py-4 flex items-center justify-between hover:bg-blue-50 transition group"
              >
                <span className="font-semibold text-sm text-blue-900 group-hover:text-blue-700">Gender</span>
                <ChevronRight className={`w-4 h-4 text-blue-600 transition-transform ${expandedFilters.gender ? 'rotate-90' : ''}`} />
              </button>
              {expandedFilters.gender && (
                <div className="px-4 pb-4 space-y-2 bg-blue-50/50">
                  {filterOptions.gender.map(gender => (
                    <label key={gender} className="flex items-center space-x-2 cursor-pointer hover:text-blue-700 transition group">
                      <input
                        type="checkbox"
                        checked={selectedFilters.gender.includes(gender)}
                        onChange={() => toggleFilterOption('gender', gender)}
                        className="w-4 h-4 text-blue-600 rounded border-blue-300 focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-blue-700">{gender}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
<div className="flex-1 relative bg-gradient-to-br from-blue-50 to-amber-50 pb-24">

  {/* Chat Input Bar */}
  <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
    <div className="max-w-2xl mx-auto px-4 py-3">
      <div className="flex items-center gap-3 bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm">

        {/* Plus */}
        <button className="p-2 rounded-full hover:bg-gray-100 transition">
          <Plus className="w-5 h-5 text-gray-600" />
        </button>

        {/* Input */}
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 outline-none text-gray-700 placeholder-gray-400 text-sm"
        />

        {/* Send */}
        <button className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition">
          <Send className="w-4 h-4 text-white" />
        </button>

      </div>
    </div>
  </div>
</div>


    </div>
  );
}