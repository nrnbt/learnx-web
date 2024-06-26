module.exports = {
    apps: [
      {
        name: "learnx-web",
        script: "node_modules/next/dist/bin/next",
        args: "start",
        instances: "max",
        exec_mode: "cluster",
        env: {
          NODE_ENV: "production",
          PORT: 3001
        },
        env_development: {
          NODE_ENV: "development",
          PORT: 3000
        }
      }
    ]
  };
  