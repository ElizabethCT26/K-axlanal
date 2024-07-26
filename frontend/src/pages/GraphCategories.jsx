import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useGeneralContext } from '../contexts/GeneralContext';
import Categories from './Categories';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GraphCategories = () => {
    const {darkMode} = useGeneralContext();
  const [categoriaData, setStoreData] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:8082/categories')
      .then(response => {
        setStoreData(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los datos de las categorías:', error);
      });
  }, []);

  const transformData = {
    labels: categoriaData.map(categorias => categorias.nombre),
    datasets: [
      {
        label: 'Más buscada en el mes',
        data: categoriaData.map(categorias => categorias.popularidad),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: '#DBFA1E',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        
      },
      title: {
        display: true,
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Bar  data={transformData} options={options} />
    </div>
  );
};

export default GraphCategories;
