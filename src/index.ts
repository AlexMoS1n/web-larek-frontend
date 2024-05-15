import './scss/styles.scss';
import { EventEmitter } from "./components/base/Events";
import { ProductsData } from "./components/ProductsData";

const events = new EventEmitter()
const products = new ProductsData(events)