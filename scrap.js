// npm i axios tough-cookie axios-cookiejar-support cheerio axios-retry p-limi
const PORT = 8080;

import axios from 'axios';
import { load } from 'cheerio';
import express from 'express';


import fetch from 'node-fetch'; // You might need to install this if using an older Node version

const mobileUserAgent = 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36';

async function scrapeMobile(url) {
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': mobileUserAgent,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8', // Add other relevant headers
                'Accept-Encoding': 'gzip, deflate, br'
            }
        });
        const data = await response.text();
        console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const app = express();
app.listen(PORT, () => console.log('server running on PORT ${PORT}'));

const url = "https://www.theverge.com/";

axios(url)
    .then(response => {
        const html = response.data;
        const $ = load(html);
        const headlines = [];

        console.log(html);

        $('._1lkmsmo0', html).each(function () {
            const title = $(this).text();
            const url = $(this).find('a').attr('href');
            headlines.push({
                title,
                url
            })
            console.log(headlines);
        })
    })
    .catch(err => console.log(err));