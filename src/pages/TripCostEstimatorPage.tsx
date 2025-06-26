import React from 'react';

// Import custom layout components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Import the main feature component for this page
import TripCostEstimator from '@/components/TripCostEstimator';

const TripCostEstimatorPage: React.FC = () => {
  console.log('TripCostEstimatorPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      
      {/* Main content area */}
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
        {/* 
          The TripCostEstimator component is the star of this page. 
          It's self-contained and includes all the interactive elements 
          for calculating the trip cost.
        */}
        <TripCostEstimator />
      </main>
      
      <Footer />
    </div>
  );
};

export default TripCostEstimatorPage;