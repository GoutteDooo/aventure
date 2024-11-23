import HUD from '../components/HUD';
import AdventurePage from '../components/AdventurePage';

function Adventure() {
  return (
    <div className="relative h-screen bg-gray-900 text-white">
      <HUD />
      <div className="flex flex-col items-center justify-center h-full mx-36">
        <h1 className="text-3xl font-bold mb-4">Aventure</h1>
        <AdventurePage />
      </div>
    </div>
  );
}

export default Adventure;
