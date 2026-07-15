import React, { useState } from 'react';
import { Search, Compass, Star } from 'lucide-react';

const SearchBar = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="w-full h-[60px] flex items-center bg-white/8 backdrop-blur-[18px] border border-white/15 rounded-[18px] px-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] transition-all duration-300 focus-within:border-primary/40 focus-within:shadow-[0_0_20px_rgba(46,139,255,0.2)]"
    >
      <Search className="text-white/50 mr-3 flex-shrink-0" size={20} />
      <input
        type="text"
        className="w-[85%] sm:w-[90%] bg-transparent border-none outline-none text-white text-base font-normal placeholder-white/50"
        placeholder="Search city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={isLoading}
      />
      
      <div className="flex items-center gap-3 ml-auto">
        <button
          type="button"
          onClick={() => onSearch('Chennai')} // Hardcoded demo fallback or default
          className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-primary/20 hover:text-primary rounded-xl text-white/80 transition-all duration-200"
          title="Get Default City"
        >
          <Compass size={18} />
        </button>
        <button
          type="button"
          className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-yellow-400/20 hover:text-yellow-400 rounded-xl text-white/80 transition-all duration-200"
          title="Add to Favorites"
        >
          <Star size={18} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
