const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');

try {
    const topCategories = JSON.parse(fs.readFileSync(path.join(dataDir, 'topCategories.json'), 'utf8'));
    const categories = JSON.parse(fs.readFileSync(path.join(dataDir, 'categories.json'), 'utf8'));
    const links = JSON.parse(fs.readFileSync(path.join(dataDir, 'links.json'), 'utf8'));

    console.log(`Loaded ${topCategories.length} top categories, ${categories.length} categories, and ${links.length} links.`);

    const topCategoryIds = new Set(topCategories.map(tc => tc.id));
    const categoryIds = new Set(categories.map(c => c.id));

    let errors = [];

    // Check categories
    categories.forEach(cat => {
        if (!topCategoryIds.has(cat.topCategoryId)) {
            errors.push(`Category '${cat.name}' (${cat.id}) references unknown topCategoryId '${cat.topCategoryId}'`);
        }
    });

    // Check links
    links.forEach(link => {
        if (!categoryIds.has(link.categoryId)) {
            errors.push(`Link '${link.title}' (${link.id}) references unknown categoryId '${link.categoryId}'`);
        }
    });

    if (errors.length > 0) {
        console.error('Validation FAILED with errors:');
        errors.forEach(err => console.error(`- ${err}`));
        process.exit(1);
    } else {
        console.log('Validation PASSED: All references are valid.');
    }

} catch (err) {
    console.error('Error reading or parsing data files:', err.message);
    process.exit(1);
}
