import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Navbar from './components/Navbar';
import TableList from './components/TableList';
import Alert from './components/Alert';
import { ModalProvider } from './components/modal/ModalContext';
import ModalForm from './components/modal/ModalForm';
import { StudentProvider } from './components/studentData/StudentContext';
import { AlertProvider } from './components/alert/AlertContext';
import Footer from './components/Footer';

function App() {
  return (
    <StudentProvider>
      <ModalProvider>
        <AlertProvider>
          <Router>
            {/* <div className="flex flex-col justify-between h-screen"> */}
            <Navbar />
            <main>
              <TableList />
              <ModalForm />
              <Alert />
            </main>
            {/* </div> */}
            <Footer />
          </Router>
        </AlertProvider>
      </ModalProvider>
    </StudentProvider>
  );
}
export default App;
