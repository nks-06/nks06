import { Link } from "react-router-dom";
import signatureImg from "@/assets/signature.png";

export const NKLogo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="relative h-16">
        {/* Neon golden glow backdrop */}
        <div className="absolute inset-0 bg-gradient-to-r from-gold/50 via-gold-light/30 to-gold/50 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 rounded-lg scale-125" />
        <div className="absolute inset-0 bg-gradient-to-r from-gold/30 via-gold-light/20 to-gold/30 blur-2xl opacity-40 group-hover:opacity-80 transition-opacity duration-700 rounded-lg scale-150" />
        
        {/* Signature with premium warm golden neon effect */}
        <img
          src={signatureImg}
          alt="Nasif signature"
          className="relative h-full w-auto object-contain brightness-0 invert sepia-[0.9] saturate-[6] hue-rotate-[2deg] opacity-95 group-hover:opacity-100 transition-all duration-300 drop-shadow-[0_0_12px_hsl(35,95%,50%,0.7)] group-hover:drop-shadow-[0_0_25px_hsl(35,95%,50%,1)]"
        />
      </div>
    </Link>
  );
};
