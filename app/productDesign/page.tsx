import { Suspense } from "react";
import ProductDesignClient from "./ProductDesignClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 text-white">Loading...</div>}>
      <ProductDesignClient />
    </Suspense>
  );
}


// "use client";
// import { Plus, Send, ArrowLeft, Sparkles } from "lucide-react";
// import React, { useState, useEffect } from 'react';
// import { useRouter, useSearchParams } from "next/navigation";
// import { Suspense } from "react";

// interface Message {
//   id: number;
//   text: string;
//   sender: 'user' | 'bot';
//   timestamp: Date;  
// }

// export default function ProductDesign() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
  
//   const [productImage, setProductImage] = useState<string>('');
//   const [productTitle, setProductTitle] = useState<string>('');
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [inputValue, setInputValue] = useState<string>('');
//   const [activeStep, setActiveStep] = useState<'discover' | 'design' | 'showcase' | 'catalog' | 'tryon'>('design');

//   useEffect(() => {
//     // Get image and title from URL parameters
//     const image = searchParams.get('image');
//     const title = searchParams.get('title');
    
//     if (image) setProductImage(decodeURIComponent(image));
//     if (title) setProductTitle(decodeURIComponent(title));
    
//     // Add initial bot message
//     if (title) {
//       setMessages([{
//         id: Date.now(),
//         text: `I can help you with design ideas for "${decodeURIComponent(title)}". What would you like to know or modify?`,
//         sender: 'bot',
//         timestamp: new Date()
//       }]);
//     }
//   }, [searchParams]);

//   const handleSendMessage = async () => {
//     if (!inputValue.trim()) return;

//     const userMessage: Message = {
//       id: Date.now(),
//       text: inputValue,
//       sender: "user",
//       timestamp: new Date()
//     };
//     setMessages(prev => [...prev, userMessage]);
//     setInputValue("");

//     // Mock AI response (replace with actual API call)
//     setTimeout(() => {
//       setMessages(prev => [
//         ...prev,
//         {
//           id: Date.now() + 1,
//           text: "I'm analyzing the design and your request. Here are some suggestions...",
//           sender: "bot",
//           timestamp: new Date()
//         }
//       ]);
//     }, 1000);
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
//     if (e.key === 'Enter') {
//       handleSendMessage();
//     }
//   };

//   return (
        
//     // <div className="flex h-screen bg-black text-white">
//       <div className="flex flex-col min-h-screen bg-black">
// {/* TOP HEADER */}
// <div className="h-14 bg-gray-900 border-b border-gray-800 flex items-center px-6">
//   <h1 className="text-lg font-semibold text-white tracking-wide">
//     Agentic Trend Analyzer
//   </h1>
// </div>
// {/* STEPPER BAR */}
// {/* <div className="bg-black border-b border-gray-800 px-6 py-4"> */}
// <div className="bg-black border-b border-gray-800 px-6 py-4 relative z-50 pointer-events-auto">

//   <div className="flex items-center gap-10">
    
// {[
//   { id: "discover", label: "Discover", step: "01" },
//   { id: "design", label: "Design", step: "02" },
//   { id: "showcase", label: "Showcase", step: "03" },
//   { id: "catalog", label: "Catalog", step: "04" },
//   { id: "tryon", label: "Try-On", step: "05" },
// ].map((item) => (
//   <button
//     key={item.id}
//     // onClick={() => setActiveStep(item.id as any)}
//     className="flex items-center gap-3"
//   >
//     <div
//       className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
//         ${activeStep === item.id
//           ? "bg-purple-600 text-white"
//           : "border border-gray-600 text-gray-400"
//         }`}
//     >
//       {item.step}
//     </div>

//     <span
//       className={`text-sm font-medium ${
//         activeStep === item.id ? "text-purple-400" : "text-gray-400"
//       }`}
//     >
//       {item.label}
//     </span>
//   </button>
// ))}

//   </div>
// </div>

//     <div className="flex flex-col h-screen bg-black text-white">
//       {/* Header */}
//       <div className="h-14 bg-gray-900 border-b border-gray-800 flex items-center px-6 gap-4">
//         <button
//           onClick={() => router.back()}
//           className="p-2 hover:bg-gray-800 rounded-lg transition"
//         >
//           <ArrowLeft className="w-5 h-5" />
//         </button>
//         <h1 className="text-lg font-semibold tracking-wide">
//           Product Design Assistant
//         </h1>
//       </div>

//       <div className="flex flex-1 overflow-hidden">
//         {/* Left Side - Product Image */}
//         <div className="w-[35%] bg-gradient-to-b from-gray-900 to-black border-r border-gray-800 p-6 flex flex-col">
//           <div className="mb-4">
//             <h2 className="text-xl font-bold mb-2">Selected Product</h2>
//             <p className="text-sm text-gray-400">{productTitle}</p>
//           </div>
          
//           {productImage && (
//             <div className="flex-1 flex items-center justify-center bg-white rounded-lg overflow-hidden">
//               <img
//                 src={productImage}
//                 alt={productTitle}
//                 className="max-w-full max-h-full object-contain"
//               />
//             </div>
//           )}

//           {/* <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
//             <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
//               <Sparkles className="w-4 h-4 text-purple-400" />
//               Quick Actions
//             </h3>
//             <div className="space-y-2">
//               <button className="w-full text-left text-sm py-2 px-3 bg-gray-900 hover:bg-gray-700 rounded transition">
//                 Modify colors
//               </button>
//               <button className="w-full text-left text-sm py-2 px-3 bg-gray-900 hover:bg-gray-700 rounded transition">
//                 Change materials
//               </button>
//               <button className="w-full text-left text-sm py-2 px-3 bg-gray-900 hover:bg-gray-700 rounded transition">
//                 Suggest variations
//               </button>
//             </div>
//           </div> */}
//         </div>

//         {/* Right Side - Chat */}
//         <div className="flex-1 flex flex-col bg-black">
//           <div className="bg-gray-900 border-b border-gray-800 px-6 py-4">
//             <h2 className="font-bold text-lg">Design Chat</h2>
//             <p className="text-xs text-gray-400">Ask questions or request modifications to this product</p>
//           </div>
//           <div className="flex-1 ms-7 w-80 overflow-hidden flex flex-col">
//                     {productImage && (
//             <div className="flex-1 flex items-center justify-center bg-white rounded-lg overflow-hidden">
//               <img
//                 src={productImage}
//                 alt={productTitle}
//                 className="max-w-full max-h-full object-contain"
//               />
//             </div>
//           )}
// </div>

//           <div className="flex-1 overflow-y-auto p-6">
//             <div className="space-y-4">
//               {messages.map((message) => (
//                 <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
//                   <div className={`max-w-2xl px-5 py-3 rounded-2xl ${
//                     message.sender === 'user'
//                       ? 'bg-purple-600 text-white'
//                       : 'bg-gray-800 text-white border border-gray-700'
//                   }`}>
//                     <p className="text-sm leading-relaxed">{message.text}</p>
//                     <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-purple-200' : 'text-gray-500'}`}>
//                       {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="bg-gray-900 border-t border-gray-800 px-6 py-4">
//             <div className="flex items-center gap-3 bg-gray-800 border border-gray-700 rounded-full px-4 py-3">
//               <button className="p-1 hover:bg-gray-700 rounded-full transition">
//                 <Plus className="w-5 h-5 text-gray-400" />
//               </button>
//               <input
//                 type="text"
//                 value={inputValue}
//                 onChange={(e) => setInputValue(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 placeholder="Ask about design modifications..."
//                 className="flex-1 outline-none bg-transparent text-white placeholder-gray-500 text-sm"
//               />

//               <button
//                 onClick={handleSendMessage}
//                 disabled={!inputValue.trim()}
//                 className="p-2 rounded-full bg-purple-600 hover:bg-purple-700 transition disabled:opacity-50"
//               >
//                 <Send className="w-4 h-4 text-white" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div></div>
//   );
// }