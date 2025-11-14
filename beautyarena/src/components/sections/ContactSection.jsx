import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Instagram, Facebook, Twitter } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Adresa',
      details: ['Strada Frumuseții 123', 'Orașul Glamour, CJ 400000'],
      action: 'Vezi pe hartă'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Telefon',
      details: ['+40 264 123 456', '+40 753 987 654'],
      action: 'Sună acum'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      details: ['info@beautyarena.ro', 'programari@beautyarena.ro'],
      action: 'Trimite email'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Program',
      details: ['Lun - Vin: 9:00 - 20:00', 'Sâm - Dum: 10:00 - 18:00'],
      action: 'Vezi programările'
    }
  ];

  const socialLinks = [
    { icon: Instagram, name: 'Instagram', handle: '@beautyarena.ro', color: 'hover:text-pink-500' },
    { icon: Facebook, name: 'Facebook', handle: 'BeautyArena.ro', color: 'hover:text-blue-600' },
    { icon: Twitter, name: 'Twitter', handle: '@BeautyArena', color: 'hover:text-blue-400' },
    { icon: MessageCircle, name: 'WhatsApp', handle: '+40 753 987 654', color: 'hover:text-green-500' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after success message
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  const isFormValid = formData.name && formData.email && formData.message;

  return (
    <section id="contact" className="section-padding bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-beauty-pink/10 rounded-full border border-beauty-pink/20 mb-6">
            <MessageCircle className="w-4 h-4 text-beauty-pink mr-2" />
            <span className="text-sm font-medium text-beauty-pink">Contactează-ne</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-elegant font-bold text-gray-900 mb-6">
            Suntem aici pentru
            <span className="block gradient-text">Tine</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ai întrebări sau vrei să afli mai multe despre serviciile noastre? 
            Contactează-ne și îți vom răspunde cât mai curând posibil.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="card-beauty">
            <div className="mb-6">
              <h3 className="text-2xl font-elegant font-bold text-gray-900 mb-2">
                Trimite-ne un mesaj
              </h3>
              <p className="text-gray-600">
                Completează formularul și îți vom răspunde în maximum 24 de ore
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Mesaj trimis cu succes!</h4>
                <p className="text-gray-600">
                  Îți mulțumim pentru mesaj. Îți vom răspunde cât mai curând posibil.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Numele complet *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-beauty-pink transition-colors duration-300"
                      placeholder="Introdu numele tău"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adresa de email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-beauty-pink transition-colors duration-300"
                      placeholder="email@exemplu.ro"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Numărul de telefon
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-beauty-pink transition-colors duration-300"
                      placeholder="07xx xxx xxx"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subiectul
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-beauty-pink transition-colors duration-300"
                    >
                      <option value="">Selectează subiectul</option>
                      <option value="servicii">Informații despre servicii</option>
                      <option value="programari">Programări</option>
                      <option value="preturi">Prețuri</option>
                      <option value="produse">Produse</option>
                      <option value="plata">Modalități de plată</option>
                      <option value="alte">Alte întrebări</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mesajul tău *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-beauty-pink transition-colors duration-300"
                    placeholder="Spune-ne cum te putem ajuta..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className={`w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                    isFormValid && !isSubmitting
                      ? 'btn-primary'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Se trimite...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Trimite mesajul</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="card-beauty text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-beauty-pink to-beauty-pink-dark rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-white">
                      {info.icon}
                    </div>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{info.title}</h4>
                  <div className="space-y-1 mb-4">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                    ))}
                  </div>
                  <button className="text-beauty-pink text-sm font-medium hover:underline">
                    {info.action}
                  </button>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="card-beauty">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-beauty-pink" />
                Locația noastră
              </h4>
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Hartă interactivă</p>
                  <p className="text-sm text-gray-500">Strada Frumuseții 123, Cluj-Napoca</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="card-beauty">
              <h4 className="font-semibold text-gray-900 mb-4">Urmărește-ne pe social media</h4>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href="#"
                      className={`flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-beauty-pink transition-all duration-300 group ${social.color}`}
                    >
                      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      <div>
                        <p className="font-medium text-sm">{social.name}</p>
                        <p className="text-xs text-gray-600">{social.handle}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-gradient-to-r from-gray-900 to-beauty-pink-dark rounded-2xl p-6 text-white">
              <h4 className="font-semibold mb-3">Contact rapid</h4>
              <p className="text-pink-100 mb-4 text-sm">
                Pentru urgențe sau programări urgente, sună-ne direct!
              </p>
              <div className="space-y-2">
                <a 
                  href="tel:+40264123456"
                  className="flex items-center text-pink-100 hover:text-white transition-colors duration-300"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  +40 264 123 456
                </a>
                <a 
                  href="mailto:info@beautyarena.ro"
                  className="flex items-center text-pink-100 hover:text-white transition-colors duration-300"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  info@beautyarena.ro
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-elegant font-bold text-gray-900 mb-2">
              Întrebări frecvente
            </h3>
            <p className="text-gray-600">
              Răspunsuri la cele mai comune întrebări despre serviciile noastre
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: 'Cum pot programa o vizită?',
                answer: 'Poți programa o vizită online prin formularul nostru, telefonic la +40 264 123 456, sau direct în salon.'
              },
              {
                question: 'Care este politica de anulare?',
                answer: 'Anulările se pot face cu minimum 24 de ore înainte. Pentru anulări de ultim moment, se aplică o taxă de 50%.'
              },
              {
                question: 'Acceptați plata cu cardul?',
                answer: 'Da, acceptăm toate cardurile majore: Visa, MasterCard, și plăți mobile (Apple Pay, Google Pay).'
              },
              {
                question: 'Oferiți consultații gratuite?',
                answer: 'Da, oferim consultații gratuite pentru toate serviciile. Este nevoie de programare prealabilă.'
              }
            ].map((faq, index) => (
              <div key={index} className="card-beauty">
                <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;