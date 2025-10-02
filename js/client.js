/* Budget Tracker Power-Up Client */

// Initialize the Power-Up
window.TrelloPowerUp.initialize({
  // Card Badges - Display budget status on card front
  'card-badges': function(t, options) {
    return t.card('id')
      .get('id')
      .then(function(cardId) {
        return t.get(cardId, 'shared', 'budget');
      })
      .then(function(budget) {
        if (!budget) return [];

        const allocated = parseFloat(budget.allocated) || 0;
        const spent = parseFloat(budget.spent) || 0;
        const percentage = allocated > 0 ? (spent / allocated) * 100 : 0;

        let color = 'green';
        if (percentage > 100) color = 'red';
        else if (percentage >= 80) color = 'orange';
        else if (percentage >= 50) color = 'yellow';

        return [{
          text: `$${spent.toFixed(0)}/$${allocated.toFixed(0)}`,
          color: color,
          icon: './images/icon.png'
        }];
      });
  },

  // Card Detail Badges - Expanded view on card back
  'card-detail-badges': function(t, options) {
    return t.card('id')
      .get('id')
      .then(function(cardId) {
        return t.get(cardId, 'shared', 'budget');
      })
      .then(function(budget) {
        if (!budget) return [];

        const allocated = parseFloat(budget.allocated) || 0;
        const spent = parseFloat(budget.spent) || 0;
        const remaining = allocated - spent;
        const percentage = allocated > 0 ? (spent / allocated) * 100 : 0;

        let color = 'green';
        if (percentage > 100) color = 'red';
        else if (percentage >= 80) color = 'orange';
        else if (percentage >= 50) color = 'yellow';

        return [{
          title: 'Budget',
          text: `${percentage.toFixed(1)}% used | $${remaining.toFixed(2)} remaining`,
          color: color,
          callback: function(t) {
            return t.popup({
              title: 'Budget Details',
              url: './views/budget-details.html',
              height: 300
            });
          }
        }];
      });
  },

  // Card Buttons - Add button to set/edit budget
  'card-buttons': function(t, options) {
    return [{
      icon: './images/icon.png',
      text: 'Set Budget',
      callback: function(t) {
        return t.popup({
          title: 'Card Budget',
          url: './views/card-budget.html',
          height: 380
        });
      }
    }];
  },

  // List Actions - View list budget summary
  'list-actions': function(t, options) {
    return [{
      text: 'View List Budget',
      callback: function(t) {
        return t.popup({
          title: 'List Budget Summary',
          url: './views/list-budget.html',
          height: 350
        });
      }
    }];
  },

  // Board Buttons - Board-level budget dashboard
  'board-buttons': function(t, options) {
    return [{
      icon: './images/icon.png',
      text: 'Board Budget',
      callback: function(t) {
        return t.popup({
          title: 'Board Budget Dashboard',
          url: './views/board-budget.html',
          height: 400
        });
      }
    }];
  },

  // Settings
  'show-settings': function(t, options) {
    return t.popup({
      title: 'Budget Tracker Settings',
      url: './views/settings.html',
      height: 300
    });
  }
});

// Utility Functions
window.BudgetUtils = {
  // Get budget status color
  getStatusColor: function(allocated, spent) {
    const percentage = allocated > 0 ? (spent / allocated) * 100 : 0;
    if (percentage > 100) return 'red';
    if (percentage >= 80) return 'orange';
    if (percentage >= 50) return 'yellow';
    return 'green';
  },

  // Format currency
  formatCurrency: function(amount, currency = 'USD') {
    const symbols = {
      'USD': '$',
      'EUR': '€',
      'GBP': '£'
    };
    return `${symbols[currency] || '$'}${parseFloat(amount).toFixed(2)}`;
  },

  // Get all cards with budgets from a list
  getListBudgets: function(t, listId) {
    return t.cards('id', 'name')
      .then(function(cards) {
        const cardsInList = cards.filter(card => card.list === listId);
        const promises = cardsInList.map(function(card) {
          return t.get(card.id, 'shared', 'budget')
            .then(function(budget) {
              return { card: card, budget: budget };
            });
        });
        return Promise.all(promises);
      });
  },

  // Get all cards with budgets from the board
  getBoardBudgets: function(t) {
    return t.cards('all')
      .then(function(cards) {
        const promises = cards.map(function(card) {
          return t.get(card.id, 'shared', 'budget')
            .then(function(budget) {
              return {
                card: card,
                budget: budget
              };
            });
        });
        return Promise.all(promises);
      });
  },

  // Calculate totals
  calculateTotals: function(budgetCards) {
    return budgetCards.reduce(function(totals, item) {
      if (item.budget) {
        totals.allocated += parseFloat(item.budget.allocated) || 0;
        totals.spent += parseFloat(item.budget.spent) || 0;
        totals.count += 1;
      }
      return totals;
    }, { allocated: 0, spent: 0, count: 0 });
  }
};
