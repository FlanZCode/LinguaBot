const fs = require('fs');
const axios = require('axios');

async function getContributors(repo) {
    try {
        const url = `https://api.github.com/repos/${repo}/contributors`;
        const response = await axios.get(url);
        return response.data.map(contributor => ({
            avatar_url: contributor.avatar_url,
            html_url: contributor.html_url,
            login: contributor.login
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
            `<div style="text-align: center; margin: 10px;">
                <a href="${contributor.html_url}">
                    <img src="${contributor.avatar_url}&s=60" width="60" height="60">
                    <br>
                    <span>${contributor.login}</span>
                </a>
            </div>`
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
