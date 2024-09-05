module.exports = {
    apps: [
        {
            name: 'public',
            script: 'bun',
            args: 'run dev',
            cwd: './public-site',
            env: {
                NODE_ENV: 'development',
                PORT: 3010
            }
        },
        {
            name: 'dashboard',
            script: 'bun',
            args: 'run dev',
            cwd: './dashboard-site',
            env: {
                NODE_ENV: 'development',
                PORT: 3011
            }
        },
        {
            name: 'admin',
            script: 'bun',
            args: 'run dev',
            cwd: './admin-site',
            env: {
                NODE_ENV: 'development',
                PORT: 3012
            }
        },
    ]
};
