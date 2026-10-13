import { WEB_OFFERS, WEB_MAINTENANCE, webOfferPrices } from "@/lib/web-offers";
import { WebCheckoutPreview } from "./web-checkout-preview";
import styles from "./web-offers.module.css";

const money = (cents: number) => new Intl.NumberFormat("pt-BR", {
  style: "currency", currency: "BRL", maximumFractionDigits: 0,
}).format(cents / 100);

export function WebOffers() {
  return (
    <section id="ofertas" className={styles.section} aria-labelledby="web-offers-title">
      <div className={styles.container}>
        <div className={styles.heading}>
          <h2 id="web-offers-title">Seu site ou sua loja. Com preço definido.</h2>
          <p>Escolha o que sua empresa precisa criar. O valor da criação pode ser parcelado em 10 vezes sem juros ou pago no Pix com 5% de desconto.</p>
        </div>
        <div className={styles.offers}>
          {WEB_OFFERS.map((offer) => {
            const price = webOfferPrices(offer);
            return (
              <article key={offer.id} className={styles.offer}>
                <h3>{offer.name}</h3>
                <p className={styles.description}>{offer.description}</p>
                <p className={styles.price}>{money(price.totalCents)}<span>pela criação</span></p>
                <p className={styles.installments}>ou {price.installments}× de {money(price.installmentCents)} <span>sem juros</span></p>
                <p className={styles.recurring}>+ {money(WEB_MAINTENANCE.monthlyCents)}/mês obrigatórios</p>
                <p className={styles.pix}><strong>{money(price.pixTotalCents)} no Pix</strong><span>{price.pixDiscountPercent}% de desconto na criação</span></p>
                <WebCheckoutPreview offer={offer} />
              </article>
            );
          })}
        </div>
        <div className={styles.maintenance}>
          <div><h3>Seu site publicado e atualizado.</h3><p className={styles.monthlyPrice}>{money(WEB_MAINTENANCE.monthlyCents)}<span>/mês</span></p><p>Pacote obrigatório para sites e lojas virtuais, adicional à criação.</p></div>
          <ul>{WEB_MAINTENANCE.includes.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}
