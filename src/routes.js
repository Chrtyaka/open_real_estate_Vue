import Home from "./components/Home"
import Objects from "./components/Objects"
import Map from "./components/Map"
import Price from "./components/Price"
import City from "./components/City"

export const routes = [
  {
    path: '/home', name: 'home ', components: {
      default: Home,
    }
  },
  {
    path: '/objects', name: 'objects', components: {
      default: Objects
    }
  },
  {
    path: '/city', name: 'city', components: {
      default: City
    }
  },
  {
    path: '/map', name: 'map', components: {
      default: Map
    }
  },
  {
    path: '/price', name: 'price', components: {
      default: Price
    }
  },
  {path: '', redirect: '/home'},
  {
    path: '*', redirect: {name: 'home'}
  }
];
