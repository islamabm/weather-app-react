import { Route, HashRouter as Router, Switch } from 'react-router-dom'
import './assets/scss/global.scss'
import Signup from './views/Signup'
import WeatherView from './views/WeatherView'
import { UserMsg } from './cmps/UserMsg'
function App() {
  return (
    <Router>
      <section className="main-app">
        <UserMsg />
        <main>
          <Switch>
            <Route path="/weather" component={WeatherView} />
            <Route path="/" component={Signup} />
          </Switch>
        </main>
      </section>
    </Router>
  )
}

export default App
