import HUD from '../components/HUD';

function Adventure() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Bienvenue dans l'aventure !</h1>
      <HUD />
      <div className="mt-8">
        <p>Voici le début de votre quête...</p>
        {/* Ajoute ici les choix narratifs plus tard */}
      </div>
    </div>
  );
}

export default Adventure;
