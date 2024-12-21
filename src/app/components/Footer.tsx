import React from "react"
export function Footer() {
    return (
      <footer className="w-full bg-white shadow-inner">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            {/* Logo and Vision */}
            <div className="lg:col-span-6">
              <h2 className="text-[#3563E9] text-[32px] font-bold mb-4">MORENT</h2>
              <p className="text-[#13131399] text-base max-w-[320px]">
                Our vision is to provide convenience and help increase your sales business.
              </p>
            </div>
  
            {/* About */}
            <div className="lg:col-span-2">
              <h3 className="text-[#1A202C] text-xl font-semibold mb-6">About</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-[#13131399] hover:text-[#131313]">
                    How it works
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#13131399] hover:text-[#131313]">
                    Featured
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#13131399] hover:text-[#131313]">
                    Partnership
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#13131399] hover:text-[#131313]">
                    Bussiness Relation
                  </a>
                </li>
              </ul>
            </div>
  
            {/* Community */}
            <div className="lg:col-span-2">
              <h3 className="text-[#1A202C] text-xl font-semibold mb-6">Community</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-[#13131399] hover:text-[#131313]">
                    Events
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#13131399] hover:text-[#131313]">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#13131399] hover:text-[#131313]">
                    Podcast
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#13131399] hover:text-[#131313]">
                    Invite a friend
                  </a>
                </li>
              </ul>
            </div>
  
            {/* Socials */}
            <div className="lg:col-span-2">
              <h3 className="text-[#1A202C] text-xl font-semibold mb-6">Socials</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-[#13131399] hover:text-[#131313]">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#13131399] hover:text-[#131313]">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#13131399] hover:text-[#131313]">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#13131399] hover:text-[#131313]">
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
  
          {/* Divider */}
          <div className="h-px bg-[#13131333] my-16" />
  
          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-[#000000] font-bold ">©2022 MORENT. All rights reserved</p>
            <div className="flex space-x-16">
              <a href="#" className="text-[#000000] font-bold hover:text-[#131313]">
                Privacy & Policy
              </a>
              <a href="#" className="text-[#000000] font-bold hover:text-[#131313]">
                Terms & Condition
              </a>
            </div>
          </div>
        </div>
      </footer>
    )
  }
  