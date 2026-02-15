import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Navbar = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container mx-auto flex items-center justify-between h-16 px-6">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <img src={logo} alt="Graphnous" className="h-8 w-8" />
                <span className="font-heading text-xl font-bold gradient-text">Graphnous</span>
            </Link>

            <div className="hidden md:flex items-center gap-8 ml-8">
                <Link to="/product" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Product</Link>
                <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">About</Link>
            </div>

            <div className="flex items-center gap-3 ml-auto">
                <Button variant="ghost" size="sm">Log in</Button>
                <Button variant="hero" size="sm">Sign up</Button>
            </div>
        </div>
    </nav>
);

export default Navbar;
