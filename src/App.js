
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import List from './Users/List';
import { Create } from './Users/Create';
import Edit from './Users/Edit';
import View from './Users/View';



function App() {

  return (
  
      <Router>
        <Routes>
         
          <Route path='/users/edit/:id' element={<Edit/>} />
          <Route path='/users/create' element={<Create/>} />
          <Route path='/users/list' element={<List/>} />
          <Route path='/users/view' element={<View/>} />
        </Routes>
      </Router>
    
  );
}

export default App;
