import fs from 'fs';
import * as cheerio from 'cheerio';

const files = ['index.html', 'patient.html', 'consultation.html', 'integrations.html'];

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf-8');
    const $ = cheerio.load(content);
    
    $('a').each(function() {
        const text = $(this).text().trim();
        if (text.includes('Dashboard')) {
            $(this).attr('href', '/index.html');
        } else if (text.includes('Patient Records')) {
            $(this).attr('href', '/patient.html');
        } else if (text.includes('Appointments')) {
            $(this).attr('href', '/consultation.html');
        } else if (text.includes('Integration Hub')) {
            $(this).attr('href', '/integrations.html');
        }
    });

    $('button').each(function() {
        const text = $(this).text().trim();
        if (text.includes('New Consultation')) {
            // we should replace it with an a tag that looks the same
            const className = $(this).attr('class');
            const innerHtml = $(this).html();
            $(this).replaceWith(`<a href="/consultation.html" class="${className}">${innerHtml}</a>`);
        }
    });

    fs.writeFileSync(file, $.html(), 'utf-8');
});
console.log("Nav links properly wired with cheerio.");
