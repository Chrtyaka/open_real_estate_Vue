import Home from "./components/Home"
import Objects from "./components/Objects"
import Map from "./components/Map"
import Price from "./components/Price"
export const routes = [
  {path : '/home', name : 'home ', components : {
      default: Home,
    }},
  {path : '/objects', name : 'objects', components:  {
    default : Objects
}},
  {path : '/objects/:tabname', name : 'objects', components:  {
      default : Objects
    }, props : true},
  {path : '/map', name : 'map', components:  {
      default : Map
    }},
  {path : '/price', name : 'price', components:  {
      default : Price
    }},
  {path : '/price/:tabname', name : 'price', components:  {
      default : Price
    }, props : true},
  {path : '', redirect : '/home'},
  {path : '*', redirect: {name : 'home'}
  }
];
