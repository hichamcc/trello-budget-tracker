# Budget Tracker for Trello - Feature Specification

## Overview
A Trello Power-Up that enables card-level, list-level, and board-level budget tracking with visual indicators and detailed reporting.

---

## Core Features

### 1. Card-Level Budget Management
- **Set Budget Button**: Add button to card that opens budget popup
- **Budget Fields**:
  - Allocated amount (dollars)
  - Spent amount (dollars)
  - Notes/description field
  - Last updated timestamp
- **Card Badge**: Display budget status on card front
  - Format: `$spent/$allocated`
  - Color coding:
    - Green: 0-50% spent
    - Yellow: 50-80% spent
    - Orange: 80-100% spent
    - Red: >100% spent
- **Detailed Badge**: Expanded view on card back showing percentage and remaining budget
- **Progress Bar**: Visual indicator of budget usage

### 2. List-Level Budget Summary
- **List Action Button**: "View List Budget" button in list menu
- **Summary Display**:
  - Total allocated across all cards in list
  - Total spent across all cards in list
  - Number of cards with budgets
  - Percentage of budget used
  - List of cards with individual budgets

### 3. Board-Level Budget Dashboard
- **Board Button**: "Board Budget" button in board header
- **Dashboard Components**:
  - **Summary Cards**:
    - Total allocated (all cards)
    - Total spent (all cards)
    - Total remaining
    - Number of cards tracked
  - **Visual Progress Bar**: Large progress indicator showing overall budget usage
  - **Card List**: Scrollable list of all cards with budgets showing:
    - Card name
    - Allocated vs spent
    - Status indicator (color dot)
    - Click to navigate to card
  - **List Breakdown**: Budget totals grouped by list
  - **Export Button**: Download budget report as CSV

### 4. Budget Transactions (Optional Premium Feature)
- **Transaction Log**: Record individual expenses against a card
- **Transaction Fields**:
  - Amount
  - Description
  - Date
  - Added by (user)
- **Auto-update**: Transactions automatically update card's "spent" amount
- **Transaction History**: View all transactions for a card

### 5. Settings & Configuration
- **Currency Selection**: USD, EUR, GBP, etc.
- **Default Values**: Set default allocated amount for new cards
- **Notifications**:
  - Email alert when budget reaches 80%
  - Email alert when budget exceeded
  - Slack integration for alerts
- **Budget Templates**: Save budget presets for common card types

### 6. Reporting & Analytics
- **Budget Reports**:
  - Budget variance report (planned vs actual)
  - Cards over budget
  - Cards under budget
  - Budget utilization rate
- **Time-based Analysis**:
  - Budget spent this week/month
  - Spending trends over time
- **Export Options**:
  - CSV export
  - PDF report generation
  - Google Sheets sync

### 7. Permissions & Access Control
- **View-Only Mode**: Some users can view budgets but not edit
- **Admin Controls**: Workspace admin can lock budgets after approval
- **Audit Log**: Track who changed what budget and when

---

## User Interface Components

### Popup Windows
1. **Card Budget Popup** (250px height)
   - Input fields for allocated/spent
   - Notes textarea
   - Save/Cancel buttons
   - Real-time remaining calculation

2. **Budget Details Popup** (300px height)
   - Current budget overview
   - Transaction list (if enabled)
   - Add transaction button
   - Edit budget button

3. **Board Budget Dashboard** (400px height)
   - Summary statistics
   - Progress visualization
   - Card list with filters
   - Export options

4. **List Budget Popup** (350px height)
   - List total summary
   - Card-by-card breakdown
   - Quick edit capabilities

5. **Settings Panel** (300px height)
   - Currency selector
   - Notification preferences
   - Template management
   - Subscription status

---

## Technical Requirements

### Data Storage
- **Trello Data Storage**: Store budget data in Trello's card data (for basic features)
- **Backend Database**: For advanced features (transactions, analytics)
  - PostgreSQL database
  - Tables: workspaces, budgets, transactions, settings

### API Endpoints
```
POST   /api/budget              - Create/update budget
GET    /api/budget/card/:id     - Get card budget
GET    /api/budget/board/:id    - Get board summary
GET    /api/budget/list/:id     - Get list summary
POST   /api/transaction          - Add transaction
GET    /api/transactions/:id     - Get card transactions
GET    /api/report/board/:id     - Generate report
POST   /api/settings             - Save user settings
```

### Authentication
- OAuth 2.0 with Trello
- Secure token storage
- Rate limiting on API calls


## Visual Design Guidelines

### Colors
- Primary: #0079bf (Trello blue)
- Success: #61bd4f (green)
- Warning: #f2d600 (yellow)
- Caution: #ff9f1a (orange)
- Danger: #eb5a46 (red)
- Neutral: #f4f5f7 (light gray)

### Typography
- Font: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto
- Sizes: 12px (small), 14px (body), 16px (subheading), 20px+ (heading)

### Icons
- Budget: Dollar sign or wallet icon
- Progress: Horizontal bar with fill
- Status: Colored dot indicators
- Actions: Standard Trello icon style

---

## Support & Documentation

### Help Resources
- In-app tooltip system
- Video tutorial (3 minutes)
- Written documentation site
- FAQ page
- Email support (support@budgettracker.app)

### Marketing Copy
**Tagline**: "Never go over budget again. Track every dollar, right in Trello."

**Value Props**:
- See budget status at a glance with color-coded badges
- Board-wide budget tracking in one dashboard
- Know exactly where your project budget stands
- Stop budget overruns before they happen