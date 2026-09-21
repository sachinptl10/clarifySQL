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
          <LineChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(20,28,43,0.1)" />
            <XAxis dataKey="name" stroke="#4A5364" tick={{ fontSize: 11, fontFamily: 'Courier Prime' }} />
            <YAxis stroke="#4A5364" tick={{ fontSize: 11, fontFamily: 'Courier Prime' }} />
            <Tooltip contentStyle={{ backgroundColor: '#EFE9DD', border: '1px solid rgba(20,28,43,0.3)', color: '#141C2B', fontFamily: 'Courier Prime' }} />
            <Legend wrapperStyle={{ fontFamily: 'Courier Prime', fontSize: 11 }} />
            <Line type="monotone" dataKey="value" stroke="#2C4A8F" strokeWidth={2} dot={{ r: 4, fill: '#2C4A8F' }} activeDot={{ r: 6 }} />
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
              innerRadius={chart_type === 'donut' ? 55 : 0}
              outerRadius={95}
              fill="#2C4A8F"
              paddingAngle={chart_type === 'donut' ? 3 : 0}
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={INK_COLORS[index % INK_COLORS.length]} stroke="#EFE9DD" strokeWidth={1.5} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#EFE9DD', border: '1px solid rgba(20,28,43,0.3)', color: '#141C2B', fontFamily: 'Courier Prime' }} />
            <Legend wrapperStyle={{ fontFamily: 'Courier Prime', fontSize: 11 }} />
          </PieChart>
        );
      case 'bar':
      default:
        return (
          <BarChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(20,28,43,0.1)" />
            <XAxis dataKey="name" stroke="#4A5364" tick={{ fontSize: 11, fontFamily: 'Courier Prime' }} />
            <YAxis stroke="#4A5364" tick={{ fontSize: 11, fontFamily: 'Courier Prime' }} />
            <Tooltip contentStyle={{ backgroundColor: '#EFE9DD', border: '1px solid rgba(20,28,43,0.3)', color: '#141C2B', fontFamily: 'Courier Prime' }} cursor={{ fill: 'rgba(20,28,43,0.05)' }} />
            <Legend wrapperStyle={{ fontFamily: 'Courier Prime', fontSize: 11 }} />
            <Bar dataKey="value" fill="#2C4A8F" radius={0} />
          </BarChart>
        );
    }
  };

  return (
    <div className="border border-[#141C2B]/20 bg-[#EFE9DD] p-5 h-[360px] flex flex-col">
      <div className="flex items-center justify-between mb-4 border-b border-[#141C2B]/15 pb-2">
        <span className="font-serif text-[17px] font-medium text-[#141C2B]">
          {title || 'Visual Output'}
        </span>
        <span className="text-[10px] uppercase font-mono tracking-[0.1em] text-[#2C4A8F] font-bold">
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
