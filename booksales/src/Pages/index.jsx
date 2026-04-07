import Book from "../components/shared/Book";
import Contact from "../components/shared/Contact";
import Hero from "../components/shared/Hero";
import ProductList from "../components/shared/ProductList";
import Team from "../components/shared/Team";

export default function Home() {
    return (
<>
    <Hero />
    <ProductList/>
    <Book/>
    <Team/>
    <Contact/>
</>
    )
}