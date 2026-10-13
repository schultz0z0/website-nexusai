"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { WEB_MAINTENANCE, webOfferPrices, type WebOffer } from "@/lib/web-offers";
import styles from "./web-offers.module.css";

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;
const money = (cents: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);

export function WebCheckoutPreview({ offer }: { offer: WebOffer }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [payment, setPayment] = useState<"cartao" | "pix">("cartao");
  const [completed, setCompleted] = useState(false);
  const hydrated = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const prices = webOfferPrices(offer);
  const label = offer.id === "site" ? "Quero meu site" : "Quero minha loja virtual";
  const headingId = `checkout-${offer.id}`;

  return (
    <>
      {hydrated ? <button type="button" className={styles.cta} onClick={() => { setCompleted(false); setPayment("cartao"); dialog.current?.showModal(); }}>{label}<ArrowUpRight aria-hidden="true" /></button> : <a className={styles.cta} href={`/contato?produto=${offer.id}`}>{label}<ArrowUpRight aria-hidden="true" /></a>}
      <dialog ref={dialog} className={styles.dialog} aria-labelledby={headingId} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <div className={styles.checkout}>
          <div className={styles.checkoutHeading}><h2 id={headingId}>Simulação de contratação</h2><button type="button" aria-label="Fechar simulação" onClick={() => dialog.current?.close()} className={styles.close}><X aria-hidden="true" /></button></div>
          <p className={styles.mockNotice}>Demonstração do checkout. Nenhum pagamento ou pedido será realizado.</p>
          <h3>{offer.name}</h3>
          <fieldset className={styles.paymentOptions}><legend>Pagamento da criação</legend>
            <label><input type="radio" name={`payment-${offer.id}`} value="cartao" checked={payment === "cartao"} onChange={() => { setPayment("cartao"); setCompleted(false); }} /><span>Cartão<strong>{prices.installments}× de {money(prices.installmentCents)} sem juros</strong></span></label>
            <label><input type="radio" name={`payment-${offer.id}`} value="pix" checked={payment === "pix"} onChange={() => { setPayment("pix"); setCompleted(false); }} /><span>Pix<strong>{money(prices.pixTotalCents)} · {prices.pixDiscountPercent}% de desconto</strong></span></label>
          </fieldset>
          <dl className={styles.summary}>
            <div><dt>Valor da criação</dt><dd>{money(payment === "pix" ? prices.pixTotalCents : prices.totalCents)}</dd></div>
            {payment === "pix" && <div><dt>Desconto no Pix</dt><dd>{money(prices.totalCents - prices.pixTotalCents)}</dd></div>}
            <div><dt>Pacote mensal obrigatório</dt><dd>{money(WEB_MAINTENANCE.monthlyCents)}/mês</dd></div>
          </dl>
          <p className={styles.checkoutNote}>A mensalidade é adicional ao valor da criação. Inclui hospedagem, domínio, manutenção da infraestrutura e 3 ajustes mensais.</p>
          {completed ? <p role="status" className={styles.completed}>Simulação concluída. Nenhuma cobrança foi feita.</p> : <button type="button" className={styles.cta} onClick={() => setCompleted(true)}>Concluir simulação<ArrowUpRight aria-hidden="true" /></button>}
        </div>
      </dialog>
    </>
  );
}
