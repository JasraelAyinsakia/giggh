# CUSTOMER FLOW - Viewing & Booking Performers

## 🎯 Complete Customer Journey

### 1. **Entry Points** (How customers find performers)

#### A. **Home Page** (`/`)
- **Hero Section**: Large search bar + "Browse All Performers" button
- **Category Cards**: Quick access to Musicians, Dancers, Comedians
- **Featured Performers Carousel**: Top-rated performers showcase
- **Trust Indicators**: Builds confidence (500+ events, 4.7 rating)

#### B. **Navigation Bar**
- "Browse Performers" link (always visible)
- Search icon (quick search)

#### C. **Footer**
- "Browse Performers" link
- "Join as Performer" (for performers, not customers)

---

### 2. **Browse Page** (`/browse`) - Main Discovery Hub

#### **Layout:**
```
┌─────────────────────────────────────────────────┐
│  Header: "Browse Performers" + Search + Filters  │
├──────────────┬──────────────────────────────────┤
│              │  Sort & View Toggle               │
│  FILTER      │  ┌──────────────────────────────┐ │
│  SIDEBAR     │  │  Performer Cards (Grid/List) │ │
│              │  │                              │ │
│  - Category  │  │  [Card] [Card] [Card]        │ │
│  - Sub-Cat   │  │  [Card] [Card] [Card]        │ │
│  - Price     │  │  [Card] [Card] [Card]        │ │
│  - Location  │  │                              │ │
│  - Rating    │  └──────────────────────────────┘ │
│              │  Pagination (if needed)           │
└──────────────┴──────────────────────────────────┘
```

#### **Features:**
- ✅ **Filter Sidebar** (left on desktop, slide-out on mobile)
  - Category (Musicians, Dancers, Comedians)
  - Sub-Category (dynamic based on category)
  - Price Tier (Basic, Standard, Premium)
  - Location (Accra areas)
  - Minimum Rating (4.5+, 4.0+, etc.)

- ✅ **Search Bar** (top)
  - Real-time search by name, category
  - Autocomplete dropdown with results

- ✅ **Sort Options**
  - Rating (highest first)
  - Price: Low to High
  - Price: High to Low
  - Experience (most years)
  - Recent (newest first)

- ✅ **View Modes**
  - Grid view (3 columns on desktop)
  - List view (detailed horizontal cards)

- ✅ **Performer Cards** show:
  - Profile photo
  - Name
  - Category & Sub-category
  - Price tier badge
  - Star rating + review count
  - Years of experience
  - Location
  - Price (GH₵)
  - "View Profile" button

---

### 3. **Performer Profile Page** (`/performer/:id`)

#### **What customers see:**
- Large profile photo
- Name, category, sub-category
- Price tier badge + exact price
- Star rating with review count
- Years of experience
- Location/areas served
- Bio/description
- **2-3 embedded YouTube videos** (key feature!)
- Skills/specialties tags
- **"Book Now" button** (prominent orange)
- **Reviews section**:
  - Customer name
  - Star rating
  - Date
  - Written review
  - Event type

---

### 4. **Booking Flow**

1. Customer clicks **"Book Now"** on profile
2. **Booking Modal** opens with form:
   - Customer name
   - Phone number
   - Email
   - Event type (Birthday, Wedding, etc.)
   - Event date (future dates only)
   - Event location
   - Event duration (hours)
   - Budget/preferred price tier
   - Additional details
3. Submit → Success message
4. Note: "GigGH team will contact you within 24 hours"

---

## 🎨 Design Principles

### **Visual Hierarchy:**
1. **Search & Filters** - Easy to find, prominent
2. **Performer Cards** - Eye-catching, informative
3. **Clear CTAs** - "View Profile", "Book Now" buttons
4. **Trust Signals** - Ratings, reviews, experience

### **Mobile-First:**
- Filters slide out on mobile
- Grid becomes single column
- Touch-friendly buttons
- Swipe-friendly carousel

### **User Experience:**
- **Fast Loading** - Optimized images, lazy loading
- **Clear Navigation** - Breadcrumbs, back buttons
- **Empty States** - Helpful messages when no results
- **Loading States** - Skeleton screens while loading
- **Error Handling** - Friendly error messages

---

## 📱 Customer Access Points Summary

| Entry Point | Purpose | Destination |
|------------|---------|-------------|
| Home Hero Search | Quick search | Browse page with results |
| Home "Browse All" | See all performers | Browse page |
| Home Category Cards | Filter by category | Browse page (filtered) |
| Home Featured Carousel | See top performers | Performer profile |
| Navbar "Browse Performers" | Main navigation | Browse page |
| Navbar Search Icon | Quick search | Browse page with results |
| Footer Links | Secondary navigation | Browse page |

---

## 🔄 Complete Flow Diagram

```
Customer Lands on Home
         │
         ├─→ Search → Browse (filtered) → Profile → Book
         │
         ├─→ Click Category → Browse (filtered) → Profile → Book
         │
         ├─→ Click Featured → Profile → Book
         │
         └─→ Click "Browse All" → Browse (all) → Filter/Sort → Profile → Book
```

---

## ✨ Enhanced Features (Current Implementation)

✅ **Real-time Search** - As you type, see results
✅ **URL Query Params** - Shareable filtered links (`/browse?category=Musicians`)
✅ **Responsive Design** - Works on all devices
✅ **Smooth Animations** - Hover effects, transitions
✅ **Empty States** - Helpful when no results
✅ **Filter Persistence** - Filters stay active
✅ **Sort & View Toggle** - User preference

---

## 🚀 Future Enhancements (Phase 5)

- Saved favorites/bookmarks
- Recently viewed performers
- "Similar performers" suggestions
- Advanced filters (availability, verified badge)
- Comparison tool (compare 2-3 performers)
- Map view (see performers on map)
- Price range slider
- Multiple location selection

