# 🍰 Ely Doces - Landing Page Premium

> Uma experiência digital imersiva para uma confeitaria artesanal, focada em UI/UX de alta performance, animações fluídas e design responsivo.

![Project Status](https://img.shields.io/badge/Status-Finalizado-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

## 🎨 Sobre o Projeto

Este projeto é uma **Landing Page de Alta Conversão** desenvolvida para a **Ely Doces**. O objetivo foi criar uma interface que transmitisse a sofisticação e a qualidade dos produtos artesanais através de interações modernas e uma navegação "manteiga" (smooth scroll).

O diferencial técnico está no uso de **Animações Scroll-Driven** (ativadas pela rolagem) e física avançada para transições de seção.

## 🚀 Tecnologias Utilizadas

O projeto foi construído com uma stack moderna focada em performance e animação:

* **⚡ [Vite](https://vitejs.dev/)** - Build tool ultra-rápida.
* **⚛️ [React](https://react.dev/)** - Biblioteca para construção da interface.
* **🌊 [Tailwind CSS](https://tailwindcss.com/)** - Estilização utilitária e responsiva.
* **motion [Framer Motion](https://www.framer.com/motion/)** - Biblioteca poderosa para animações complexas.
* **📜 [Lenis](https://lenis.studio/)** - Scroll suave (Smooth Scroll) para uma experiência de luxo.
* **🎨 [Lucide React](https://lucide.dev/)** - Ícones leves e modernos.

## ✨ Funcionalidades de destaque

1.  **Scroll Suave (Lenis):** A navegação tem inércia e suavidade, similar a aplicativos nativos.
2.  **Efeito "Lateral Wipe":** A seção "Sobre" possui uma entrada dramática lateral com física ajustada (`cubic-bezier`) e sombra dinâmica.
3.  **Scroll-Driven Animations:**
    * Textos que se revelam com desfoque e subida.
    * Imagens com efeito de escala e parallax.
4.  **Sticky Sections:** Efeito de empilhamento de seções (baralho) ao rolar a página.
5.  **Responsividade Total:**
    * Menu Mobile animado.
    * Otimização para iOS (remoção de tap-highlight e ajuste de notch).
    * Favicon SVG personalizado.
6.  **Integração WhatsApp:** Botões de ação (CTA) direcionam diretamente para o pedido.

## 📦 Como rodar o projeto

Pré-requisitos: Você precisa ter o [Node.js](https://nodejs.org/) instalado.

```bash
# 1. Clone o repositório
git clone [https://github.com/vitorkj-dev/ely-doces.git](https://github.com/vitorkj-dev/ely-doces.git)

# 2. Entre na pasta do projeto
cd ely-doces

# 3. Instale as dependências
npm install

# 4. Rode o servidor de desenvolvimento
npm run dev