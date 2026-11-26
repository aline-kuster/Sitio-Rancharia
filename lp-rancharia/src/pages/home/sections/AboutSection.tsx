import sobreAcudeEucalipto from "@/assets/images/sobre-acude-eucalipto.webp";
import sobreAcudeEucalipto640 from "@/assets/images/sobre-acude-eucalipto-640.webp";
import { siteConfig } from "@/config/site";

export function AboutSection() {
  return (
    <section className="section" id="about">
      <div className="container about-grid">
         <figure className="about-media reveal">
          <img src={sobreAcudeEucalipto}
            srcSet={`${sobreAcudeEucalipto640} 640w, ${sobreAcudeEucalipto} 1000w`}
            sizes="(max-width: 860px) 100vw, 50vw"
            alt="Eucalipto com balanço de corda à beira do açude, com as casas do sítio e a mata ao fundo"
            loading="lazy" decoding="async" />
        </figure>
        
        <div className="about-text reveal">
          <p className="eyebrow">Sobre o sítio</p>
          <h2>Um refúgio para <em>viver a natureza</em></h2>
          <p>O Sítio Vale Rancharia é um refúgio tranquilo e acolhedor dedicado ao lazer,
            ao descanso e à convivência com a natureza. Pensado para oferecer experiências
            variadas para todas as idades, o espaço conta com lago, barco, pesca, piscina, campos,
            tirolesa, casa da árvore, trilhas e diversas outras opções ao ar livre em um ambiente seguro e cercado de verde.</p>
          <p>Com funcionamento exclusivo para grupos fechados, o sítio garante privacidade e liberdade
            para encontros de família, casamentos, festas de aniversário, confraternizações de empresas, eventos de igrejas ou finais de
            semana especiais entre amigos.</p>
          <p>Nosso objetivo é proporcionar momentos inesquecíveis para famílias e amigos, em um ambiente seguro e
            acolhedor.</p>
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
            <a className="btn btn-primary" href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">
              <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                <path d="m8 7 2 3-1 1a9 9 0 0 0 4 4l1-1 3 2" />
              </svg>
              Consulte uma data
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
