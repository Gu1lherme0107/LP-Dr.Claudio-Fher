interface Testimonial {
  name: string;
  image: string;
  text: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    name: "Marina Santos",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    text: "A abordagem do Dr. Fher transformou completamente minha qualidade de vida. A precisão dos diagnósticos e o tratamento personalizado superaram todas as minhas expectativas.",
    rating: 5
  },
  {
    name: "Carlos Ribeiro",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    text: "Nunca imaginei que a bioengenharia pudesse ser aplicada de forma tão humana. O Dr. Fher não apenas trata, ele projeta soluções únicas para cada paciente.",
    rating: 5
  },
  {
    name: "Ana Oliveira",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    text: "A medicina de precisão do Dr. Fher revolucionou meu tratamento. Cada etapa foi meticulosamente planejada e os resultados foram extraordinários.",
    rating: 5
  }
]; 