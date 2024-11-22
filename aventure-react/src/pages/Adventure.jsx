import HUD from '../components/HUD';
import AdventurePage from '../components/AdventurePage';

function Adventure() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Aventure</h1>
      <HUD />
      <div className="mt-8">
        <AdventurePage />
        {/* Ajoute ici les choix narratifs plus tard */}
      </div>
    </div>
  );
}

export default Adventure;
