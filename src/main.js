// DSC ART GALLERY ENGINE
document.addEventListener('DOMContentLoaded', () => {
  initArtInteractions();
});

function initArtInteractions() {
  const cards = document.querySelectorAll('.art-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('.art-title')?.textContent || 'Artwork';
      const medium = card.querySelector('.art-medium')?.textContent || '';
      console.log(`Selected artwork: ${title} (${medium})`);
    });
  });
}
