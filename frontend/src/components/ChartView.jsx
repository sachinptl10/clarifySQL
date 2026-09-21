import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatChartData } from '../utils/chartUtils';

const INK_COLORS = ['#2C4A8F', '#141C2B', '#4A5364', '#767E8C', '#8C7456', '#5C7063'];

export default function ChartView({ result }) {
  if (!result || !result.chart_recommendation) return null;

  const { chart_type, x_axis, y_axis, title } = result.chart_recommendation;
  const data = formatChartData(result.rows, x_axis, y_axis);

  if (!data || data.length === 0) return null;

  const renderChart = () => {
    switch (chart_type) {
      case 'line':
        return (
          <LineChart data={data} margin={{ top: 15, right: 35, left: 15, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(20,28,43,0.1)" />
            <XAxis dataKey="name" stroke="#4A5364" tick={{ fontSize: 13, fontFamily: 'Courier Prime' }} />
            <YAxis stroke="#4A5364" tick={{ fontSize: 13, fontFamily: 'Courier Prime' }} />
            <Tooltip contentStyle={{ backgroundColor: '#EFE9DD', border: '1px solid rgba(20,28,43,0.3)', color: '#141C2B', fontFamily: 'Courier Prime', fontSize: 13 }} />
            <Legend wrapperStyle={{ fontFamily: 'Courier Prime', fontSize: 13 }} />
            <Line type="monotone" dataKey="value" stroke="#2C4A8F" strokeWidth={2.5} dot={{ r: 5, fill: '#2C4A8F' }} activeDot={{ r: 7 }} />
          </LineChart>
        );
      case 'pie':
      case 'donut':
        return (
          <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={chart_type === 'donut' ? 65 : 0}
              outerRadius={110}
              fill="#2C4A8F"
              paddingAngle={chart_type === 'donut' ? 3 : 0}
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={INK_COLORS[index % INK_COLORS.length]} stroke="#EFE9DD" strokeWidth={1.5} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#EFE9DD', border: '1px solid rgba(20,28,43,0.3)', color: '#141C2B', fontFamily: 'Courier Prime', fontSize: 13 }} />
            <Legend wrapperStyle={{ fontFamily: 'Courier Prime', fontSize: 13 }} />
          </PieChart>
        );
      case 'bar':
      default:
        return (
          <BarChart data={data} margin={{ top: 15, right: 35, left: 15, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(20,28,43,0.1)" />
            <XAxis dataKey="name" stroke="#4A5364" tick={{ fontSize: 13, fontFamily: 'Courier Prime' }} />
            <YAxis stroke="#4A5364" tick={{ fontSize: 13, fontFamily: 'Courier Prime' }} />
            <Tooltip contentStyle={{ backgroundColor: '#EFE9DD', border: '1px solid rgba(20,28,43,0.3)', color: '#141C2B', fontFamily: 'Courier Prime', fontSize: 13 }} cursor={{ fill: 'rgba(20,28,43,0.05)' }} />
            <Legend wrapperStyle={{ fontFamily: 'Courier Prime', fontSize: 13 }} />
            <Bar dataKey="value" fill="#2C4A8F" radius={0} />
          </BarChart>
        );
    }
  };

  return (
    <div className="border border-[#141C2B]/20 bg-[#EFE9DD] p-6 h-[420px] flex flex-col">
      <div className="flex items-center justify-between mb-4 border-b border-[#141C2B]/15 pb-3">
        <span className="font-serif text-[20px] font-medium text-[#141C2B]">
          {title || 'Visual Output'}
        </span>
        <span className="text-[12px] uppercase font-mono tracking-[0.1em] text-[#2C4A8F] font-bold">
          {chart_type} chart
        </span>
      </div>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
