# 💰 Personal Finance Dashboard

A modern, production-level Personal Finance Dashboard built with **React (Vite)**, **Tailwind CSS**, and **Recharts**. Features a clean fintech UI/UX, dark mode support, role-based access, and comprehensive financial analytics.

## ✨ Features

### Core Features
- ✅ **Responsive Design** - Mobile and desktop optimized
- ✅ **Dark Mode** - Class-based Tailwind dark mode with smooth transitions
- ✅ **Role-Based Access** - Viewer and Admin roles with different permissions
- ✅ **Persistent Storage** - All data saved to localStorage
- ✅ **Professional UI** - Clean, modern fintech-style design

### Dashboard Components

#### 1. **Navbar**
- Fixed top navigation bar with smooth transitions
- App branding with gradient icon
- Role toggle dropdown (Viewer/Admin)
- Dark mode toggle with theme persistence
- Responsive mobile menu

#### 2. **Summary Cards**
- Total Balance card with trend indicator
- Total Income card with percentage change
- Total Expenses card with percentage change
- Hover animations and gradient styling
- Real-time calculations from transactions

#### 3. **Charts Section**
- **Line Chart**: Balance trend over last 30 days with animations
- **Pie Chart**: Expense breakdown by category with color coding
- **Recharts Integration**: Fully responsive and interactive
- Tooltips and legends on hover
- Dark mode compatible charts

#### 4. **Transactions Section**
- Full transaction history with search functionality
- Filter by transaction type (Income/Expense)
- Filter by category
- Color-coded transaction badges
- Category icons for visual clarity
- Admin: Delete transactions button
- Responsive table view

#### 5. **Insights Section**
- **Highest Spending**: Top expense category
- **Monthly Spending**: Comparison with percentage change
- **Savings Rate**: Percentage of income saved
- Card-based analytics with icons

#### 6. **Add Transaction Modal** (Admin Only)
- Modal form with smooth animations
- Type selection (Income/Expense)
- Dynamic category selection based on type
- Form validation with error messages
- Date picker with default current date
- Amount input with currency symbol

#### 7. **Role-Based Features**
- **Viewer Mode**: View-only access to all data
- **Admin Mode**: Full access plus ability to add and delete transactions

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.4
- **Build Tool**: Vite 8.0.1
- **Styling**: Tailwind CSS 3.4.1
- **Charts**: Recharts 2.x
- **Icons**: Lucide React, React Icons
- **State Management**: React Hooks (useState, useEffect)
- **Storage**: localStorage API
- **PostCSS**: For CSS processing

## 📁 Project Structure

```
finance-dashboard/
├── public/                    # Static assets
├── screenshots/               # UI screenshots and demos
├── src/
│   ├── components/            # React components
│   │   ├── Navbar.jsx          # Navigation bar with theme toggle
│   │   ├── SummaryCards.jsx    # Dashboard summary cards
│   │   ├── Charts.jsx          # Line and pie charts
│   │   ├── Transactions.jsx    # Transaction list with filters and actions
│   │   ├── Insights.jsx        # Analytics and insights cards
│   │   ├── AddTransactionModal.jsx   # Add transaction form
│   │   ├── EditTransactionModal.jsx  # Edit transaction form
│   │   └── DeleteConfirmationModal.jsx # Delete confirmation dialog
│   ├── utils/                 # Utility functions
│   │   ├── categoryIcons.js   # Icon mapping for categories
│   │   └── sampleData.js      # Sample transaction data
│   ├── App.jsx                # Main application component
│   ├── main.jsx               # React entry point
│   ├── App.css                # Additional component styles
│   └── index.css              # Global styles (Tailwind)
├── index.html                 # HTML entry point
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
├── eslint.config.js           # ESLint configuration
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ (npm or yarn)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open in browser**
   - Navigate to `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

Optimized files will be output to the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📊 Sample Data

The dashboard comes pre-loaded with 12 sample transactions covering:
- Income: Salary, Freelance, Investment
- Expenses: Food, Transport, Shopping, Entertainment, Utilities, Healthcare, Education, Travel

All data is stored in localStorage and persists across sessions.

## 🎨 Styling

### Tailwind CSS Features
- **Dark Mode**: Class-based implementation (`dark:` prefix)
- **Responsive**: Mobile-first design with breakpoints
- **Custom Colors**: Gradient backgrounds and accent colors
- **Animations**: Smooth transitions, hover effects, scale animations
- **Spacing**: Consistent padding and margins

### Dark Mode
Toggle dark mode using the moon/sun icon in the navbar. Theme preference is saved to localStorage.

## 👥 Role-Based Features

### Viewer Mode
- View all summary cards
- View charts and Analytics
- View transaction history
- Filter and search transactions
- **No edit/delete permissions**

### Admin Mode
- All Viewer features +
- "+ Add Transaction" button in navbar
- Add new income/expense transactions
- Delete transactions
- Modal form for transaction entry

## 💾 Data Persistence

- **Transactions**: Stored in localStorage under `transactions` key
- **Theme**: Dark mode preference stored under `darkMode` key
- **Role**: User role stored under `userRole` key

To reset data, clear browser localStorage.

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (single column)
- **Tablet**: 640px - 1024px (2 columns)
- **Desktop**: > 1024px (3 columns for cards)

## 🔧 Configuration

### Tailwind Configuration
```javascript
// tailwind.config.js
- Content paths configured for HTML and JSX files
- Dark mode enabled with class strategy
- Extended theme with custom colors
```

### Vite Configuration
```javascript
// vite.config.js
- React plugin enabled for JSX transformation
- HMR for hot module replacement in development
```

## 📚 Component APIs

### Navbar Component
```jsx
<Navbar 
  darkMode={boolean}
  setDarkMode={function}
  role={string}
  setRole={function}
/>
```

### SummaryCards Component
```jsx
<SummaryCards transactions={array} />
```

### Charts Component
```jsx
<Charts 
  transactions={array}
  darkMode={boolean}
/>
```

### Transactions Component
```jsx
<Transactions 
  transactions={array}
  onDeleteTransaction={function}
  role={string}
/>
```

### AddTransactionModal Component
```jsx
<AddTransactionModal 
  isOpen={boolean}
  onClose={function}
  onAddTransaction={function}
/>
```

## 🎯 Category List

### Income Categories
- Salary
- Freelance
- Investment
- Bonus
- Other Income

### Expense Categories
- Food & Dining
- Transportation
- Shopping
- Entertainment
- Utilities
- Healthcare
- Education
- Travel
- Other Expense

## 🌟 Key Highlights

✨ **Professional Fintech Design**
- Modern glassmorphism cards
- Smooth gradient backgrounds
- Micro-interactions and animations

📈 **Real-time Analytics**
- Automatic calculations from transaction data
- Trend analysis over 30 days
- Category-wise expense breakdown

🎯 **User Experience**
- Smooth dark/light theme transitions
- Responsive design for all devices
- Empty state handling
- Form validation with error messages

🔒 **Data Security**
- All data stored locally (no server involved)
- Role-based access control
- Data persistence across sessions

## 🚦 Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Tips & Usage

1. **Add Sample Transactions**: Click "+ Add Transaction" button (Admin mode only)
2. **Switch Roles**: Click dropdown next to dark mode toggle
3. **Filter Transactions**: Use search bar and category filters
4. **Switch Theme**: Click moon/sun icon to toggle dark mode
5. **Export Data**: Manually copy localStorage data as needed

## 🐛 Troubleshooting

### App not loading?
- Clear browser cache and localStorage
- Ensure Node.js 16+ is installed
- Try `npm install` again

### Styles not applying?
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Restart dev server: `npm run dev`

### Dark mode not working?
- Check browser dark mode support
- Clear localStorage and refresh

## 📦 Dependencies

```json
{
  "react": "^19.2.4",
  "react-dom": "^19.2.4",
  "recharts": "^2.x.x",
  "lucide-react": "^latest",
  "react-icons": "^latest",
  "tailwindcss": "^3.4.1",
  "vite": "^8.0.1"
}
```

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Recharts Examples](https://recharts.org)
- [Lucide React Icons](https://lucide.dev)

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ as a production-ready Finance Dashboard**

For questions or suggestions, feel free to contribute or open an issue!
