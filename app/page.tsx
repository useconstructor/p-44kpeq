"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X, ShoppingCart, ArrowRight, Wheat, Clock, Users, Leaf, ChevronLeft, ChevronRight, Star, Check, Phone, Mail, MapPin, Instagram, Facebook, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartCount] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [formLoading, setFormLoading] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formError, setFormError] = useState('')

  const navLinks = [
    { name: 'Our Story', href: '#story' },
    { name: 'Breads', href: '#products' },
    { name: 'Pastries', href: '#products' },
    { name: 'Café', href: '#cafe' },
    { name: 'Journal', href: '#journal' }
  ]

  const stats = [
    { icon: Wheat, value: '12+', label: 'Years of Craft' },
    { icon: Clock, value: '1,200+', label: 'Fresh Loaves Daily' },
    { icon: Users, value: '8,500+', label: 'Happy Customers' },
    { icon: Leaf, value: '100%', label: 'Natural Ingredients' }
  ]

  const featuredProducts = [
    { name: 'Country Sourdough', price: '$7.50', image: '/images/hero.png' },
    { name: 'Seeded Whole Grain', price: '$8.25', image: '/images/feature.png' },
    { name: 'Butter Croissant', price: '$4.25', image: '/images/hero.png' },
    { name: 'Pain au Chocolat', price: '$4.50', image: '/images/feature.png' }
  ]

  const features = [
    { icon: Clock, title: 'Slow Fermentation', description: 'We believe in time honored techniques that bring out the best in every loaf.' },
    { icon: MapPin, title: 'Locally Sourced', description: 'Our ingredients come from trusted local farmers and producers.' },
    { icon: Leaf, title: 'No Shortcuts', description: 'No preservatives. No artificial additives. Just pure, honest ingredients.' },
    { icon: Wheat, title: 'Baked Fresh Daily', description: 'Everything is baked on site each day for unmatched freshness and flavor.' }
  ]

  const galleryImages = [
    { src: '/images/hero.png', alt: 'Fresh baked sourdough' },
    { src: '/images/feature.png', alt: 'Artisan croissants' },
    { src: '/images/hero.png', alt: 'Bread making process' },
    { src: '/images/feature.png', alt: 'Our bakery' },
    { src: '/images/hero.png', alt: 'Pastry selection' },
    { src: '/images/feature.png', alt: 'Daily bakes' }
  ]

  const testimonials = [
    { name: 'Maria G.', text: 'The best sourdough I have ever tasted. You can truly taste the difference that slow fermentation makes. My family looks forward to our weekly bread delivery.', rating: 5 },
    { name: 'Carlos R.', text: 'Their croissants are absolutely divine. Perfectly flaky and buttery, just like the ones I had in Paris. I am a customer for life.', rating: 5 },
    { name: 'Ana L.', text: 'Outstanding quality and the customer service is exceptional. The custom cake they made for my daughter birthday was a masterpiece.', rating: 5 }
  ]

  const pricingPlans = [
    { name: 'Weekly Essentials', price: '$35', period: '/week', features: ['2 Sourdough Loaves', '4 Croissants', 'Weekly Delivery', 'Pause Anytime'], popular: false },
    { name: 'Family Bundle', price: '$55', period: '/week', features: ['3 Artisan Loaves', '6 Croissants', '4 Pastries', 'Weekly Delivery', 'Priority Support'], popular: true },
    { name: 'Café Lover', price: '$75', period: '/week', features: ['4 Artisan Loaves', '8 Croissants', '6 Pastries', 'Bi-weekly Delivery', 'Exclusive Items'], popular: false }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormLoading(true)
    setFormError('')

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CONSTRUCTOR_API}/v1/forms/${process.env.NEXT_PUBLIC_PROJECT_ID}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formState)
        }
      )

      if (response.ok) {
        setFormSuccess(true)
      } else {
        setFormError('Something went wrong. Please try again.')
      }
    } catch {
      setFormError('Unable to send message. Please try again later.')
    } finally {
      setFormLoading(false)
    }
  }

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FBF8F3' }}>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b" style={{ backgroundColor: '#FBF8F3', borderColor: '#F5EDE4' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="text-xl font-semibold" style={{ color: '#2C2C2C', fontFamily: 'Crimson Text, serif' }}>
              Project 1788382773104
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium transition-colors hover:opacity-70"
                  style={{ color: '#4A3728', fontFamily: 'Inter, sans-serif' }}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Button
                className="rounded-none px-6"
                style={{ backgroundColor: '#C45D3F', color: '#FBF8F3' }}
              >
                Order Online
              </Button>
              <button className="relative p-2" style={{ color: '#4A3728' }}>
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 text-xs rounded-full flex items-center justify-center" style={{ backgroundColor: '#C45D3F', color: '#FBF8F3' }}>
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ color: '#4A3728' }}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
          style={{ backgroundColor: '#FBF8F3' }}
        >
          <div className="px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block text-sm font-medium"
                style={{ color: '#4A3728' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Button
              className="w-full rounded-none"
              style={{ backgroundColor: '#C45D3F', color: '#FBF8F3' }}
            >
              Order Online
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative" style={{ backgroundColor: '#FBF8F3' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 min-h-[600px]">
            {/* Left Content */}
            <div className="flex flex-col justify-center px-6 lg:px-12 py-16 lg:py-24">
              <span className="text-xs tracking-[0.2em] uppercase mb-6" style={{ color: '#C45D3F', fontFamily: 'Inter, sans-serif' }}>
                Artisan Bakery & Café
              </span>
              <h1 className="text-5xl lg:text-7xl font-normal leading-tight mb-6" style={{ color: '#2C2C2C', fontFamily: 'Crimson Text, serif' }}>
                Bread as it should be.
              </h1>
              <div className="w-12 h-0.5 mb-6" style={{ backgroundColor: '#C45D3F' }} />
              <p className="text-base leading-relaxed mb-8 max-w-md" style={{ color: '#4A3728', fontFamily: 'Inter, sans-serif' }}>
                Handcrafted with time, tradition, and the finest natural ingredients. Baked fresh every day in small batches.
              </p>
              <Link href="#products">
                <Button
                  className="inline-flex items-center gap-3 rounded-none px-8 py-6 text-sm"
                  style={{ backgroundColor: '#C45D3F', color: '#FBF8F3' }}
                >
                  Shop Breads
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Right Image */}
            <div className="relative h-[400px] lg:h-auto">
              <Image
                src="/images/hero.png"
                alt="Artisan bread making"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-8" style={{ backgroundColor: '#F5EDE4' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-4">
                <stat.icon className="w-8 h-8" style={{ color: '#C45D3F' }} />
                <div>
                  <div className="text-2xl lg:text-3xl font-normal" style={{ color: '#2C2C2C', fontFamily: 'Crimson Text, serif' }}>
                    {stat.value}
                  </div>
                  <div className="text-xs" style={{ color: '#4A3728', fontFamily: 'Inter, sans-serif' }}>
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-20" style={{ backgroundColor: '#FBF8F3' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-1">
              <span className="text-xs tracking-[0.2em] uppercase mb-4 block" style={{ color: '#C45D3F', fontFamily: 'Inter, sans-serif' }}>
                Featured
              </span>
              <h2 className="text-3xl lg:text-4xl font-normal mb-4" style={{ color: '#2C2C2C', fontFamily: 'Crimson Text, serif' }}>
                Our Daily Bakes
              </h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: '#4A3728', fontFamily: 'Inter, sans-serif' }}>
                Discover our most loved breads and pastries, crafted with care and baked to perfection.
              </p>
              <Link href="#products" className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: '#C45D3F' }}>
                View All Breads
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <Card key={index} className="group border-0 rounded-none overflow-hidden" style={{ backgroundColor: '#F5EDE4' }}>
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium mb-1" style={{ color: '#2C2C2C', fontFamily: 'Inter, sans-serif' }}>
                      {product.name}
                    </h3>
                    <p className="text-sm" style={{ color: '#C45D3F' }}>
                      {product.price}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features List */}
      <section id="features" className="py-20" style={{ backgroundColor: '#4A3728' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-1">
              <span className="text-xs tracking-[0.2em] uppercase mb-4 block" style={{ color: '#C45D3F', fontFamily: 'Inter, sans-serif' }}>
                Why Choose Us
              </span>
              <h2 className="text-3xl font-normal" style={{ color: '#FBF8F3', fontFamily: 'Crimson Text, serif' }}>
                Crafted with Purpose
              </h2>
            </div>

            <div className="lg:col-span-4 grid md:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(196, 93, 63, 0.2)' }}>
                    <feature.icon className="w-5 h-5" style={{ color: '#C45D3F' }} />
                  </div>
                  <h3 className="text-base font-medium mb-2" style={{ color: '#FBF8F3', fontFamily: 'Inter, sans-serif' }}>
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#F5EDE4', fontFamily: 'Inter, sans-serif', opacity: 0.8 }}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section id="gallery" className="py-20" style={{ backgroundColor: '#FBF8F3' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs tracking-[0.2em] uppercase mb-4 block" style={{ color: '#C45D3F', fontFamily: 'Inter, sans-serif' }}>
              Gallery
            </span>
            <h2 className="text-3xl lg:text-4xl font-normal" style={{ color: '#2C2C2C', fontFamily: 'Crimson Text, serif' }}>
              From Our Ovens
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <div key={index} className="relative aspect-square overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section id="testimonials" className="py-20" style={{ backgroundColor: '#F5EDE4' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs tracking-[0.2em] uppercase mb-4 block" style={{ color: '#C45D3F', fontFamily: 'Inter, sans-serif' }}>
              Testimonials
            </span>
            <h2 className="text-3xl lg:text-4xl font-normal" style={{ color: '#2C2C2C', fontFamily: 'Crimson Text, serif' }}>
              What Our Customers Say
            </h2>
          </div>

          <div className="relative">
            <div className="text-center px-8 md:px-16">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" style={{ color: '#C45D3F' }} />
                ))}
              </div>
              <p className="text-lg md:text-xl leading-relaxed mb-6" style={{ color: '#2C2C2C', fontFamily: 'Crimson Text, serif' }}>
                &ldquo;{testimonials[currentTestimonial].text}&rdquo;
              </p>
              <p className="text-sm font-medium" style={{ color: '#4A3728', fontFamily: 'Inter, sans-serif' }}>
                {testimonials[currentTestimonial].name}
              </p>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full flex items-center justify-center border transition-colors hover:bg-white"
                style={{ borderColor: '#C45D3F', color: '#C45D3F' }}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full flex items-center justify-center border transition-colors hover:bg-white"
                style={{ borderColor: '#C45D3F', color: '#C45D3F' }}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section id="pricing" className="py-20" style={{ backgroundColor: '#FBF8F3' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs tracking-[0.2em] uppercase mb-4 block" style={{ color: '#C45D3F', fontFamily: 'Inter, sans-serif' }}>
              Subscriptions
            </span>
            <h2 className="text-3xl lg:text-4xl font-normal mb-4" style={{ color: '#2C2C2C', fontFamily: 'Crimson Text, serif' }}>
              Fresh Bread, Every Week
            </h2>
            <p className="text-sm max-w-lg mx-auto" style={{ color: '#4A3728', fontFamily: 'Inter, sans-serif' }}>
              Never run out of artisan bread. Choose a subscription that fits your household.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative rounded-none p-8 border ${plan.popular ? 'border-2' : ''}`}
                style={{
                  backgroundColor: plan.popular ? '#4A3728' : '#FBF8F3',
                  borderColor: plan.popular ? '#C45D3F' : '#F5EDE4'
                }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs uppercase tracking-wider" style={{ backgroundColor: '#C45D3F', color: '#FBF8F3' }}>
                    Most Popular
                  </div>
                )}
                <h3 className="text-lg font-medium mb-2" style={{ color: plan.popular ? '#FBF8F3' : '#2C2C2C', fontFamily: 'Inter, sans-serif' }}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-normal" style={{ color: plan.popular ? '#FBF8F3' : '#2C2C2C', fontFamily: 'Crimson Text, serif' }}>
                    {plan.price}
                  </span>
                  <span className="text-sm ml-1" style={{ color: plan.popular ? '#F5EDE4' : '#4A3728' }}>
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm" style={{ color: plan.popular ? '#F5EDE4' : '#4A3728' }}>
                      <Check className="w-4 h-4" style={{ color: '#C45D3F' }} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full rounded-none py-6"
                  style={{
                    backgroundColor: plan.popular ? '#C45D3F' : 'transparent',
                    color: plan.popular ? '#FBF8F3' : '#C45D3F',
                    border: plan.popular ? 'none' : '1px solid #C45D3F'
                  }}
                >
                  Subscribe Now
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Split */}
      <section id="cta" className="relative overflow-hidden" style={{ backgroundColor: '#C45D3F' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2">
            <div className="relative h-[300px] lg:h-[400px]">
              <Image
                src="/images/feature.png"
                alt="Custom orders"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center px-6 lg:px-16 py-16">
              <h2 className="text-3xl lg:text-4xl font-normal mb-4" style={{ color: '#FBF8F3', fontFamily: 'Crimson Text, serif' }}>
                Custom Orders Welcome
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: '#F5EDE4', fontFamily: 'Inter, sans-serif' }}>
                Planning a special event? We create custom cakes, bread baskets, and pastry platters for weddings, corporate events, and celebrations of all kinds.
              </p>
              <Link href="#contact">
                <Button
                  className="inline-flex items-center gap-3 rounded-none px-8 py-6 text-sm w-fit"
                  style={{ backgroundColor: '#FBF8F3', color: '#C45D3F' }}
                >
                  Request Custom Order
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20" style={{ backgroundColor: '#FBF8F3' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs tracking-[0.2em] uppercase mb-4 block" style={{ color: '#C45D3F', fontFamily: 'Inter, sans-serif' }}>
              Contact Us
            </span>
            <h2 className="text-3xl lg:text-4xl font-normal mb-4" style={{ color: '#2C2C2C', fontFamily: 'Crimson Text, serif' }}>
              Get In Touch
            </h2>
            <p className="text-sm" style={{ color: '#4A3728', fontFamily: 'Inter, sans-serif' }}>
              Have questions about our products or want to place a custom order? We would love to hear from you.
            </p>
          </div>

          {formSuccess ? (
            <div className="text-center p-8 rounded-none" style={{ backgroundColor: '#F5EDE4' }}>
              <Check className="w-12 h-12 mx-auto mb-4" style={{ color: '#C45D3F' }} />
              <h3 className="text-xl font-medium mb-2" style={{ color: '#2C2C2C', fontFamily: 'Crimson Text, serif' }}>
                Message Sent!
              </h3>
              <p className="text-sm" style={{ color: '#4A3728' }}>
                Thank you for reaching out. We will get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#4A3728' }}>
                    Name
                  </label>
                  <Input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="rounded-none border-gray-300 focus:border-[#C45D3F] focus:ring-[#C45D3F]"
                    style={{ backgroundColor: '#FBF8F3' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#4A3728' }}>
                    Email
                  </label>
                  <Input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="rounded-none border-gray-300 focus:border-[#C45D3F] focus:ring-[#C45D3F]"
                    style={{ backgroundColor: '#FBF8F3' }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#4A3728' }}>
                  Phone (optional)
                </label>
                <Input
                  type="tel"
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  className="rounded-none border-gray-300 focus:border-[#C45D3F] focus:ring-[#C45D3F]"
                  style={{ backgroundColor: '#FBF8F3' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#4A3728' }}>
                  Message
                </label>
                <Textarea
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="rounded-none border-gray-300 focus:border-[#C45D3F] focus:ring-[#C45D3F]"
                  style={{ backgroundColor: '#FBF8F3' }}
                />
              </div>

              {formError && (
                <p className="text-sm text-red-600">{formError}</p>
              )}

              <Button
                type="submit"
                disabled={formLoading}
                className="w-full rounded-none py-6"
                style={{ backgroundColor: '#C45D3F', color: '#FBF8F3' }}
              >
                {formLoading ? 'Enviando...' : 'Send Message'}
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#2C2C2C' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold mb-4" style={{ color: '#FBF8F3', fontFamily: 'Crimson Text, serif' }}>
                Project 1788382773104
              </h3>
              <p className="text-sm leading-relaxed mb-6 max-w-md" style={{ color: '#F5EDE4', opacity: 0.8, fontFamily: 'Inter, sans-serif' }}>
                Handcrafted artisan breads and pastries, baked fresh daily with the finest natural ingredients. Tradition meets taste in every loaf.
              </p>
              <div className="flex gap-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: 'rgba(196, 93, 63, 0.2)', color: '#C45D3F' }}>
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: 'rgba(196, 93, 63, 0.2)', color: '#C45D3F' }}>
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: 'rgba(196, 93, 63, 0.2)', color: '#C45D3F' }}>
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium uppercase tracking-wider mb-4" style={{ color: '#FBF8F3' }}>
                Quick Links
              </h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm transition-colors hover:opacity-70" style={{ color: '#F5EDE4', opacity: 0.8 }}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium uppercase tracking-wider mb-4" style={{ color: '#FBF8F3' }}>
                Contact
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="mailto:hello@bakery.com" className="flex items-center gap-2 text-sm transition-colors hover:opacity-70" style={{ color: '#F5EDE4', opacity: 0.8 }}>
                    <Mail className="w-4 h-4" style={{ color: '#C45D3F' }} />
                    hello@bakery.com
                  </a>
                </li>
                <li>
                  <a href="tel:+1234567890" className="flex items-center gap-2 text-sm transition-colors hover:opacity-70" style={{ color: '#F5EDE4', opacity: 0.8 }}>
                    <Phone className="w-4 h-4" style={{ color: '#C45D3F' }} />
                    Contact by Phone
                  </a>
                </li>
                <li>
                  <span className="flex items-center gap-2 text-sm" style={{ color: '#F5EDE4', opacity: 0.8 }}>
                    <MapPin className="w-4 h-4" style={{ color: '#C45D3F' }} />
                    Visit Our Bakery
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-12 pt-8" style={{ borderColor: 'rgba(245, 237, 228, 0.2)' }}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm" style={{ color: '#F5EDE4', opacity: 0.6 }}>
                © {new Date().getFullYear()} Project 1788382773104. All rights reserved.
              </p>
              <div className="flex gap-6">
                <Link href="#privacy" className="text-sm transition-colors hover:opacity-70" style={{ color: '#F5EDE4', opacity: 0.6 }}>
                  Privacy Policy
                </Link>
                <Link href="#terms" className="text-sm transition-colors hover:opacity-70" style={{ color: '#F5EDE4', opacity: 0.6 }}>
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}