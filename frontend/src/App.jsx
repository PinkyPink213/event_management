import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import EventDetail from './pages/EventDetail';

export default function App() {
	return (
		<BrowserRouter>
			<div className='container mt-4'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/create' element={<CreateEvent />} />
					<Route path='/events/:id' element={<EventDetail />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}
