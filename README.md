# Budget Tracker for Trello

A Trello Power-Up that enables card-level, list-level, and board-level budget tracking with visual indicators and detailed reporting.

## Features

### Card-Level Budget Management
- Set allocated and spent amounts for each card
- Color-coded badges showing budget status
- Progress bars and percentage indicators
- Notes field for budget descriptions

### List-Level Budget Summary
- View total allocated and spent amounts per list
- See all cards with budgets in a list
- Track budget utilization percentage

### Board-Level Budget Dashboard
- Overview of all budgets across the board
- Summary statistics (total allocated, spent, remaining, card count)
- Visual progress indicators
- Budget breakdown by list
- Export budget data as CSV

### Settings
- Configure currency (USD, EUR, GBP)
- Set default allocated amounts
- Email notification preferences

## Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Server
```bash
npm start
```
This will start a local server on `http://localhost:8080`

### 3. Enable Power-Up in Trello

1. Go to your Trello board
2. Click "Show Menu" → "Power-Ups"
3. Scroll down and click "Custom Power-Ups"
4. Click "New Power-Up"
5. Enter the Power-Up details:
   - **Name**: Budget Tracker
   - **Iframe connector URL**: `http://localhost:8080/index.html`
6. Click "Save"

### 4. For Production Deployment

You'll need to:
1. Host the files on a public HTTPS server
2. Update the manifest connector URL to your production URL
3. Register the Power-Up on the Trello Power-Up admin portal

## File Structure

```
card-budget-trello/
├── css/
│   └── styles.css          # All styling
├── images/
│   └── icon.png            # Power-Up icon
├── js/
│   └── client.js           # Main Power-Up logic
├── views/
│   ├── card-budget.html    # Card budget popup
│   ├── budget-details.html # Budget details view
│   ├── list-budget.html    # List budget summary
│   ├── board-budget.html   # Board dashboard
│   └── settings.html       # Settings panel
├── index.html              # Main connector
├── manifest.json           # Power-Up manifest
└── package.json            # Dependencies
```

## Usage

### Setting a Card Budget
1. Open any card
2. Click "Set Budget" button
3. Enter allocated and spent amounts
4. Add optional notes
5. Click "Save"

### Viewing List Budget
1. Click on the list menu (three dots)
2. Select "View List Budget"
3. See summary and all cards with budgets

### Board Budget Dashboard
1. Click "Board Budget" button in the board header
2. View overall statistics
3. See budget breakdown by list
4. Export data as CSV

### Settings
1. Click "Settings" in the Power-Up menu
2. Configure currency and preferences
3. Click "Save Settings"

## Color Coding

- **Green**: 0-50% of budget spent
- **Yellow**: 50-80% of budget spent
- **Orange**: 80-100% of budget spent
- **Red**: Over 100% (budget exceeded)

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Development

To make changes:
1. Edit files in their respective directories
2. Refresh your Trello board to see changes
3. For production, ensure all URLs are HTTPS

## Future Enhancements

- Transaction logging (premium feature)
- Advanced reporting and analytics
- Slack integration for alerts
- Budget templates
- Multi-user permissions
- Time-based analysis

## Support

For issues or questions, please refer to the [Trello Power-Up documentation](https://developer.atlassian.com/cloud/trello/power-ups/).

## License

MIT
