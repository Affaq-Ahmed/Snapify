import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './globals.css';
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import { Home } from './_root/pages';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';

const App = () => {
	return (
		<main className='flex h-screen'>
			<Routes>
				{/* Public */}
				<Route element={<AuthLayout />}>
					<Route path='/signin' element={<SigninForm />} />
					<Route path='/signup' element={<SignupForm />} />
				</Route>
				{/* Private */}
				<Route element={<RootLayout />}>
					<Route index element={<Home />} />
				</Route>
			</Routes>
		</main>
	);
};

export default App;