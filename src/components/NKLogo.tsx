import { Link } from "react-router-dom";
import signatureImg from "@/assets/signature.png";

export const NKLogo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="relative h-10">
        {/* Golden glow behind signature */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-gold-light/20 to-primary/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
        
        {/* Signature image with golden tint */}
        <img
          src={signatureImg}
          alt="Nasif signature"
          className="relative h-full w-auto object-contain brightness-0 invert sepia saturate-[3] hue-rotate-[10deg] opacity-90 group-hover:opacity-100 transition-all duration-300 drop-shadow-[0_0_8px_hsl(38,95%,55%,0.4)] group-hover:drop-shadow-[0_0_16px_hsl(38,95%,55%,0.7)]"
        />
      </div>
    </Link>
  );
};
