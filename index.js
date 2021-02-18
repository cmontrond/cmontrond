// require("isomorphic-unfetch");
const { promises: fs } = require("fs");
const path = require("path");

async function main() {
  const readmeTemplate = (
      await fs.readFile(path.join(process.cwd(), "./README.template.md"))
  ).toString("utf-8");

  const got_quote = await (
    await fetch("https://got-quotes.herokuapp.com/quotes")
  ).json(); 
  
  const readme = readmeTemplate
          .replace("{got_quote}", got_quote.quote)
          .replace("{got_character}", `- ${got_quote.character}`)
  
  await fs.writeFile("README.md", readme);
}

main();