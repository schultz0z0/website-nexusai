import assert from "node:assert/strict";
import test from "node:test";
import { WEB_OFFERS, WEB_MAINTENANCE, getWebOffer, webOfferPrices } from "../src/lib/web-offers.ts";

test("prices a site and a virtual store at the amounts authorized by the owner", () => {
  assert.deepEqual(WEB_OFFERS.map((offer) => offer.id), ["site", "loja-virtual"]);
  for (const offer of WEB_OFFERS) {
    assert.deepEqual(webOfferPrices(offer), {
      totalCents: 150000,
      installments: 10,
      installmentCents: 15000,
      pixDiscountPercent: 5,
      pixTotalCents: 142500,
    });
  }
});

test("recognizes only an authorized offer for checkout selection", () => {
  assert.equal(getWebOffer("site")?.name, "Criação de site");
  assert.equal(getWebOffer("loja-virtual")?.name, "Criação de loja virtual");
  assert.equal(getWebOffer("toString"), undefined);
  assert.equal(getWebOffer(undefined), undefined);
  assert.equal(getWebOffer(["site"]), undefined);
});

test("keeps the obligatory monthly package separate from the creation price", () => {
  assert.equal(WEB_MAINTENANCE.required, true);
  assert.equal(WEB_MAINTENANCE.monthlyCents, 5000);
  assert.equal(WEB_MAINTENANCE.monthlyAdjustments, 3);
  assert.equal(WEB_MAINTENANCE.includes.length, 4);
});
