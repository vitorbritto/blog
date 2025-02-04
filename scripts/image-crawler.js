import puppeteer from "puppeteer";
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";

dotenv.config();

async function downloadImages(urls, selector, outputDir) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: false,
    args: [
      "--disable-web-security",
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--window-size=1920,1080",
    ],
  });

  try {
    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
    );

    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      Referer: "https://medium.com/",
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "same-origin",
      "Sec-Fetch-User": "?1",
    });

    await page.setCookie({
      name: "sid",
      value: process.env.MEDIUM_SID_COOKIE,
      domain: ".medium.com",
      path: "/",
    });

    await page.setRequestInterception(true);
    page.on("request", (request) => {
      if (
        request.resourceType() === "script" &&
        request.url().includes("lite/lite-paywall")
      ) {
        request.abort();
      } else {
        request.continue();
      }
    });

    await page.setViewport({ width: 1280, height: 800 });

    page.on("error", (err) => {
      console.error("🔴 Erro na página:", err);
    });

    page.on("console", (msg) => {
      console.log("📝 Console do navegador:", msg.text());
    });

    page.on("request", (request) => {
      console.log("📡 Request:", request.url());
    });

    page.on("response", (response) => {
      console.log("📥 Response:", response.url(), response.status());
    });

    for (const [index, url] of urls.entries()) {
      console.log(`\n🌐 Tentando acessar ${url}`);

      try {
        const response = await page.goto(url, {
          waitUntil: "networkidle0",
          timeout: 30000,
        });

        if (!response.ok()) {
          throw new Error(`Status: ${response.status()}`);
        }

        console.log(`✅ Página carregada com sucesso (${response.status()})`);
        console.log(`📍 URL atual: ${page.url()}`);

        await page.waitForSelector("article", { timeout: 30000 });

        const images = await page.evaluate(() => {
          const article = document.querySelector("article");
          const imgs = article.querySelectorAll("img");

          return Array.from(imgs)
            .filter((img) => {
              const isAvatar = img.src.includes("avatar") || img.width < 200;
              const isUIElement =
                img.src.includes("icon") || img.src.includes("logo");
              return !isAvatar && !isUIElement && img.src;
            })
            .map((img) => ({
              src: img.src,
              alt: img.alt || "",
              width: img.width,
              height: img.height,
            }));
        });

        console.log(`🔍 Encontradas ${images.length} imagens relevantes`);

        for (const [imgIndex, image] of images.entries()) {
          if (!image.src || image.src.startsWith("data:")) continue;

          try {
            const response = await page.goto(image.src);
            const buffer = await response.buffer();

            const fileName = `img_${index + 1}_${imgIndex + 1}${
              path.extname(image.src) || ".jpg"
            }`;
            const filePath = path.join(outputDir, fileName);

            fs.writeFileSync(filePath, buffer);
            console.log(`✅ Baixada: ${fileName}`);

            await page.waitForTimeout(500);
          } catch (imgError) {
            console.error(
              `❌ Erro ao baixar imagem: ${image.src}`,
              imgError.message
            );
          }
        }
      } catch (pageError) {
        console.error(`❌ Erro ao processar página: ${url}`, pageError.message);
      }
    }
  } finally {
    await browser.close();
    console.log("\n✨ Processo finalizado!");
  }
}

const urls = [
  "https://medium.com/@vitorbritto/architectural-patterns-6839c6f6be67",
  "https://medium.com/@vitorbritto/architectural-patterns-c974e6a82fae",
  "https://medium.com/@vitorbritto/getting-started-with-system-design-728ee27af750",
  "https://medium.com/@vitorbritto/deep-dive-into-system-design-d17cbc8c1ac4",
  "https://medium.com/@vitorbritto/exploring-the-aws-cloud-development-kit-cdk-9bb3da636839",
  "https://medium.com/@vitorbritto/crafting-code-foundations-9b6344e2da0a",
  "https://medium.com/@vitorbritto/creational-design-patterns-ca74b52a5fa2",
  "https://medium.com/@vitorbritto/the-world-of-programming-languages-265ec6b28982",
  "https://medium.com/@vitorbritto/the-ci-cd-automation-on-github-628ccd09b7fd",
  "https://medium.com/@vitorbritto/the-path-to-ci-cd-mastery-7f18b1fded7c",
  "https://medium.com/@vitorbritto/an-introduction-to-databases-eb2614960aa2",
  "https://medium.com/@vitorbritto/a-deep-dive-into-dns-b213afc4c376",
  "https://medium.com/@vitorbritto/mastering-http-ebd92953b13b",
  "https://medium.com/@vitorbritto/the-back-end-roadmap-8f2e39f6f2d3",
  "https://medium.com/@vitorbritto/the-odyssey-of-mobile-applications-58fb06315857",
  "https://medium.com/@vitorbritto/introduction-to-progressive-web-apps-df648a2cfe97",
  "https://medium.com/@vitorbritto/the-world-of-static-site-generators-622d8fea8dd5",
  "https://medium.com/@vitorbritto/unveiling-server-side-rendering-3e11f8f75b57",
  "https://medium.com/@vitorbritto/code-integrity-with-type-checkers-71511f527cc9",
  "https://medium.com/@vitorbritto/understanding-web-security-c3d1b6df6d1e",
  "https://medium.com/@vitorbritto/the-authentication-strategies-71b6cf796c54",
  "https://medium.com/@vitorbritto/the-software-testing-scenario-325ecb4f8a73",
  "https://medium.com/@vitorbritto/web-development-with-build-tools-30c7039e621a",
  "https://medium.com/@vitorbritto/understanding-package-managers-8df868eb0f1d",
  "https://medium.com/@vitorbritto/a-revolution-called-web-frameworks-1fb07baacfb7",
  "https://medium.com/@vitorbritto/the-right-introduction-to-javascript-c70a75dcfa86",
  "https://medium.com/@vitorbritto/the-front-end-roadmap-e7feafde5ecc",
  "https://medium.com/@vitorbritto/exploring-version-control-systems-309c31cf6944",
  "https://medium.com/@vitorbritto/kickstart-to-dom-manipulation-f629ad810efc",
  "https://medium.com/@vitorbritto/an-exploration-of-pre-processors-and-post-processors-7bec4a752854",
  "https://medium.com/@vitorbritto/understanding-css-architecture-4b1d6de36cdb",
  "https://medium.com/@vitorbritto/a-beginners-express-guide-to-css-d2343cf027f2",
  "https://medium.com/@vitorbritto/a-comprehensive-guide-to-html-71ccba4e60cc",
  "https://medium.com/@vitorbritto/the-webs-wizardry-dca792b0e137",
  "https://medium.com/@vitorbritto/how-does-internet-works-23b06b00d857",
  "https://medium.com/@vitorbritto/mastering-date-an-time-in-javascript-a4c12501aa6a",
  "https://medium.com/@vitorbritto/design-patterns-demystified-bf51044908d2",
  "https://medium.com/@vitorbritto/dealing-with-debounce-and-throttle-1bad388d0fc6",
  "https://medium.com/@vitorbritto/solid-principles-for-software-wizards-3f22fd0ce095",
  "https://medium.com/@vitorbritto/design-patterns-with-vanilla-js-bb1bc6db2600",
  "https://medium.com/@vitorbritto/the-journey-of-css-03c51535dc41",
  "https://medium.com/@vitorbritto/react-design-patterns-custom-hooks-pattern-f8e1c019c846",
  "https://medium.com/@vitorbritto/react-design-patterns-provider-pattern-b273ba665158",
  "https://medium.com/@vitorbritto/react-design-patterns-higher-order-components-pattern-421e7f1edcfa",
  "https://medium.com/@vitorbritto/react-design-patterns-controlled-uncontrolled-component-pattern-7335b85413a0",
  "https://medium.com/@vitorbritto/react-design-patterns-render-props-pattern-735cd1cdf739",
  "https://medium.com/@vitorbritto/react-design-patterns-conditional-rendering-pattern-9a341a8988bb",
  "https://medium.com/@vitorbritto/react-design-patterns-layout-components-pattern-455c98e0bf92",
  "https://medium.com/@vitorbritto/introducing-graphql-f28b2b53a181",
  "https://medium.com/@vitorbritto/mastering-feature-flags-056d940ccb48",
  "https://medium.com/@vitorbritto/the-package-by-feature-approach-c62a197a8a3d",
  "https://medium.com/@vitorbritto/aws-the-developer-associative-journey-310097dd6e97",
  "https://medium.com/@vitorbritto/aws-the-developer-associative-journey-2e532b6a8384",
  "https://medium.com/@vitorbritto/amazon-web-services-the-developer-associative-journey-679b97c79d51",
  "https://medium.com/@vitorbritto/react-design-patterns-compound-component-pattern-ec247f491294",
  "https://medium.com/@vitorbritto/react-design-patterns-the-container-presentational-pattern-775b91aa0c49",
  "https://medium.com/@vitorbritto/error-boundaries-on-react-apps-a5c65614d784",
  "https://medium.com/@vitorbritto/introduction-to-functional-programming-in-javascript-82485186e587",
  "https://medium.com/@vitorbritto/the-short-circuit-evaluation-24008465746f",
  "https://medium.com/@vitorbritto/building-a-monorepo-the-right-way-f8bea3138681",
  "https://medium.com/@vitorbritto/building-a-monorepo-f623ed1a5563",
  "https://medium.com/@vitorbritto/function-composition-in-react-applications-c97fd99a2f7d",
  "https://medium.com/@vitorbritto/application-strategy-deployment-807c18c54468",
  "https://medium.com/@vitorbritto/react-design-patterns-the-foundational-pattern-7ef485ec6a3a",
  "https://medium.com/@vitorbritto/javascript-what-is-a-function-f2cc0bb8d7b1",
  "https://medium.com/@vitorbritto/the-ecmascript-journey-5332c42396c0",
  "https://medium.com/@vitorbritto/react-design-patterns-82a171233784",
  "https://medium.com/@vitorbritto/react-an-overview-about-syntheticevent-d3a6d35295f1",
  "https://medium.com/@vitorbritto/react-the-virtual-dom-5c96f93897a6",
  "https://medium.com/@vitorbritto/code-splitting-in-react-84a4b2a345e9",
  "https://medium.com/@vitorbritto/react-diving-into-pure-components-d7a26a109cd7",
  "https://medium.com/@vitorbritto/offline-first-how-to-apply-this-approach-in-react-native-e2ed7af29cde",
];

const config = {
  selector: "article img",
  outputDir: "./images/downloaded",
};

downloadImages(urls, config.selector, config.outputDir).catch(console.error);
