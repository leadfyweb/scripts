import fs from "fs";
import path from "path";

const filePath = process.argv[2];

if (!filePath) {
  console.error("❌ Informe o caminho do arquivo CSS");
  process.exit(1);
}

const absolutePath = path.resolve(filePath);
const content = fs.readFileSync(absolutePath, "utf8");

// regex robusta para @import
const importRegex =
  /@import\s+(?:url\()?["'][^"']+["']\)?[^;]*;/gi;

const imports = content.match(importRegex) || [];

// remove os imports do conteúdo
const cleanedContent = content
  .replace(importRegex, "")
  .replace(/\n{3,}/g, "\n\n") // limpa linhas em branco extras
  .trim();

const result = [
  ...imports,
  "",
  cleanedContent,
  "",
].join("\n");

fs.writeFileSync(absolutePath, result, "utf8");

console.log(`✅ ${imports.length} @import movido(s) para o topo`);
