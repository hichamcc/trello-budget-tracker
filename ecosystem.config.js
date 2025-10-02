module.exports = {
  apps: [{
    name: 'trello-budget-tracker',
    script: 'npx',
    args: 'http-server -p 3001 -c-1 --cors',
    cwd: '/var/www/card-budget-trello',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
