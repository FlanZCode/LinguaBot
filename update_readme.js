const fs = require('fs');
const axios = require('axios');

async function getContributors(repo) {
    const url = `https://api.github.com/repos/${repo}/contributors`;
    const response = await axios.get(url);
    return response.data.map(contributor => contributor.login);
}

async function getVersions(repo) {
    const url = `https://api.github.com/repos/${repo}/tags`;
    const response = await axios.get(url);
    return response.data.map(tag => tag.name);
}

async function updateReadme(contributors, versions) {
    let readme = fs.readFileSync('README.md', 'utf8');
    const contributorsSection = '## Credits 🙏\n' + contributors.map(contributor => `- ${contributor}`).join('\n');
    const versionsSection = '## Version History 📜\n' + versions.map(version => `- ${version}`).join('\n');

    readme = readme.replace(/## Contributors\n[\s\S]*?(?=\n##|$)/, contributorsSection);
    readme = readme.replace(/## Version History\n[\s\S]*?(?=\n##|$)/, versionsSection);

    fs.writeFileSync('README.md', readme);
}

(async () => {
    const repo = 'FlanZCode/LinguaBot';
    const contributors = await getContributors(repo);
    const versions = await getVersions(repo);
    await updateReadme(contributors, versions);
})();
