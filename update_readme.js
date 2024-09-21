const fs = require('fs');
const axios = require('axios');

async function getContributors(repo) {
    try {
        const url = `https://api.github.com/repos/${repo}/contributors`;
        const response = await axios.get(url);
        return response.data.map(contributor => contributor.login);
    } catch (error) {
        console.error('Error fetching contributors:', error);
        return [];
    }
}

async function getVersions(repo) {
    try {
        const url = `https://api.github.com/repos/${repo}/tags`;
        const response = await axios.get(url);
        return response.data.map(tag => tag.name);
    } catch (error) {
        console.error('Error fetching versions:', error);
        return [];
    }
}

async function updateReadme(contributors, versions) {
    try {
        let readme = fs.readFileSync('README.md', 'utf8');
        const contributorsSection = '## Credits 🙏\n' + contributors.map(contributor => `- ${contributor}`).join('\n');
        const versionsSection = '## Version History 📜\n' + versions.map(version => `- ${version}`).join('\n');

        readme = readme.replace(/## Credits 🙏\n[\s\S]*?(?=\n##|$)/, contributorsSection);
        readme = readme.replace(/## Version History 📜\n[\s\S]*?(?=\n##|$)/, versionsSection);

        fs.writeFileSync('README.md', readme);
    } catch (error) {
        console.error('Error updating README:', error);
    }
}

(async () => {
    const repo = 'FlanZCode/LinguaBot';
    const contributors = await getContributors(repo);
    const versions = await getVersions(repo);
    await updateReadme(contributors, versions);
})();
