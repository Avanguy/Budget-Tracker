import React from 'react'

const Section = ({ title, text, imgSrc, imgAlt, reverse }) => {
  return (
    <div className={`flex ${reverse ? 'flex-row-reverse' : 'flex-row'} items-center justify-between p-8 space-x-8 bg-gray-50 rounded-lg shadow-md my-8`}>
      <div className="flex-1">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">{title}</h2>
        <p className="text-lg text-center text-gray-600">{text}</p>
      </div>
      <div className="flex-1">
        <img src={imgSrc} alt={imgAlt} className="w-full h-auto rounded-lg" />
      </div>
    </div>
  )
}

const Home = () => {
  return (
    <div className="container mx-auto px-4">
      <Section
        title="Easily Visualize and Track Your Spending"
        text="Get a clear picture of your spending habits with simple tracking and helpful charts to guide your budgeting."
        imgSrc="https://via.placeholder.com/400"
        imgAlt="Visualization"
        reverse={false} // Image on the left
      />
      <Section
        title="Customizable Categories"
        text="Create your own categories to better track your personal expenses. Tailor your budget tracker to fit your unique lifestyle."
        imgSrc="https://via.placeholder.com/400"
        imgAlt="Categories"
        reverse={true} // Image on the right
      />
      <Section
        title="Detailed Reports"
        text="Generate monthly and yearly reports to see where your money is going and discover ways to save and budget smarter."
        imgSrc="https://via.placeholder.com/400"
        imgAlt="Reports"
        reverse={false} // Image on the left
      />
      <Section
        title="Track Recurring Payments"
        text="Easily add recurring payments like subscriptions, bills, and rent, so you never miss an important payment."
        imgSrc="https://via.placeholder.com/400"
        imgAlt="Recurring Payments"
        reverse={true} // Image on the right
      />
    </div>
  )
}

export default Home
