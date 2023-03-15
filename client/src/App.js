import {useState, useEffect} from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

//Navbar Component
import Navbar from './components/navigation/navbar';

//Page Components
import Home from './components/home/home.js';
import About from './components/about/about.js';
import Contact from './components/contact/contact.js';
import Chat from './components/chat/chat.js';
import Cart from './components/cart/cart.js'
import Checkout from './components/checkout/checkout.js'
import Register from './components/register/register.js'
import Login from './components/login/login.js'
import ProductDetail from './components/products/productDetail.js'
import Profile from './components/profile/profile.js'
import Footer from './components/footer/footer.js'
import Products from './components/products/products.js'
import ProtectedRoute from './components/route/protectedRoute.js'
import ChangePassword from './components/password/changePassword.js'
import ForgotPassword from './components/password/forgotPassword.js'
import ResetPassword from './components/password/resetPassword.js'
import AdminPanel from './components/admin/panel/adminPanel.js'

// react toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//redux toolkit imports
import store from './store/store.js'
import {getUserDetail} from './store/slices/userSlice.js'

//Importing main css file
import './App.css'

function App() {
  const [stripePublishableKey, setStripePublishableKey] = useState("");

  useEffect(() => {
    store.dispatch(getUserDetail());

    const getStripeApiKey = async () => {
      const res = await fetch('/payment/stripepublishablekey');
      const data = await res.json()
      setStripePublishableKey(data.stripepublishablekey);
    }

    getStripeApiKey();

  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />

        <Switch>
          <Route exact path='/' component={Home} />						
          <Route exact path='/about' component={About} />
          <Route exact path='/contact' component={Contact} />
          <Route exact path='/cart' component={Cart} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/search/:keyword' component={Products} />
          <Route exact path='/product/:id' component={ProductDetail} />
          <Route exact path='/password/forgot' component={ForgotPassword} />
          <Route exact path='/password/reset/:token' component={ResetPassword} />
          <ProtectedRoute exact path='/chat' component={Chat} />
          <ProtectedRoute exact path='/profile' component={Profile} />
          <ProtectedRoute exact path='/password/update' component={ChangePassword} />
          <ProtectedRoute exact path='/admin' component={AdminPanel} isAdmin={true} />
          {stripePublishableKey !== "" && <Elements stripe={loadStripe(stripePublishableKey)}><ProtectedRoute path='/checkout' component={Checkout} /></Elements>}     
        </Switch>

        <Footer />

        <ToastContainer position="top-center" autoClose={1500} newestOnTop={true} />
      </div>
    </BrowserRouter>
  );
}

export default App;
