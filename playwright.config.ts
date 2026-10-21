import { devices, PlaywrightTestConfig } from '@playwright/test';
import process from 'node:process';
import "dotenv/config"

const baseURL = process.env.BASE_URL?.trim();

const config: PlaywrightTestConfig = {
    testDir: "./tests",
    testMatch: "**/*.test.ts",
    use: {
        baseURL: baseURL,
        headless: false,
        //actionTimeout: 10000,
        screenshot: "only-on-failure",
        video: "on",
        trace: "on-first-retry",
    },
    projects: [
        {
            name: "chromium",
            use: {
                ...devices['Desktop Chrome']
            }
        },
    ],
    retries: 0,
    workers: 1,
    fullyParallel: true,
    reporter: [
        ['list'],
        ['html', {
            outputFolder: "./Test-Reports/html",
            open:'never'
        }],
        ['json', {
            outputFile: "./Test-Reports/result.json",
            open:'never'
        }]
    ],
    outputDir: "./test-results"
};

export default config;