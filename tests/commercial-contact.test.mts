import assert from "node:assert/strict";
import test from "node:test";
import { whatsappContact } from "../src/lib/commercial-contact.ts";

test("uses the approved WhatsApp number with a product-specific draft, without sending it", () => {
  const contact = new URL(whatsappContact("Prometeus Copiloto & CRM", true));
  assert.equal(contact.origin, "https://wa.me");
  assert.equal(contact.pathname, "/5521973231943");
  assert.equal(contact.searchParams.size, 1);
  assert.match(contact.searchParams.get("text")!, /Copiloto & CRM.*personalização/);
});
