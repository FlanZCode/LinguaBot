const fs = require('fs');
const axios = require('axios');

async function getContributors(repo) {
    try {
        const url = `https://api.github.com/repos/${repo}/contributors`;
        const response = await axios.get(url);
        return response.data.map(contributor => ({
            avatar_url: contributor.avatar_url,
            html_url: contributor.html_url
        }));
    } catch (error) {
        console.error('Error fetching contributors:', error);
        return [];
    }
}

async function updateReadme(contributors) {
    try {
        let readme = fs.readFileSync('README.md', 'utf8');
        const contributorsSection = '## Credits 🙏\n' + contributors.map(contributor => 
            `<a href="${contributor.html_url}"><img src="${contributor.avatar_url}&s=40" width="40" height="40" style="border-radius:50%;"></a>`
        ).join('\n');

        readme = readme.replace(/## Credits 🙏\n[\s\S]*?(?=\n##|$)/, contributorsSection);

        fs.writeFileSync('README.md', readme);
    } catch (error) {
        console.error('Error updating README:', error);
    }
}

(async () => {
    const repo = 'FlanZCode/LinguaBot';
    const contributors = await getContributors(repo);
    await updateReadme(contributors);
})();
