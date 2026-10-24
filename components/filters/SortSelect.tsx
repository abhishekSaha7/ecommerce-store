"use client";

interface SortSelectProps {
  value: string;
  onChange: (sort: string) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="flex items-center space-x-2 text-xs">
      <label htmlFor="sort-select" className="text-muted-foreground uppercase tracking-wider font-semibold">
        Sort:
      </label>
      <select
        id="sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-card text-foreground border border-border px-3 py-2 text-xs uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
      >
        <option value="featured">Featured Picks</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating">Highest Rated</option>
        <option value="newest">New Arrivals</option>
      </select>
    </div>
  );
}
