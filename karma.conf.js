process.env.CHROME_BIN = require('puppeteer').executablePath();
// process.env.FIREFOX_BIN = require("puppeteer-firefox").executablePath();

module.exports = function (config) {
    config.set({
        basePath: './',
        frameworks: ['jasmine', 'karma-typescript'],
        files: [
            'spec/**/*.spec.ts',
            { pattern: 'dist/**/*.js', included: false },
        ],
        preprocessors: {
            '**/*.spec.ts': 'karma-typescript',
        },
        browsers: ['Chrome'],
        reporters: ['spec'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        singleRun: false,
        concurrency: Infinity,
        client: {
            captureConsole: true,
        },
        karmaTypescriptConfig: {
            compilerOptions: {
                baseUrl: '.',
                module: 'commonjs',
                sourceMap: true,
                target: 'ES5',
                rootDir: './spec',
                paths: {
                    rxjs: ['./node_modules/rxjs/*'],
                    '.rxjs-element-observer': ['./dist/cjs'],
                },
            },
            include: ['./**/*.spec.ts'],
            exclude: ['node_modules'],
        },
    });
};
