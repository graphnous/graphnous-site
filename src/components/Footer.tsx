import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => (
    <footer className="py-12 border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
                <img src={logo} alt="Graphnous" className="h-5 w-5 grayscale opacity-50" />
                <span className="font-heading text-sm font-medium gradient-text">graphnous</span>
            </div>

            <div className="flex gap-8 text-xs text-muted-foreground">
                <Link to="/product" className="hover:text-primary transition-colors">Product</Link>
                <Link to="/about" className="hover:text-primary transition-colors">About</Link>
                <a href="#" className="hover:text-primary transition-colors">Documentation</a>
                <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            </div>

            <p className="text-muted-foreground text-xs">© 2026 Graphnous. All rights reserved.</p>
        </div>
    </footer>
);

export default Footer;
