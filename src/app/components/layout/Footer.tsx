export function Footer() {
    return (
      <footer className="bg-[#002b5c] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left side - Logo and text */}
            <div className="lg:col-span-1">
              {/* Logo placeholder */}
              <div className="w-32 h-12 bg-white rounded mb-6"></div>
  
              {/* Copyright text */}
              <div className="text-sm text-gray-300 space-y-2">
                <p>Ma'lumotlardan foydalanganda www.president.uz ga havola ko'rsatilishi shart</p>
                <p>O'zbekiston Respublikasi Prezidentining rasmiy veb-sayti</p>
                <p>Barcha huquqlari himoyalangan</p>
              </div>
            </div>
  
            {/* Navigation columns */}
            <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Column 1: Asosiy */}
              <div>
                <h3 className="font-semibold text-white mb-4">Asosiy</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                      Biz haqimizda
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                      Platforma afzalliklari
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                      Mukofot turlari
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                      Yordam
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                      Faq
                    </a>
                  </li>
                </ul>
              </div>
  
              {/* Column 2: Biz haqimizda */}
              <div>
                <h3 className="font-semibold text-white mb-4">Biz haqimizda</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                      Our History
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                      The Review
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                      Support
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                      Goings On
                    </a>
                  </li>
                </ul>
              </div>
  
              {/* Column 3: Yoriqnomalar */}
              <div>
                <h3 className="font-semibold text-white mb-4">Yoriqnomalar</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                      Our History
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                      The Review
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                      Support
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                      Goings On
                    </a>
                  </li>
                </ul>
              </div>
  
              {/* Column 4: Arizalar */}
              <div>
                <h3 className="font-semibold text-white mb-4">Arizalar</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                      Our History
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                      The Review
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                      Support
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                      Goings On
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
  
          {/* Bottom section with divider */}
          <div className="mt-12 pt-8 border-t border-gray-600">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p className="text-gray-300 text-sm mb-4 sm:mb-0">© 2025 Davlat proyektı. All rights reserved.</p>
  
              {/* Social media icon placeholders */}
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-white rounded"></div>
                <div className="w-8 h-8 bg-white rounded"></div>
                <div className="w-8 h-8 bg-white rounded"></div>
                <div className="w-8 h-8 bg-white rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    )
  }
  