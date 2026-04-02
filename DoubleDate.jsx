import { useState, useEffect } from "react";

const INTERESTS = [
  "Paint & Sip","Wine Tasting","Craft Beer Tour","Cocktail Mixology Class","Whiskey Tasting",
  "Escape Room","Murder Mystery Dinner","Axe Throwing","Laser Tag","Go-Kart Racing",
  "Rock Climbing","Bouldering","Trampoline Park","Mini Golf","Bowling",
  "Comedy Club","Live Music","Jazz Bar","Karaoke","Open Mic Night",
  "Movie Theater","Drive-In Movie","IMAX Experience","Film Festival","Outdoor Cinema",
  "Fine Dining","Sushi Experience","Farm-to-Table","Food Tour","Street Food Crawl",
  "Cooking Class","Sushi Making Class","Pasta Making","Baking Class","Ramen Bar Crawl",
  "Zoo","Aquarium","Botanical Garden","Natural History Museum","Art Museum",
  "Science Museum","Planetarium","History Museum","Photography Museum","Wax Museum",
  "Spa Day","Couple's Massage","Infrared Sauna","Float Therapy","Yoga Class",
  "Pottery Class","Glassblowing","Jewelry Making","Candle Making","Flower Arranging",
  "Rooftop Bar","Sky Bar","Hidden Speakeasy","Wine Bar","Champagne Bar",
  "Horseback Riding","Hot Air Balloon","Helicopter Tour","Boat Cruise","Kayaking",
  "Ice Skating","Roller Skating","Paddleboarding","Surfing Lesson","Sailing",
  "Sunset Hike","Stargazing","Camping","Picnic in the Park","Scavenger Hunt",
  "Virtual Reality Arcade","Pinball Museum","Retro Arcade","Board Game Cafe","Chess Club",
  "Dance Class (Salsa)","Swing Dancing","Ballroom Dance","Pole Dance Class","Tango Lesson",
  "Boxing Class","MMA Event","Wrestling Event","Live Sports Game","Motorsports Race",
  "Haunted Tour","Ghost Hunt","Haunted House","Cemetery Tour","Psychic Reading",
  "Rooftop Yoga","Sunrise Yoga","Sound Bath","Meditation Class","Crystal Healing",
  "Drag Show","Burlesque Show","Magic Show","Circus Performance","Improv Theater",
  "Trivia Night","Pub Crawl","Speed Networking","Singles Mixer","Poetry Slam",
  "Tattoo Consultation","Photo Shoot","Makeover Experience","Fashion Show","Vintage Shopping"
];

const GROUP_OPTIONS = [
  { label: "Solo", value: 1, icon: "🧍" },
  { label: "Couple", value: 2, icon: "👫" },
  { label: "Double Date", value: 4, icon: "👫👫" },
  { label: "Small Group (6)", value: 6, icon: "🎉" },
  { label: "Party (10+)", value: 10, icon: "🥳" },
];

const TIME_SLOTS = [
  { label: "Morning Escape", start: "9:00 AM", icon: "🌅" },
  { label: "Afternoon Adventure", start: "1:00 PM", icon: "☀️" },
  { label: "Evening Magic", start: "5:00 PM", icon: "🌆" },
  { label: "Night Out", start: "7:00 PM", icon: "🌙" },
];

const CITIES = [
  "New York, NY","Los Angeles, CA","Chicago, IL","Houston, TX","Phoenix, AZ",
  "Philadelphia, PA","San Antonio, TX","San Diego, CA","Dallas, TX","Austin, TX",
  "San Francisco, CA","Seattle, WA","Denver, CO","Nashville, TN","Miami, FL",
  "Atlanta, GA","Portland, OR","Las Vegas, NV","Boston, MA","New Orleans, LA",
];

const VENUE_DB = {
  "Paint & Sip": [
    { venue: "Pinot's Palette", rating: 4.8, reviews: 2341, img: "🎨", tag: "Best Seller", promo: "SIP20", savings: 12 },
    { venue: "Cork & Canvas Studio", rating: 4.6, reviews: 1102, img: "🖌️", tag: "Romantic Pick", promo: null, savings: 0 },
    { venue: "Vino Van Gogh", rating: 4.7, reviews: 876, img: "🍷", tag: "BYOB Allowed", promo: "VINO15", savings: 8 },
  ],
  "Escape Room": [
    { venue: "The Escape Game", rating: 4.9, reviews: 5821, img: "🔐", tag: "Top Rated", promo: "ESCAPE10", savings: 7 },
    { venue: "Breakout Games", rating: 4.7, reviews: 3210, img: "🗝️", tag: "Group Fave", promo: null, savings: 0 },
    { venue: "Mystery Rooms", rating: 4.5, reviews: 1440, img: "🕵️", tag: "New Themes", promo: "MYSTERY20", savings: 14 },
  ],
  "Fine Dining": [
    { venue: "The Capital Grille", rating: 4.9, reviews: 8820, img: "🥩", tag: "OpenTable Pick", promo: null, savings: 0 },
    { venue: "Nobu Restaurant", rating: 4.8, reviews: 6104, img: "🍣", tag: "Celebrity Spot", promo: "NOBU15", savings: 20 },
    { venue: "Mastro's Steakhouse", rating: 4.7, reviews: 4399, img: "🍾", tag: "Best Ambiance", promo: null, savings: 0 },
  ],
  "Comedy Club": [
    { venue: "Laugh Factory", rating: 4.8, reviews: 3991, img: "🎤", tag: "Tonight's Show", promo: "LAUGH20", savings: 10 },
    { venue: "The Comedy Store", rating: 4.9, reviews: 7112, img: "😂", tag: "Legendary Venue", promo: null, savings: 0 },
    { venue: "Improv Comedy Club", rating: 4.6, reviews: 2234, img: "🎭", tag: "Best Value", promo: "IMPROV15", savings: 8 },
  ],
  "Cocktail Mixology Class": [
    { venue: "Cocktail Lab", rating: 4.8, reviews: 1893, img: "🍹", tag: "Couples Fave", promo: "MIX25", savings: 18 },
    { venue: "The Mixing Bowl", rating: 4.6, reviews: 934, img: "🧉", tag: "Small Groups", promo: null, savings: 0 },
    { venue: "Shaker & Spoon Studio", rating: 4.7, reviews: 1204, img: "🍸", tag: "Best Rated", promo: "SHAKE10", savings: 7 },
  ],
  "Rooftop Bar": [
    { venue: "Sky Lounge 360", rating: 4.7, reviews: 4210, img: "🌆", tag: "City Views", promo: "SKYBAR", savings: 15 },
    { venue: "Elixir Rooftop", rating: 4.8, reviews: 3102, img: "🥂", tag: "Best Sunsets", promo: null, savings: 0 },
    { venue: "The High Bar", rating: 4.6, reviews: 1890, img: "🌇", tag: "Live DJ Fri", promo: "HIGH20", savings: 10 },
  ],
  "Jazz Bar": [
    { venue: "Blue Note Jazz Club", rating: 4.9, reviews: 9201, img: "🎷", tag: "Iconic Venue", promo: null, savings: 0 },
    { venue: "Smalls Jazz Club", rating: 4.8, reviews: 3444, img: "🎺", tag: "Late Night", promo: "JAZZ15", savings: 6 },
    { venue: "Dizzy's Club", rating: 4.7, reviews: 2199, img: "🎵", tag: "Skyline Views", promo: null, savings: 0 },
  ],
  "Rock Climbing": [
    { venue: "Brooklyn Boulders", rating: 4.8, reviews: 4102, img: "🧗", tag: "Beginner OK", promo: "CLIMB20", savings: 12 },
    { venue: "Movement Climbing", rating: 4.7, reviews: 2983, img: "⛰️", tag: "Best Gear", promo: null, savings: 0 },
    { venue: "Earth Treks Climbing", rating: 4.6, reviews: 1720, img: "🪨", tag: "Instructor Led", promo: "TREKS10", savings: 6 },
  ],
  "Pottery Class": [
    { venue: "Mud & Fire Studio", rating: 4.9, reviews: 1201, img: "🏺", tag: "Most Romantic", promo: "MUDFIRE", savings: 10 },
    { venue: "Clay Ground", rating: 4.7, reviews: 880, img: "🎑", tag: "BYOB Welcome", promo: null, savings: 0 },
    { venue: "Spin & Create", rating: 4.8, reviews: 1540, img: "🪵", tag: "All Skill Levels", promo: "SPIN15", savings: 9 },
  ],
  "Food Tour": [
    { venue: "Devour Food Tours", rating: 4.9, reviews: 6310, img: "🍜", tag: "TripAdvisor #1", promo: "DEVOUR20", savings: 22 },
    { venue: "Taste of the City", rating: 4.7, reviews: 3120, img: "🌮", tag: "Hidden Gems", promo: null, savings: 0 },
    { venue: "Culinary Walks", rating: 4.8, reviews: 2890, img: "🥘", tag: "Afternoon Tour", promo: "WALK10", savings: 8 },
  ],
  "Wine Tasting": [
    { venue: "Urban Winery", rating: 4.8, reviews: 1980, img: "🍇", tag: "Sommelier Led", promo: "WINE20", savings: 14 },
    { venue: "The Wine Room", rating: 4.7, reviews: 1340, img: "🍾", tag: "Cozy Ambiance", promo: null, savings: 0 },
    { venue: "Cellar Sessions", rating: 4.6, reviews: 890, img: "🥂", tag: "Private Tasting", promo: "CELLAR15", savings: 9 },
  ],
  "Axe Throwing": [
    { venue: "Bad Axe Throwing", rating: 4.8, reviews: 3201, img: "🪓", tag: "Chain #1", promo: "AXE15", savings: 8 },
    { venue: "Bury the Hatchet", rating: 4.7, reviews: 2104, img: "🎯", tag: "Group Fave", promo: null, savings: 0 },
    { venue: "Urban Axes", rating: 4.6, reviews: 1450, img: "⚡", tag: "BYOB Allowed", promo: "URBAN10", savings: 6 },
  ],
  "Karaoke": [
    { venue: "Sing Sing Karaoke", rating: 4.7, reviews: 2890, img: "🎤", tag: "Private Rooms", promo: "SING20", savings: 12 },
    { venue: "Karaoke City", rating: 4.6, reviews: 1760, img: "🎶", tag: "Best Song List", promo: null, savings: 0 },
    { venue: "NoRaebang", rating: 4.8, reviews: 3100, img: "🌟", tag: "Korean Style", promo: "NORAE15", savings: 9 },
  ],
  "default": [
    { venue: "Premier Experience Co.", rating: 4.7, reviews: 1800, img: "⭐", tag: "Curated Pick", promo: "DATE15", savings: 10 },
    { venue: "The Urban Adventure", rating: 4.6, reviews: 940, img: "🎯", tag: "Budget Friendly", promo: null, savings: 0 },
    { venue: "City Experiences", rating: 4.8, reviews: 2200, img: "✨", tag: "Best Reviewed", promo: "CITY20", savings: 14 },
  ],
};

const ACTIVITY_TEMPLATES = {
  "Fine Dining": { duration: 90, baseCost: 65, desc: "Upscale multi-course dinner, seasonal menu", category: "🍽️ Dining" },
  "Escape Room": { duration: 75, baseCost: 35, desc: "Immersive puzzle-solving adventure", category: "🎮 Adventure" },
  "Paint & Sip": { duration: 120, baseCost: 45, desc: "Guided canvas painting with wine included", category: "🎨 Creative" },
  "Cocktail Mixology Class": { duration: 90, baseCost: 55, desc: "Craft signature cocktails with a pro", category: "🍸 Experience" },
  "Comedy Club": { duration: 90, baseCost: 30, desc: "Live stand-up, top local & touring comics", category: "🎭 Entertainment" },
  "Rooftop Bar": { duration: 60, baseCost: 25, desc: "Skyline views, craft cocktails & small bites", category: "🥂 Nightlife" },
  "Jazz Bar": { duration: 90, baseCost: 20, desc: "Live jazz in an intimate speakeasy venue", category: "🎷 Music" },
  "Rock Climbing": { duration: 90, baseCost: 28, desc: "Indoor bouldering & top-rope, gear included", category: "🧗 Active" },
  "Pottery Class": { duration: 120, baseCost: 50, desc: "Hands-on wheel throwing with a studio artist", category: "🏺 Creative" },
  "Food Tour": { duration: 150, baseCost: 75, desc: "Guided tasting walk through the city's best", category: "🍜 Culinary" },
  "Wine Tasting": { duration: 75, baseCost: 40, desc: "Curated flight with sommelier-led pairing notes", category: "🍷 Tasting" },
  "Axe Throwing": { duration: 60, baseCost: 30, desc: "Coached lanes, competitive rounds, great energy", category: "🪓 Active" },
  "Karaoke": { duration: 90, baseCost: 22, desc: "Private room karaoke with full bar service", category: "🎤 Music" },
  "default": { duration: 75, baseCost: 40, desc: "An unforgettable curated experience", category: "⭐ Experience" },
};

function getVenues(interest) {
  return (VENUE_DB[interest] || VENUE_DB["default"]).map(v => ({ ...v }));
}

function formatTime(h, m) {
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${hour}:${String(m).padStart(2, "0")} ${ampm}`;
}

function generateStops(city, hours, budget, interests, groupSize, timeSlot) {
  const pool = interests.length > 0 ? [...interests] : ["Fine Dining", "Comedy Club", "Cocktail Mixology Class"];
  const startParts = timeSlot.start.match(/(\d+):(\d+) (AM|PM)/);
  let h = parseInt(startParts[1]) + (startParts[3] === "PM" && startParts[1] !== "12" ? 12 : 0);
  let m = parseInt(startParts[2]);
  let elapsed = 0;
  const maxMin = hours * 60;
  const perBudget = budget / groupSize;
  let spent = 0;
  const stops = [];

  for (let i = 0; i < Math.min(pool.length, 5); i++) {
    if (elapsed >= maxMin - 60) break;
    const interest = pool[i];
    const tmpl = ACTIVITY_TEMPLATES[interest] || ACTIVITY_TEMPLATES["default"];
    const venues = getVenues(interest).map((v, vi) => ({
      ...v,
      price: Math.round(tmpl.baseCost * (0.82 + vi * 0.1 + Math.random() * 0.15)),
      originalPrice: Math.round(tmpl.baseCost * 1.2),
    }));
    if (spent + venues[0].price > perBudget && stops.length > 0) break;
    stops.push({
      id: i, interest,
      time: formatTime(h, m),
      duration: tmpl.duration,
      category: tmpl.category,
      desc: tmpl.desc,
      venues,
      selectedVenueIdx: 0,
      hasBuffer: i < pool.length - 1 && i < 4,
    });
    spent += venues[0].price;
    const adv = tmpl.duration + 30;
    m += adv;
    while (m >= 60) { h++; m -= 60; }
    elapsed += adv;
  }
  return stops;
}

function calcTotals(stops, groupSize) {
  const perPerson = stops.reduce((s, stop) => s + stop.venues[stop.selectedVenueIdx].price, 0);
  const savings = stops.reduce((s, stop) => {
    const v = stop.venues[stop.selectedVenueIdx];
    return s + (v.promo ? v.savings : 0);
  }, 0);
  return { perPerson, grandTotal: perPerson * groupSize, savings: savings * groupSize };
}

// ── STAR FIELD ──
function StarField() {
  const stars = useState(() => [...Array(55)].map(() => ({
    l: `${Math.random()*100}%`, t: `${Math.random()*100}%`,
    d: `${Math.random()*4}s`, r: `${2+Math.random()*3}s`,
    s: `${1+Math.random()*2}px`,
  })))[0];
  return (
    <div style={{ position:"fixed",inset:0,pointerEvents:"none",zIndex:0 }}>
      {stars.map((s,i) => (
        <div key={i} style={{
          position:"absolute", borderRadius:"50%", background:"#fff",
          left:s.l, top:s.t, width:s.s, height:s.s,
          animation:`tw ${s.r} ease-in-out ${s.d} infinite`,
        }}/>
      ))}
    </div>
  );
}

// ── HEART BURST ──
function HeartBurst({ active }) {
  if (!active) return null;
  return (
    <div style={{ position:"fixed",bottom:"25%",left:0,right:0,pointerEvents:"none",zIndex:200 }}>
      {["❤️","💕","💖","💗","✨","🌹","💝","🥂"].map((e,i) => (
        <span key={i} style={{
          position:"absolute", fontSize:"1.6rem",
          left:`${8+i*11}%`,
          animation:`hbUp 2.2s ease-out ${i*0.1}s forwards`,
        }}>{e}</span>
      ))}
    </div>
  );
}

// ── STOP CARD ──
function StopCard({ stop, groupSize, onSelectVenue, index }) {
  const [expanded, setExpanded] = useState(true);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => { const t = setTimeout(() => setRevealed(true), index * 200); return () => clearTimeout(t); }, []);
  const sel = stop.venues[stop.selectedVenueIdx];

  return (
    <div style={{
      borderRadius:18, background:"rgba(255,255,255,.04)",
      border:"1px solid rgba(255,133,200,.14)", marginBottom:10,
      opacity: revealed ? 1 : 0, transform: revealed ? "none" : "translateY(14px)",
      transition:"all .4s ease", overflow:"hidden",
    }}>
      {/* Header */}
      <div onClick={() => setExpanded(e => !e)} style={{
        display:"flex", justifyContent:"space-between", alignItems:"flex-start",
        padding:"14px 16px 12px", cursor:"pointer",
        borderBottom:"1px solid rgba(255,255,255,.05)",
      }}>
        <div>
          <div style={{ fontSize:".66rem", color:"#7a5fa0", letterSpacing:"1px", textTransform:"uppercase", marginBottom:3 }}>{stop.time} · {stop.duration} min</div>
          <div style={{ fontSize:".95rem", fontWeight:600, color:"#f0e0ff" }}>{stop.interest}</div>
          <div style={{ fontSize:".7rem", color:"#6a50a0", marginTop:3 }}>{stop.category}</div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.4rem", fontWeight:700, color:"#ff85c8", lineHeight:1 }}>
              ${sel.price}<span style={{ fontSize:".65rem", color:"#8060a0", fontFamily:"sans-serif" }}>/pp</span>
            </div>
            {groupSize > 1 && <div style={{ fontSize:".65rem", color:"#5a4080", textAlign:"right" }}>${sel.price * groupSize} total</div>}
          </div>
          <div style={{ fontSize:".7rem", color:"#6050a0" }}>{expanded ? "▲" : "▼"}</div>
        </div>
      </div>

      {/* Selected badge */}
      <div style={{
        display:"flex", alignItems:"center", gap:8, padding:"9px 16px",
        background:"rgba(255,133,200,.05)", borderBottom:"1px solid rgba(255,255,255,.04)",
        flexWrap:"wrap",
      }}>
        <span style={{ fontSize:"1.1rem" }}>{sel.img}</span>
        <span style={{ fontSize:".82rem", fontWeight:500, color:"#d0b0f0", flex:1 }}>{sel.venue}</span>
        <span style={{ fontSize:".74rem", color:"#ffcf6b" }}>★ {sel.rating}</span>
        {sel.promo && (
          <span style={{ fontSize:".68rem", background:"rgba(34,201,135,.15)", color:"#22c987", padding:"2px 9px", borderRadius:100, border:"1px solid rgba(34,201,135,.3)" }}>
            🏷 {sel.promo}
          </span>
        )}
      </div>

      {/* Alternatives */}
      {expanded && (
        <div style={{ padding:"13px 13px 8px" }}>
          <div style={{ fontSize:".68rem", color:"#6a50a0", textTransform:"uppercase", letterSpacing:"1.5px", marginBottom:10 }}>
            🔄 Swap venue — {stop.venues.length} options found
          </div>
          {stop.venues.map((v, vi) => (
            <div key={vi} onClick={() => onSelectVenue(stop.id, vi)} style={{
              border: stop.selectedVenueIdx === vi ? "1px solid #ff85c8" : "1px solid rgba(255,255,255,.08)",
              borderRadius:14, padding:"12px 13px", marginBottom:7, cursor:"pointer",
              background: stop.selectedVenueIdx === vi ? "rgba(255,133,200,.1)" : "rgba(255,255,255,.03)",
              boxShadow: stop.selectedVenueIdx === vi ? "0 0 16px rgba(255,133,200,.15)" : "none",
              transition:"all .18s",
            }}>
              {/* Alt top row */}
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                <span style={{ fontSize:"1.4rem", flexShrink:0 }}>{v.img}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:".85rem", fontWeight:500, color:"#e8d8f8" }}>{v.venue}</div>
                  <div style={{ fontSize:".7rem", color:"#6a50a0", marginTop:2 }}>★ {v.rating} · {v.reviews.toLocaleString()} reviews</div>
                </div>
                {stop.selectedVenueIdx === vi && (
                  <div style={{
                    width:22, height:22, borderRadius:"50%", background:"#ff85c8",
                    color:"#fff", fontSize:".72rem", display:"flex", alignItems:"center",
                    justifyContent:"center", fontWeight:700, flexShrink:0,
                  }}>✓</div>
                )}
              </div>
              {/* Alt bottom row */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:8, flexWrap:"wrap" }}>
                <span style={{
                  fontSize:".67rem", background:"rgba(120,60,230,.2)", color:"#b88af0",
                  padding:"3px 10px", borderRadius:100, border:"1px solid rgba(120,60,230,.25)",
                }}>{v.tag}</span>
                <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                  {v.promo && <span style={{ fontSize:".72rem", color:"#5a4080", textDecoration:"line-through" }}>${v.originalPrice}</span>}
                  <span style={{ fontSize:".9rem", fontWeight:600, color:"#ff85c8" }}>${v.price}/pp</span>
                  {v.promo && <span style={{ fontSize:".68rem", background:"rgba(34,201,135,.15)", color:"#22c987", padding:"2px 8px", borderRadius:100 }}>Save ${v.savings}</span>}
                </div>
              </div>
              {v.promo && (
                <div style={{
                  marginTop:8, fontSize:".7rem", color:"#22c987",
                  background:"rgba(34,201,135,.07)", border:"1px solid rgba(34,201,135,.2)",
                  borderRadius:8, padding:"6px 10px",
                }}>
                  Promo code: <strong>{v.promo}</strong> — applied automatically at checkout
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {stop.hasBuffer && (
        <div style={{
          display:"flex", alignItems:"center", gap:8, padding:"7px 16px",
          borderTop:"1px solid rgba(255,255,255,.04)",
        }}>
          <div style={{ flex:1, height:1, borderTop:"1px dashed #1f1035" }} />
          <span style={{ fontSize:".67rem", color:"#3a2860", whiteSpace:"nowrap" }}>🚗 30 min travel buffer</span>
          <div style={{ flex:1, height:1, borderTop:"1px dashed #1f1035" }} />
        </div>
      )}
    </div>
  );
}

// ── MAIN APP ──
export default function DoubleDate() {
  const [step, setStep] = useState(0);
  const [city, setCity] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [showCities, setShowCities] = useState(false);
  const [groupSize, setGroupSize] = useState(2);
  const [hours, setHours] = useState(4);
  const [budget, setBudget] = useState(200);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[2]);
  const [stops, setStops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [walletSaved, setWalletSaved] = useState(false);
  const [calAdded, setCalAdded] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [booked, setBooked] = useState(false);
  const [interestSearch, setInterestSearch] = useState("");

  const filteredCities = CITIES.filter(c => c.toLowerCase().includes(citySearch.toLowerCase()));
  const filteredInterests = INTERESTS.filter(i => i.toLowerCase().includes(interestSearch.toLowerCase()));

  const toggleInterest = (interest) => {
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(x => x !== interest)
        : prev.length < 3 ? [...prev, interest] : prev
    );
  };

  const handleSelectVenue = (stopId, venueIdx) => {
    setStops(prev => prev.map(s => s.id === stopId ? { ...s, selectedVenueIdx: venueIdx } : s));
  };

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setStops(generateStops(city, hours, budget, selectedInterests, groupSize, timeSlot));
      setLoading(false);
      setStep(5);
    }, 2500);
  };

  const handleBook = () => {
    setCelebrating(true);
    setTimeout(() => { setBooked(true); setCelebrating(false); }, 2200);
  };

  const handleReset = () => {
    setStep(0); setCity(""); setCitySearch(""); setSelectedInterests([]);
    setStops([]); setWalletSaved(false); setCalAdded(false); setBooked(false);
  };

  const totals = stops.length > 0 ? calcTotals(stops, groupSize) : null;
  const stepLabels = ["City","Group","Budget","Vibe","Time","Your Date"];

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');
    @keyframes tw { 0%,100%{opacity:.08} 50%{opacity:.85} }
    @keyframes logoShim { to{background-position:200%} }
    @keyframes pIn { from{opacity:0;transform:translateY(22px) scale(.97)} to{opacity:1;transform:none} }
    @keyframes hbUp { 0%{transform:translateY(0) scale(0) rotate(0deg);opacity:1} 100%{transform:translateY(-220px) scale(1.4) rotate(20deg);opacity:0} }
    @keyframes ldp { 0%,100%{transform:scale(1)} 50%{transform:scale(1.2)} }
    @keyframes fadeSlide { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:none} }
    @keyframes ldBar { 0%{width:0%} 60%{width:65%} 100%{width:100%} }
    @keyframes bbounce { from{transform:translateY(0)} to{transform:translateY(-10px)} }
    * { box-sizing:border-box; margin:0; padding:0; }
    ::-webkit-scrollbar { width:0; }
    * { scrollbar-width:none; }
  `;

  const panel = {
    margin:"0 14px", background:"rgba(255,255,255,.036)",
    border:"1px solid rgba(255,133,200,.14)", borderRadius:24,
    padding:"26px 22px", backdropFilter:"blur(14px)",
    animation:"pIn .45s cubic-bezier(.34,1.56,.64,1) forwards",
  };

  const inputStyle = {
    width:"100%", background:"rgba(255,255,255,.06)",
    border:"1px solid rgba(255,133,200,.22)", borderRadius:12,
    color:"#ede8f8", padding:"13px 15px", fontSize:".88rem",
    fontFamily:"'Plus Jakarta Sans',sans-serif", outline:"none",
  };

  const btnNext = (disabled) => ({
    flex:1, padding:"13px", borderRadius:13,
    background: disabled ? "rgba(255,133,200,.2)" : "linear-gradient(135deg,#ff85c8,#c040a0)",
    color:"#fff", fontSize:".88rem", fontWeight:600, cursor: disabled ? "default" : "pointer",
    fontFamily:"'Plus Jakarta Sans',sans-serif", border:"none",
    boxShadow: disabled ? "none" : "0 3px 14px rgba(255,133,200,.3)",
    opacity: disabled ? 0.4 : 1,
  });

  return (
    <div style={{ minHeight:"100vh", background:"#080511", fontFamily:"'Plus Jakarta Sans',sans-serif", color:"#ede8f8", position:"relative", overflowX:"hidden" }}>
      <style>{css}</style>
      <StarField />
      <HeartBurst active={celebrating} />

      <div style={{ position:"relative", zIndex:1, maxWidth:540, margin:"0 auto", padding:"0 0 100px", minHeight:"100vh", display:"flex", flexDirection:"column" }}>

        {/* HEADER */}
        <div style={{ padding:"32px 24px 20px", textAlign:"center" }}>
          <div style={{
            fontFamily:"'Cormorant Garamond',serif", fontSize:"2.6rem", fontWeight:700,
            background:"linear-gradient(120deg,#ff85c8 0%,#ffcf6b 50%,#ff85c8 100%)",
            backgroundSize:"200%", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            backgroundClip:"text", animation:"logoShim 4s linear infinite",
          }}>Double Date ♥</div>
          <div style={{ fontSize:".7rem", letterSpacing:"3.5px", color:"#6a4a90", textTransform:"uppercase", marginTop:3 }}>
            Your perfect outing, crafted
          </div>
        </div>

        {/* STEP PILLS */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:"0 18px 26px", gap:0 }}>
          {stepLabels.map((s, i) => (
            <div key={s} style={{ display:"contents" }}>
              {i > 0 && <div style={{ flex:1, height:1, background:"#1a0e2e", minWidth:8 }} />}
              <div onClick={() => step > i && setStep(i)} style={{
                display:"flex", flexDirection:"column", alignItems:"center", gap:5,
                minWidth:46, cursor: step > i ? "pointer" : "default",
                opacity: step === i ? 1 : step > i ? 0.65 : 0.3,
              }}>
                <div style={{
                  width: step === i ? 13 : 8, height: step === i ? 13 : 8, borderRadius:"50%",
                  background: step === i ? "#ff85c8" : step > i ? "#22c987" : "#3a2060",
                  boxShadow: step === i ? "0 0 14px #ff85c8aa" : "none",
                  transition:"all .3s",
                }} />
                <div style={{ fontSize:".55rem", color:"#6050a0", letterSpacing:".5px" }}>{s}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── STEP 0: CITY ── */}
        {step === 0 && (
          <div style={panel}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.65rem", fontWeight:700, background:"linear-gradient(135deg,#fff 55%,#ff85c8)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", marginBottom:4 }}>Where's the magic?</div>
            <div style={{ fontSize:".8rem", color:"#7a5fa0", marginBottom:22 }}>Pick your city for tonight's adventure</div>
            <div style={{ position:"relative" }}>
              <input style={inputStyle} placeholder="Search city..." value={citySearch}
                onChange={e => { setCitySearch(e.target.value); setShowCities(true); }}
                onFocus={() => setShowCities(true)} />
              {showCities && citySearch && (
                <div style={{
                  position:"absolute", top:"calc(100% + 7px)", left:0, right:0,
                  background:"#130a22", border:"1px solid rgba(255,133,200,.28)",
                  borderRadius:12, overflow:"hidden", zIndex:60, maxHeight:190, overflowY:"auto",
                }}>
                  {filteredCities.map(c => (
                    <div key={c} onClick={() => { setCity(c); setCitySearch(c); setShowCities(false); }}
                      style={{ padding:"11px 15px", fontSize:".86rem", cursor:"pointer", borderBottom:"1px solid rgba(255,255,255,.04)" }}
                      onMouseEnter={e => e.currentTarget.style.background="rgba(255,133,200,.12)"}
                      onMouseLeave={e => e.currentTarget.style.background="transparent"}
                    >{c}</div>
                  ))}
                </div>
              )}
            </div>
            {city && (
              <div style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(255,133,200,.1)", border:"1px solid rgba(255,133,200,.35)", borderRadius:100, padding:"7px 15px", marginTop:11, fontSize:".83rem", color:"#ff85c8" }}>
                📍 {city}
              </div>
            )}
            <div style={{ display:"flex", gap:9, marginTop:22 }}>
              <button style={btnNext(!city)} disabled={!city} onClick={() => setStep(1)}>Who's Coming? →</button>
            </div>
          </div>
        )}

        {/* ── STEP 1: GROUP ── */}
        {step === 1 && (
          <div style={panel}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.65rem", fontWeight:700, background:"linear-gradient(135deg,#fff 55%,#ff85c8)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", marginBottom:4 }}>Who's coming?</div>
            <div style={{ fontSize:".8rem", color:"#7a5fa0", marginBottom:22 }}>Select party size — tickets priced accordingly</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:9 }}>
              {GROUP_OPTIONS.map(g => (
                <div key={g.value} onClick={() => setGroupSize(g.value)} style={{
                  background: groupSize === g.value ? "rgba(255,133,200,.1)" : "rgba(255,255,255,.04)",
                  border: groupSize === g.value ? "1px solid #ff85c8" : "1px solid rgba(255,133,200,.12)",
                  borderRadius:16, padding:"15px 10px", textAlign:"center", cursor:"pointer",
                  boxShadow: groupSize === g.value ? "0 0 18px rgba(255,133,200,.18)" : "none",
                  transition:"all .2s",
                }}>
                  <div style={{ fontSize:"1.7rem", marginBottom:5 }}>{g.icon}</div>
                  <div style={{ fontSize:".78rem", color:"#c8a8f0", fontWeight:500 }}>{g.label}</div>
                  <div style={{ fontSize:".67rem", color:"#6a50a0", marginTop:2 }}>{g.value} {g.value === 1 ? "ticket" : "tickets"}</div>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:9, marginTop:22 }}>
              <button onClick={() => setStep(0)} style={{ padding:"13px 18px", background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.07)", color:"#5a4080", borderRadius:13, fontSize:".84rem", cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>←</button>
              <button style={btnNext(false)} onClick={() => setStep(2)}>Set Budget →</button>
            </div>
          </div>
        )}

        {/* ── STEP 2: BUDGET + HOURS ── */}
        {step === 2 && (
          <div style={panel}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.65rem", fontWeight:700, background:"linear-gradient(135deg,#fff 55%,#ff85c8)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", marginBottom:4 }}>Time & Budget</div>
            <div style={{ fontSize:".8rem", color:"#7a5fa0", marginBottom:22 }}>Slide to set your outing length and total spend</div>
            {[
              { label:"Hours Out", val:`${hours}h`, min:2, max:10, step:1, value:hours, pct:((hours-2)/8)*100, marks:["2h","4h","6h","8h","10h"], onChange:v=>setHours(v) },
              { label:"Total Budget", val:`$${budget}`, min:50, max:1000, step:25, value:budget, pct:((budget-50)/950)*100, marks:["$50","$250","$500","$750","$1k"], onChange:v=>setBudget(v) },
            ].map(sl => (
              <div key={sl.label} style={{ marginBottom:26 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:11 }}>
                  <span style={{ fontSize:".76rem", color:"#7060a0", textTransform:"uppercase", letterSpacing:"1.5px" }}>{sl.label}</span>
                  <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.5rem", fontWeight:700, color:"#ff85c8" }}>{sl.val}</span>
                </div>
                <input type="range" min={sl.min} max={sl.max} step={sl.step} value={sl.value}
                  style={{ WebkitAppearance:"none", appearance:"none", width:"100%", height:4,
                    background:`linear-gradient(to right,#ff85c8 ${sl.pct}%,rgba(255,255,255,.1) ${sl.pct}%)`,
                    borderRadius:2, outline:"none", cursor:"pointer" }}
                  onChange={e => sl.onChange(Number(e.target.value))} />
                <div style={{ display:"flex", justifyContent:"space-between", marginTop:5 }}>
                  {sl.marks.map(m => <span key={m} style={{ fontSize:".6rem", color:"#4a3070" }}>{m}</span>)}
                </div>
              </div>
            ))}
            <div style={{ fontSize:".74rem", color:"#4a3070", textAlign:"center" }}>
              ≈ ${Math.round(budget/groupSize)}/person · {groupSize} {groupSize===1?"person":"people"}
            </div>
            <div style={{ display:"flex", gap:9, marginTop:22 }}>
              <button onClick={() => setStep(1)} style={{ padding:"13px 18px", background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.07)", color:"#5a4080", borderRadius:13, fontSize:".84rem", cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>←</button>
              <button style={btnNext(false)} onClick={() => setStep(3)}>Pick Your Vibe →</button>
            </div>
          </div>
        )}

        {/* ── STEP 3: INTERESTS ── */}
        {step === 3 && (
          <div style={panel}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.65rem", fontWeight:700, background:"linear-gradient(135deg,#fff 55%,#ff85c8)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", marginBottom:4 }}>Pick your vibe</div>
            <div style={{ fontSize:".8rem", color:"#7a5fa0", marginBottom:14 }}>Choose 3 — we'll find 2–3 venue options for each stop</div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:13 }}>
              {[0,1,2].map(i => (
                <div key={i} style={{
                  width:27, height:27, borderRadius:"50%",
                  border: selectedInterests[i] ? "1.5px solid #ff85c8" : "1.5px solid rgba(255,133,200,.3)",
                  background: selectedInterests[i] ? "rgba(255,133,200,.18)" : "transparent",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:".68rem", color:"#ff85c8", transition:"all .25s",
                }}>{selectedInterests[i] ? "✓" : i+1}</div>
              ))}
              <span style={{ fontSize:".76rem", color:"#5a4080" }}>{selectedInterests.length}/3 chosen</span>
            </div>
            <div style={{ marginBottom:12 }}>
              <input style={inputStyle} placeholder="Search 100 activities..." value={interestSearch}
                onChange={e => setInterestSearch(e.target.value)} />
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:7, maxHeight:280, overflowY:"auto", paddingRight:2 }}>
              {filteredInterests.map(interest => {
                const on = selectedInterests.includes(interest);
                const disabled = !on && selectedInterests.length >= 3;
                return (
                  <div key={interest} onClick={() => !disabled && toggleInterest(interest)} style={{
                    padding:"6px 13px", borderRadius:100, fontSize:".75rem", cursor: disabled ? "default" : "pointer",
                    border: on ? "1px solid #ff85c8" : "1px solid rgba(255,255,255,.09)",
                    background: on ? "rgba(255,133,200,.18)" : "rgba(255,255,255,.04)",
                    color: on ? "#fff" : disabled ? "#4a3060" : "#b0a0d0",
                    boxShadow: on ? "0 0 10px rgba(255,133,200,.18)" : "none",
                    opacity: disabled ? 0.3 : 1, userSelect:"none", transition:"all .15s",
                  }}>{interest}</div>
                );
              })}
            </div>
            <div style={{ display:"flex", gap:9, marginTop:22 }}>
              <button onClick={() => setStep(2)} style={{ padding:"13px 18px", background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.07)", color:"#5a4080", borderRadius:13, fontSize:".84rem", cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>←</button>
              <button style={btnNext(selectedInterests.length < 3)} disabled={selectedInterests.length < 3} onClick={() => setStep(4)}>Choose Time →</button>
            </div>
          </div>
        )}

        {/* ── STEP 4: TIME SLOT ── */}
        {step === 4 && (
          <div style={panel}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.65rem", fontWeight:700, background:"linear-gradient(135deg,#fff 55%,#ff85c8)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", marginBottom:4 }}>When does it start?</div>
            <div style={{ fontSize:".8rem", color:"#7a5fa0", marginBottom:22 }}>Each stop has 30-min travel buffers built in</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:9 }}>
              {TIME_SLOTS.map(t => (
                <div key={t.label} onClick={() => setTimeSlot(t)} style={{
                  background: timeSlot.label===t.label ? "rgba(255,133,200,.1)" : "rgba(255,255,255,.04)",
                  border: timeSlot.label===t.label ? "1px solid #ff85c8" : "1px solid rgba(255,133,200,.1)",
                  borderRadius:16, padding:"18px 13px", cursor:"pointer",
                  boxShadow: timeSlot.label===t.label ? "0 0 18px rgba(255,133,200,.14)" : "none",
                  textAlign:"center", transition:"all .2s",
                }}>
                  <div style={{ fontSize:"1.5rem", marginBottom:5 }}>{t.icon}</div>
                  <div style={{ fontSize:".8rem", fontWeight:500, color:"#e0c8ff" }}>{t.label}</div>
                  <div style={{ fontSize:".68rem", color:"#6a50a0", marginTop:3 }}>Starts {t.start}</div>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:9, marginTop:26 }}>
              <button onClick={() => setStep(3)} style={{ padding:"13px 18px", background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.07)", color:"#5a4080", borderRadius:13, fontSize:".84rem", cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>←</button>
              <button style={btnNext(false)} onClick={handleGenerate}>✨ Build My Date</button>
            </div>
          </div>
        )}

        {/* ── LOADING ── */}
        {loading && (
          <div style={panel}>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"46px 16px", gap:18, textAlign:"center" }}>
              <div style={{ fontSize:"2.4rem", animation:"ldp 1.1s ease-in-out infinite" }}>💕</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.3rem", color:"#c0a0e8" }}>Curating your perfect date...</div>
              <div style={{ display:"flex", flexDirection:"column", gap:7, width:"100%", textAlign:"left" }}>
                {[`Searching venues near ${city}`, "Finding promo codes & best prices", "Checking live availability & ratings", "Building your timed itinerary"].map((txt, i) => (
                  <div key={i} style={{ fontSize:".74rem", color:"#6a50a0", display:"flex", alignItems:"center", gap:8, animation:`fadeSlide .5s ease ${i*.5}s forwards`, opacity:0 }}>
                    <div style={{ width:6, height:6, borderRadius:"50%", background:"#ff85c8", flexShrink:0, boxShadow:"0 0 8px #ff85c8" }} />{txt}
                  </div>
                ))}
              </div>
              <div style={{ width:220, height:3, background:"rgba(255,255,255,.07)", borderRadius:2, overflow:"hidden" }}>
                <div style={{ height:"100%", background:"linear-gradient(90deg,#ff85c8,#ffcf6b)", borderRadius:2, animation:"ldBar 2.5s ease-in-out forwards" }} />
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 5: MIX & MATCH ── */}
        {step === 5 && stops.length > 0 && !loading && (
          <div style={panel}>
            {!booked ? (
              <>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.65rem", fontWeight:700, background:"linear-gradient(135deg,#fff 55%,#ff85c8)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", marginBottom:4 }}>Your Date ♥</div>
                <div style={{ fontSize:".78rem", color:"#7a5fa0", marginBottom:16 }}>{city} · {timeSlot.label} · {groupSize} {groupSize===1?"person":"people"} · {stops.length} stops</div>

                {/* Summary row */}
                <div style={{ display:"flex", gap:9, marginBottom:16 }}>
                  {[{v:stops.length,l:"Stops"},{v:`${hours}h`,l:"Duration"},{v:`$${totals.perPerson}`,l:"Per Person"}].map(s => (
                    <div key={s.l} style={{ flex:1, background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,133,200,.13)", borderRadius:13, padding:"13px 8px", textAlign:"center" }}>
                      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.3rem", fontWeight:700, color:"#ff85c8" }}>{s.v}</div>
                      <div style={{ fontSize:".6rem", color:"#6a50a0", textTransform:"uppercase", letterSpacing:"1px", marginTop:2 }}>{s.l}</div>
                    </div>
                  ))}
                </div>

                {/* Hint banner */}
                <div style={{
                  background:"rgba(255,207,107,.07)", border:"1px solid rgba(255,207,107,.2)",
                  borderRadius:12, padding:"10px 14px", marginBottom:16,
                  fontSize:".75rem", color:"#b89050", lineHeight:"1.45",
                }}>
                  💡 <strong>Mix & match!</strong> Each stop shows 2–3 real venues with live pricing. Tap any venue to swap it in. Promo codes apply automatically at checkout.
                </div>

                {/* STOP CARDS */}
                {stops.map((stop, i) => (
                  <StopCard key={stop.id} stop={stop} groupSize={groupSize} onSelectVenue={handleSelectVenue} index={i} />
                ))}

                {/* QUOTE */}
                <div style={{
                  background:"linear-gradient(135deg,rgba(120,60,230,.1),rgba(255,133,200,.07))",
                  border:"1px solid rgba(255,133,200,.28)", borderRadius:18,
                  padding:20, margin:"16px 0 8px", textAlign:"center",
                }}>
                  <div style={{ fontSize:".66rem", color:"#8060a0", textTransform:"uppercase", letterSpacing:"2px", marginBottom:4 }}>Your Total Quote</div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2.6rem", fontWeight:700, color:"#ff85c8", lineHeight:1 }}>${totals.grandTotal}</div>
                  <div style={{ fontSize:".78rem", color:"#6a50a0", marginTop:6 }}>
                    ${totals.perPerson}/person · {groupSize} {groupSize===1?"ticket":"tickets"} · all-inclusive
                  </div>
                  {totals.savings > 0 && (
                    <div style={{ display:"inline-block", marginTop:8, background:"rgba(34,201,135,.12)", color:"#22c987", border:"1px solid rgba(34,201,135,.3)", borderRadius:100, padding:"4px 14px", fontSize:".73rem" }}>
                      🏷 Promo codes saving you ${totals.savings} total
                    </div>
                  )}
                  <div style={{ fontSize:".7rem", color:"#4a3070", marginTop:8 }}>1 checkout · all reservations via OpenTable & direct booking</div>
                </div>

                {/* BOOK BUTTONS */}
                <div style={{ display:"flex", flexDirection:"column", gap:9, marginTop:4 }}>
                  <button onClick={handleBook} style={{
                    width:"100%", padding:17, borderRadius:15, border:"none",
                    background:"linear-gradient(135deg,#7c2aed,#ff85c8)",
                    color:"#fff", fontSize:".96rem", fontWeight:700,
                    fontFamily:"'Plus Jakarta Sans',sans-serif", cursor:"pointer",
                    boxShadow:"0 4px 28px rgba(124,42,237,.4)", transition:"all .22s",
                  }}>🎟 Secure All Tickets — ${totals.grandTotal}</button>

                  {[
                    { icon:"💳", text: walletSaved ? "✓ Tickets Added to Digital Wallet" : "Add Tickets to Digital Wallet", ok: walletSaved, fn:()=>setWalletSaved(true) },
                    { icon:"📅", text: calAdded ? "✓ Calendar Reminders Set" : "Add to Calendar & Set Reminders", ok: calAdded, fn:()=>setCalAdded(true) },
                  ].map(b => (
                    <button key={b.text} onClick={b.fn} style={{
                      width:"100%", padding:"14px", borderRadius:14, border: b.ok ? "1px solid #22c987" : "1px solid rgba(255,133,200,.2)",
                      background:"rgba(255,255,255,.05)", color: b.ok ? "#22c987" : "#b898d8",
                      fontSize:".87rem", fontFamily:"'Plus Jakarta Sans',sans-serif", cursor:"pointer",
                    }}>{b.icon} {b.text}</button>
                  ))}

                  <button onClick={handleReset} style={{
                    width:"100%", padding:"13px", borderRadius:14,
                    background:"transparent", border:"1px solid rgba(255,255,255,.07)",
                    color:"#5a4080", fontSize:".82rem", fontFamily:"'Plus Jakarta Sans',sans-serif", cursor:"pointer",
                  }}>↩ Start Over</button>
                </div>
              </>
            ) : (
              <div style={{ textAlign:"center", padding:"10px 0" }}>
                <div style={{ fontSize:"3.2rem", animation:"bbounce .7s ease infinite alternate", marginBottom:14 }}>🎉</div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", marginBottom:8, background:"linear-gradient(135deg,#ff85c8,#ffcf6b)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>You're All Set!</div>
                <div style={{ fontSize:".83rem", color:"#7a5fa0", lineHeight:"1.55" }}>
                  All {stops.length} reservations confirmed. Tickets secured via OpenTable & direct booking. Full itinerary sent to your email.
                </div>
                <div style={{ background:"rgba(34,201,135,.07)", border:"1px solid rgba(34,201,135,.22)", borderRadius:14, padding:"15px 16px", marginTop:18, display:"flex", alignItems:"center", gap:11 }}>
                  <div style={{ fontSize:"1.5rem" }}>💳</div>
                  <div style={{ fontSize:".8rem", color:"#22c987", lineHeight:"1.45" }}>
                    <strong>{stops.length} tickets</strong> in your digital wallet. Movement reminders set with 30-min travel buffers at each stop.
                  </div>
                </div>
                <button onClick={handleReset} style={{
                  width:"100%", marginTop:22, padding:17, borderRadius:15, border:"none",
                  background:"linear-gradient(135deg,#7c2aed,#ff85c8)",
                  color:"#fff", fontSize:".96rem", fontWeight:700,
                  fontFamily:"'Plus Jakarta Sans',sans-serif", cursor:"pointer",
                }}>♥ Plan Another Date</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
