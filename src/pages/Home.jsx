import React from "react";

function Home() {
  const blogPosts = [
    {
      id: 1,
      date: "Apr 18, 2024",
      title: "CM Fixed Income: Exiting Banking & PSU to Add a New Gilt Fund",
      excerpt:
        "We are increasing the duration of our Fixed Income portfolio to reflect the current macro conditions. We want to take advantage of the current higher rates to further increase the duration of the Gilt funds we hold. Read more...",
    },
    {
      id: 2,
      date: "Apr 05, 2024",
      title: "Craftsman Automation: Poised for Growth Amid Temporary Headwinds",
      excerpt:
        "Unlock this post by trail. Craftsman Automation excels in making precise parts for cars and machines. Amidst temporary headwinds, looks resilient with a focus on growth and innovation....",
    },
    {
      id: 3,
      date: "Apr 03, 2024",
      title:
        "The Focused Way of Investing: Our Four-Quadrant Strategy and FY24 Review",
      excerpt:
        "FY24 brought us a 42% gain in our Capitalmind Focused portfolio, gently outperforming the Nifty's 29%. It's been a bit of a rollercoaster, especially these last few months, but that's part of the equity investing. It's like having a compass....",
    },
    {
      id: 4,
      date: "Mar 27, 2024",
      title: "A Small CAD for India, Yet Again",
      excerpt:
        "Yet again, India's Current Account Deficit is a mere 10 bp in the quarter (Dec 2023), less than levels more than a decade back, and less than 2017-18 too. Why net of gold? It's not really a current account import...",
    },
    {
      id: 5,
      date: "Mar 25, 2024",
      title: "Poonawalla Fincorp: One right step at a time",
      excerpt:
        "There are some winning patterns in investing that keep repeating. One such pattern is when a big company buys a struggling company, fixes old problems, and brings in new leadership to grow the business. This way has often led to...",
    },
    {
      id: 6,
      date: "Mar 18, 2024",
      title:
        "CM Focused: Reducing our allocation to smallcaps & increasing cash",
      excerpt:
        "In the last few days, we have seen increased volatility in the mid and small-cap sectors in the market. Election worries have led to follow the crowd selling.",
    },
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Home</h1>
      </div>

      <div className="info-cards">
        <div className="info-card">
          <h3>Get started</h3>
          <p>
            Read our getting started guide to get the most out of your
            Capitalmind subscription.
          </p>
        </div>
        <div className="info-card">
          <h3>Community</h3>
          <p>
            Join the conversation on our exclusive community on Slack for
            Capitalmind Premium subscribers
          </p>
        </div>
        <div className="info-card">
          <h3>Visit website</h3>
          <p>Keep up with our latest content on our website</p>
        </div>
      </div>

      <h2 className="section-title">Latest Posts</h2>
      <div className="blog-grid">
        {blogPosts.map((post) => (
          <div key={post.id} className="blog-card">
            <div className="blog-date">{post.date}</div>
            <h3 className="blog-title">{post.title}</h3>
            <p className="blog-excerpt">{post.excerpt}</p>
            <a href="#" className="read-more">
              Read full post
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
