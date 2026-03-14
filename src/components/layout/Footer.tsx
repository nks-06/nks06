import { Link } from "react-router-dom";
import { Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { NKLogo } from "@/components/NKLogo";

export const Footer = () => {
  const { personalInfo } = usePortfolio();

  const handleWhatsApp = () => {
    const phone = personalInfo.whatsapp.replace(/[^0-9]/g, "");
    window.open(`https://wa.me/${phone}`, "_blank");
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <NKLogo />
            <p className="text-muted-foreground leading-relaxed">
              ERP & AI Automation Expert with 7+ years of experience in
              software development, IT administration, and digital
              transformation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Quick Links
            </h3>
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                About Me
              </Link>
              <Link
                to="/experience"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Experience
              </Link>
              <Link
                to="/contact"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </Link>
              <Link
                to="/admin"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Admin Panel
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Get In Touch
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                {personalInfo.email}
              </a>
              <button
                onClick={handleWhatsApp}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-left"
              >
                <Phone className="w-4 h-4" />
                {personalInfo.phone}
              </button>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                {personalInfo.location}
              </div>
              <div className="flex items-center gap-4 pt-2">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Nasif Kamal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
