# App

I'll discuss some of my angular application design choices here. 

## Design Overview
Like any Angular application, this project have two major components, **component** and **service**, to seperate the logic of manipulating components themselves with the retriving data from backend endpoints / local storages

## Design Details
```
App <br>
├── Components 
│  ├── navbar
│  ├── search
│  │   ├── search-bar 
│  │   └── search-result
│  │       ├── tab-summary
│  │       ├── tab-charts
│  │       ├── tab-news
│  │       └── tab-insights
│  ├── watchlist
│  ├── portfolio
│  ├── transaction-model
│  └── watchlist
└── Services
   ├── balance-local-storage
   ├── portfolio-local-storage
   ├── ticker-auto-complete-api
   ├── ticker-search-api
   └── watchlist-local-storage
```
## App Routing
```
App
├── "", redirect to "/search/home"
├── "/search"
│  ├── "home": home page with search bar
│  └── ":ticker": detailed page with search result
├── "watchlist": watchlist tab
├── "portfolio": portfolio tab
└── "/*/*": wildcard to display error
```
