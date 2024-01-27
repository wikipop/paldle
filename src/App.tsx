import Main from "./components/main.tsx";
import heroImage from "@/assets/hero-photo.jpg";

function App() {
  return (
    <div className="h-screen w-screen " style={{ backgroundImage: `url(${heroImage})`}}>
        <main className="m-auto w-1/3 text-center pt-24">
            <h1 className="text-5xl"> Welcome to paldle! </h1>
            <br/>
            <Main />
        </main>
    </div>
  )
}

export default App
