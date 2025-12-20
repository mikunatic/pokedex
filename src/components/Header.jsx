import { useEffect, useState } from 'react'
import './Header.css'

const Header = () => {
  const [regionData, setRegionData] = useState([])

  async function searchRegion() {
    const response = await fetch('https://pokeapi.co/api/v2/region')
    const regionData = await response.json()

    setRegionData(regionData.results)

  }

  useEffect(() => {
    searchRegion()
  }, [])

  return (
    <div className='header'>
      {regionData.map((region) => (
        <div key={region.name}>
          <button className='pokeregion'>{region.name.charAt(0).toUpperCase() + region.name.slice(1)}</button>
        </div>
      ))}
    </div>
  )
}

export default Header