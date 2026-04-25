import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ defaultValue = '', placeholder = 'Search Shopee' }) {
  const navigate = useNavigate();
  const [value, setValue] = useState(defaultValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      navigate(`/search?q=${encodeURIComponent(value.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="material-symbols-outlined text-outline text-[20px]">search</span>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="block w-full pl-10 pr-10 py-2 border-none rounded-lg bg-surface-container-low text-body-md text-on-surface placeholder-outline focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
        <button type="button" aria-label="Image search">
          <span className="material-symbols-outlined text-outline text-[20px]">photo_camera</span>
        </button>
      </div>
    </form>
  );
}
