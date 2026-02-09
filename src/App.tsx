import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import { Dashboard } from './components/Dashboard/Dashboard';

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Dashboard />
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
