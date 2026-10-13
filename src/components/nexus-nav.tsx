import Image from "next/image";
import Link from "next/link";
import { SiteMenu } from "./site-menu";
import { OFFER_NAVIGATION } from "@/lib/offer-navigation";
import { whatsappContact } from "@/lib/commercial-contact";

export function NexusNav() {
  return (
    <nav
      data-site-navigation="true"
      data-mobile-navigation="true"
      aria-label="Navegação principal"
      className="fixed inset-x-0 top-0 z-50 isolate h-16 border-b border-white/10 bg-[#070a10]/78 shadow-[0_8px_30px_rgba(0,0,0,0.2)] backdrop-blur-xl md:h-[72px]"
    >
      <span
        aria-hidden="true"
        className="nexus-nav-sheen absolute inset-0 -z-10 opacity-25"
      />

      <div
        data-navigation-inner="true"
        className="mx-auto flex h-full w-full items-center justify-between px-4 sm:px-6 md:max-w-[1240px] lg:px-10 xl:px-12"
      >
        <Link
          href="/"
          aria-label="Prometeus — voltar ao início"
          className="inline-flex h-11 items-center opacity-90 transition-opacity hover:opacity-100 focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:h-12"
        >
          <div className="flex h-11 items-center md:h-12">
            <Image
              src="/images/logo-principal.webp"
              alt="Prometeus"
              width={322}
              height={88}
              priority
              className="h-[38px] w-auto md:h-[44px]"
            />
          </div>
        </Link>

        <SiteMenu groups={OFFER_NAVIGATION} contactHref={whatsappContact()} />
      </div>
    </nav>
  );
}
