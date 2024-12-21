"use client"

import * as React from "react"
import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"
import { Slider } from "./ui/slider"

interface FilterOption {
  label: string
  count: number
  checked?: boolean
}

interface FilterSection {
  title: string
  options: FilterOption[]
}

const filterData: FilterSection[] = [
  {
    title: "TYPE",
    options: [
      { label: "Sport", count: 10, checked: true },
      { label: "SUV", count: 12, checked: true },
      { label: "MPV", count: 16 },
      { label: "Sedan", count: 20 },
      { label: "Coupe", count: 14 },
      { label: "Hatchback", count: 14 },
    ],
  },
  {
    title: "CAPACITY",
    options: [
      { label: "2 Person", count: 10, checked: true },
      { label: "4 Person", count: 14 },
      { label: "6 Person", count: 12 },
      { label: "8 or More", count: 16, checked: true },
    ],
  },
]

export default function FilterSidebar() {
  const [price, setPrice] = React.useState([100])
  const [isOpen, setIsOpen] = React.useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative">
      {/* Burger Menu Button */}
      <button
        className="md:hidden max-h-auto fixed top-0 left-0 z-50 py-2 px-1 bg-white rounded-md"
        onClick={toggleMenu}
      >
        <div className="w-6 h-0.5 bg-gray-600 mb-1"></div>
        <div className="w-6 h-0.5 bg-gray-600 mb-1"></div>
        <div className="w-6 h-0.5 bg-gray-600"></div>
      </button>

      {/* Sidebar */}
      <aside className={`
        w-80 h-[1980px] space-y-8 p-6 bg-white fixed top-0 left-0 bottom-0 z-40
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0
      `}>
        {/* Close Button */}
        <button
          className="md:hidden absolute top-4 right-4 text-gray-600"
          onClick={toggleMenu}
        >
          ✕
        </button>

        {/* Filter Sections */}
        {filterData.map((section) => (
          <div key={section.title} className="space-y-4 mt-7">
            <h3 className="text-[#90a3bf] text-xs font-semibold font-['Plus Jakarta Sans']">
              {section.title}
            </h3>
            <div className="space-y-3">
              {section.options.map((option) => (
                <div key={option.label} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.label}
                    defaultChecked={option.checked}
                    className="rounded-md"
                  />
                  <Label
                    htmlFor={option.label}
                    className="text-[#596780] text-sm font-normal font-['Plus Jakarta Sans']"
                  >
                    {option.label}
                    <span className="ml-1 text-[#90a3bf] text-sm">
                      ({option.count})
                    </span>
                  </Label>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Price Slider */}
        <div className="space-y-4">
          <h3 className="text-[#90a3bf] text-xs font-semibold font-['Plus Jakarta Sans']">
            PRICE
          </h3>
          <div className="space-y-4">
            <Slider
              defaultValue={[100]}
              max={100}
              step={1}
              value={price}
              onValueChange={setPrice}
              className="py-4"
            />
            <div className="text-sm">Max. ${price[0]}.00</div>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </div>
  )
}