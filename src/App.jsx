
import './App.css';
import MyBarChart from './components/BarChart';
import ForceDirectedGraph from './components/ForceDirectedGraph';
 import InteractiveBarChart from './components/InteractiveBarChart';
import LineChart from './components/LineChart';


function App() {
  return (
    <div>
      <MyBarChart/>
      <InteractiveBarChart/>
      <LineChart/>
      <ForceDirectedGraph/>
    </div>
  );
}

export default App;
