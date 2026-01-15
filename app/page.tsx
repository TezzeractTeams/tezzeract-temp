import BackgroundShape from "./components/BackgroundShape";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full h-full mx-auto">
        {/* Rounded SVG Shape */}
        <BackgroundShape 
          className="w-full h-[100vh] mx-auto relative"
          borderRadius={24}
        />
      </div>
    </div>
  );
}
