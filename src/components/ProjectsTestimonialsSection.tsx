import React from 'react';

const cases = ['case-1', 'case-2', 'case-3'];
const testimonials = ['testimonial-1', 'testimonial-2', 'testimonial-3'];

export const ProjectsTestimonialsSection: React.FC = () => (
  <div className="bg-[#eaf2ff] px-4 py-14 text-[#071947] sm:py-20">
    <div className="mx-auto max-w-6xl">
      <section aria-labelledby="projetos-titulo">
        <p className="mb-2 font-semibold text-[#0040ff]">Portfólio</p>
        <h2 id="projetos-titulo" className="mb-8 font-display text-3xl font-semibold">Projetos</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {cases.map((item, index) => (
            <article key={item} className="border-t-4 border-[#ff861a] bg-white p-5">
              <h3 className="mb-4 font-display text-xl font-semibold">TODO: nome do negócio {index + 1}</h3>
              <dl className="space-y-3 text-sm leading-6">
                <div>
                  <dt className="font-semibold">Segmento</dt>
                  <dd>TODO: informar o segmento.</dd>
                </div>
                <div>
                  <dt className="font-semibold">O que foi feito</dt>
                  <dd>TODO: descrever o trabalho realizado.</dd>
                </div>
                <div>
                  <dt className="font-semibold">Link do projeto</dt>
                  <dd>TODO: adicionar link, se autorizado.</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="depoimentos-titulo" className="mt-14 border-t border-[#0040ff]/20 pt-10 sm:mt-16">
        <p className="mb-2 font-semibold text-[#0040ff]">Experiências de clientes</p>
        <h2 id="depoimentos-titulo" className="mb-8 font-display text-3xl font-semibold">Depoimentos</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <blockquote key={item} className="border-l-4 border-[#ff861a] bg-white p-5">
              <p>TODO: inserir depoimento curto autorizado.</p>
              <footer className="mt-4 text-sm font-semibold">TODO: nome e negócio {index + 1}</footer>
            </blockquote>
          ))}
        </div>
      </section>
    </div>
  </div>
);

export default ProjectsTestimonialsSection;