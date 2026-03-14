import { Link } from "react-router-dom";
import signatureImg from "@/assets/signature.png";

export const NKLogo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="relative h-12">
        {/* Warm golden glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-gold/40 via-gold-light/25 to-gold/40 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg scale-110" />
        
        {/* Signature with warm golden colorization */}
        <img
          src={signatureImg}
          alt="Nasif signature"
          className="relative h-full w-auto object-contain brightness-0 invert sepia-[0.85] saturate-[5] hue-rotate-[5deg] opacity-90 group-hover:opacity-100 transition-all duration-300 drop-shadow-[0_0_10px_hsl(35,90%,50%,0.5)] group-hover:drop-shadow-[0_0_20px_hsl(35,90%,50%,0.8)]"
        />
      </div>
    </Link>
  );
};
