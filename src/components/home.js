export const Home = () => {
    const div = document.createElement('div');
    const sectionTitle = document.createElement('h1');
    sectionTitle.textContent = 'PUBLICACIONES';

    div.appendChild(sectionTitle);
    
    return div;
  }