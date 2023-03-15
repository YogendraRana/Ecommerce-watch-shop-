import React from 'react'

// import css
import './pieGraph.css'

// imports from recharts
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const PieGraph = ({pieData, style}) => {
	return(
		<div className='pie-graph' style={style}>
			<h3>Sales by Category</h3>
			<ResponsiveContainer>
				<PieChart>
					<Pie data={pieData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey='sales' nameKey='category' label>
					{
						pieData.map((entry, index) => 
								<Cell key={index} fill={COLORS[index]} nameKey='category' />
							)
					}     
					</Pie>
					<Tooltip />
					<Legend />
        </PieChart>
			</ResponsiveContainer>
		</div>
	)
}

export default PieGraph;