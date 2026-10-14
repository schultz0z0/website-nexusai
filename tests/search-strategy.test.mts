import assert from "node:assert/strict";
import test from "node:test";
import { SERVICES, servicePath, getService } from "../src/lib/service-content.ts";
import { COMPANY } from "../src/lib/content.ts";
import { buildServiceSchemas } from "../src/lib/service-schema.ts";
import { WEB_MAINTENANCE, WEB_OFFERS, webOfferPrices } from "../src/lib/web-offers.ts";
import sitemap from "../src/app/sitemap.ts";

test("service entities and page breadcrumbs resolve to the same public identifiers", () => {
  for (const service of SERVICES) {
    const schemas = buildServiceSchemas(service);
    const ids = new Set(schemas.map(node => node["@id"]));
    const page = schemas.find(node => node["@type"] === "WebPage")!;
    assert.ok(page);
    for (const key of ["mainEntity", "breadcrumb"]) {
      assert.ok(ids.has((page[key] as { "@id": string })["@id"]), `${service.slug}: unresolved ${key}`);
    }
    assert.equal(page.url, COMPANY.url + servicePath(service));
    assert.equal(page.dateModified, service.updatedAt);
    assert.equal(schemas[0].serviceType, service.category);
  }
});

test("web offer markup preserves the creation price and mandatory monthly package", () => {
  const service = getService("desenvolvimento-web")!;
  const [schema] = buildServiceSchemas(service);
  const offers = schema.offers as Array<Record<string, unknown>>;
  assert.equal(offers.length, WEB_OFFERS.length);
  offers.forEach((offer, index) => {
    const prices = webOfferPrices(WEB_OFFERS[index]);
    assert.equal(offer.price, prices.totalCents / 100);
    assert.equal(offer.priceCurrency, "BRL");
    assert.ok(String(offer.description).includes(`R$ ${WEB_MAINTENANCE.monthlyCents / 100}/mês`));
    assert.match(String(offer.description), /obrigatório adicional/);
    assert.match(String(offer.description), /não realiza cobranças/);
    assert.equal(offer.availability, undefined, "A simulated checkout cannot imply immediate availability");
  });
  for (const product of SERVICES.filter(item => item.kind === "product")) {
    assert.equal(buildServiceSchemas(product)[0].offers, undefined, "Private priced-on-request demos must not advertise a free application");
  }
});

test("commercial titles target a distinct category while preserving each canonical URL", () => {
  assert.equal(new Set(SERVICES.map(service => service.seoTitle)).size, 6);
  assert.equal(new Set(SERVICES.map(service => service.description)).size, 6);
  for (const service of SERVICES) {
    assert.ok(service.seoTitle.length > 30 && service.seoTitle.length < 80);
    assert.ok(service.description.length > 100 && service.description.length < 180);
    assert.ok(service.category.length > 15);
    assert.ok(service.seoTitle.includes("Prometeus"));
    assert.equal(sitemap().find(page => page.url === COMPANY.url + servicePath(service))?.lastModified, service.updatedAt);
  }
});
