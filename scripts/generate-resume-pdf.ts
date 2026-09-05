import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generateResumePdf() {
  const pdfDoc = await PDFDocument.create();
  const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const timesBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const timesItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);

  // US Letter: 8.5 x 11 inches = 612 x 792 points
  const page = pdfDoc.addPage([612, 792]);
  const { width, height } = page.getSize();

  const marginX = 42;
  const contentWidth = width - marginX * 2; // 528 pt
  let cursorY = height - 44;

  const darkColor = rgb(0.08, 0.08, 0.08);
  const ruleColor = rgb(0.2, 0.2, 0.2);

  function drawText(
    text: string,
    x: number,
    y: number,
    font: typeof timesRoman,
    size: number,
    color = darkColor
  ) {
    page.drawText(text, { x, y, font, size, color });
  }

  function drawLine(y: number) {
    page.drawLine({
      start: { x: marginX, y },
      end: { x: width - marginX, y },
      thickness: 0.75,
      color: ruleColor,
    });
  }

  // Header - Name
  const name = 'Ryo Kitano';
  const nameSize = 22;
  const nameWidth = timesBold.widthOfTextAtSize(name, nameSize);
  drawText(name, (width - nameWidth) / 2, cursorY, timesBold, nameSize);
  cursorY -= 17;

  // Contact Info
  const contactText = '548-384-6021 | rkitano@uwaterloo.ca | linkedin.com/in/ryo-kitano | github.com/Ryo0326-hub';
  const contactSize = 9.5;
  const contactWidth = timesRoman.widthOfTextAtSize(contactText, contactSize);
  drawText(contactText, (width - contactWidth) / 2, cursorY, timesRoman, contactSize);
  cursorY -= 18;

  // Section: Education
  function drawSectionHeading(title: string) {
    cursorY -= 6;
    drawText(title.toUpperCase(), marginX, cursorY, timesBold, 11);
    cursorY -= 3;
    drawLine(cursorY);
    cursorY -= 13;
  }

  // Helper for bullet item with word wrapping
  function drawBullet(text: string, boldPrefix = '', indent = 16, fontSize = 9, leading = 11.5) {
    const bulletSymbol = '•';
    const bulletX = marginX + indent - 10;
    const textX = marginX + indent;
    const maxW = contentWidth - indent;

    drawText(bulletSymbol, bulletX, cursorY, timesRoman, fontSize);

    // Split text into words and wrap
    const fullText = boldPrefix ? boldPrefix + ' ' + text : text;
    const words = fullText.split(' ');
    let currentLine = '';
    
    // Check if we have bold prefix
    let prefixRemaining = boldPrefix;

    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine ? `${currentLine} ${words[i]}` : words[i];
      const testWidth = timesRoman.widthOfTextAtSize(testLine, fontSize);

      if (testWidth > maxW && currentLine !== '') {
        // Draw current line
        drawWrappedLine(currentLine, textX, cursorY, fontSize, prefixRemaining);
        prefixRemaining = updateRemainingPrefix(prefixRemaining, currentLine);
        cursorY -= leading;
        currentLine = words[i];
      } else {
        currentLine = testLine;
      }
    }

    if (currentLine) {
      drawWrappedLine(currentLine, textX, cursorY, fontSize, prefixRemaining);
      cursorY -= leading;
    }
  }

  function drawWrappedLine(line: string, x: number, y: number, fontSize: number, prefix: string) {
    if (!prefix) {
      drawText(line, x, y, timesRoman, fontSize);
      return;
    }

    if (line.startsWith(prefix)) {
      drawText(prefix, x, y, timesBold, fontSize);
      const prefixWidth = timesBold.widthOfTextAtSize(prefix, fontSize);
      const rest = line.substring(prefix.length);
      drawText(rest, x + prefixWidth, y, timesRoman, fontSize);
    } else {
      drawText(line, x, y, timesRoman, fontSize);
    }
  }

  function updateRemainingPrefix(prefix: string, line: string): string {
    if (!prefix) return '';
    if (line.startsWith(prefix)) return '';
    return prefix;
  }

  // Row with Left & Right text
  function drawTwoColumnRow(
    leftText: string,
    rightText: string,
    leftFont: typeof timesBold,
    rightFont: typeof timesRoman,
    fontSize = 10,
    lineGap = 12
  ) {
    drawText(leftText, marginX, cursorY, leftFont, fontSize);
    const rightW = rightFont.widthOfTextAtSize(rightText, fontSize);
    drawText(rightText, width - marginX - rightW, cursorY, rightFont, fontSize);
    cursorY -= lineGap;
  }

  // EDUCATION
  drawSectionHeading('EDUCATION');
  drawTwoColumnRow('University of Waterloo', 'Waterloo, ON', timesBold, timesRoman, 10, 12);
  drawTwoColumnRow('Bachelor of Mathematics, Honours, Co-operative Program', 'Sep. 2024 – May 2029', timesItalic, timesRoman, 9.5, 12);
  drawBullet('President’s Scholarship (2024)', '• Award:', 14, 9, 11);
  drawBullet('Optimization, Probability, Statistics, Linear Algebra II, Combinatorics, Graph Theory, Network Flow Theory, Algorithm Design & Data Abstraction', '• Coursework:', 14, 9, 11);

  // EXPERIENCE
  cursorY -= 2;
  drawSectionHeading('EXPERIENCE');
  
  // Role 1
  drawTwoColumnRow('Co-Founder & Technical Lead', 'Mar. 2026 – Present', timesBold, timesRoman, 10, 12);
  drawTwoColumnRow('Neural Point Analytica (NPA)', 'Remote / Japan', timesItalic, timesItalic, 9.5, 12);
  drawBullet('Co-founded a 3-person software company and lead engineering for an NDA-protected enterprise workflow platform; secured its first recurring client contract worth US$1.5K/month', '', 14, 9, 11);
  drawBullet('Lead architecture and delivery of auditable RFQ intake, quotation, reconciliation, and reporting workflows using Next.js, TypeScript, PostgreSQL, and AWS; turn client feedback into staged releases with Docker and GitHub Actions', '', 14, 9, 11);

  // Role 2
  cursorY -= 3;
  drawTwoColumnRow('Java Backend & Computer Vision Engineer Intern', 'May 2026 – Sep. 2026', timesBold, timesRoman, 10, 12);
  drawTwoColumnRow('AISTGroup LLC', 'Remote / Baku, Azerbaijan', timesItalic, timesItalic, 9.5, 12);
  drawBullet('Delivered Spring Boot REST APIs for invoice, receipt, and file workflows in a 5-engineer team, spanning JPA entities, validation, localization, Liquibase migrations, and JUnit tests', '', 14, 9, 11);
  drawBullet('Implemented encrypted SMTP configuration and a transactional outbox that decoupled receipt delivery from API requests and enabled retryable asynchronous processing; hardened behavior through code review and tests', '', 14, 9, 11);
  drawBullet('Owned data preparation, training, and evaluation for a YOLO26-s + EfficientNet-B0 pipeline using 41.9K images and 180K annotated signs; achieved 0.871 mAP@50 detection and 89.0% Top-1 classification across 154 sign classes', '', 14, 9, 11);

  // PROJECTS
  cursorY -= 2;
  drawSectionHeading('PROJECTS');

  // Project 1
  drawTwoColumnRow('Hybrid Token-Efficient Routing Agent | Python, Qwen, Fireworks, Docker', 'Jul. 2026', timesBold, timesRoman, 9.5, 12);
  drawBullet('Trained a hashed n-gram logistic router on 360 measured task outcomes to route between quantized Qwen2.5-1.5B and a hosted LLM under a 2-vCPU / 4-GB budget; added deterministic verification and failover', '', 14, 9, 11);
  drawBullet('Passed 80/80 mixed-task evaluations using 9,745 tokens; on a 20-case hard set, optimized escalation prompting raised accuracy from 85% to 95% while cutting token use by 24.6%', '', 14, 9, 11);

  // Project 2
  cursorY -= 3;
  drawTwoColumnRow('KenMemory | Live Site | OpenAI API, FastAPI, React, PostgreSQL/pgvector', 'Mar. 2026 – Aug. 2026', timesBold, timesRoman, 9.5, 12);
  drawBullet('Independently built and deployed a privacy-aware RAG product; embedded only consented memories in PostgreSQL/pgvector, used HNSW vector search for semantic retrieval, and streamed grounded answers, verified by 63 backend tests', '', 14, 9, 11);

  // Project 3
  cursorY -= 3;
  drawTwoColumnRow('ThetaTrap | Python, Qwen, Alpaca MCP, SQLite', 'Aug. 2026 – Sep. 2026', timesBold, timesRoman, 9.5, 12);
  drawBullet('Independently built and deployed an MCP-native paper-options agent with deterministic Python controls that locked candidates, strikes, sizing, and max loss before LLM tool use; passed 191 tests and 5/5 mutation-free replays', '', 14, 9, 11);

  // Project 4
  cursorY -= 3;
  drawTwoColumnRow('Kraken Knight | Python, Kraken API, SQLite, systemd', 'Aug. 2026 – Sep. 2026', timesBold, timesRoman, 9.5, 12);
  drawBullet('Backtested a deterministic BTC/CAD strategy on 4.63M historical Kraken trades, validated it through shadow trading, then deployed live execution with authenticated orders, fill reconciliation, idempotent audit logs, and fail-closed risk controls', '', 14, 9, 11);

  // TECHNICAL SKILLS
  cursorY -= 2;
  drawSectionHeading('TECHNICAL SKILLS');

  function drawSkillCategory(label: string, items: string) {
    const fullText = `${label}: ${items}`;
    const words = fullText.split(' ');
    let currentLine = '';
    const maxW = contentWidth;

    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine ? `${currentLine} ${words[i]}` : words[i];
      const testWidth = timesRoman.widthOfTextAtSize(testLine, 9);

      if (testWidth > maxW && currentLine !== '') {
        drawSkillLine(currentLine, label);
        cursorY -= 11.5;
        currentLine = words[i];
      } else {
        currentLine = testLine;
      }
    }

    if (currentLine) {
      drawSkillLine(currentLine, label);
      cursorY -= 12;
    }
  }

  function drawSkillLine(line: string, label: string) {
    const labelWithColon = `${label}:`;
    if (line.startsWith(labelWithColon)) {
      drawText(labelWithColon, marginX, cursorY, timesBold, 9);
      const labelW = timesBold.widthOfTextAtSize(labelWithColon, 9);
      const rest = line.substring(labelWithColon.length);
      drawText(rest, marginX + labelW, cursorY, timesRoman, 9);
    } else {
      drawText(line, marginX, cursorY, timesRoman, 9);
    }
  }

  drawSkillCategory('Languages', 'Python, Java, SQL; C, TypeScript, JavaScript (working knowledge)');
  drawSkillCategory('AI/ML', 'Machine/deep learning, PyTorch, scikit-learn, Hugging Face Transformers, LLMs, RAG/vector search, prompt engineering, agentic/multi-agent systems, MCP/tool calling, computer vision, responsible AI, LLM evaluation');
  drawSkillCategory('Frameworks & Data', 'TensorFlow/Keras, OpenAI API, FastAPI, React, Next.js, PostgreSQL/pgvector, Pinecone, pandas, NumPy, Matplotlib, Jupyter, REST APIs');
  drawSkillCategory('MLOps & Developer Tools', 'Docker, GitHub Actions (CI/CD), AWS, Vercel, Render, Linux, Git/GitHub; Azure, GCP, Kubernetes (working knowledge)');

  const pdfBytes = await pdfDoc.save();

  // Save to public/Resume.pdf and public/resume.pdf
  const publicDir = path.join(process.cwd(), 'public');
  fs.writeFileSync(path.join(publicDir, 'Resume.pdf'), pdfBytes);
  fs.writeFileSync(path.join(publicDir, 'resume.pdf'), pdfBytes);
  console.log('Successfully generated Resume.pdf in public directory!');
}

generateResumePdf().catch((err) => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
