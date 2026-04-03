import fs from 'fs';

const files = ['index.html', 'patient.html', 'consultation.html', 'integrations.html'];

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf-8');
    
    // Replace nav links
    content = content.replace(/href="#"([\s\S]*?>dashboard<\/span>[\s\S]*?>Dashboard<\/span>)/g, 'href="/"$1');
    content = content.replace(/href="#"([\s\S]*?>patient_list<\/span>[\s\S]*?>Patient Records<\/span>)/g, 'href="/patient.html"$1');
    content = content.replace(/href="#"([\s\S]*?>hub<\/span>[\s\S]*?>Integration Hub<\/span>)/g, 'href="/integrations.html"$1');
    
    // New consultation button (changing to anchor tag for routing)
    content = content.replace(/<button([^>]*>[\s\S]*?>add_circle<\/span>[\s\S]*?New Consultation[\s\S]*?)<\/button>/g, '<a href="/consultation.html"$1</a>');

    fs.writeFileSync(file, content, 'utf-8');
});
console.log("Links replaced.");
