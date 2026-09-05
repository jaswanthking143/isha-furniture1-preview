import React, { useState, useMemo } from "react";
import { Search, Star, ShoppingCart, SlidersHorizontal, X, Sofa } from "lucide-react";

const PRODUCTS = [
  { id: 1, name: "Teakwood Lounge Sofa", category: "Sofa", wood: "Teak", price: 42999, rating: 4.6, reviews: 128, seed: "teak-sofa" },
  { id: 2, name: "Sheesham Dining Table (6-Seater)", category: "Dining Table", wood: "Sheesham", price: 38500, rating: 4.4, reviews: 96, seed: "sheesham-dining" },
  { id: 3, name: "Mango Wood Queen Bed", category: "Bed", wood: "Mango Wood", price: 27999, rating: 4.2, reviews: 210, seed: "mango-bed" },
  { id: 4, name: "Oakwood Sliding Wardrobe", category: "Wardrobe", wood: "Oak", price: 54999, rating: 4.7, reviews: 74, seed: "oak-wardrobe" },
  { id: 5, name: "Walnut Accent Armchair", category: "Chair", wood: "Walnut", price: 15999, rating: 4.3, reviews: 152, seed: "walnut-chair" },
  { id: 6, name: "Rosewood Bookshelf", category: "Bookshelf", wood: "Rosewood", price: 18499, rating: 4.1, reviews: 61, seed: "rosewood-shelf" },
  { id: 7, name: "Pinewood TV Unit", category: "TV Unit", wood: "Pine", price: 12999, rating: 4.0, reviews: 89, seed: "pine-tvunit" },
  { id: 8, name: "Teakwood Coffee Table", category: "Coffee Table", wood: "Teak", price: 8999, rating: 4.5, reviews: 143, seed: "teak-coffee" },
  { id: 9, name: "Sheesham Study Table", category: "Study Table", wood: "Sheesham", price: 11499, rating: 4.3, reviews: 77, seed: "sheesham-study" },
  { id: 10, name: "Mango Wood Storage Cabinet", category: "Cabinet", wood: "Mango Wood", price: 21999, rating: 4.2, reviews: 58, seed: "mango-cabinet" },
  { id: 11, name: "Oakwood Recliner", category: "Chair", wood: "Oak", price: 32999, rating: 4.6, reviews: 105, seed: "oak-recliner" },
  { id: 12, name: "Walnut Dining Bench", category: "Bench", wood: "Walnut", price: 9999, rating: 3.9, reviews: 40, seed: "walnut-bench" },
  { id: 13, name: "Rosewood King Bed", category: "Bed", wood: "Rosewood", price: 49999, rating: 4.8, reviews: 88, seed: "rosewood-bed" },
  { id: 14, name: "Pinewood 3-Seater Sofa", category: "Sofa", wood: "Pine", price: 29999, rating: 4.0, reviews: 66, seed: "pine-sofa" },
  { id: 15, name: "Teakwood Wardrobe (3-Door)", category: "Wardrobe", wood: "Teak", price: 47999, rating: 4.5, reviews: 52, seed: "teak-wardrobe" },
  { id: 16, name: "Sheesham Bookshelf", category: "Bookshelf", wood: "Sheesham", price: 16999, rating: 4.1, reviews: 39, seed: "sheesham-shelf" },
  { id: 17, name: "Acacia Wood Bar Stool (Set of 2)", category: "Bar Stool", wood: "Acacia", price: 6499, rating: 4.2, reviews: 84, seed: "acacia-barstool" },
  { id: 18, name: "Mahogany Console Table", category: "Console Table", wood: "Mahogany", price: 19999, rating: 4.4, reviews: 47, seed: "mahogany-console" },
  { id: 19, name: "Teakwood Bunk Bed", category: "Bed", wood: "Teak", price: 36999, rating: 4.5, reviews: 63, seed: "teak-bunkbed" },
  { id: 20, name: "Sheesham Rocking Chair", category: "Chair", wood: "Sheesham", price: 13999, rating: 4.3, reviews: 91, seed: "sheesham-rocking" },
  { id: 21, name: "Mango Wood Ottoman Cum Storage", category: "Ottoman", wood: "Mango Wood", price: 7999, rating: 4.0, reviews: 55, seed: "mango-ottoman" },
  { id: 22, name: "Pinewood Kids Study Table", category: "Study Table", wood: "Pine", price: 8499, rating: 4.1, reviews: 72, seed: "pine-kidsstudy" },
  { id: 23, name: "Walnut Bedside Table", category: "Bedside Table", wood: "Walnut", price: 5999, rating: 4.4, reviews: 118, seed: "walnut-bedside" },
  { id: 24, name: "Oakwood Wall Shelf (Set of 3)", category: "Wall Shelf", wood: "Oak", price: 4499, rating: 4.2, reviews: 67, seed: "oak-wallshelf" },
  { id: 25, name: "Rosewood Dressing Table", category: "Dressing Table", wood: "Rosewood", price: 22999, rating: 4.6, reviews: 53, seed: "rosewood-dressing" },
  { id: 26, name: "Teakwood Office Desk", category: "Office Desk", wood: "Teak", price: 24999, rating: 4.5, reviews: 44, seed: "teak-officedesk" },
  { id: 27, name: "Acacia Garden Bench", category: "Bench", wood: "Acacia", price: 10999, rating: 4.0, reviews: 31, seed: "acacia-gardenbench" },
  { id: 28, name: "Sheesham Sofa Cum Bed", category: "Sofa", wood: "Sheesham", price: 33999, rating: 4.3, reviews: 69, seed: "sheesham-sofacumbed" },
  { id: 29, name: "Mahogany Shoe Rack", category: "Shoe Rack", wood: "Mahogany", price: 6999, rating: 4.1, reviews: 48, seed: "mahogany-shoerack" },
  { id: 30, name: "Mango Wood L-Shape Sofa", category: "Sofa", wood: "Mango Wood", price: 45999, rating: 4.6, reviews: 102, seed: "mango-lsofa" },
  { id: 31, name: "Walnut 2-Door Cabinet", category: "Cabinet", wood: "Walnut", price: 18999, rating: 4.3, reviews: 37, seed: "walnut-cabinet" },
  { id: 32, name: "Pinewood Corner Bookshelf", category: "Bookshelf", wood: "Pine", price: 9499, rating: 3.9, reviews: 29, seed: "pine-cornershelf" },
];

const MAX_PRICE = Math.max(...PRODUCTS.map((p) => p.price));
const CATEGORY_TAGS = {
  Sofa: "sofa,livingroom", "Dining Table": "dining,table", Bed: "bed,bedroom", Wardrobe: "wardrobe,closet",
  Chair: "armchair,wood", Bookshelf: "bookshelf,shelving", "TV Unit": "tvstand,console", "Coffee Table": "coffeetable,livingroom",
  "Study Table": "desk,study", Cabinet: "cabinet,storage", "Bar Stool": "barstool,kitchen", "Console Table": "consoletable,hallway",
  Ottoman: "ottoman,footstool", "Bedside Table": "nightstand,bedroom", "Wall Shelf": "shelf,wall", "Dressing Table": "vanity,mirror",
  "Office Desk": "desk,office", Bench: "bench,wood", "Shoe Rack": "shoerack,entryway",
};

function getProductImage(product) {
  const tags = CATEGORY_TAGS[product.category] || "furniture,wood";
  return `https://loremflickr.com/420/300/${tags}?lock=${product.id}`;
}

function formatINR(amount) {
  return "₹" + amount.toLocaleString("en-IN");
}

function StarRating({ rating, reviews }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  return (
    <div className="rating-row">
      <div className="stars" aria-label={`Rated ${rating} out of 5`}>
        {[0, 1, 2, 3, 4].map((i) => {
          let fillClass = "star-empty";
          if (i < full) fillClass = "star-full";
          else if (i === full && hasHalf) fillClass = "star-half";
          return <Star key={i} size={15} className={`star-icon ${fillClass}`} />;
        })}
      </div>
      <span className="rating-value">{rating.toFixed(1)}</span>
      <span className="rating-count">({reviews})</span>
    </div>
  );
}

export default function IshaFurnitureShop() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedWoods, setSelectedWoods] = useState([]);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [sortBy, setSortBy] = useState("relevance");
  const [cartCount, setCartCount] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categories = useMemo(() => Array.from(new Set(PRODUCTS.map((p) => p.category))).sort(), []);
  const woodTypes = useMemo(() => Array.from(new Set(PRODUCTS.map((p) => p.wood))).sort(), []);
  const toggle = (list, setList, value) => setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  const filtered = useMemo(() => {
    let items = PRODUCTS.filter((p) => {
      const query = search.toLowerCase();
      const matchesSearch = search.trim() === "" || p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query) || p.wood.toLowerCase().includes(query);
      return matchesSearch && (selectedCategories.length === 0 || selectedCategories.includes(p.category)) && (selectedWoods.length === 0 || selectedWoods.includes(p.wood)) && p.price <= maxPrice;
    });
    if (sortBy === "price-low") items = [...items].sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") items = [...items].sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") items = [...items].sort((a, b) => b.rating - a.rating);
    return items;
  }, [search, selectedCategories, selectedWoods, maxPrice, sortBy]);
  const clearFilters = () => { setSearch(""); setSelectedCategories([]); setSelectedWoods([]); setMaxPrice(MAX_PRICE); setSortBy("relevance"); };

  return (
    <div className="ifs-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Work+Sans:wght@400;500;600;700&display=swap');
        .ifs-root { --color-bg:#F5EFE1; --color-surface:#FFFFFF; --color-primary:#5E3A21; --color-primary-dark:#3E2413; --color-accent:#A9762C; --color-secondary:#56634A; --color-text:#2A211A; --color-text-muted:#7A6E60; --color-border:#E2D3B8; font-family:'Work Sans',-apple-system,sans-serif; background:var(--color-bg); color:var(--color-text); min-height:100vh; line-height:1.5; }
        .ifs-root * { box-sizing:border-box; }
        .ifs-header { background:var(--color-primary); color:#F5EFE1; padding:18px 32px; display:flex; align-items:center; justify-content:space-between; gap:20px; flex-wrap:wrap; position:sticky; top:0; z-index:10; }
        .ifs-brand { display:flex; align-items:center; gap:12px; } .ifs-brand-icon { background:var(--color-accent); color:var(--color-primary-dark); width:42px; height:42px; border-radius:8px; display:flex; align-items:center; justify-content:center; } .ifs-brand-text h1 { font-family:'Fraunces',serif; font-size:1.5rem; font-weight:600; margin:0; letter-spacing:.2px; } .ifs-brand-text p { margin:2px 0 0; font-size:.8rem; color:#D8C8AE; }
        .ifs-search { flex:1; max-width:420px; position:relative; display:flex; align-items:center; } .ifs-search input { width:100%; padding:10px 14px 10px 38px; border-radius:8px; border:none; background:#EFE4CD; color:var(--color-text); font-size:.92rem; font-family:inherit; } .ifs-search input:focus { outline:2px solid var(--color-accent); outline-offset:1px; } .ifs-search svg { position:absolute; left:12px; color:var(--color-primary-dark); }
        .ifs-cart { display:flex; align-items:center; gap:8px; background:var(--color-accent); color:var(--color-primary-dark); padding:9px 16px; border-radius:8px; font-weight:600; font-size:.9rem; border:none; cursor:pointer; }
        .ifs-hero { background:var(--color-primary-dark); color:#EFE4CD; padding:28px 32px; border-bottom:1px solid var(--color-border); } .ifs-hero h2 { font-family:'Fraunces',serif; font-size:1.7rem; font-weight:500; margin:0 0 6px; max-width:640px; } .ifs-hero p { margin:0; color:#C8B79A; font-size:.92rem; max-width:560px; }
        .ifs-body { display:flex; align-items:flex-start; max-width:1240px; margin:0 auto; padding:28px 24px 60px; gap:28px; } .ifs-filters { width:250px; flex-shrink:0; background:var(--color-surface); border:1px solid var(--color-border); border-radius:10px; padding:20px; position:sticky; top:96px; } .ifs-filters-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; } .ifs-filters-header h3 { font-family:'Fraunces',serif; font-size:1.05rem; margin:0; display:flex; align-items:center; gap:8px; } .ifs-clear-btn { background:none; border:none; color:var(--color-accent); font-size:.82rem; cursor:pointer; font-weight:600; padding:0; }
        .filter-group { margin-bottom:22px; } .filter-group label.group-title { display:block; font-size:.85rem; font-weight:600; color:var(--color-text); margin-bottom:10px; } .price-slider-value { font-size:.82rem; color:var(--color-text-muted); margin-bottom:8px; } .price-slider-value strong { color:var(--color-primary); } input[type=range] { width:100%; accent-color:var(--color-accent); } .checkbox-row { display:flex; align-items:center; gap:8px; font-size:.87rem; margin-bottom:8px; color:var(--color-text); cursor:pointer; } .checkbox-row input { accent-color:var(--color-secondary); width:15px; height:15px; } select.sort-select { width:100%; padding:8px 10px; border-radius:6px; border:1px solid var(--color-border); background:var(--color-bg); color:var(--color-text); font-family:inherit; font-size:.85rem; }
        .ifs-results { flex:1; min-width:0; } .ifs-results-bar { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; font-size:.88rem; color:var(--color-text-muted); } .product-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(230px,1fr)); gap:20px; } .product-card { background:var(--color-surface); border:1px solid var(--color-border); border-radius:10px; overflow:hidden; display:flex; flex-direction:column; } .product-img { width:100%; height:160px; object-fit:cover; background:var(--color-border); } .product-info { padding:14px 14px 16px; display:flex; flex-direction:column; gap:6px; flex:1; } .product-wood-tag { align-self:flex-start; background:#EAF0E4; color:var(--color-secondary); font-size:.72rem; font-weight:600; padding:3px 9px; border-radius:20px; } .product-name { font-family:'Fraunces',serif; font-size:1rem; font-weight:600; margin:2px 0 0; color:var(--color-text); } .product-category { font-size:.78rem; color:var(--color-text-muted); margin:0; } .rating-row { display:flex; align-items:center; gap:5px; margin-top:2px; } .stars { display:flex; } .star-icon.star-full { fill:var(--color-accent); color:var(--color-accent); } .star-icon.star-half { fill:var(--color-accent); color:var(--color-accent); opacity:.5; } .star-icon.star-empty { fill:none; color:var(--color-border); } .rating-value { font-size:.8rem; font-weight:600; color:var(--color-text); } .rating-count { font-size:.76rem; color:var(--color-text-muted); }
        .product-footer { display:flex; align-items:center; justify-content:space-between; margin-top:10px; } .product-price { font-size:1.05rem; font-weight:700; color:var(--color-primary); font-family:'Fraunces',serif; } .add-btn { background:var(--color-primary); color:#F5EFE1; border:none; padding:7px 12px; border-radius:6px; font-size:.78rem; font-weight:600; cursor:pointer; } .add-btn:hover { background:var(--color-primary-dark); } .empty-state { text-align:center; padding:60px 20px; color:var(--color-text-muted); background:var(--color-surface); border:1px dashed var(--color-border); border-radius:10px; } .filters-toggle-btn { display:none; }
        @media (max-width:860px) { .ifs-body { flex-direction:column; } .ifs-filters { width:100%; position:static; display:none; } .ifs-filters.open { display:block; } .filters-toggle-btn { display:flex; align-items:center; gap:6px; background:var(--color-surface); border:1px solid var(--color-border); padding:8px 14px; border-radius:8px; font-size:.85rem; font-weight:600; color:var(--color-primary); cursor:pointer; margin-bottom:16px; } }
      `}</style>
      <header className="ifs-header"><div className="ifs-brand"><div className="ifs-brand-icon"><Sofa size={22} /></div><div className="ifs-brand-text"><h1>Isha Furniture Shop</h1><p>Solid wood furniture, built for Indian homes</p></div></div><div className="ifs-search"><Search size={17} /><input type="text" placeholder="Search sofas, tables, wood type..." value={search} onChange={(e) => setSearch(e.target.value)} /></div><button className="ifs-cart"><ShoppingCart size={17} />Cart ({cartCount})</button></header>
      <div className="ifs-hero"><h2>Every piece is solid wood, chosen for the way you live.</h2><p>Browse teak, sheesham, mango, oak, walnut, rosewood and pine furniture - filter by price or the exact piece you need.</p></div>
      <div className="ifs-body"><button className="filters-toggle-btn" onClick={() => setFiltersOpen((v) => !v)}><SlidersHorizontal size={16} />{filtersOpen ? "Hide filters" : "Show filters"}</button><aside className={`ifs-filters ${filtersOpen ? "open" : ""}`}><div className="ifs-filters-header"><h3><SlidersHorizontal size={16} /> Filters</h3><button className="ifs-clear-btn" onClick={clearFilters}>Clear all</button></div><div className="filter-group"><label className="group-title">Price</label><div className="price-slider-value">Up to <strong>{formatINR(maxPrice)}</strong></div><input type="range" min={1000} max={MAX_PRICE} step={500} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} /></div><div className="filter-group"><label className="group-title">Product type</label>{categories.map((cat) => <label className="checkbox-row" key={cat}><input type="checkbox" checked={selectedCategories.includes(cat)} onChange={() => toggle(selectedCategories, setSelectedCategories, cat)} />{cat}</label>)}</div><div className="filter-group"><label className="group-title">Wood type</label>{woodTypes.map((wood) => <label className="checkbox-row" key={wood}><input type="checkbox" checked={selectedWoods.includes(wood)} onChange={() => toggle(selectedWoods, setSelectedWoods, wood)} />{wood}</label>)}</div><div className="filter-group"><label className="group-title">Sort by</label><select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}><option value="relevance">Relevance</option><option value="price-low">Price: Low to high</option><option value="price-high">Price: High to low</option><option value="rating">Highest rated</option></select></div></aside><main className="ifs-results"><div className="ifs-results-bar"><span>{filtered.length} {filtered.length === 1 ? "product" : "products"} found</span></div>{filtered.length === 0 ? <div className="empty-state">No furniture matches these filters. Try widening the price range or clearing a filter.</div> : <div className="product-grid">{filtered.map((p) => <div className="product-card" key={p.id}><img className="product-img" src={getProductImage(p)} alt={p.name} loading="lazy" onError={(e) => { e.target.onerror = null; e.target.src = `https://picsum.photos/seed/${p.seed}/420/300`; }} /><div className="product-info"><span className="product-wood-tag">{p.wood}</span><h4 className="product-name">{p.name}</h4><p className="product-category">{p.category}</p><StarRating rating={p.rating} reviews={p.reviews} /><div className="product-footer"><span className="product-price">{formatINR(p.price)}</span><button className="add-btn" onClick={() => setCartCount((c) => c + 1)}>Add to cart</button></div></div></div>)}</div>}</main></div>
    </div>
  );
}
