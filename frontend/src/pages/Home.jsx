import "../styles/home.css"

const Home = () => {
  return (
    <div className="home-root">

      {/* Overlay */}
      <div className="overlay"></div>

      {/* Content */}
      <div className="content">

        <h1>
          Disaster Management <span>System</span>
        </h1>

        <p>
          A smart platform to monitor disasters, coordinate emergency response,
          and help communities recover faster and safer.
        </p>

        <div className="actions">
          <a href="/signup" className="btn-primary">Get Started</a>
          <a href="/about" className="btn-secondary">About Us</a>
        </div>

      </div>

    </div>
  )
}

export default Home
