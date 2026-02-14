export type Lang = "en" | "es";

const translations = {
  // ─── Nav ─────────────────────────────────────────────────────────────────────
  "nav.about": { en: "About", es: "Nosotros" },
  "nav.rooms": { en: "Rooms", es: "Habitaciones" },
  "nav.experiences": { en: "Experiences", es: "Experiencias" },
  "nav.amenities": { en: "Amenities", es: "Comodidades" },
  "nav.contact": { en: "Contact", es: "Contacto" },
  "nav.book": { en: "Book Now", es: "Reservar" },

  // ─── Hero ────────────────────────────────────────────────────────────────────
  "hero.tagline": {
    en: "Where Nature Meets Tranquility",
    es: "Donde la Naturaleza Encuentra la Tranquilidad",
  },
  "hero.subtitle": {
    en: "A boutique eco-hotel nestled in Colombia's Coffee Cultural Landscape — a UNESCO World Heritage Site",
    es: "Un eco-hotel boutique en el Paisaje Cultural Cafetero de Colombia — Patrimonio Mundial de la UNESCO",
  },
  "hero.cta": { en: "Book Your Stay", es: "Reserva Tu Estadía" },
  "hero.explore": { en: "Explore", es: "Explorar" },

  // ─── About ───────────────────────────────────────────────────────────────────
  "about.label": { en: "Our Story", es: "Nuestra Historia" },
  "about.heading": {
    en: "A Retreat Built by Nature",
    es: "Un Refugio Construido por la Naturaleza",
  },
  "about.p1": {
    en: "Since 2016, Hotel Quinto has welcomed travelers seeking peace and authentic connection with Colombia's coffee heartland. Our guadua bamboo architecture blends tradition with modern comfort, creating spaces that breathe with the landscape.",
    es: "Desde 2016, Hotel Quinto ha recibido viajeros que buscan paz y conexión auténtica con el corazón cafetero de Colombia. Nuestra arquitectura en guadua combina tradición con confort moderno, creando espacios que respiran con el paisaje.",
  },
  "about.p2": {
    en: "Set between Montenegro and Circasia in the Quindío region, we sit within UNESCO's Coffee Cultural Landscape — surrounded by bamboo forests, fruit gardens, the Río Robles river, and a natural waterfall. From our balconies, you'll witness breathtaking sunsets and the region's extraordinary birdlife.",
    es: "Ubicado entre Montenegro y Circasia en el Quindío, nos encontramos dentro del Paisaje Cultural Cafetero de la UNESCO — rodeados de bosques de bambú, jardines frutales, el Río Robles y una cascada natural. Desde nuestros balcones, contemplarás atardeceres impresionantes y la extraordinaria avifauna de la región.",
  },
  "about.stat.years": { en: "Years of Hospitality", es: "Años de Hospitalidad" },
  "about.stat.landscape": { en: "UNESCO Heritage Site", es: "Patrimonio UNESCO" },
  "about.stat.nature": { en: "Hectares of Nature", es: "Hectáreas de Naturaleza" },

  // ─── Rooms ───────────────────────────────────────────────────────────────────
  "rooms.label": { en: "Accommodations", es: "Alojamiento" },
  "rooms.heading": {
    en: "Rest, Surrounded by Nature",
    es: "Descansa, Rodeado de Naturaleza",
  },
  "rooms.subtitle": {
    en: "Each room is individually designed with natural materials, offering comfort and connection to the landscape.",
    es: "Cada habitación está diseñada individualmente con materiales naturales, ofreciendo confort y conexión con el paisaje.",
  },
  "rooms.from": { en: "From", es: "Desde" },
  "rooms.night": { en: "/ night", es: "/ noche" },
  "rooms.book": { en: "Reserve", es: "Reservar" },
  "rooms.guests": { en: "guests", es: "huéspedes" },

  "rooms.standard.name": { en: "Standard Room", es: "Habitación Estándar" },
  "rooms.standard.description": {
    en: "A cozy retreat with garden views, queen-size bed, private bathroom, air conditioning, and complimentary WiFi. The perfect base for your coffee country adventure.",
    es: "Un acogedor refugio con vistas al jardín, cama queen, baño privado, aire acondicionado y WiFi gratuito. La base perfecta para tu aventura en la zona cafetera.",
  },

  "rooms.family.name": { en: "Family Suite", es: "Suite Familiar" },
  "rooms.family.description": {
    en: "Spacious suite with separate living area, two bedrooms, garden and pool views. Designed for families seeking space and togetherness amidst nature.",
    es: "Amplia suite con sala independiente, dos habitaciones, vistas al jardín y la piscina. Diseñada para familias que buscan espacio y convivencia en medio de la naturaleza.",
  },

  "rooms.premium.name": { en: "Premium Suite", es: "Suite Premium" },
  "rooms.premium.description": {
    en: "Our finest accommodation featuring a private balcony with sunset views, king-size bed, luxury bamboo-finished bathroom, and premium amenities. An elevated experience.",
    es: "Nuestro mejor alojamiento con balcón privado con vistas al atardecer, cama king, baño de lujo con acabados en bambú y amenidades premium. Una experiencia elevada.",
  },

  // ─── Experiences ─────────────────────────────────────────────────────────────
  "exp.label": { en: "Experiences", es: "Experiencias" },
  "exp.heading": {
    en: "Immerse Yourself in the Coffee Region",
    es: "Sumérgete en la Región Cafetera",
  },

  "exp.coffee.title": { en: "Coffee Tours", es: "Tours de Café" },
  "exp.coffee.desc": {
    en: "Walk through coffee plantations, learn the art of cultivation from seed to cup, and taste freshly roasted Quindío coffee.",
    es: "Recorre plantaciones de café, aprende el arte del cultivo de la semilla a la taza y degusta café del Quindío recién tostado.",
  },

  "exp.birds.title": { en: "Birdwatching", es: "Avistamiento de Aves" },
  "exp.birds.desc": {
    en: "Observe native species from our balconies and gardens. The Quindío region is home to over 600 bird species.",
    es: "Observa especies nativas desde nuestros balcones y jardines. La región del Quindío alberga más de 600 especies de aves.",
  },

  "exp.river.title": { en: "River & Waterfall", es: "Río y Cascada" },
  "exp.river.desc": {
    en: "Cool off in the Río Robles flowing through our property, or visit the natural waterfall hidden within our grounds.",
    es: "Refréscate en el Río Robles que atraviesa nuestra propiedad, o visita la cascada natural escondida en nuestros terrenos.",
  },

  "exp.hiking.title": { en: "Hiking Trails", es: "Senderos" },
  "exp.hiking.desc": {
    en: "Explore our bamboo forest and surrounding trails. Discover the lush biodiversity of Colombia's coffee axis.",
    es: "Explora nuestro bosque de bambú y senderos circundantes. Descubre la exuberante biodiversidad del eje cafetero.",
  },

  "exp.pool.title": { en: "Pool & Gardens", es: "Piscina y Jardines" },
  "exp.pool.desc": {
    en: "Relax by our swimming pool surrounded by tropical fruit gardens. Pick fresh fruits straight from the trees.",
    es: "Relájate junto a nuestra piscina rodeada de jardines frutales tropicales. Recoge frutas frescas directamente de los árboles.",
  },

  "exp.sunset.title": { en: "Sunset Views", es: "Atardeceres" },
  "exp.sunset.desc": {
    en: "Watch the sun paint the Andes in gold from our balconies. Every evening is a private show over the coffee landscape.",
    es: "Observa el sol pintando los Andes de oro desde nuestros balcones. Cada atardecer es un espectáculo privado sobre el paisaje cafetero.",
  },

  // ─── Amenities ───────────────────────────────────────────────────────────────
  "amenities.label": { en: "Amenities", es: "Comodidades" },
  "amenities.heading": {
    en: "Everything You Need",
    es: "Todo lo que Necesitas",
  },

  "amenity.pool": { en: "Swimming Pool", es: "Piscina" },
  "amenity.wifi": { en: "Free WiFi", es: "WiFi Gratuito" },
  "amenity.parking": { en: "Free Parking", es: "Estacionamiento" },
  "amenity.gym": { en: "Mini Gym", es: "Mini Gimnasio" },
  "amenity.dining": { en: "Restaurant", es: "Restaurante" },
  "amenity.reception": { en: "24h Reception", es: "Recepción 24h" },
  "amenity.bamboo": { en: "Bamboo Forest", es: "Bosque de Bambú" },
  "amenity.gardens": { en: "Fruit Gardens", es: "Jardines Frutales" },
  "amenity.river": { en: "River Access", es: "Acceso al Río" },
  "amenity.concierge": { en: "Concierge", es: "Conserjería" },
  "amenity.laundry": { en: "Laundry", es: "Lavandería" },
  "amenity.transfer": { en: "Airport Transfer", es: "Transporte Aeropuerto" },

  // ─── Location ────────────────────────────────────────────────────────────────
  "location.label": { en: "Location", es: "Ubicación" },
  "location.heading": {
    en: "In the Heart of Coffee Country",
    es: "En el Corazón del País Cafetero",
  },
  "location.address": {
    en: "Montenegro 1.5km vía Circasia, 633007, Quindío, Colombia",
    es: "Montenegro 1.5km vía Circasia, 633007, Quindío, Colombia",
  },
  "location.airport": {
    en: "25 min from El Edén Airport (AXM), Armenia",
    es: "25 min del Aeropuerto El Edén (AXM), Armenia",
  },
  "location.nearby.title": { en: "Nearby Attractions", es: "Atracciones Cercanas" },
  "location.nearby.parque": {
    en: "Parque del Café — 15 min",
    es: "Parque del Café — 15 min",
  },
  "location.nearby.salento": {
    en: "Salento & Valle de Cocora — 40 min",
    es: "Salento y Valle de Cocora — 40 min",
  },
  "location.nearby.armenia": {
    en: "Armenia city center — 20 min",
    es: "Centro de Armenia — 20 min",
  },
  "location.nearby.panaca": {
    en: "PANACA Theme Park — 10 min",
    es: "Parque Temático PANACA — 10 min",
  },

  // ─── Contact ─────────────────────────────────────────────────────────────────
  "contact.label": { en: "Get in Touch", es: "Contáctanos" },
  "contact.heading": {
    en: "Ready to Experience the Coffee Region?",
    es: "¿Listo para Vivir la Región Cafetera?",
  },
  "contact.subtitle": {
    en: "Book directly for the best rates, or reach out and we'll help plan your perfect stay.",
    es: "Reserva directamente para las mejores tarifas, o escríbenos y te ayudaremos a planear tu estadía perfecta.",
  },
  "contact.book": { en: "Book Your Stay", es: "Reserva Tu Estadía" },
  "contact.checkin": { en: "Check-in: 4:00 PM", es: "Check-in: 4:00 PM" },
  "contact.checkout": { en: "Check-out: 2:00 PM", es: "Check-out: 2:00 PM" },
  "contact.or": { en: "or contact us directly", es: "o contáctanos directamente" },

  // ─── Footer ──────────────────────────────────────────────────────────────────
  "footer.tagline": {
    en: "Boutique eco-hotel in Colombia's Coffee Cultural Landscape",
    es: "Eco-hotel boutique en el Paisaje Cultural Cafetero de Colombia",
  },
  "footer.rights": { en: "All rights reserved.", es: "Todos los derechos reservados." },

  // ─── Testimonial ─────────────────────────────────────────────────────────────
  "testimonial.label": { en: "Guest Reviews", es: "Opiniones" },
  "testimonial.quote": {
    en: "Staying at Hotel Quinto was the highlight of our trip to Colombia. Waking up to birdsong, swimming in the river, and watching the sunset from the bamboo balcony — it felt like a dream. The staff treated us like family.",
    es: "Hospedarnos en Hotel Quinto fue lo mejor de nuestro viaje a Colombia. Despertar con el canto de los pájaros, nadar en el río y ver el atardecer desde el balcón de bambú — fue como un sueño. El personal nos trató como familia.",
  },
  "testimonial.author": { en: "Sarah & James", es: "Sarah & James" },
  "testimonial.source": { en: "TripAdvisor Review", es: "Reseña en TripAdvisor" },

  // ─── Gallery ─────────────────────────────────────────────────────────────────
  "gallery.label": { en: "Gallery", es: "Galería" },
  "gallery.heading": {
    en: "A Glimpse of Paradise",
    es: "Un Vistazo al Paraíso",
  },
} as const;

export type TranslationKey = keyof typeof translations;

export function t(key: TranslationKey, lang: Lang): string {
  return translations[key][lang];
}

export default translations;
