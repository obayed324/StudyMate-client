import React from 'react';
import Banner from '../../components/Banner';
import TopPartners from '../../components/TopPartners';
import TopPartnersSection from '../../components/TopPartners';
import HowItWorks from '../../components/HowItWorks';
import Testimonials from '../../components/Testimonials';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <TopPartnersSection></TopPartnersSection>
            <HowItWorks></HowItWorks>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;