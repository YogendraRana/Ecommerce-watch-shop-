import React, {useState, useEffect} from 'react';
import {toast} from 'react-toastify'

//importing components
import Hero from './hero.js'
import Category from '../category/category.js'
import Products from '../products/products.js'
import Subscribe from '../subscribe/subscribe.js'

// import seo
import Seo from '../seo/seo.js'

const Home = () => {
    const [show, setShow] = useState(4);
    const [current, setCurrent] = useState(0);
    const [_current, _setCurrent] = useState(0);

    const [loading, setLoading] = useState(false)
    const [newArrivals, setNewArrivals] = useState([]);
    const [highestRated, setHighestRated] = useState([]);

    const useWindowSize = () => {
        const [size, setSize] = useState({height: window.innerHeight, width: window.innerWidth});

        useEffect(() => {
            const handleResize = () => setSize({height: window.innerHeight, width: window.innerWidth})

            window.addEventListener("resize", handleResize);

            if(size.width <= 480) setShow(1);
            else if(size.width <= 992) setShow(2);
            else if(size.width <= 1380) setShow(3);
            else setShow(4);

            return () => window.removeEventListener("resize", handleResize);

        })
        return size;
    }   

    useWindowSize();

    //functions for newArrivals
    const prev = () => current === 0 ? setCurrent(0) : setCurrent(prevState => prevState - 1);     
    const next = () => current === (newArrivals.length-show) ? setCurrent(newArrivals.length-show) : setCurrent(prevState => prevState + 1);

    //functions for trending items
    const _prev = () => _current === 0 ? _setCurrent(0) : _setCurrent(prevState => prevState - 1);      
    const _next = () => _current === (highestRated.length-show) ? _setCurrent(highestRated.length-show) : _setCurrent(prevState => prevState + 1);

    useEffect(() => {
        const getRecommendations = async () => {
            try{
                const res = await fetch(`/api/v1/products/recommendation`);
                const data = await res.json();
                setNewArrivals(data.newArrivals);
                setHighestRated(data.highestRated);
                setLoading(false);
            }catch(err){
                toast.error(err.message)
                setLoading(false);
            }
        }
        
        getRecommendations();
    }, [])

	return (
        <>
            <Seo title='TIME ZN' descripion='Home page of Time Zn' />
            <section>
                <Hero />
            </section>

            <section>
                <Category name="New Arrivals" products={newArrivals} prev={prev} next={next} count={current} show={show} loading={loading} />
                <Category name="Highest Rated" products={highestRated} prev={_prev} next={_next} count={_current} show={show} loading={loading} />
            </section>

            <section>
                <Subscribe />
            </section>

            <section>
                <Products />
            </section>
		</>
	)
}

export default Home