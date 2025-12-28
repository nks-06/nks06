import { Link } from "react-router-dom";

export const NKLogo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="relative w-10 h-10">
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary via-gold-light to-primary opacity-20 blur-sm group-hover:opacity-40 transition-opacity" />
        
        {/* Main logo container */}
        <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center overflow-hidden group-hover:border-primary/60 transition-all duration-300">
          {/* Animated background shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          
          {/* NK Letters */}
          <span className="relative font-bold text-lg tracking-tighter">
            <span className="text-gradient">N</span>
            <span className="text-primary">K</span>
          </span>
          
          {/* Corner accent */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-bl-lg opacity-60" />
        </div>
      </div>
      
      <span className="hidden md:inline text-foreground font-medium group-hover:text-primary transition-colors duration-300">
        Nasif Kamal
      </span>
    </Link>
  );
};
