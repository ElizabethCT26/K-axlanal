import React from 'react'
import { useGeneralContext } from '../contexts/GeneralContext'
import { Link } from 'react-router-dom';
import GraphStore from './GraphStore';
import GraphCategories from './GraphCategories'

function Dashboard() {
  const { darkMode } = useGeneralContext();

  return (
    <div className={`${darkMode ? 'bg-darkMainBackground text-white' : 'bg-lightMainBackground text-black'} min-h-screen py-10`}>
      <div className="container mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="p-4 rounded-lg shadow-md transition-all transform hover:scale-105">
            <h2 className="mb-4">Categoría más buscada en el mes</h2>
            <div className={`${darkMode ? 'bg-darkCardBg' : 'bg-lightCardBg'} rounded-md p-4`}>
              <GraphCategories />
            </div>
          </div>
          
          <div className="p-4 rounded-lg shadow-md transition-all transform hover:scale-105">
            <h2 className="mb-4">Tienda más popular</h2>
            <div className={`${darkMode ? 'bg-darkCardBg' : 'bg-lightCardBg'} rounded-md p-4`}>
              <GraphStore />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-4 rounded-lg shadow-md transition-all transform hover:scale-105">
            <h2 className="text-center mb-4">CRUD de Usuarios</h2>
            <div className="flex justify-center">
              <Link to="/crud-usuarios">
                <button className={`${darkMode ? 'bg-darkButton' : 'bg-lightButton'} px-4 py-2 rounded text-white`}>
                  Ver más
                </button>
              </Link>
            </div>
          </div>

          <div className="p-4 rounded-lg shadow-md transition-all transform hover:scale-105">
            <h2 className="text-center mb-4">CRUD de Productos</h2>
            <div className="flex justify-center">
              <Link to="/crud-productos">
                <button className={`${darkMode ? 'bg-darkButton' : 'bg-lightButton'} px-4 py-2 rounded text-white`}>
                  Ver más
                </button>
              </Link>
            </div>
          </div>

          <div className="p-4 rounded-lg shadow-md transition-all transform hover:scale-105">
            <h2 className="text-center mb-4">CRUD de Categoría</h2>
            <div className="flex justify-center">
              <Link to="/crud-categorias">
                <button className={`${darkMode ? 'bg-darkButton' : 'bg-lightButton'} px-4 py-2 rounded text-white`}>
                  Ver más
                </button>
              </Link>
            </div>
          </div>

          <div className="p-4 rounded-lg shadow-md transition-all transform hover:scale-105">
            <h2 className="text-center mb-4">CRUD de Tiendas</h2>
            <div className="flex justify-center">
              <Link to="/crud-tienda">
                <button className={`${darkMode ? 'bg-darkButton' : 'bg-lightButton'} px-4 py-2 rounded text-white`}>
                  Ver más
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
