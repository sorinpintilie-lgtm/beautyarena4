import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Instagram, Facebook, Twitter } from 'lucide-react';
import SEO from '../components/common/SEO';

const ContactPage = () => {
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
      title: 'Adresă',
      details: ['Bulevardul Basarabia 96', 'București'],
      action: 'Vezi pe hartă',
      link: 'https://www.google.com/maps/place/Salon+Beauty+Arena/@44.4326188,26.1524149,805m/data=!3m2!1e3!4b1!4m6!3m5!1s0x40b1fecc42670a79:0xec62769fb5307edc!8m2!3d44.4326188!4d26.1524149!16s%2Fg%2F11b6nk_kl6?entry=ttu&g_ep=EgoyMDI1MTExMS4wIKXMDSoASAFQAw%3D%3D'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Telefon',
      details: ['0722402559'],
      action: 'Sună acum',
      link: 'tel:0722402559'
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
      details: ['Luni - Vineri: 9:00 - 20:00', 'Sâmbătă - Duminică: 10:00 - 18:00'],
      action: 'Vezi programările'
    }
  ];

  const socialLinks = [
    { icon: Instagram, name: 'Instagram', handle: '@beautyarena.ro', color: 'hover:text-pink-500' },
    { icon: Facebook, name: 'Facebook', handle: 'BeautyArena.ro', color: 'hover:text-blue-600' },
    { icon: Twitter, name: 'Twitter', handle: '@BeautyArena', color: 'hover:text-blue-400' },
    { icon: MessageCircle, name: 'WhatsApp', handle: '0722402559', color: 'hover:text-green-500' }
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
    <>
      <SEO
        title="Contact - BeautyArena"
        description="Contactează-ne pentru întrebări, programări sau informații despre serviciile noastre de frumusețe. Suntem aici pentru tine!"
        keywords="contact salon, programare salon, contact BeautyArena, telefon salon frumusețe"
      />

      <div className="min-h-screen bg-white pt-16">
        {/* Hero Section */}
        <section className="bg-beauty-pink/10 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-elegant font-bold text-black mb-6">
                Contactează-ne
              </h1>
              <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
                Ai întrebări sau vrei să afli mai multe despre serviciile noastre? 
                Suntem aici pentru tine și îți vom răspunde cât mai curând posibil.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-8">
                <div className="mb-6">
                  <h2 className="text-3xl font-elegant font-bold text-black mb-2">
                    Trimite-ne un mesaj
                  </h2>
                  <p className="text-gray-600">
                    Completează formularul și îți vom răspunde în maximum 24 de ore
                  </p>
                </div>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Mesaj trimis cu succes!</h3>
                    <p className="text-gray-600">
                      Îți mulțumim pentru mesaj. Îți vom răspunde cât mai curând posibil.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nume complet *
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
                          Adresă email *
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
                          Număr telefon
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
                          Subiect
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
                      style={{
                        background: isFormValid && !isSubmitting
                          ? 'linear-gradient(to right, #FFAB9D, #FF8B7A)'
                          : '#FFD5CC',
                        color: isFormValid && !isSubmitting ? 'white' : '#6B7280'
                      }}
                      className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                        isFormValid && !isSubmitting
                          ? 'hover:shadow-lg hover:scale-105'
                          : 'btn-disabled'
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
                    <div
                      key={index}
                      className={`bg-white border-2 border-gray-100 rounded-2xl p-6 text-center hover:border-beauty-pink transition-colors ${info.link ? 'cursor-pointer' : ''}`}
                      onClick={info.link ? () => window.open(info.link, '_blank') : undefined}
                    >
                      <div className="w-12 h-12 bg-beauty-pink/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <div className="text-beauty-pink">
                          {info.icon}
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                      <div className="space-y-1 mb-4">
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                        ))}
                      </div>
                      {info.link && (
                        <div className="text-beauty-pink text-sm font-medium hover:text-beauty-pink-dark">
                          {info.action}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Map Placeholder */}
                <div className="bg-white border-2 border-gray-100 rounded-2xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-beauty-pink" />
                    Locația noastră
                  </h3>
                  <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Hartă interactivă</p>
                      <p className="text-sm text-gray-500">Bulevardul Basarabia 96, București</p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-white border-2 border-gray-100 rounded-2xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Urmărește-ne pe social media</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={index}
                          href="#"
                          className={`flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-beauty-pink transition-all duration-300 group ${social.color}`}
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
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-elegant font-bold text-black mb-4">
                Întrebări frecvente
              </h2>
              <p className="text-lg text-gray-600">
                Răspunsuri la cele mai comune întrebări despre serviciile noastre
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  question: 'Cum pot programa o vizită?',
                  answer: 'Poți programa o vizită online prin formularul nostru, telefonic la 0722402559, sau direct în salon.'
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
                  question: 'Ce servicii oferiți?',
                  answer: 'Oferim o gamă completă de servicii de frumusețe: coafură, machiaj, îngrijire ten, manichiură, pedichiură și tratamente specializate.'
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-beauty-pink transition-colors">
                  <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                  <p className="text-gray-600 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;