"use client"

import * as React from "react"
import { useRouter, useSearchParams } from 'next/navigation'
import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"
import { Slider } from "./ui/slider"
import { useFilterStore } from "@/app/store/filterstore"
import { useCallback } from 'react';

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

interface SidebarProps {
  onFilterChange?: (filters: {
    types: string[];
    capacity: string[];
    maxPrice: number;
  }) => void;
}

export default function FilterSidebar({ onFilterChange }: SidebarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // State for filters
  const [selectedTypes, setSelectedTypes] = React.useState<string[]>([])
  const [selectedCapacity, setSelectedCapacity] = React.useState<string[]>([])
  const [price, setPrice] = React.useState([100])
  const [isOpen, setIsOpen] = React.useState(false)
  const setGlobalFilters = useFilterStore((state) => state.setFilters)

  // Update filters and URL
  const updateFilters = useCallback(() => {
    const filters = {
      types: selectedTypes,
      capacity: selectedCapacity,
      maxPrice: price[0]
    }

    // Update global filter state
    setGlobalFilters(filters)

    // Call the callback if provided
    onFilterChange?.(filters)

    // Update URL parameters
    const params = new URLSearchParams(searchParams.toString())
    
    if (selectedTypes.length) {
      params.set('types', selectedTypes.join(','))
    } else {
      params.delete('types')
    }
    
    if (selectedCapacity.length) {
      params.set('capacity', selectedCapacity.join(','))
    } else {
      params.delete('capacity')
    }
    
    params.set('maxPrice', price[0].toString())
    
    router.push(`?${params.toString()}`)
  }, [selectedTypes, selectedCapacity, price, searchParams, setGlobalFilters, router, onFilterChange])

  // Handle checkbox changes
  const handleTypeChange = (type: string, checked: boolean) => {
    setSelectedTypes(prev => {
      const newTypes = checked 
        ? [...prev, type]
        : prev.filter(t => t !== type)
      return newTypes
    })
  }

  const handleCapacityChange = (capacity: string, checked: boolean) => {
    setSelectedCapacity(prev => {
      const newCapacity = checked 
        ? [...prev, capacity]
        : prev.filter(c => c !== capacity)
      return newCapacity
    })
  }

  // Effect to update filters when changes occur
  React.useEffect(() => {
    updateFilters()
  }, [updateFilters])

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
                    onCheckedChange={(checked) => {
                      if (section.title === "TYPE") {
                        handleTypeChange(option.label, checked as boolean)
                      } else if (section.title === "CAPACITY") {
                        handleCapacityChange(option.label, checked as boolean)
                      }
                    }}
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
              defaultValue={[200]}
              max={200}
              step={1}
              value={price}
              onValueChange={(value) => {
                setPrice(value)
              }}
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
