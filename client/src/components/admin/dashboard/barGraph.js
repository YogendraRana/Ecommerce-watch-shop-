import React from 'react'

// import chart
import './barGraph.css'

// imports from reacharts
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';



const BarGraph = ({barData, style}) => {
	return (
		<div className='bar-graph' style={style}>
			<h3>Sales Analytics</h3>
			<ResponsiveContainer>
				<BarChart data={barData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="date" />
					<YAxis />
					<Tooltip />
					<Bar dataKey="sales" fill="#82ca9d" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
}

export default BarGraph;