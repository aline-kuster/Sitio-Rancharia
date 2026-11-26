

export function LocationSection() {
  return (
    <section className="section" id="address">
      <div className="container location-grid">
        <iframe className="map reveal" title="Mapa com a localização do Sítio Vale Rancharia"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3745.1294265644174!2d-41.088830902655125!3d-20.170335924724906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xb9edafcab780ab%3A0x756f247bfe476868!2sVale%20Rancharia!5e0!3m2!1spt-BR!2sbr!4v1785151380568!5m2!1spt-BR!2sbr"
          allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin"></iframe>
          
        <div className="reveal">
          <p className="eyebrow">Como chegar</p>
          <h2>Fácil de <em>encontrar</em></h2>
          <p className="location-intro">O sítio fica em uma área tranquila, rodeada pela natureza. Vindo no sentido Vitória:
          </p>
          <ol className="steps">
            <li><span>Ao chegar em <strong>São Luís de Boa Sorte</strong>, siga em frente.</span></li>
            <li><span>Passe pelo campo de futebol <strong>"Bragantino Futebol Recreativo"</strong>.</span></li>
            <li><span>Logo depois, entre na <strong>estrada de terra à direita</strong>.</span></li>
            <li><span>Siga por aproximadamente <strong>1 km</strong> e você chegará ao sítio.</span></li>
          </ol>
        </div>

      </div>
    </section>
  );
}
