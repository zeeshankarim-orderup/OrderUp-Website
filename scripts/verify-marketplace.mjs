import { spawn } from "node:child_process";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
const server = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    "start",
    "--hostname",
    "127.0.0.1",
    "--port",
    "3019",
  ],
  { stdio: ["ignore", "pipe", "pipe"] },
);
const evidence = [];
try {
  await new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error("Server start timed out")),
      15000,
    );
    server.stdout.on("data", (data) => {
      if (data.toString().includes("Ready in")) {
        clearTimeout(timer);
        resolve();
      }
    });
    server.on("error", reject);
    server.on("exit", (code) => {
      if (code) reject(new Error("Server exited " + code));
    });
  });
  const base = "http://127.0.0.1:3019";
  const pages = [
    "",
    "rides/",
    "services/",
    "about/",
    "faq/",
    "partnerships/",
    "driver/",
    "providers/",
    "support/",
    "contact/",
    "careers/",
    "credits/",
    "privacy/",
    "terms/",
    "captain/",
    "tickets/",
    "tickets/red-sea-sounds/",
    "tickets/city-football-night/",
    "tickets/alula-afterglow/",
    "tickets/riyadh-stage/",
    "tickets/coast-and-calm/",
    "tickets/jeddah-art-weekend/",
    "tickets/riyadh-soundscape/",
    "tickets/weekend-cup/",
    "tickets/family-story-hour/",
    "checkout/?event=red-sea-sounds&standard=1",
    "checkout/?event=invalid",
    "login/",
    "register/",
    "verify/",
    "forgot-password/",
    "reset-password/",
    "account/",
    "account/tickets/DEMO-missing/",
  ];
  for (const locale of ["ar", "en"])
    for (const page of pages) {
      const path = `/${locale}/${page}`,
        response = await fetch(base + path);
      assert.equal(response.status, 200, path);
      const html = await response.text();
      assert.ok(html.includes("<main"), path);
      assert.ok(html.includes(`lang="${locale}"`), path);
      assert.ok(
        html.includes(`dir="${locale === "ar" ? "rtl" : "ltr"}"`),
        path,
      );
      assert.ok(!html.includes("Attempted to call pick"), path);
      if (
        /^(tickets|checkout|account|login|register|verify|forgot-password|reset-password)/.test(
          page,
        )
      )
        assert.match(
          html,
          /<meta name="robots" content="noindex, follow"/,
          path,
        );
      evidence.push({ path, status: response.status });
    }
  for (const path of [
    "/support",
    "/screenshots/ios/home.jpeg",
    "/screenshots/ios/services.jpeg",
    "/screenshots/ios/cleaning.jpeg",
    "/events/concert.jpg",
    "/events/football.jpg",
    "/events/desert.jpg",
    "/events/coast.jpg",
    "/events/theatre.jpg",
    "/events/art.jpg",
    "/assets/img/photo-f32186083.jpg",
    "/assets/img/photo-f61289940.jpg",
    "/qr/customer.svg",
    "/qr/driver.svg",
    "/sitemap.xml",
  ]) {
    const response = await fetch(base + path);
    assert.equal(response.status, 200, path);
    evidence.push({ path, status: response.status });
  }
  const optimized = await fetch(
    base + "/_next/image?url=%2Fevents%2Fconcert.jpg&w=640&q=75",
    { headers: { Accept: "image/webp" } },
  );
  assert.equal(optimized.status, 200, "optimized event image");
  assert.ok(optimized.headers.get("content-type").startsWith("image/"));
  evidence.push({ path: "optimized event image", status: 200 });
  for (const locale of ["ar", "en"]) {
    for (const [path, target] of [
      ["events/", "tickets/"],
      ["sports/", "tickets/?category=sports"],
      ["entertainment/", "tickets/?category=entertainment"],
      ["attractions/", "tickets/?category=attractions"],
      ["my-tickets/", "account/"],
      ["download/", "?app=customer"],
    ]) {
      const response = await fetch(`${base}/${locale}/${path}`, {
        redirect: "manual",
      });
      assert.ok([307, 308].includes(response.status), path);
      assert.ok(response.headers.get("location").includes(target), path);
      evidence.push({
        path: `/${locale}/${path}`,
        status: response.status,
        location: response.headers.get("location"),
      });
    }
    const missing = await fetch(`${base}/${locale}/tickets/missing-event/`);
    assert.equal(missing.status, 404);
    evidence.push({ path: `/${locale}/tickets/missing-event/`, status: 404 });
  }
  const root = await fetch(base + "/", { redirect: "manual" });
  assert.equal(root.status, 308);
  assert.ok(root.headers.get("location").endsWith("/ar/"));
  const stores = {
    customer: {
      android: "https://play.google.com/store/apps/details?id=com.orderup.main",
      ios: "https://apps.apple.com/sa/app/orderup-the-super-app/id6802653554",
    },
    driver: {
      android:
        "https://play.google.com/store/apps/details?id=com.orderup.captain",
      ios: "https://apps.apple.com/sa/app/orderup-captain-drive-earn/id6798597573",
    },
  };
  for (const audience of ["customer", "driver"])
    for (const [platform, ua] of [
      ["android", "Mozilla/5.0 (Linux; Android 14)"],
      ["ios", "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)"],
    ]) {
      const response = await fetch(`${base}/get-app/${audience}/`, {
        headers: { "User-Agent": ua },
        redirect: "manual",
      });
      assert.equal(response.status, 307);
      assert.equal(
        response.headers.get("location"),
        stores[audience][platform],
      );
      evidence.push({
        path: `/get-app/${audience}/ (${platform})`,
        status: 307,
      });
    }
  const sitemap = await (await fetch(base + "/sitemap.xml")).text();
  assert.ok(sitemap.includes("/en/rides/"));
  assert.ok(!sitemap.includes("/tickets/"));
  await fs.mkdir("work", { recursive: true });
  await fs.writeFile(
    "work/marketplace-http.json",
    JSON.stringify(evidence, null, 2),
  );
  console.log(
    `${evidence.length} page, asset, image and redirect checks passed; Arabic default and demo sitemap exclusion passed.`,
  );
} finally {
  server.kill();
}
