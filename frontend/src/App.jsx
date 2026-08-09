import {BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ProjectDetails from "./pages/ProjectDetails";
import StoryDetails from "./pages/StoryDetails";

import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/"
					element={<Dashboard/>}/>

				<Route path="/projects/:id"
					element={<ProjectDetails/>}/>

				<Route path="/stories/:id"
					element={<StoryDetails/>}/>
          
			</Routes>
		</BrowserRouter>
	);
}

export default App;
