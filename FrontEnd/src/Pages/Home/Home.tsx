import Content from "../../Components/User/Home/Content";
import Navbar from "../../Components/User/Navbar";

function Home() {
  return (
    <div style={{ minWidth: "100%", height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Navbar />
      <div style={{ flex: 1, overflow: "auto", marginTop: "64px" }}> {/* Adjusted marginTop for Navbar height */}
        <Content />
      </div>
    </div>
  );
}

export default Home;