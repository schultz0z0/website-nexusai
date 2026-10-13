import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./services.module.css";
import { whatsappContact } from "@/lib/commercial-contact";

export function ServiceClosing({ trackingId, catalog = false, web = false }: { trackingId: string; catalog?: boolean; web?: boolean }) {
  return (
    <section className={styles.closing} aria-labelledby="closing-heading">
      <div className={styles.container}>
        <h2 id="closing-heading">{web ? "Vamos criar o próximo endereço da sua empresa." : catalog ? "Qual é o próximo passo da sua empresa?" : "Comece pelo problema da sua empresa."}</h2>
        <p>{web ? "Um site para apresentar seus serviços ou uma loja para vender seus produtos. Conte sobre sua empresa e o que você quer colocar na internet." : catalog ? "Conheça uma plataforma em reunião ou converse sobre uma solução para sua operação." : "Conte a rotina, os sistemas envolvidos e o que precisa melhorar. A conversa inicial ajuda a entender o contexto e avaliar a viabilidade."}</p>
        <Link href={whatsappContact(web ? "criação de sites e lojas virtuais" : undefined)} target="_blank" rel="noopener noreferrer" className={styles.button} data-track-cta={trackingId}>Falar pelo WhatsApp<ArrowUpRight aria-hidden="true" /></Link>
        <small>{web ? "Atendimento a empresas no Brasil. Consulte acima os valores e as formas de pagamento da criação." : "Atendimento a empresas no Brasil. Escopo, prazo e investimento definidos após a avaliação."}</small>
      </div>
    </section>
  );
}
