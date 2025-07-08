const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Grandeur Hotel</h3>
            <p className="text-primary-foreground/80 mb-4">
              Experience luxury and comfort in the heart of the city with 
              world-class amenities and exceptional service.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-primary-foreground/80">
              <p>123 Luxury Street</p>
              <p>Downtown District</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Email: info@grandeurhotel.com</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Hours</h4>
            <div className="space-y-2 text-primary-foreground/80">
              <p>Check-in: 3:00 PM</p>
              <p>Check-out: 11:00 AM</p>
              <p>Restaurant: 6:00 AM - 11:00 PM</p>
              <p>Room Service: 24/7</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
          <p>&copy; 2024 Grandeur Hotel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;